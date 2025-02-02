import { DayPlan } from './_components/day_plan';
import { WeekStatus } from './_components/week_status';
import { getWeekDates } from './_utils';
import { auth } from '@/lib/auth';
import { getLoggedExercisesByDateRange, getPlanByDay } from '@/lib/database/queries';
import { format } from 'date-fns';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  const date = new Date();
  const day = format(date, 'EEEE').toLowerCase() as
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';

  const todaysPlanPromise = getPlanByDay(day, session.user.id);
  const weekStatusPromise = getLoggedExercisesByDateRange(
    session.user.id,
    getWeekDates()
  );

  return (
    <>
      <h1>{session.user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <article className="md:col-span-1 rounded border-2 border-neutral-200/80 bg-neutral-100/80 p-2">
          <h3 className="mb-2 text-neutral-700">Todays Schedule</h3>
          <Suspense fallback={<p>Loading...</p>}>
            <DayPlan todaysPlanPromise={todaysPlanPromise} />
          </Suspense>
        </article>
        <article className="md:col-span-3 rounded border-2 border-neutral-200/80 bg-neutral-100/80 p-2">
          <h3 className="mb-2 text-neutral-700">Progress This Week</h3>
          <Suspense fallback={<p>Loading...</p>}>
            <WeekStatus weekStatusPromise={weekStatusPromise} />
          </Suspense>
        </article>
      </div>
    </>
  );
}
