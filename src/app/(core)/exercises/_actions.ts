'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/database';
import { exercise } from '@/lib/database/schema';
import { ActionState } from '@/types';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import * as v from 'valibot';
import { z } from 'zod';

const generateExerciseSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  category: z.string().min(1),
  primaryMuscle: z.string().min(1),
  equipment: z.string().min(1),
});

const newExerciseSchema = v.object({
  prompt: v.pipe(v.string(), v.minLength(1)),
});

export async function generateExercise(prevState: ActionState, formData: FormData) {
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

  const prompt = `get the request fields for the following exercise and return a youtube demo video for the url: ${data.output.prompt}`;

  try {
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: generateExerciseSchema,
      prompt: prompt,
    });

    await db.insert(exercise).values(object);
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: err.message,
      };
    }
    return {
      success: false,
      error: 'and unknown error occurred',
    };
  }

  return redirect('/exercises');
}
