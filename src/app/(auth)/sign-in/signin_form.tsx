'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ActionState } from '@/types';
import { useActionState, useRef } from 'react';
import { signInAction } from '../_actions';
import { Label } from '@/components/ui/label';

export default function SignInForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(signInAction, {
    error: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div>
        <Label>Email</Label>
        <Input name="email" placeholder="your email" type="email" autoComplete="email" required />
        {state.issues?.email && <div className="text-sm text-rose-600">{state.issues.email[0]}</div>}
      </div>
      <div>
        <Label>Password</Label>
        <Input name="password" placeholder="your password" type="password" autoComplete="new-password" required />
        {state.issues?.password && <div className="text-sm text-rose-600">{state.issues.password[0]}</div>}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
}
