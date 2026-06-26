"use client";

import { useState, useCallback } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecipeIngredient } from "@/lib/types";

interface IngredientChecklistProps {
  ingredients: RecipeIngredient[];
}

export default function IngredientChecklist({
  ingredients,
}: IngredientChecklistProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleChecked = useCallback((index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-1">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-[#EFE2C6] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5E7C47] rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${ingredients.length > 0 ? (checkedCount / ingredients.length) * 100 : 0}%`,
            }}
          />
        </div>
        <span className="text-xs font-[Lato] text-[#1F1B16]/50 tabular-nums shrink-0">
          {checkedCount}/{ingredients.length}
        </span>
      </div>

      {/* Ingredient list */}
      <ul className="space-y-1" role="list" aria-label="Lista de ingredientes">
        {ingredients.map((ingredient, i) => {
          const isChecked = !!checked[i];

          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggleChecked(i)}
                className={cn(
                  "w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left",
                  "transition-all duration-200",
                  "hover:bg-[#F8F1E4] active:bg-[#EFE2C6]",
                  "focus-visible:ring-2 focus-visible:ring-[#C4472D] focus-visible:ring-offset-1",
                  isChecked && "opacity-50"
                )}
                aria-pressed={isChecked}
                aria-label={`${ingredient.esMx} — ${isChecked ? "completado" : "pendiente"}`}
              >
                {/* Checkbox */}
                <span
                  className={cn(
                    "flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center",
                    "transition-all duration-200",
                    isChecked
                      ? "bg-[#5E7C47] border-[#5E7C47]"
                      : "border-[#1F1B16]/20 bg-white"
                  )}
                >
                  {isChecked && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </span>

                {/* Ingredient text */}
                <span className="flex-1 min-w-0">
                  <span
                    className={cn(
                      "block font-[Lora] text-sm text-[#1F1B16] leading-snug",
                      isChecked && "line-through"
                    )}
                  >
                    {/* Highlight amount */}
                    {ingredient.amount && (
                      <span className="font-bold text-[#C4472D] mr-1">
                        {ingredient.amount}
                      </span>
                    )}
                    {ingredient.esMx.replace(
                      ingredient.amount ? `${ingredient.amount} ` : "",
                      ingredient.amount ? "" : ""
                    )}
                  </span>

                  {/* English in parentheses */}
                  <span className="block text-xs text-[#1F1B16]/40 font-[Lato] mt-0.5">
                    ({ingredient.originalEn})
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
