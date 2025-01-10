"use server";

import { auth } from "@/lib/auth";
import { daysOfWeek } from "@/lib/data";
import { db } from "@/lib/database";
import { day, dayExercise, workoutPlan } from "@/lib/database/schema";
import { ActionState } from "@/types";
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
  dayId: v.pipe(v.string(), v.cuid2()),
  exerciseId: v.pipe(v.string(), v.cuid2()),
  sets: v.pipe(v.number(), v.minValue(1, "Must have at least one set")),
  reps: v.pipe(v.number(), v.minValue(1, "Must have at least one rep")),
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

  if (!data.success) {
    return {
      success: false,
      error: "invalid input data",
    };
  }

  try {
    await db.insert(dayExercise).values({
      ...data.output,
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

  return redirect(`/plan/add-exercise/${data.output.dayId}`);
}
