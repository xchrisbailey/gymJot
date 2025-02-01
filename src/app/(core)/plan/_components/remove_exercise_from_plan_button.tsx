'use client';

import { removeExerciseFromPlanAction } from '../_actions';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

type Props = {
  dayExerciseId: string;
};

export function RemoveExerciseFromDayPlanButton({ dayExerciseId }: Props) {
  async function handleDelete(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    const response = await removeExerciseFromPlanAction(dayExerciseId);
    console.log(response);
  }

  return (
    <Button onClick={handleDelete} variant="destructive" size="icon">
      <Trash2 />
    </Button>
  );
}
