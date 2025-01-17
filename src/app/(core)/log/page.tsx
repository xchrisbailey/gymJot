import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { auth } from '@/lib/auth';
import { getPlanByDay } from '@/lib/database/queries';
import { AlertCircle } from 'lucide-react';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import LogFormList from './_components/log-form';
import { DaySelectHeader } from './_components/day-select-header';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export default async function LogPage(props: { searchParams: SearchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) unauthorized();

  const searchParams = await props.searchParams;
  const day = searchParams.day ?? new Date().toLocaleDateString('en-us', { weekday: 'long' });
  if (!day || typeof day !== 'string' || !isValidDay(day.toLowerCase())) {
    return (
      <div>
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Day Selected</AlertTitle>
          <AlertDescription>Please select a day to start logging</AlertDescription>
        </Alert>
        <DaySelectHeader />
      </div>
    );
  }
  const dayExercises = await getPlanByDay(day.toLowerCase() as Day);

  return (
    <>
      <DaySelectHeader day={day} />
      {dayExercises && dayExercises.length > 0 ? (
        <>
          <LogFormList day={day} exercises={dayExercises} />
        </>
      ) : (
        <div>
          <a href="/plan">Fill out your plan</a>
        </div>
      )}
    </>
  );
}

function isValidDay(day: string): day is Day {
  const validDays: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return validDays.includes(day as Day);
}
