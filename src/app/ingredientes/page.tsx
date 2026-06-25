"use client";

import { useState } from "react";
import { sampleRecipes, findRecipesByIngredients } from "@/data/recipes";
import RecipeCard from "@/components/recipe/RecipeCard";
import { Search } from "lucide-react";
import type { Recipe } from "@/lib/types";

function getAllIngredientEntries() {
  const map = new Map<string, { esMx: string; en: string; recipes: string[] }>();
  for (const recipe of sampleRecipes) {
    for (const ing of recipe.ingredients) {
      if (!ing.item) continue;
      const key = ing.item.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { esMx: ing.esMx, en: ing.originalEn, recipes: [] });
      }
      map.get(key)!.recipes.push(recipe.titleEsMx);
    }
  }
  return Array.from(map.entries())
    .map(([key, val]) => ({ key, ...val }))
    .sort((a, b) => a.esMx.localeCompare(b.esMx, "es-MX"));
}

export default function IngredientesPage() {
  const [pantryInput, setPantryInput] = useState("");
  const [pantryResults, setPantryResults] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState("");

  const allIngredients = getAllIngredientEntries();
  const filtered = filter
    ? allIngredients.filter(
        (i) =>
          i.esMx.toLowerCase().includes(filter.toLowerCase()) ||
          i.en.toLowerCase().includes(filter.toLowerCase())
      )
    : allIngredients;

  function handlePantrySearch() {
    const ingredients = pantryInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setPantryResults(findRecipesByIngredients(ingredients));
  }

  return (
    <main className="min-h-screen pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>
          Ingredientes
        </h1>
        <p className="text-lg mb-8" style={{ color: "#1F1B16", opacity: 0.7 }}>
          Glosario de ingredientes y rescate de despensa
        </p>

        <section className="mb-12 p-6 rounded-2xl" style={{ backgroundColor: "#FFF8EA" }}>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>
            🍳 Rescate de Despensa
          </h2>
          <p className="mb-4 text-sm" style={{ color: "#1F1B16", opacity: 0.7 }}>
            Escribe los ingredientes que tienes (separados por coma) y te sugiero recetas.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={pantryInput}
              onChange={(e) => setPantryInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePantrySearch()}
              placeholder="ej: huevo, frijoles, arroz, cebolla"
              className="flex-1 px-4 py-3 rounded-xl border-2 text-base focus:outline-none"
              style={{ borderColor: "#EFE2C6", backgroundColor: "white" }}
            />
            <button
              onClick={handlePantrySearch}
              className="px-6 py-3 rounded-xl font-semibold text-white transition-colors"
              style={{ backgroundColor: "#C4472D" }}
            >
              Buscar
            </button>
          </div>
          {pantryResults.length > 0 && (
            <div className="mt-6">
              <p className="font-semibold mb-3">
                {pantryResults.length} receta{pantryResults.length > 1 ? "s" : ""} encontrada{pantryResults.length > 1 ? "s" : ""}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pantryResults.map((r) => (
                  <RecipeCard key={r.slug} recipe={r} />
                ))}
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>
            Glosario de Ingredientes
          </h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#1F1B16", opacity: 0.4 }} />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filtrar ingredientes..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: "#EFE2C6", backgroundColor: "white" }}
            />
          </div>
          <div className="grid gap-3">
            {filtered.map((ing) => (
              <div
                key={ing.key}
                className="p-4 rounded-xl border"
                style={{ borderColor: "#EFE2C6", backgroundColor: "white" }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{ing.esMx.split(",")[0]}</span>
                  <span className="text-sm" style={{ color: "#1F1B16", opacity: 0.5 }}>
                    ({ing.en.split(",")[0]})
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "#5E7C47" }}>
                  Usado en: {ing.recipes.slice(0, 3).join(", ")}{ing.recipes.length > 3 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
