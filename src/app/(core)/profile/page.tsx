import { DayPlan } from './_components/day_plan';
import { auth } from '@/lib/auth';
import { getPlanByDay } from '@/lib/database/queries';
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

  console.log(day);

  const todaysPlanPromise = getPlanByDay('thursday', session.user.id);

  console.log(todaysPlanPromise);

  return (
    <>
      <h1>{session.user.name}</h1>
      <div className="grid grid-cols-4 gap-5">
        <article className="col-span-1 rounded border-2 border-neutral-200/80 bg-neutral-100/80 p-2">
          <h3 className="mb-2 text-neutral-700">Todays Schedule</h3>
          <Suspense fallback={<p>Loading...</p>}>
            <DayPlan todaysPlanPromise={todaysPlanPromise} />
          </Suspense>
        </article>
      </div>
    </>
  );
}
