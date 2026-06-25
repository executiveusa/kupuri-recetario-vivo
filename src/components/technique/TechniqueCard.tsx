"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChefHat } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface Technique {
  id: string;
  titleEsMx: string;
  titleEn: string;
  descriptionEsMx: string;
  difficulty: "basico" | "intermedio" | "avanzado";
  relatedRecipes: string[];
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function TechniqueCard({
  technique,
  className,
}: {
  technique: Technique;
  className?: string;
}) {
  const difficultyConfig = {
    basico: { label: "Basico", color: "#5E7C47", bg: "#5E7C47" },
    intermedio: { label: "Intermedio", color: "#E9B949", bg: "#E9B949" },
    avanzado: { label: "Avanzado", color: "#C4472D", bg: "#C4472D" },
  };

  const diff = difficultyConfig[technique.difficulty];

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl p-4 border",
        "bg-[#F8F1E4] border-[#D4C5A0]",
        "hover:shadow-lg transition-shadow",
        className
      )}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
          style={{ backgroundColor: diff.bg + "20" }}
        >
          <ChefHat className="w-5 h-5" style={{ color: diff.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-base font-bold leading-snug"
            style={{ color: "#1F1B16" }}
          >
            {technique.titleEsMx}
          </h3>
          <p className="text-xs italic" style={{ color: "#8B7355" }}>
            {technique.titleEn}
          </p>
        </div>
      </div>

      {/* Difficulty badge */}
      <div className="mt-2">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: diff.bg + "18",
            color: diff.color,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: diff.color }}
          />
          {diff.label}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm mt-3 leading-relaxed"
        style={{ color: "#1F1B16" }}
      >
        {technique.descriptionEsMx}
      </p>

      {/* Related recipes */}
      {technique.relatedRecipes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#D4C5A0]">
          <p className="text-xs font-medium mb-1.5" style={{ color: "#8B7355" }}>
            Recetas relacionadas:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {technique.relatedRecipes.map((r) => (
              <span
                key={r}
                className="text-xs px-2 py-0.5 rounded-full bg-[#7A2E22]/8 text-[#7A2E22]"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
