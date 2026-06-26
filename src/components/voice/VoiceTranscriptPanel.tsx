"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface TranscriptEntry {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
}

export interface VoiceTranscriptPanelProps {
  entries: TranscriptEntry[];
  className?: string;
}

export default function VoiceTranscriptPanel({
  entries,
  className,
}: VoiceTranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom when new entries arrive */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [entries.length]);

  if (entries.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-4 rounded-lg",
          "bg-[#F8F1E4]/50 min-h-[120px]",
          className
        )}
      >
        <p className="text-sm italic" style={{ color: "#A89B7E" }}>
          El historial de voz aparecera aqui...
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex flex-col gap-2 p-3 rounded-lg overflow-y-auto",
        "bg-[#F8F1E4]/50 max-h-[300px] min-h-[120px]",
        className
      )}
    >
      {entries.map((entry) => (
        <div
          key={entry.id}
          className={cn(
            "flex flex-col gap-0.5 px-3 py-2 rounded-lg max-w-[85%] text-sm",
            entry.role === "user"
              ? "self-end bg-[#7A2E22]/10 text-[#1F1B16]"
              : "self-start bg-[#5E7C47]/10 text-[#1F1B16]"
          )}
        >
          <span
            className="text-xs font-semibold"
            style={{
              color: entry.role === "user" ? "#C4472D" : "#5E7C47",
            }}
          >
            {entry.role === "user" ? "Tu:" : "Asistente:"}
          </span>
          <span className="leading-snug">{entry.text}</span>
          <span className="text-xs self-end mt-0.5" style={{ color: "#A89B7E" }}>
            {new Date(entry.timestamp).toLocaleTimeString("es-MX", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
