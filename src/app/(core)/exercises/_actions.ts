'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/database';
import { exercise } from '@/lib/database/schema';
import { ActionState } from '@/types';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import * as v from 'valibot';

const newExerciseSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  description: v.string(),
  url: v.pipe(v.string(), v.url()),
});

export async function newExercise(prevState: ActionState, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error('Not authenticated');

  const data = await v.safeParseAsync(newExerciseSchema, Object.fromEntries(formData));

  if (!data.success) {
    return {
      success: false,
      error: 'invalid input data',
    };
  }

  try {
    await db.insert(exercise).values(data.output);
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: err.message,
      };
    }

    return {
      success: false,
      error: 'unknown error',
    };
  }

  return redirect('/exercises');
}
