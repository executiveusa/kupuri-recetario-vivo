"use client";

import { useState, useMemo } from "react";
import { Search, X, Filter, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleRecipes, sections } from "@/data/recipes";
import { searchRecipes } from "@/lib/search";
import RecipeCard from "@/components/recipe/RecipeCard";
import { cn } from "@/lib/utils";

export default function RecetasPage() {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    sampleRecipes.forEach((r) => r.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredRecipes = useMemo(() => {
    let results = sampleRecipes;

    // Search filter
    if (query.trim()) {
      const searchResults = searchRecipes(query);
      results = searchResults.map((sr) => sr.recipe);
    }

    // Section filter
    if (activeSection) {
      results = results.filter((r) => r.section === activeSection);
    }

    // Tag filter
    if (activeTag) {
      results = results.filter((r) => r.tags.includes(activeTag));
    }

    return results;
  }, [query, activeSection, activeTag]);

  const clearFilters = () => {
    setQuery("");
    setActiveSection(null);
    setActiveTag(null);
  };

  const hasFilters = query || activeSection || activeTag;

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <div className="bg-[var(--color-paper)] border-b border-[var(--color-parchment)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-4">
            <ChefHat className="w-8 h-8 text-[var(--color-tomato)]" />
            <h1
              className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
            >
              Recetas
            </h1>
          </div>
          <p className="text-[var(--color-ink)]/60 max-w-2xl">
            Todas las recetas del libro, adaptadas para la cocina mexicana.
            Busca por nombre, ingrediente o etiqueta.
          </p>

          {/* Search bar */}
          <div className="relative mt-6 max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink)]/30"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar recetas, ingredientes..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-[var(--color-parchment)] text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-tomato)] focus:border-transparent transition-shadow shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-ink)]/30 hover:text-[var(--color-ink)]/60 transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Sections */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-[var(--color-ink)]/40" />
            <button
              onClick={() => setActiveSection(null)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                !activeSection
                  ? "bg-[var(--color-ink)] text-white"
                  : "bg-[var(--color-paper)] text-[var(--color-ink)]/60 hover:bg-[var(--color-parchment)]"
              )}
              style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
            >
              Todas
            </button>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() =>
                  setActiveSection(
                    activeSection === section.id ? null : section.id
                  )
                }
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  activeSection === section.id
                    ? "bg-[var(--color-tomato)] text-white"
                    : "bg-[var(--color-paper)] text-[var(--color-ink)]/60 hover:bg-[var(--color-parchment)]"
                )}
                style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
              >
                {section.titleEsMx}
              </button>
            ))}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setActiveTag(activeTag === tag ? null : tag)
                }
                className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all",
                  activeTag === tag
                    ? "bg-[var(--color-corn)] text-[var(--color-ink)]"
                    : "bg-[var(--color-parchment)]/50 text-[var(--color-ink)]/40 hover:text-[var(--color-ink)]/60 hover:bg-[var(--color-parchment)]"
                )}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Active filters indicator */}
          {hasFilters && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-ink)]/40">
                {filteredRecipes.length} receta
                {filteredRecipes.length !== 1 ? "s" : ""} encontrada
                {filteredRecipes.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={clearFilters}
                className="text-xs text-[var(--color-tomato)] hover:text-[var(--color-chile)] font-medium transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Recipe grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe, i) => (
              <motion.div
                key={recipe.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredRecipes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ChefHat className="w-12 h-12 text-[var(--color-ink)]/15 mb-4" />
            <p className="text-lg font-medium text-[var(--color-ink)]/40 mb-2">
              No se encontraron recetas
            </p>
            <p className="text-sm text-[var(--color-ink)]/30 mb-4">
              Intenta con otra búsqueda o cambia los filtros
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-[var(--color-tomato)] hover:text-[var(--color-chile)] font-medium transition-colors"
            >
              Ver todas las recetas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
