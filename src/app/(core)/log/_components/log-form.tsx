'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DayExerciseWithRelations } from '@/types';
import { submitLog } from '../_actions';

interface LogFormProps {
  day: string;
  exercises: DayExerciseWithRelations[];
}

export default function LogForm({ day, exercises }: LogFormProps) {
  const [completedExercises] = useState(
    exercises.map((exercise) => ({
      ...exercise,
    }))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLog(day, completedExercises);
    // You can add a success message or redirect here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {completedExercises.map((exercise) => (
        <div key={exercise.id} className="p-4 rounded-lg border">
          <h3 className="mb-2 text-xl font-semibold">{exercise.exercise.name}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="sets">Sets</Label>
              <Input id="sets" type="number" min={0} max={exercise.sets} defaultValue={1} />
              <p className="text-sm text-gray-500">Planned: {exercise.sets}</p>
            </div>
            <div>
              <Label htmlFor="reps">Reps</Label>
              <Input id="reps" name="reps" type="number" min={0} max={exercise.reps} defaultValue={1} />
              <p className="text-sm text-gray-500">Planned: {exercise.reps}</p>
            </div>
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input id="weight" name="weight" type="number" step=".5" min={0} defaultValue={0} />
            </div>
          </div>
        </div>
      ))}
      <Button type="submit">Submit Log</Button>
    </form>
  );
}
