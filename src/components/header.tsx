import { Button } from "./ui/button";
import Link from "next/link";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signOutAction } from "@/app/(auth)/_actions";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="flex justify-between items-center px-5 h-[60px] bg-neutral-900">
      <div className="font-mono text-2xl font-semibold tracking-wide text-pink-200 lowercase">
        gym<em>Jot</em>
      </div>
      <div>
        {session ? (
          <form method="POST" action={signOutAction}>
            <Button variant="destructive">
              <LogOutIcon />
              Sign Out
            </Button>
          </form>
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
