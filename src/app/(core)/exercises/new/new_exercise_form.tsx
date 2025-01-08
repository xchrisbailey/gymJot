"use client";

import { useActionState, useRef } from "react";
import { newExercise } from "../_actions";
import { ActionState } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exerciseCategories, muscleGroups } from "@/lib/data";

export default function NewExerciseForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    newExercise,
    {
      error: "",
    },
  );

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div>
        <Label>
          Name
          <Input type="text" name="name" />
        </Label>
      </div>
      <div>
        <Label>
          Description
          <Textarea name="description" />
        </Label>
      </div>
      <div>
        <Label>
          Example Video
          <Input type="url" name="url" />
        </Label>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <Label>
            Category
            <Select name="category">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="category" />
              </SelectTrigger>
              <SelectContent>
                {exerciseCategories.map((category) => (
                  <SelectItem
                    value={category.toLowerCase()}
                    key={category.split(" ").join().toLowerCase()}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
        </div>
        <div className="w-full">
          <Label>
            Muscle Group
            <Select name="muscleGroup">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="muscle group" />
              </SelectTrigger>
              <SelectContent>
                {muscleGroups.map((muscleGroup) => (
                  <SelectItem
                    value={muscleGroup.toLowerCase()}
                    key={muscleGroup.split(" ").join().toLowerCase()}
                  >
                    {muscleGroup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
        </div>
      </div>

      {state.error && state.error}

      <Button type="submit" disabled={pending}>
        {pending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
