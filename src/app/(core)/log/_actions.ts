'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/database';
import { logExercise } from '@/lib/database/schema';
import { errorToReponseMessage } from '@/lib/error-format';
import { ActionState } from '@/types';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import * as v from 'valibot';

const logExerciseSchema = v.object({
  exerciseId: v.pipe(v.string(), v.cuid2()),
  sets: v.pipe(v.unknown(), v.transform(Number), v.number(), v.minValue(1)),
  reps: v.optional(v.pipe(v.unknown(), v.transform(Number), v.number(), v.minValue(0))),
  weight: v.optional(v.pipe(v.unknown(), v.transform(Number), v.number(), v.minValue(0))),
  date: v.pipe(v.unknown(), v.transform(Date)),
});

export async function submitLog(prevState: ActionState, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect('/sign-in');

  const data = await v.safeParseAsync(logExerciseSchema, Object.fromEntries(formData));

  if (!data.success) {
    const issues = v.flatten<typeof logExerciseSchema>(data.issues);
    return {
      success: false,
      error: 'invalid input data',
      issues: issues.nested,
    };
  }

  try {
    await db.insert(logExercise).values({
      ...data.output,
      userId: session.user.id,
      date: new Date(data.output.date).toLocaleDateString(),
    });
  } catch (err) {
    return {
      success: false,
      error: errorToReponseMessage(err),
    };
  }

  return {
    success: true,
  };
}
