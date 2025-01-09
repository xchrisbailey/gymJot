"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { workoutPlan } from "@/lib/database/schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function newWorkoutPlanAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return redirect("/sign-in");

  try {
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
