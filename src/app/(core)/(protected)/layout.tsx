import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { ReactNode } from 'react';

export async function Protectedlayout(props: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) unauthorized();

  return <>{props.children}</>;
}
