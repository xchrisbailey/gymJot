'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ActionState, DayExerciseWithRelations } from '@/types';
import { useActionState, useState } from 'react';
import { submitLog } from '../_actions';
import { AlertCircle, CalendarIcon, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface LogFormProps {
  day: string;
  exercises: DayExerciseWithRelations[];
}

export default function LogFormList({ exercises }: LogFormProps) {
  return (
    <>
      {exercises.map((exercise) => (
        <FormFields exercise={exercise} key={exercise.id} />
      ))}
    </>
  );
}

function FormFields({ exercise }: { exercise: DayExerciseWithRelations }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    submitLog,
    {}
  );

  return (
    <form action={formAction} className="space-y-6" key={exercise.id}>
      <div className="p-4 rounded-lg border">
        <h3 className="mb-2 text-xl font-semibold">{exercise.exercise.name}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="sets">Sets</Label>
            <Input
              name="sets"
              type="number"
              min={0}
              max={exercise.sets}
              defaultValue={1}
              required
            />
            <p className="text-sm text-gray-500">Planned: {exercise.sets}</p>
          </div>
          <div>
            <Label htmlFor="reps">Reps</Label>
            <Input
              name="reps"
              type="number"
              min={0}
              max={exercise.reps}
              defaultValue={1}
            />
            <p className="text-sm text-gray-500">Planned: {exercise.reps}</p>
          </div>
          <div>
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input name="weight" type="number" step=".5" defaultValue={undefined} />
          </div>
        </div>
        <div className="col-span-3 mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 w-4 h-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <input type="hidden" value={exercise.exercise.id} name="exerciseId" />
        <input type="hidden" value={date?.toISOString()} name="date" />

        {state.error && (
          <Alert
            variant={state.error.includes('already logged') ? 'warning' : 'destructive'}
            className="my-2"
          >
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>
              {state.error.includes('already logged') ? 'Warning' : 'Error'}
            </AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          size="sm"
          disabled={state.success || pending}
          className="mt-2"
        >
          {state.success || state.error?.includes('already logged') ? (
            <Check />
          ) : (
            `Log ${exercise.exercise.name}`
          )}
        </Button>
      </div>
    </form>
  );
}
