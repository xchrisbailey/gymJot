import { db } from ".";
import { Exercise, workoutPlan, WorkoutPlan } from "./schema";
import { eq } from "drizzle-orm";

export async function getAllExercises(): Promise<Exercise[]> {
  return await db.query.exercise.findMany();
}

export async function getWorkoutPlan(
  userId: string,
): Promise<WorkoutPlan | undefined> {
  return await db.query.workoutPlan.findFirst({
    where: eq(workoutPlan.userId, userId),
  });
}
