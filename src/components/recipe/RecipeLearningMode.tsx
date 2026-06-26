"use client";

import {
  BookOpen,
  DollarSign,
  Lightbulb,
  Tag,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Recipe, RecipeTip } from "@/lib/types";
import IngredientChecklist from "./IngredientChecklist";

const tipIcons: Record<RecipeTip["type"], React.ReactNode> = {
  budget: <DollarSign className="w-4 h-4 text-[#E9B949]" />,
  substitution: <Tag className="w-4 h-4 text-[#5E7C47]" />,
  technique: <Lightbulb className="w-4 h-4 text-[#C4472D]" />,
  safety: <Lightbulb className="w-4 h-4 text-[#7A2E22]" />,
  commentary: <BookOpen className="w-4 h-4 text-[#1F1B16]/50" />,
};

const tipLabels: Record<RecipeTip["type"], string> = {
  budget: "Ahorra",
  substitution: "Sustitución",
  technique: "Técnica",
  safety: "Seguridad",
  commentary: "Nota",
};

interface RecipeLearningModeProps {
  recipe: Recipe;
}

export default function RecipeLearningMode({
  recipe,
}: RecipeLearningModeProps) {
  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-8 md:mb-10">
        <p className="text-[#C4472D] text-xs font-[Lato] font-semibold uppercase tracking-[0.15em] mb-2">
          {recipe.section}
        </p>
        <h1 className="font-[Raleway] font-extrabold text-[#1F1B16] text-3xl sm:text-4xl md:text-5xl leading-[1.1] mb-3">
          {recipe.titleEsMx}
        </h1>
        <p className="font-[Lato] text-[#1F1B16]/50 text-sm">
          {recipe.titleEn}
        </p>
      </header>

      {/* Cost & yield strip */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-xl bg-[#EFE2C6]/50 border border-[#EFE2C6]">
        {recipe.totalCostMxn && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#5E7C47]" />
            <div>
              <p className="font-[Raleway] font-bold text-[#1F1B16] text-lg leading-none">
                ${recipe.totalCostMxn} MXN
              </p>
              {recipe.totalCostUsd && (
                <p className="font-[Lato] text-[#1F1B16]/40 text-xs mt-0.5">
                  ~${recipe.totalCostUsd} USD
                </p>
              )}
            </div>
          </div>
        )}
        {recipe.costPerServingMxn && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#5E7C47]" />
            <div>
              <p className="font-[Raleway] font-bold text-[#1F1B16] text-lg leading-none">
                ${recipe.costPerServingMxn}/porción
              </p>
              {recipe.yieldEsMx && (
                <p className="font-[Lato] text-[#1F1B16]/40 text-xs mt-0.5">
                  {recipe.yieldEsMx}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Commentary */}
      <div className="mb-10">
        <p className="font-[Lora] text-[#1F1B16] text-base sm:text-lg leading-relaxed italic">
          &ldquo;{recipe.commentaryEsMx}&rdquo;
        </p>
      </div>

      {/* Ingredients */}
      <section className="mb-10" aria-labelledby="ingredients-heading">
        <h2
          id="ingredients-heading"
          className="font-[Raleway] font-bold text-[#1F1B16] text-xl mb-4 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-[#5E7C47]/10 flex items-center justify-center">
            <Tag className="w-4 h-4 text-[#5E7C47]" />
          </span>
          Ingredientes
        </h2>
        <IngredientChecklist ingredients={recipe.ingredients} />
      </section>

      {/* Steps */}
      <section className="mb-10" aria-labelledby="steps-heading">
        <h2
          id="steps-heading"
          className="font-[Raleway] font-bold text-[#1F1B16] text-xl mb-6 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-[#C4472D]/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-[#C4472D]" />
          </span>
          Preparación
        </h2>
        <ol className="space-y-6">
          {recipe.steps.map((step) => {
            // Find tips related to this step position (show after certain steps)
            const inlineTip =
              recipe.tips.length > 0
                ? recipe.tips[step.order - 1]
                : undefined;

            return (
              <li key={step.order} className="flex gap-4">
                {/* Step number */}
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                    "bg-[#C4472D] text-white font-[Raleway] font-bold text-sm"
                  )}
                >
                  {step.order}
                </span>

                <div className="flex-1 pt-1">
                  <p className="font-[Lora] text-[#1F1B16] text-base leading-relaxed">
                    {step.textEsMx}
                  </p>
                  <p className="font-[Lato] text-[#1F1B16]/40 text-sm mt-1">
                    {step.textEn}
                  </p>

                  {/* Timer badges */}
                  {step.timers && step.timers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {step.timers.map((timer) => (
                        <span
                          key={timer.label}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E9B949]/15 text-[#1F1B16]/70 text-xs font-[Lato] font-medium"
                        >
                          ⏱ {timer.label} —{" "}
                          {timer.seconds >= 60
                            ? `${Math.floor(timer.seconds / 60)} min`
                            : `${timer.seconds} seg`}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Inline tip */}
                  {inlineTip && (
                    <div className="mt-3 p-3 rounded-lg bg-[#FFF8EA] border border-[#E9B949]/20">
                      <div className="flex items-start gap-2">
                        {tipIcons[inlineTip.type]}
                        <div>
                          <p className="font-[Lato] font-semibold text-[#1F1B16] text-xs uppercase tracking-wide mb-0.5">
                            {tipLabels[inlineTip.type]}
                          </p>
                          <p className="font-[Lora] text-[#1F1B16]/70 text-sm leading-relaxed">
                            {inlineTip.textEsMx}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* All tips section */}
      {recipe.tips.length > 0 && (
        <section aria-labelledby="tips-heading">
          <h2
            id="tips-heading"
            className="font-[Raleway] font-bold text-[#1F1B16] text-xl mb-4 flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-[#E9B949]/15 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-[#E9B949]" />
            </span>
            Consejos
          </h2>
          <div className="space-y-3">
            {recipe.tips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#FFF8EA] border border-[#E9B949]/15"
              >
                {tipIcons[tip.type]}
                <div>
                  <p className="font-[Lato] font-semibold text-[#1F1B16] text-xs uppercase tracking-wide mb-0.5">
                    {tipLabels[tip.type]}
                  </p>
                  <p className="font-[Lora] text-[#1F1B16]/70 text-sm leading-relaxed">
                    {tip.textEsMx}
                  </p>
                  <p className="font-[Lato] text-[#1F1B16]/30 text-xs mt-1">
                    {tip.textEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
