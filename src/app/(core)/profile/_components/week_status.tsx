'use client';

import { LogExerciseWithRelations } from '@/types';
import { use } from 'react';

type Props = {
  weekStatusPromise: Promise<LogExerciseWithRelations[] | undefined>;
};
export function WeekStatus({ weekStatusPromise }: Props) {
  const weekStatus = use(weekStatusPromise);

  console.log(weekStatus);

  return <h1>hi</h1>;
}
