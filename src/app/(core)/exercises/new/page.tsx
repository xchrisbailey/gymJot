'use server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import NewExerciseForm from '../_components/new_exercise_form';

export default async function NewExercisePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) unauthorized();

  return (
    <div className="mx-auto mt-2 w-full md:max-w-lg">
      <NewExerciseForm />
    </div>
  );
}
