import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { daysOfWeek } from '@/lib/data';
import { getPlanByDay } from '@/lib/database/queries';
import Form from 'next/form';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export default async function LogPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const day = searchParams.day;
  if (!day || typeof day !== 'string' || !isValidDay(day.toLowerCase())) {
    return (
      <div>
        <h1>Please select a valid day of the week</h1>
        <DaySelectHeader />
      </div>
    );
  }
  const dayExercises = await getPlanByDay(day.toLowerCase() as Day);

  return (
    <>
      <DaySelectHeader />
      {dayExercises && dayExercises.length > 0 ? (
        <>
          {dayExercises.map((e) => (
            <div key={e.id}>{e.exercise.name}</div>
          ))}
        </>
      ) : (
        <div>
          <a href="/plan">Fill out your plan</a>
        </div>
      )}
    </>
  );
}

function DaySelectHeader() {
  return (
    <div className="grid place-content-center w-full">
      <Form action="/log" className="flex gap-4">
        <Select name="day">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Day" />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((d) => (
              <SelectItem value={d} key={d}>
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
