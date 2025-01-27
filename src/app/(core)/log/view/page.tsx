import { auth } from '@/lib/auth';
import {
  getAllAvaiableLoggedDates,
  getLoggedExercisesByDate,
} from '@/lib/database/queries';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';
import { DailyLogContent } from '../_components/log-view';

type SearchParams = Promise<{ date: string | undefined }>;

export default async function LogViewPage(props: { searchParams: SearchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) unauthorized();

  const searchParams = await props.searchParams;
  const date = searchParams.date;

  const availableDates = await getAllAvaiableLoggedDates(session.user.id);

  if (!date) {
    return (
      <>
        {availableDates?.map((d) => (
          <div key={d}>
            <a href={`/log/view?date=${d}`}>{d}</a>
          </div>
        ))}
      </>
    );
  }

  const loggedExercisePromise = getLoggedExercisesByDate(session.user.id, date);

  return (
    <>
      <Suspense fallback={<div>Loading daily log...</div>}>
        <DailyLogContent query={loggedExercisePromise} />
      </Suspense>
    </>
  );
}
