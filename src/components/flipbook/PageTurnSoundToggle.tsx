"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";
import {
  isPageTurnMuted,
  setPageTurnMuted,
} from "@/lib/audio/pageTurn";

export default function PageTurnSoundToggle({
  className,
}: {
  className?: string;
}) {
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return isPageTurnMuted();
  });

  const toggle = useCallback(() => {
    const next = !muted;
    setMuted(next);
    setPageTurnMuted(next);
  }, [muted]);

  return (
    <button
      onClick={toggle}
      aria-label={muted ? "Activar sonido" : "Silenciar sonido"}
      title={muted ? "Activar sonido de pagina" : "Silenciar sonido de pagina"}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
        "bg-white/15 hover:bg-white/25 hover:scale-105 active:scale-95",
        className
      )}
    >
      {muted ? (
        <VolumeX className="w-4 h-4 text-[#A89B7E]" />
      ) : (
        <Volume2 className="w-4 h-4 text-[#E9B949]" />
      )}
    </button>
  );
}
