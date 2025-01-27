import { signOutAction } from '@/app/(auth)/_actions';
import { auth } from '@/lib/auth';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import Form from 'next/form';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Button } from './ui/button';

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="flex h-[60px] items-center justify-between bg-neutral-900 px-5">
      <div className="font-mono text-2xl font-semibold lowercase tracking-wide text-pink-200">
        gym<em>Jot</em>
      </div>
      <div>
        {session ? (
          <Form action={signOutAction}>
            <Button variant="destructive">
              <LogOutIcon />
              Sign Out
            </Button>
          </Form>
        ) : (
          <Button asChild variant="secondary">
            <Link href="/sign-in">
              <LogInIcon />
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
