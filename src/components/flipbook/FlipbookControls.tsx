"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageTurnSoundToggle from "./PageTurnSoundToggle";

export interface FlipbookControlsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export default function FlipbookControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  className,
}: FlipbookControlsProps) {
  const isFirst = currentPage <= 0;
  const isLast = currentPage >= totalPages - 1;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 py-3 px-4 rounded-xl",
        "bg-[#1F1B16]/80 backdrop-blur-sm",
        className
      )}
    >
      {/* Previous button */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Pagina anterior"
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
          isFirst
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "bg-white/15 text-[#F8F1E4] hover:bg-white/25 hover:scale-105 active:scale-95"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page display */}
      <div className="flex items-center gap-2 min-w-[120px] justify-center">
        <span
          className="text-sm font-medium tabular-nums"
          style={{ color: "#E9B949" }}
        >
          {currentPage + 1}
        </span>
        <span className="text-xs" style={{ color: "#A89B7E" }}>
          /
        </span>
        <span
          className="text-sm tabular-nums"
          style={{ color: "#A89B7E" }}
        >
          {totalPages}
        </span>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={isLast}
        aria-label="Siguiente pagina"
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
          isLast
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "bg-white/15 text-[#F8F1E4] hover:bg-white/25 hover:scale-105 active:scale-95"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-white/20 mx-1" />

      {/* Sound toggle */}
      <PageTurnSoundToggle />
    </div>
  );
}
