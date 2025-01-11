"use client";

import { Button } from "@/components/ui/button";
import { SquareChevronLeft } from "lucide-react";

export function BackButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="cursor-pointer group"
      onClick={() => window.history.back()}
    >
      <span className="transition-transform duration-300 ease-in-out group-hover:rotate-180">
        <SquareChevronLeft className="w-4 h-4" />
      </span>
      back
    </Button>
  );
}
