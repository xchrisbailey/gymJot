"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname, useSearchParams } from "next/navigation";

export function Header() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <header className="flex gap-4 items-center px-4 h-16 shrink-0">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-2xl font-bold">
        {formatPathName(pathName, searchParams.get("day"))}
      </h1>
    </header>
  );
}

function formatPathName(pathName: string, day: string | null): string {
  switch (pathName.toLowerCase()) {
    case "/exercises/new":
      return "Add Exercise";
    case "/exercises":
      return "Exercises";
    case "/plan/view":
      if (day) {
        return `${day.charAt(0).toUpperCase() + day.slice(1)} Plan`;
      }
      return `Your Plan`;
    default:
      return "gymJot";
  }
}
