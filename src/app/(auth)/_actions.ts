"use server";

import { auth } from "@/lib/auth";
import { ActionState } from "@/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as v from "valibot";

const loginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(
    v.string(),
    v.minLength(8, "password must be at least 8 characters"),
  ),
});

export async function signInAction(prevState: ActionState, formData: FormData) {
  const data = await v.safeParseAsync(
    loginSchema,
    Object.fromEntries(formData),
  );

  if (!data.success) {
    const issues = v.flatten<typeof loginSchema>(data.issues);
    return {
      success: false,
      error: "invalid username or password",
      issues: issues.nested,
    };
  }

  try {
    await auth.api.signInEmail({
      body: data.output,
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: "invalid username or password",
      };
    }

    return {
      success: false,
      error: "unknown error",
    };
  }

  return redirect("/");
}

const signUpSchema = v.pipe(
  v.object({
    firstName: v.pipe(v.string(), v.minLength(2)),
    lastName: v.pipe(v.string(), v.minLength(2)),
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(8)),
    passwordConfirmation: v.pipe(v.string(), v.minLength(8)),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["passwordConfirmation"]],
      (input) => input.password === input.passwordConfirmation,
      "Passwords do not match",
    ),
    ["passwordConfirmation"],
  ),
);

export async function signUpAction(prevState: ActionState, formData: FormData) {
  const data = await v.safeParseAsync(
    signUpSchema,
    Object.fromEntries(formData),
  );

  if (!data.success) {
    const issues = v.flatten<typeof signUpSchema>(data.issues);
    return {
      success: false,
      error: "invalid username or password",
      issues: issues.nested,
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: data.output.email,
        password: data.output.password,
        name: `${data.output.firstName} ${data.output.lastName}`,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: "invalid username or password",
      };
    }
    return {
      success: false,
      error: "unknown error",
    };
  }

  return redirect("/");
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  return redirect("/");
}
