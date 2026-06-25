"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceAssistant } from "@/lib/voice/useVoiceAssistant";
import type { ParsedCommand } from "@/lib/voice/commands";

export interface VoiceCommandButtonProps {
  /** Called when a command is recognized */
  onCommand?: (cmd: ParsedCommand) => void;
  /** Use a smaller size for embedding in recipe pages */
  compact?: boolean;
  className?: string;
}

export default function VoiceCommandButton({
  onCommand,
  compact = false,
  className,
}: VoiceCommandButtonProps) {
  const {
    isListening,
    startListening,
    stopListening,
    isSupported,
  } = useVoiceAssistant({
    lang: "es-MX",
    continuous: false,
    onCommand,
  });

  const toggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) return null;

  const size = compact ? "w-10 h-10" : "w-14 h-14";
  const iconSize = compact ? "w-4 h-4" : "w-6 h-6";

  return (
    <div className={cn("relative inline-flex", className)}>
      {/* Pulse ring when listening */}
      <AnimatePresence>
        {isListening && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-[#C4472D]/30"
            )}
          />
        )}
      </AnimatePresence>

      {/* Second pulse ring (offset) */}
      <AnimatePresence>
        {isListening && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.4,
            }}
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-[#C4472D]/20"
            )}
          />
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        aria-label={isListening ? "Dejar de escuchar" : "Activar microfono"}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full",
          "transition-all duration-200 shadow-lg",
          size,
          isListening
            ? "bg-[#C4472D] text-white hover:bg-[#A03823]"
            : "bg-[#7A2E22] text-[#F8F1E4] hover:bg-[#5E2219] hover:scale-105"
        )}
      >
        {isListening ? (
          <MicOff className={iconSize} />
        ) : (
          <Mic className={iconSize} />
        )}
      </button>
    </div>
  );
}
