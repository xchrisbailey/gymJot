"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { WorkoutPlanWithRelations } from "@/types";
import { revalidatePath } from "next/cache";
import { newWorkoutPlanAction } from "./_actions";
import { daysOfWeek } from "@/lib/data";

type Props = {
  workoutPlanPromise: Promise<WorkoutPlanWithRelations | undefined>;
};

export function WorkoutPlanView({ workoutPlanPromise }: Props) {
  const workoutPlan = use(workoutPlanPromise);
  const router = useRouter();

  const handleGenerateWorkoutPlan = async () => {
    await newWorkoutPlanAction(); // Replace 'user1' with actual user ID
    revalidatePath("./");
  };

  if (!workoutPlan) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weekly Workout Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">You don&apos;t have a workout plan yet.</p>
          <Button onClick={handleGenerateWorkoutPlan}>
            Generate Empty Workout Plan
          </Button>
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
                  <div className="flex justify-between w-full">
                    <span className="capitalize">{dayName}</span>
                    <span className="text-muted-foreground">
                      {day?.dayExercises.length || 0} exercise(s)
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {day?.dayExercises.length ? (
                    day.dayExercises.map((dayExercise, index) => (
                      <div key={dayExercise.id}>
                        {index > 0 && <Separator className="my-2" />}
                        <div className="py-2">
                          <h3 className="font-semibold">
                            {dayExercise.exercise.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {dayExercise.sets} sets of {dayExercise.reps} reps
                          </p>
                          {dayExercise.exercise.description && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {dayExercise.exercise.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {dayExercise.exercise.category && (
                              <Badge variant="secondary">
                                {dayExercise.exercise.category}
                              </Badge>
                            )}
                            {dayExercise.exercise.primaryMuscle && (
                              <Badge variant="outline">
                                {dayExercise.exercise.primaryMuscle}
                              </Badge>
                            )}
                            {dayExercise.exercise.equipment && (
                              <Badge>{dayExercise.exercise.equipment}</Badge>
                            )}
                          </div>
                          {dayExercise.exercise.url && (
                            <a
                              href={dayExercise.exercise.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block mt-2 text-sm text-blue-500 hover:underline"
                            >
                              Learn more
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p className="mb-2 text-muted-foreground">
                        No exercises planned for this day.
                      </p>
                      <Button
                        onClick={() =>
                          router.push(`/workout-plan/add-exercise/${day?.id}`)
                        }
                      >
                        Add Workout for {dayName}
                      </Button>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
