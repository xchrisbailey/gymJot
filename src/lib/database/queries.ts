import {
  DayExerciseWithRelations,
  DayWithRelations,
  Exercise,
  LogExerciseWithRelations,
  WorkoutPlanWithRelations,
} from '@/types';
import { db } from '.';
import { day, dayExercise, logExercise, workoutPlan } from './schema';
import { and, eq } from 'drizzle-orm';

export async function getAllExercises(): Promise<Exercise[]> {
  return await db.query.exercise.findMany();
}

export async function getWorkoutPlan(
  userId: string
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
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
  userId: string
): Promise<DayWithRelations | undefined> {
  return (await getWorkoutPlan(userId))?.days.find((d) => d.name === day);
}

export async function getPlanByDay(
  dayName:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday',
  userId: string
): Promise<DayExerciseWithRelations[] | undefined> {
  return await db.transaction(async (t) => {
    const d = await t.query.day.findFirst({
      where: eq(day.name, dayName),
      columns: { id: true },
    });
    if (!d) return undefined;
    return await t.query.dayExercise.findMany({
      where: and(eq(dayExercise.dayId, d.id), eq(dayExercise.userId, userId)),
      with: { exercise: true },
    });
  });
}

export async function getLoggedExercisesByDay(
  userId: string,
  date: string
): Promise<LogExerciseWithRelations[] | undefined> {
  return await db.query.logExercise.findMany({
    where: and(eq(logExercise.date, date), eq(logExercise.userId, userId)),
    with: {
      exercise: true,
    },
  });
}
