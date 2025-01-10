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

export default function AddExerciseToPlanForm({
  exercisesPromise,
  dayId,
}: Props) {
  const exercises = use(exercisesPromise);
  const [exerciseListOpen, setExerciseListOpen] = useState(false);
  const [exerciseId, setExerciseId] = useState<string>("");
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    addExerciseToPlanAction,
    {},
  );

  return (
    <Form action={formAction} className="space-y-4">
      <input type="hidden" name="dayId" value={dayId} />
      <div className="flex flex-col gap-2">
        {exercises && exercises.length > 0 ? (
          <>
            <Label htmlFor="exerciseName">Exercise</Label>
            <input type="hidden" name="exerciseId" value={exerciseId} />
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
            {state.issues?.["exerciseId"] && (
              <p className="text-sm font-semibold text-rose-600">
                {state.issues["exerciseId"][0]}
              </p>
            )}
          </>
        ) : (
          <div className="py-2 px-3 bg-yellow-100 rounded">
            <p>
              no exercises in database.{" "}
              <a href="/exercises/new" className="underline">
                start by adding some
              </a>
            </p>
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="sets">Sets</Label>
        <Input id="sets" type="number" name="sets" min={1} required />
        {state.issues?.["sets"] && (
          <p className="text-sm font-semibold text-rose-600">
            {state.issues["sets"][0]}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="reps">Reps</Label>
        <Input id="reps" type="number" name="reps" min={1} required />
        {state.issues?.["reps"] && (
          <p className="text-sm font-semibold text-rose-600">
            {state.issues["reps"][0]}
          </p>
        )}
      </div>

      {state.error && (
        <p className="p-2 my-2 text-base font-semibold text-rose-600 bg-rose-100 rounded">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Adding..." : "Add Exercise"}
      </Button>
    </Form>
  );
}
