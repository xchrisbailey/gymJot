import { db } from '.';
import { day, dayExercise, logExercise, workoutPlan } from './schema';
import {
  DayExerciseWithRelations,
  DayWithRelations,
  Exercise,
  LogExerciseWithRelations,
  WorkoutPlanWithRelations,
} from '@/types';
import { and, eq, inArray } from 'drizzle-orm';

/**
 * Retrieves all exercises from the database.
 * @returns {Promise<Exercise[]>} A promise that resolves to an array of exercises
 */
export async function getAllExercises(): Promise<Exercise[]> {
  return await db.query.exercise.findMany();
}

/**
 * Retrieves a workout plan for a specific user with all related data (days, exercises).
 * @param {string} userId - The ID of the user
 * @returns {Promise<WorkoutPlanWithRelations | undefined>} A promise that resolves to the workout plan or undefined if not found
 */
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

/**
 * Retrieves a specific day from a user's workout plan.
 * @param {'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'} day - The name of the day
 * @param {string} userId - The ID of the user
 * @returns {Promise<DayWithRelations | undefined>} A promise that resolves to the day data or undefined if not found
 */
export async function getWorkoutPlanDay(
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
  userId: string
): Promise<DayWithRelations | undefined> {
  return (await getWorkoutPlan(userId))?.days.find((d) => d.name === day);
}

/**
 * Retrieves all exercises planned for a specific day for a user.
 * @param {'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'} dayName - The name of the day
 * @param {string} userId - The ID of the user
 * @returns {Promise<DayExerciseWithRelations[] | undefined>} A promise that resolves to an array of exercises or undefined if not found
 */
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

/**
 * Retrieves all logged exercises for a specific date and user.
 * @param {string} userId - The ID of the user
 * @param {string} date - The date to retrieve logs for
 * @returns {Promise<LogExerciseWithRelations[] | undefined>} A promise that resolves to an array of logged exercises or undefined if none found
 */
export async function getLoggedExercisesByDate(
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

/**
 * Retrieves all dates for which a user has logged exercises.
 * @param {string} userId - The ID of the user
 * @returns {Promise<string[] | undefined>} A promise that resolves to an array of dates or undefined if none found
 */
export async function getAllAvaiableLoggedDates(
  userId: string
): Promise<string[] | undefined> {
  const dates = await db
    .selectDistinct({ date: logExercise.date })
    .from(logExercise)
    .where(eq(logExercise.userId, userId));
  return Object.values(dates).map((d) => d.date);
}

/**
 * Retrieves logged exercises for a specific user within a given date range
 * @param userId - The unique identifier of the user
 * @param dates - Array of dates to query exercises for (in string format)
 * @returns Promise containing an array of logged exercises with their relations, or undefined if none found
 * @throws {Error} If the database query fails
 * @example
 * const exercises = await getLoggedExercisesByDateRange('user123', ['2024-01-01', '2024-01-02']);
 */
export async function getLoggedExercisesByDateRange(
  userId: string,
  dates: string[]
): Promise<LogExerciseWithRelations[] | undefined> {
  return await db.query.logExercise.findMany({
    where: and(eq(logExercise.userId, userId), inArray(logExercise.date, dates)),
    with: {
      exercise: true,
    },
  });
}
