"use client";

import Link from "next/link";
import { Mic } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HeroVoiceDock() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0 : 0.6,
        delay: prefersReduced ? 0 : 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="w-full flex justify-center"
    >
      <Link
        href="/voz"
        className={cn(
          "group inline-flex items-center gap-3 px-5 py-3 rounded-2xl",
          "bg-white/5 backdrop-blur-md border border-white/10",
          "hover:bg-white/10 hover:border-white/20",
          "transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-[#C4472D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        )}
      >
        {/* Pulsing mic icon */}
        <span className="relative flex items-center justify-center">
          <span
            className={cn(
              "absolute inset-0 rounded-full bg-[#C4472D]/30",
              !prefersReduced && "animate-ping"
            )}
            style={{ animationDuration: "2s" }}
          />
          <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#C4472D]/80">
            <Mic className="w-4 h-4 text-white" />
          </span>
        </span>

        {/* Text */}
        <span className="flex flex-col items-start">
          <span className="text-white/50 text-[10px] font-[Lato] uppercase tracking-wider leading-none mb-0.5">
            Prueba decir
          </span>
          <span className="text-white/90 text-sm font-[Lato] font-medium leading-tight">
            &ldquo;Busca recetas con huevo&rdquo;
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
