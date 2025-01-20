'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogExerciseWithRelations } from '@/types';
import { use } from 'react';

type Props = {
  query: Promise<LogExerciseWithRelations[] | undefined>;
  date: string;
};

export function DailyLogContent({ query, date }: Props) {
  const logExercises = use(query);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Exercises for {date}</h2>
      <LogExerciseList exercises={logExercises} />
    </div>
  );
}

function LogExerciseList({
  exercises,
}: {
  exercises: LogExerciseWithRelations[] | undefined;
}) {
  if (!exercises || exercises.length === 0) {
    return <p className="text-muted-foreground">No exercises logged for this day.</p>;
  }

  return (
    <ul className="space-y-4">
      {exercises.map((logExercise) => (
        <li key={logExercise.id}>
          <Card>
            <CardHeader>
              <CardTitle>{logExercise.exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sets: {logExercise.sets}</p>
              <p>Reps: {logExercise.reps}</p>
              <p>Weight: {logExercise.weight}lbs</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
