"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Flame,
  Clock,
  DollarSign,
  Users,
  Check,
  Lightbulb,
  AlertTriangle,
  RefreshCw,
  Mic,
  ChefHat,
} from "lucide-react";
import { getRecipeBySlug } from "@/data/recipes";
import LicenseAttribution from "@/components/license/LicenseAttribution";
import { cn } from "@/lib/utils";

type ViewMode = "libro" | "cocinar";

const tipIcons: Record<string, typeof Lightbulb> = {
  budget: DollarSign,
  substitution: RefreshCw,
  technique: Flame,
  safety: AlertTriangle,
  commentary: Lightbulb,
};

const tipColors: Record<string, string> = {
  budget: "bg-[#E9B949]/10 border-[#E9B949]/30 text-[#1F1B16]",
  substitution: "bg-[#5E7C47]/10 border-[#5E7C47]/30 text-[#1F1B16]",
  technique: "bg-[#C4472D]/10 border-[#C4472D]/30 text-[#1F1B16]",
  safety: "bg-red-50 border-red-200 text-red-900",
  commentary: "bg-[#F8F1E4] border-[#EFE2C6] text-[#1F1B16]",
};

function formatTimer(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins} min`;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const recipe = getRecipeBySlug(slug);
  const [mode, setMode] = useState<ViewMode>("libro");
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
    new Set()
  );
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set()
  );

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-cream)] px-4">
        <ChefHat className="w-16 h-16 text-[var(--color-ink)]/15 mb-4" />
        <h1
          className="text-2xl font-bold text-[var(--color-ink)] mb-2"
          style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
        >
          Receta no encontrada
        </h1>
        <p className="text-[var(--color-ink)]/50 mb-6">
          No pudimos encontrar la receta que buscas.
        </p>
        <Link
          href="/recetas"
          className="px-5 py-2.5 rounded-full bg-[var(--color-tomato)] text-white text-sm font-medium hover:bg-[var(--color-chile)] transition-colors no-underline"
        >
          Ver todas las recetas
        </Link>
      </div>
    );
  }

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleStep = (order: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(order)) next.delete(order);
      else next.add(order);
      return next;
    });
  };

  const totalTime = recipe.steps.reduce((acc, step) => {
    if (step.timers) {
      return acc + step.timers.reduce((t, timer) => t + timer.seconds, 0);
    }
    return acc;
  }, 0);

  const accentBg: Record<string, string> = {
    tomato: "bg-[#C4472D]",
    corn: "bg-[#E9B949]",
    herb: "bg-[#5E7C47]",
    chile: "bg-[#7A2E22]",
    paper: "bg-[#F8F1E4]",
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Hero banner */}
      <div
        className={cn(
          "relative overflow-hidden",
          accentBg[recipe.hero.colorAccent] || "bg-[#C4472D]"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16">
          {/* Back link */}
          <Link
            href="/recetas"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors no-underline mb-6"
          >
            <ArrowLeft size={16} />
            <span style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}>
              Recetas
            </span>
          </Link>

          <h1
            className="text-3xl sm:text-5xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            {recipe.titleEsMx}
          </h1>

          <p
            className="text-lg text-white/80 max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-lora), Lora, serif" }}
          >
            {recipe.hero.oneLineHookEsMx}
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {recipe.costPerServingMxn && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm">
                <DollarSign size={14} />
                ${recipe.costPerServingMxn} MXN/porción
              </span>
            )}
            {totalTime > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm">
                <Clock size={14} />
                {formatTimer(totalTime)}
              </span>
            )}
            {recipe.yieldEsMx && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm">
                <Users size={14} />
                {recipe.yieldEsMx}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="sticky top-14 z-20 bg-white/95 backdrop-blur-md border-b border-[var(--color-parchment)] shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex items-center gap-1 py-2">
          <button
            onClick={() => setMode("libro")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              mode === "libro"
                ? "bg-[var(--color-ink)] text-white shadow-md"
                : "text-[var(--color-ink)]/50 hover:bg-[var(--color-paper)]"
            )}
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            <BookOpen size={16} />
            Modo Libro
          </button>
          <button
            onClick={() => setMode("cocinar")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              mode === "cocinar"
                ? "bg-[var(--color-tomato)] text-white shadow-md"
                : "text-[var(--color-ink)]/50 hover:bg-[var(--color-paper)]"
            )}
            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
          >
            <Flame size={16} />
            Modo Cocinar
          </button>

          {/* Voice button */}
          <div className="ml-auto">
            <Link
              href={`/voz?receta=${recipe.slug}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--color-ink)]/50 hover:bg-[var(--color-paper)] transition-all no-underline"
            >
              <Mic size={16} />
              <span className="hidden sm:inline">Cocinar con voz</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {mode === "libro" ? (
            <motion.div
              key="libro"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Reading mode: beautiful recipe layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Commentary */}
                <div className="md:col-span-3">
                  <p
                    className="text-lg text-[var(--color-ink)]/70 leading-relaxed italic"
                    style={{ fontFamily: "var(--font-lora), Lora, serif" }}
                  >
                    {recipe.commentaryEsMx}
                  </p>
                </div>

                {/* Ingredients */}
                <div>
                  <h2
                    className="text-sm font-bold tracking-widest uppercase text-[var(--color-tomato)] mb-4"
                    style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                  >
                    Ingredientes
                  </h2>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="text-sm text-[var(--color-ink)]/70 leading-relaxed"
                        style={{ fontFamily: "var(--font-lora), Lora, serif" }}
                      >
                        {ing.amount && (
                          <span className="font-semibold text-[var(--color-ink)]">
                            {ing.amount}
                          </span>
                        )}{" "}
                        {ing.esMx.replace(ing.amount || "", "").trim() || ing.esMx}
                      </li>
                    ))}
                  </ul>

                  {/* Cost box */}
                  {recipe.totalCostMxn && (
                    <div className="mt-6 p-4 rounded-xl bg-[var(--color-paper)] border border-[var(--color-parchment)]">
                      <p className="text-xs font-bold tracking-widest uppercase text-[var(--color-ink)]/40 mb-1" style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}>
                        Costo Total
                      </p>
                      <p className="text-2xl font-bold text-[var(--color-ink)]">
                        ${recipe.totalCostMxn}{" "}
                        <span className="text-sm font-normal text-[var(--color-ink)]/40">
                          MXN
                        </span>
                      </p>
                      <p className="text-xs text-[var(--color-ink)]/40 mt-1">
                        Aprox. USD ${recipe.totalCostUsd}
                      </p>
                    </div>
                  )}
                </div>

                {/* Steps */}
                <div className="md:col-span-2">
                  <h2
                    className="text-sm font-bold tracking-widest uppercase text-[var(--color-tomato)] mb-4"
                    style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                  >
                    Preparación
                  </h2>
                  <ol className="space-y-6">
                    {recipe.steps.map((step) => (
                      <li key={step.order} className="flex gap-4">
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-parchment)] text-[var(--color-ink)] flex items-center justify-center text-xs font-bold"
                          style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                        >
                          {step.order}
                        </span>
                        <div className="flex-1">
                          <p
                            className="text-[var(--color-ink)]/80 leading-relaxed"
                            style={{ fontFamily: "var(--font-lora), Lora, serif" }}
                          >
                            {step.textEsMx}
                          </p>
                          {step.timers && step.timers.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {step.timers.map((timer, ti) => (
                                <span
                                  key={ti}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[var(--color-corn)]/15 text-[var(--color-ink)]/60 text-xs"
                                >
                                  <Clock size={11} />
                                  {timer.label}: {formatTimer(timer.seconds)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>

                  {/* Tips */}
                  {recipe.tips.length > 0 && (
                    <div className="mt-8 space-y-3">
                      <h2
                        className="text-sm font-bold tracking-widest uppercase text-[var(--color-corn)] mb-3"
                        style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                      >
                        Consejos
                      </h2>
                      {recipe.tips.map((tip, i) => {
                        const Icon = tipIcons[tip.type] || Lightbulb;
                        return (
                          <div
                            key={i}
                            className={cn(
                              "flex gap-3 p-3 rounded-lg border",
                              tipColors[tip.type]
                            )}
                          >
                            <Icon size={16} className="flex-shrink-0 mt-0.5 opacity-60" />
                            <p
                              className="text-sm leading-relaxed"
                              style={{ fontFamily: "var(--font-lora), Lora, serif" }}
                            >
                              {tip.textEsMx}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cocinar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Cooking mode: interactive checklists */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Ingredients checklist */}
                <div>
                  <h2
                    className="text-sm font-bold tracking-widest uppercase text-[var(--color-tomato)] mb-4"
                    style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                  >
                    Ingredientes
                  </h2>
                  <div className="space-y-1">
                    {recipe.ingredients.map((ing, i) => (
                      <button
                        key={i}
                        onClick={() => toggleIngredient(i)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
                          checkedIngredients.has(i)
                            ? "bg-[var(--color-herb)]/10"
                            : "hover:bg-[var(--color-paper)]"
                        )}
                      >
                        <span
                          className={cn(
                            "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                            checkedIngredients.has(i)
                              ? "bg-[var(--color-herb)] border-[var(--color-herb)]"
                              : "border-[var(--color-parchment)]"
                          )}
                        >
                          {checkedIngredients.has(i) && (
                            <Check size={12} className="text-white" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-sm transition-all",
                            checkedIngredients.has(i)
                              ? "line-through text-[var(--color-ink)]/30"
                              : "text-[var(--color-ink)]/70"
                          )}
                        >
                          {ing.esMx}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-[var(--color-ink)]/30 mt-4">
                    {checkedIngredients.size} de {recipe.ingredients.length}{" "}
                    ingredientes listos
                  </p>
                </div>

                {/* Steps with completion */}
                <div className="md:col-span-2">
                  <h2
                    className="text-sm font-bold tracking-widest uppercase text-[var(--color-tomato)] mb-4"
                    style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                  >
                    Pasos
                  </h2>
                  <div className="space-y-4">
                    {recipe.steps.map((step) => {
                      const isDone = completedSteps.has(step.order);
                      return (
                        <button
                          key={step.order}
                          onClick={() => toggleStep(step.order)}
                          className={cn(
                            "w-full flex gap-4 p-4 rounded-xl text-left transition-all border",
                            isDone
                              ? "bg-[var(--color-herb)]/5 border-[var(--color-herb)]/20"
                              : "bg-white border-[var(--color-parchment)] hover:border-[var(--color-corn)] hover:shadow-sm"
                          )}
                        >
                          <span
                            className={cn(
                              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                              isDone
                                ? "bg-[var(--color-herb)] text-white"
                                : "bg-[var(--color-parchment)] text-[var(--color-ink)]"
                            )}
                            style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                          >
                            {isDone ? <Check size={16} /> : step.order}
                          </span>
                          <div className="flex-1">
                            <p
                              className={cn(
                                "leading-relaxed transition-all",
                                isDone
                                  ? "text-[var(--color-ink)]/30 line-through"
                                  : "text-[var(--color-ink)]/80"
                              )}
                              style={{ fontFamily: "var(--font-lora), Lora, serif" }}
                            >
                              {step.textEsMx}
                            </p>
                            {step.timers &&
                              step.timers.length > 0 &&
                              !isDone && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {step.timers.map((timer, ti) => (
                                    <span
                                      key={ti}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-tomato)]/10 text-[var(--color-tomato)] text-xs font-medium"
                                    >
                                      <Clock size={11} />
                                      {timer.label}: {formatTimer(timer.seconds)}
                                    </span>
                                  ))}
                                </div>
                              )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-[var(--color-ink)]/30 mt-4">
                    {completedSteps.size} de {recipe.steps.length} pasos
                    completados
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Attribution */}
        <div className="mt-12 pt-8 border-t border-[var(--color-parchment)]">
          <LicenseAttribution size="compact" />
        </div>
      </div>
    </div>
  );
}
