'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ActionState } from '@/types';
import { useActionState, useRef } from 'react';
import { generateExercise } from '../_actions';

export default function NewExerciseForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    generateExercise,
    {
      error: '',
    }
  );

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div>
        <Label>
          Exercise Name
          <Input type="text" name="prompt" />
        </Label>
      </div>

      {state.error && state.error}

      <Button type="submit" disabled={pending}>
        {pending ? 'Generating...' : 'Generate'}
      </Button>
    </form>
  );
}
