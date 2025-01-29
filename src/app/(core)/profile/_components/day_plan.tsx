'use client';

import { DayExerciseWithRelations } from '@/types';
import { Square, SquareCheck } from 'lucide-react';
import { use } from 'react';

type Props = {
  todaysPlanPromise: Promise<DayExerciseWithRelations[] | undefined>;
};

export function DayPlan({ todaysPlanPromise }: Props) {
  const todaysPlan = use(todaysPlanPromise);

  if (!todaysPlan || todaysPlan.length === 0) {
    return <p>Nothing on the schedule today. Take a break, go for a walk.</p>;
  }

  return (
    <>
      <section>
        <ul className="space-y-1">
          {todaysPlan.map((exercise) => (
            <div key={exercise.id}>
              <p className="group flex items-center">
                <Square className="mr-2 inline h-4 w-4 group-hover:hidden" />
                <SquareCheck className="mr-2 hidden h-4 w-4 group-hover:inline" />
                {exercise.exercise.name}
              </p>
            </div>
          ))}
        </ul>
      </section>
    </>
  );
}
