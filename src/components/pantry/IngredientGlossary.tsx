"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Search, BookOpen } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Glossary data                                                      */
/* ------------------------------------------------------------------ */

interface GlossaryEntry {
  esMx: string;
  en: string;
  category?: string;
}

const glossary: GlossaryEntry[] = [
  { esMx: "Aceite", en: "Oil", category: "Grasas" },
  { esMx: "Aguacate", en: "Avocado", category: "Frutas" },
  { esMx: "Ajo", en: "Garlic", category: "Verduras" },
  { esMx: "Apio", en: "Celery", category: "Verduras" },
  { esMx: "Arroz", en: "Rice", category: "Granos" },
  { esMx: "Atun", en: "Tuna", category: "Proteinas" },
  { esMx: "Avena", en: "Oats", category: "Granos" },
  { esMx: "Azucar", en: "Sugar", category: "Endulzantes" },
  { esMx: "Calabacita", en: "Zucchini", category: "Verduras" },
  { esMx: "Canela", en: "Cinnamon", category: "Especias" },
  { esMx: "Cebolla", en: "Onion", category: "Verduras" },
  { esMx: "Chayote", en: "Chayote", category: "Verduras" },
  { esMx: "Chile serrano", en: "Serrano chile", category: "Chiles" },
  { esMx: "Chile de arbol", en: "Arbol chile", category: "Chiles" },
  { esMx: "Chile guajillo", en: "Guajillo chile", category: "Chiles" },
  { esMx: "Chile ancho", en: "Ancho chile", category: "Chiles" },
  { esMx: "Chile chipotle", en: "Chipotle chile", category: "Chiles" },
  { esMx: "Cilantro", en: "Cilantro / Coriander", category: "Hierbas" },
  { esMx: "Col", en: "Cabbage", category: "Verduras" },
  { esMx: "Comino", en: "Cumin", category: "Especias" },
  { esMx: "Crema", en: "Mexican sour cream", category: "Lacteos" },
  { esMx: "Epazote", en: "Epazote (Mexican herb)", category: "Hierbas" },
  { esMx: "Fideo", en: "Thin noodles", category: "Pastas" },
  { esMx: "Frijoles", en: "Beans", category: "Legumbres" },
  { esMx: "Harina de maiz", en: "Masa harina (corn flour)", category: "Granos" },
  { esMx: "Huevo", en: "Egg", category: "Proteinas" },
  { esMx: "Jitomate", en: "Tomato (red)", category: "Verduras" },
  { esMx: "Lentejas", en: "Lentils", category: "Legumbres" },
  { esMx: "Limon", en: "Lime (Mexican)", category: "Frutas" },
  { esMx: "Mantequilla", en: "Butter", category: "Grasas" },
  { esMx: "Oregano", en: "Oregano", category: "Hierbas" },
  { esMx: "Papa", en: "Potato", category: "Verduras" },
  { esMx: "Pasta", en: "Pasta", category: "Pastas" },
  { esMx: "Piloncillo", en: "Unrefined cane sugar", category: "Endulzantes" },
  { esMx: "Platano macho", en: "Plantain", category: "Frutas" },
  { esMx: "Pollo", en: "Chicken", category: "Proteinas" },
  { esMx: "Queso fresco", en: "Fresh cheese", category: "Lacteos" },
  { esMx: "Queso Oaxaca", en: "Oaxacan string cheese", category: "Lacteos" },
  { esMx: "Sal", en: "Salt", category: "Condimentos" },
  { esMx: "Salsa roja", en: "Red salsa", category: "Salsas" },
  { esMx: "Salsa verde", en: "Green salsa (tomatillo)", category: "Salsas" },
  { esMx: "Tomate verde", en: "Tomatillo", category: "Verduras" },
  { esMx: "Tortilla de maiz", en: "Corn tortilla", category: "Granos" },
  { esMx: "Tortilla de harina", en: "Flour tortilla", category: "Granos" },
  { esMx: "Tostada", en: "Tostada (crispy tortilla)", category: "Granos" },
  { esMx: "Vinagre", en: "Vinegar", category: "Condimentos" },
  { esMx: "Zanahoria", en: "Carrot", category: "Verduras" },
];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function IngredientGlossary({
  className,
}: {
  className?: string;
}) {
  const [filter, setFilter] = useState("");

  /* Filter + group alphabetically */
  const grouped = useMemo(() => {
    const query = filter.toLowerCase().trim();
    const filtered = query
      ? glossary.filter(
          (g) =>
            g.esMx.toLowerCase().includes(query) ||
            g.en.toLowerCase().includes(query)
        )
      : glossary;

    const groups = new Map<string, GlossaryEntry[]>();
    for (const entry of filtered) {
      const letter = entry.esMx[0].toUpperCase();
      const list = groups.get(letter) ?? [];
      list.push(entry);
      groups.set(letter, list);
    }

    return Array.from(groups.entries()).sort(([a], [b]) =>
      a.localeCompare(b, "es")
    );
  }, [filter]);

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
        style={{ backgroundColor: "#E9B949" }}
      >
        <BookOpen className="w-5 h-5 text-[#1F1B16]" />
        <h2 className="text-base font-semibold text-[#1F1B16]">
          Glosario de Ingredientes
        </h2>
      </div>

      {/* Search */}
      <div className="px-4 pt-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#A89B7E" }}
          />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Buscar ingrediente..."
            className={cn(
              "w-full pl-9 pr-3 py-2.5 rounded-lg text-sm",
              "bg-white/70 border border-[#D4C5A0]",
              "text-[#1F1B16] placeholder:text-[#A89B7E]",
              "focus:outline-none focus:ring-2 focus:ring-[#E9B949]/40"
            )}
          />
        </div>
      </div>

      {/* Glossary list */}
      <div className="px-4 py-4 max-h-[500px] overflow-y-auto">
        {grouped.length === 0 && (
          <p className="text-sm italic text-center py-4" style={{ color: "#A89B7E" }}>
            No se encontraron ingredientes.
          </p>
        )}

        {grouped.map(([letter, entries]) => (
          <div key={letter} className="mb-4">
            <h3
              className="text-sm font-bold mb-2 sticky top-0 bg-[#F8F1E4] py-1"
              style={{ color: "#7A2E22" }}
            >
              {letter}
            </h3>
            <div className="space-y-1.5">
              {entries.map((entry) => (
                <div
                  key={entry.esMx}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-2 rounded-lg",
                    "bg-white/50 hover:bg-white/80 transition-colors"
                  )}
                >
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#1F1B16" }}
                    >
                      {entry.esMx}
                    </span>
                    <span className="text-xs" style={{ color: "#8B7355" }}>
                      {entry.en}
                    </span>
                  </div>
                  {entry.category && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: "#E9B949" + "20",
                        color: "#8B7355",
                      }}
                    >
                      {entry.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
