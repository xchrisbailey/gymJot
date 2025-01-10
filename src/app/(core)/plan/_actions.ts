"use server";

import { auth } from "@/lib/auth";
import { daysOfWeek } from "@/lib/data";
import { db } from "@/lib/database";
import { day, workoutPlan } from "@/lib/database/schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
