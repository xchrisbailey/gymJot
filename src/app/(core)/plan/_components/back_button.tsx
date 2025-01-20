'use client';

import { Button } from '@/components/ui/button';
import { SquareChevronLeft } from 'lucide-react';

export function BackButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="group cursor-pointer"
      onClick={() => window.history.back()}
    >
      <span className="transition-transform duration-300 ease-in-out group-hover:rotate-180">
        <SquareChevronLeft className="h-4 w-4" />
      </span>
      back
    </Button>
  );
}
