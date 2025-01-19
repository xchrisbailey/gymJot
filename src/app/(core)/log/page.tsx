import { auth } from '@/lib/auth';
import { getLoggedExercisesByDate, getPlanByDay } from '@/lib/database/queries';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import LogFormList from './_components/log-form';
import { Day } from './_utils';
import { Suspense } from 'react';

export default async function LogPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) unauthorized();

  const date = new Date();
  const day = date.toLocaleString('default', { weekday: 'long' }).toLowerCase();

  const dayExercisesPromise = getPlanByDay(day.toLowerCase() as Day, session.user.id);
  const loggedExercisesPromise = getLoggedExercisesByDate(
    session.user.id,
    date.toLocaleDateString()
  );

  return (
    <>
      <div className="flex justify-center">
        <h1>{date.toLocaleDateString('default', { dateStyle: 'full' })}</h1>
      </div>
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <LogFormList
            date={date.toISOString()}
            day={day}
            exercisesPromise={dayExercisesPromise}
            loggedExercisesPromise={loggedExercisesPromise}
          />
        </Suspense>
      </>
    </>
  );
}
