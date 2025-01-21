'use client';

import { use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { WorkoutPlanWithRelations } from '@/types';
import { revalidatePath } from 'next/cache';
import { newWorkoutPlanAction } from './_actions';
import { daysOfWeek } from '@/lib/data';
import Link from 'next/link';
import { ExerciseArticle } from './_components/exercise_article';

type Props = {
  workoutPlanPromise: Promise<WorkoutPlanWithRelations | undefined>;
};

export function WorkoutPlanView({ workoutPlanPromise }: Props) {
  const workoutPlan = use(workoutPlanPromise);

  const handleGenerateWorkoutPlan = async () => {
    await newWorkoutPlanAction(); // Replace 'user1' with actual user ID
    revalidatePath('./');
  };

  if (!workoutPlan) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weekly Workout Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">You don&apos;t have a workout plan yet.</p>
          <Button onClick={handleGenerateWorkoutPlan}>Generate Empty Workout Plan</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weekly Workout Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {daysOfWeek.map((dayName) => {
            const day = workoutPlan.days.find((d) => d.name === dayName);
            if (!day) return null;

            return (
              <AccordionItem key={dayName} value={dayName}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full justify-between">
                    <span className="capitalize">{dayName}</span>
                    <span className="text-muted-foreground">
                      {day?.dayExercises.length || 0} exercise(s)
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {day?.dayExercises.length ? (
                    day.dayExercises.map((dayExercise, index) => (
                      <div key={`${dayExercise.dayId}_${index}`}>
                        {index > 0 && <Separator className="my-2" />}
                        <ExerciseArticle dayExercise={dayExercise} />
                      </div>
                    ))
                  ) : (
                    <div>
                      <p className="mb-2 text-muted-foreground">
                        No exercises planned for this day.
                      </p>
                    </div>
                  )}
                  <Button variant="outline" asChild>
                    <Link href={`/plan/view?day=${day.name}`}>
                      View/Edit{' '}
                      <span style={{ textTransform: 'capitalize' }}>{dayName}</span>{' '}
                      Workout
                    </Link>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
