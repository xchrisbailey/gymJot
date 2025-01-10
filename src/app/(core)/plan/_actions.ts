"use server";

import { auth } from "@/lib/auth";
import { daysOfWeek } from "@/lib/data";
import { db } from "@/lib/database";
import { day, dayExercise, workoutPlan } from "@/lib/database/schema";
import { ActionState } from "@/types";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as v from "valibot";

export async function newWorkoutPlanAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return redirect("/sign-in");

  try {
    await db.transaction(async (tx) => {
      const { id } = (
        await tx
          .insert(workoutPlan)
          .values({
            userId: session.user.id,
          })
          .returning({ id: workoutPlan.id })
      )[0];

      daysOfWeek.forEach(async (d) => {
        await tx.insert(day).values({
          name: d,
          workoutPlanId: id,
          userId: session.user.id,
        });
      });
    });
    await db
      .insert(workoutPlan)
      .values({
        userId: session.user.id,
      })
      .returning();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("An error occurred while creating a new workout plan.");
  }

  revalidatePath("/plan");
  return redirect("/plan");
}

const addExerciseToPlanSchema = v.object({
  dayId: v.pipe(
    v.string(),
    v.nonEmpty("must select a exercise"),
    v.cuid2("must select a exercise"),
  ),
  exerciseId: v.pipe(
    v.string(),
    v.nonEmpty("must select a exercise"),
    v.cuid2("must select a exercise"),
  ),
  sets: v.pipe(
    v.unknown(),
    v.transform(Number),
    v.number(),
    v.minValue(1, "Must have at least one set"),
  ),
  reps: v.pipe(
    v.unknown(),
    v.transform(Number),
    v.number(),
    v.minValue(1, "Must have at least one rep"),
  ),
});

export async function addExerciseToPlanAction(
  prevState: ActionState,
  formData: FormData,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/sign-in");

  const data = await v.safeParseAsync(
    addExerciseToPlanSchema,
    Object.fromEntries(formData),
  );

  console.log(data.output);

  if (!data.success) {
    const issues = v.flatten<typeof addExerciseToPlanSchema>(data.issues);
    return {
      success: false,
      error: "invalid input data",
      issues: issues.nested,
    };
  }

  try {
    await db.insert(dayExercise).values({
      ...data.output,
      userId: session.user.id,
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: err.message,
      };
    }

    return {
      success: false,
      error: "unknown error",
    };
  }

  revalidatePath("/plan/edit");
  return {
    success: true,
  };
}

export async function removeExerciseFromPlanAction(dayExerciseId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return redirect("/sign-in");
  try {
    await db
      .delete(dayExercise)
      .where(
        and(
          eq(dayExercise.id, dayExerciseId),
          eq(dayExercise.userId, session.user.id),
        ),
      );
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
  revalidatePath("/plan/edit");
  return {
    success: true,
  };
}
