import { db } from ".";
import { Exercise } from "./schema";

export async function getAllExercises(): Promise<Exercise[]> {
  return await db.query.exercise.findMany();
}
