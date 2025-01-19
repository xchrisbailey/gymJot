'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ActionState, DayExerciseWithRelations, LogExerciseWithRelations } from '@/types';
import { AlertCircle, Check } from 'lucide-react';
import { use, useActionState } from 'react';
import { submitLog } from '../_actions';

interface LogFormProps {
  date: string;
  day: string;
  exercisesPromise: Promise<DayExerciseWithRelations[] | undefined>;
  loggedExercisesPromise: Promise<LogExerciseWithRelations[] | undefined>;
}

export default function LogFormList({
  exercisesPromise,
  loggedExercisesPromise,
  date,
}: LogFormProps) {
  const exercises = use(exercisesPromise);
  const loggedExercises = use(loggedExercisesPromise);

  if (!exercises || !date) {
    return <h1>No Plan Today</h1>;
  }

  return (
    <>
      {exercises.map((exercise) => (
        <FormFields
          date={date}
          exercise={exercise}
          key={exercise.id}
          completed={loggedExercises?.some((l) => l.exerciseId === exercise.exerciseId)}
        />
      ))}
    </>
  );
}

function FormFields({
  exercise,
  completed,
  date,
}: {
  exercise: DayExerciseWithRelations;
  completed: boolean | undefined;
  date: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    submitLog,
    {}
  );

  return (
    <form action={formAction} className="space-y-6" key={exercise.id}>
      <div className="rounded-lg border p-4">
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
              disabled={completed}
            />
            <p className="text-sm text-gray-500">
              {completed ? 'Completed' : `Planned: ${exercise.sets}`}
            </p>
          </div>
          <div>
            <Label htmlFor="reps">Reps</Label>
            <Input
              name="reps"
              type="number"
              min={0}
              max={exercise.reps}
              defaultValue={1}
              disabled={completed}
            />
            <p className="text-sm text-gray-500">
              {completed ? 'Completed' : `Planned: ${exercise.reps}`}
            </p>
          </div>
          <div>
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              name="weight"
              type="number"
              step=".5"
              defaultValue={undefined}
              disabled={completed}
            />
            <p className="text-sm text-gray-500">{completed && 'Completed'}</p>
          </div>
        </div>

        <input type="hidden" value={exercise.exercise.id} name="exerciseId" />
        <input type="hidden" value={date} name="date" />

        {state.error && (
          <Alert variant={'destructive'} className="my-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          size="sm"
          disabled={state.success || pending || completed}
          className="mt-2"
        >
          {state.success || completed ? <Check /> : `Log ${exercise.exercise.name}`}
        </Button>
      </div>
    </form>
  );
}
