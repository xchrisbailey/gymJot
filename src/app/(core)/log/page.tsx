import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { auth } from '@/lib/auth';
import { daysOfWeek } from '@/lib/data';
import { getPlanByDay } from '@/lib/database/queries';
import { AlertCircle } from 'lucide-react';
import Form from 'next/form';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import LogFormList from './_components/log-form';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export default async function LogPage(props: { searchParams: SearchParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw unauthorized();
  // const logId = await createLogIfNotExists(session.user.id);

  const searchParams = await props.searchParams;
  const day = searchParams.day ?? new Date().toLocaleDateString('en-us', { weekday: 'long' });
  if (!day || typeof day !== 'string' || !isValidDay(day.toLowerCase())) {
    return (
      <div>
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="w-4 h-4" />
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

function DaySelectHeader({ day }: { day?: string }) {
  return (
    <div className="grid place-content-center w-full">
      <Form action="/log" className="flex gap-4">
        <Select name="day" defaultValue={day?.toLocaleLowerCase()}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Day" />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((d) => (
              <SelectItem value={d} key={d} aria-selected={day === d}>
                <span style={{ textTransform: 'capitalize' }}>{d}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button>view</Button>
      </Form>
    </div>
  );
}

function isValidDay(day: string): day is Day {
  const validDays: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  return validDays.includes(day as Day);
}
