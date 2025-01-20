'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname, useSearchParams } from 'next/navigation';

export function Header() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-2xl font-bold">
        {formatPathName(pathName, searchParams.get('day'), searchParams.get('date'))}
      </h1>
    </header>
  );
}

function formatPathName(
  pathName: string,
  day: string | null,
  date: string | null
): string {
  switch (pathName.toLowerCase()) {
    case '/exercises/new':
      return 'Add Exercise';
    case '/exercises':
      return 'Exercises';
    case '/log':
      return 'Log Your Day';
    case '/plan':
      return 'The Plan';
    case '/log/view':
      if (date)
        return `Log for ${new Date(date).toLocaleDateString('default', { dateStyle: 'full' })}`;
      return 'Log View';
    case '/plan/view':
      if (day) {
        return `${day.charAt(0).toUpperCase() + day.slice(1)} Plan`;
      }
      return `Your Plan`;
    default:
      return 'gymJot';
  }
}
