"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const schema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<v.InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: v.InferOutput<typeof schema>) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          console.log("logged in");
        },
        onError: (ctx) => {
          console.log("error", ctx.error);
        },
      },
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
                <Input
                  placeholder="your email"
                  type="email"
                  autoComplete="email"
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="your password"
                type="password"
                autoComplete="new-password"
                required
                {...field}
              />
            </FormItem>
          )}
        />
        <FormMessage />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
