"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Search, UtensilsCrossed, X } from "lucide-react";
import { findRecipesByIngredients } from "@/data/recipes";
import type { Recipe } from "@/lib/types";

export default function PantryRescue({ className }: { className?: string }) {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  /* Compute matches reactively */
  const matches: Recipe[] = useMemo(() => {
    if (ingredients.length === 0) return [];
    return findRecipesByIngredients(ingredients);
  }, [ingredients]);

  /* Parse input on submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length > 0) {
      setIngredients(parts);
    }
  };

  /* Add a single ingredient tag */
  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
    }
  };

  /* Remove a tag */
  const removeTag = (tag: string) => {
    setIngredients((prev) => prev.filter((t) => t !== tag));
  };

  /* Handle comma or Enter in input to add tag */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = input.trim().replace(/,$/, "");
      if (val) {
        addTag(val);
        setInput("");
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl overflow-hidden shadow-lg",
        "bg-[#F8F1E4] border border-[#D4C5A0]",
        className
      )}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ backgroundColor: "#5E7C47" }}
      >
        <UtensilsCrossed className="w-5 h-5 text-[#F8F1E4]" />
        <h2 className="text-base font-semibold text-[#F8F1E4]">
          Rescate de Alacena
        </h2>
      </div>

      {/* Input */}
      <div className="px-4 pt-4">
        <p className="text-sm mb-2" style={{ color: "#1F1B16" }}>
          Escribe los ingredientes que tienes y te sugerimos recetas:
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "#A89B7E" }}
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="huevos, tortillas, frijoles..."
              className={cn(
                "w-full pl-9 pr-3 py-2.5 rounded-lg text-sm",
                "bg-white/70 border border-[#D4C5A0]",
                "text-[#1F1B16] placeholder:text-[#A89B7E]",
                "focus:outline-none focus:ring-2 focus:ring-[#5E7C47]/30"
              )}
            />
          </div>
          <button
            type="submit"
            className={cn(
              "px-4 py-2.5 rounded-lg text-sm font-medium",
              "bg-[#5E7C47] text-white",
              "hover:bg-[#4D6A3A] transition-colors"
            )}
          >
            Buscar
          </button>
        </form>

        {/* Ingredient tags */}
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {ingredients.map((ing) => (
              <span
                key={ing}
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs",
                  "bg-[#5E7C47]/15 text-[#5E7C47] border border-[#5E7C47]/25"
                )}
              >
                {ing}
                <button
                  onClick={() => removeTag(ing)}
                  className="hover:text-[#C4472D] transition-colors"
                  aria-label={`Quitar ${ing}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={() => {
                setIngredients([]);
                setInput("");
              }}
              className="text-xs text-[#A89B7E] hover:text-[#C4472D] transition-colors"
            >
              Limpiar todo
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        {ingredients.length > 0 && matches.length === 0 && (
          <p className="text-sm italic text-center py-6" style={{ color: "#A89B7E" }}>
            No encontramos recetas con esos ingredientes. Intenta con otros.
          </p>
        )}

        {matches.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium" style={{ color: "#8B7355" }}>
              {matches.length} receta{matches.length !== 1 ? "s" : ""} encontrada
              {matches.length !== 1 ? "s" : ""}:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {matches.map((recipe) => (
                <RecipeMatchCard
                  key={recipe.slug}
                  recipe={recipe}
                  highlightIngredients={ingredients}
                />
              ))}
            </div>
          </div>
        )}

        {ingredients.length === 0 && (
          <p className="text-sm italic text-center py-6" style={{ color: "#A89B7E" }}>
            Agrega ingredientes para ver recetas sugeridas.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function RecipeMatchCard({
  recipe,
  highlightIngredients,
}: {
  recipe: Recipe;
  highlightIngredients: string[];
}) {
  const accentColors: Record<string, string> = {
    tomato: "#C4472D",
    corn: "#E9B949",
    herb: "#5E7C47",
    chile: "#7A2E22",
    paper: "#A89B7E",
  };
  const accent = accentColors[recipe.hero.colorAccent] ?? "#7A2E22";

  const matchedItems = recipe.ingredients.filter((ing) =>
    highlightIngredients.some(
      (ui) =>
        (ing.item && ing.item.toLowerCase().includes(ui.toLowerCase())) ||
        ing.esMx.toLowerCase().includes(ui.toLowerCase())
    )
  );

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl p-3 border",
        "bg-white/60 border-[#D4C5A0] hover:shadow-md transition-shadow"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          className="text-sm font-bold leading-snug"
          style={{ color: accent }}
        >
          {recipe.titleEsMx}
        </h3>
        {recipe.costPerServingMxn && (
          <span className="text-xs flex-shrink-0 px-1.5 py-0.5 rounded bg-[#E9B949]/20 text-[#8B7355]">
            ${recipe.costPerServingMxn}
          </span>
        )}
      </div>

      <p className="text-xs mt-1 line-clamp-2" style={{ color: "#1F1B16" }}>
        {recipe.commentaryEsMx}
      </p>

      {/* Matched ingredients */}
      {matchedItems.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {matchedItems.map((ing, i) => (
            <span
              key={i}
              className="text-xs px-1.5 py-0.5 rounded bg-[#5E7C47]/15 text-[#5E7C47]"
            >
              {ing.item ?? ing.esMx}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs" style={{ color: "#A89B7E" }}>
          {recipe.ingredients.length} ingredientes
        </span>
        <span className="text-xs" style={{ color: "#A89B7E" }}>
          &middot;
        </span>
        <span className="text-xs" style={{ color: "#A89B7E" }}>
          {recipe.steps.length} pasos
        </span>
      </div>
    </div>
  );
}
