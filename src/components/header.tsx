"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogInIcon, LogOutIcon } from "lucide-react";

export function Header() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  return (
    <header className="flex justify-between items-center px-5 h-[60px] bg-neutral-900">
      <div className="font-mono text-2xl font-semibold tracking-wide text-pink-200 lowercase">
        Fit Week
      </div>
      <div>
        {session ? (
          <Button
            variant="destructive"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/");
                  },
                },
              });
            }}
          >
            <LogOutIcon />
            Sign Out
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href="/signin">
              <LogInIcon />
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
