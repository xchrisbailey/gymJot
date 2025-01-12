'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';

const signUpSchema = v.pipe(
  v.object({
    firstName: v.pipe(v.string(), v.minLength(2)),
    lastName: v.pipe(v.string(), v.minLength(2)),
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(8)),
    passwordConfirmation: v.pipe(v.string(), v.minLength(8)),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['passwordConfirmation']],
      (input) => input.password === input.passwordConfirmation,
      'Passwords do not match'
    ),
    ['passwordConfirmation']
  )
);

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<v.InferOutput<typeof signUpSchema>>({
    resolver: valibotResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  async function onSubmit(data: v.InferOutput<typeof signUpSchema>) {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          router.push('/');
        },
        onError: (ctx) => {
          console.log('error', ctx.error);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your email" type="email" autoComplete="email" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="your first name" required {...field} autoComplete="given-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="your last name" required {...field} autoComplete="family-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="enter password" type="password" autoComplete="new-password" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Password Confirmation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    type="password"
                    autoComplete="new-password"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}
