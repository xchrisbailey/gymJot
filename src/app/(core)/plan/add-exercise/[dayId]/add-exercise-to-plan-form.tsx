"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ActionState, Exercise } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import Form from "next/form";
import { use, useActionState, useState } from "react";
import { addExerciseToPlanAction } from "../../_actions";

type Props = {
  exercisesPromise: Promise<Exercise[] | undefined>;
  dayId: string;
};

export default function AddExerciseToPlanForm({ exercisesPromise }: Props) {
  const exercises = use(exercisesPromise);
  const [exerciseListOpen, setExerciseListOpen] = useState(false);
  const [exerciseId, setExerciseId] = useState<string>("");
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    addExerciseToPlanAction,
    {},
  );

  return (
    <Form action={formAction} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="exerciseName">Exercise</Label>
        {exercises ? (
          <Popover open={exerciseListOpen} onOpenChange={setExerciseListOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={exerciseListOpen}
                className="justify-between w-full"
              >
                {exerciseId
                  ? exercises.find((exercise) => exercise.id === exerciseId)
                      ?.name
                  : "Select exercise..."}
                <ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
              <Command>
                <CommandInput placeholder="Search exercise..." />
                <CommandList>
                  <CommandEmpty>No exercise found.</CommandEmpty>
                  <CommandGroup>
                    {exercises.map((exercise) => (
                      <CommandItem
                        key={exercise.id}
                        value={exercise.id}
                        onSelect={(currentValue) => {
                          setExerciseId(
                            currentValue === exerciseId ? "" : currentValue,
                          );
                          setExerciseListOpen(false);
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4")} />
                        {exercise.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <p>
            no exercises in database.{" "}
            <a href="/exerces/new">start adding some</a>
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="sets">Sets</Label>
        <Input id="sets" type="number" name="sets" required />
      </div>
      <div>
        <Label htmlFor="reps">Reps</Label>
        <Input id="reps" type="number" name="reps" required />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Adding..." : "Add Exercise"}
      </Button>
    </Form>
  );
}
