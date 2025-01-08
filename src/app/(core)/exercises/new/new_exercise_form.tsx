"use client";

import { useActionState, useRef } from "react";
import { newExercise } from "../_actions";
import { ActionState } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

      {state.error && state.error}

      <Button type="submit" disabled={pending}>
        {pending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
