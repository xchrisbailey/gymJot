import { DayWithRelations, Exercise, WorkoutPlanWithRelations } from "@/types";
import { db } from ".";
import { workoutPlan } from "./schema";
import { eq } from "drizzle-orm";

export async function getAllExercises(): Promise<Exercise[]> {
  return await db.query.exercise.findMany();
}

export async function getWorkoutPlan(
  userId: string,
): Promise<WorkoutPlanWithRelations | undefined> {
  return await db.query.workoutPlan.findFirst({
    where: eq(workoutPlan.userId, userId),
    with: {
      days: {
        with: {
          dayExercises: {
            with: {
              exercise: true,
            },
          },
        },
      },
    },
  });
}

export async function getWorkoutPlanDay(
  day: string,
  userId: string,
): Promise<DayWithRelations | undefined> {
  return (await getWorkoutPlan(userId))?.days.find((d) => d.name === day);
}
