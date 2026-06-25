import Link from "next/link";
import { Clock, DollarSign, Tag, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/lib/types";

const accentColors: Record<string, string> = {
  tomato: "bg-[#C4472D]",
  corn: "bg-[#E9B949]",
  herb: "bg-[#5E7C47]",
  chile: "bg-[#7A2E22]",
  paper: "bg-[#F8F1E4]",
};

const accentBorders: Record<string, string> = {
  tomato: "border-[#C4472D]/20",
  corn: "border-[#E9B949]/20",
  herb: "border-[#5E7C47]/20",
  chile: "border-[#7A2E22]/20",
  paper: "border-[#EFE2C6]/40",
};

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const accent = recipe.hero.colorAccent;
  const isLightAccent = accent === "corn" || accent === "paper";

  return (
    <Link
      href={`/recetas/${recipe.slug}`}
      className={cn(
        "group block rounded-2xl overflow-hidden bg-white border",
        "shadow-sm hover:shadow-xl",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1",
        "focus-visible:ring-2 focus-visible:ring-[#C4472D] focus-visible:ring-offset-2",
        accentBorders[accent]
      )}
    >
      {/* Colored accent header */}
      <div
        className={cn(
          "relative h-28 sm:h-32 overflow-hidden",
          accentColors[accent]
        )}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />

        {/* Recipe short title */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h3
            className={cn(
              "font-[Raleway] font-extrabold text-lg sm:text-xl text-center leading-tight",
              isLightAccent ? "text-[#1F1B16]" : "text-white"
            )}
          >
            {recipe.hero.shortTitleEsMx}
          </h3>
        </div>

        {/* Hook text */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
          <p
            className={cn(
              "text-[10px] sm:text-xs font-[Lato] leading-tight",
              isLightAccent ? "text-[#1F1B16]/60" : "text-white/70"
            )}
          >
            {recipe.hero.oneLineHookEsMx}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 sm:p-5">
        {/* Full title */}
        <h4 className="font-[Raleway] font-bold text-[#1F1B16] text-base sm:text-lg leading-snug mb-2 group-hover:text-[#C4472D] transition-colors duration-200">
          {recipe.titleEsMx}
        </h4>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-[#1F1B16]/50 text-xs font-[Lato] mb-3">
          {recipe.costPerServingMxn && (
            <span className="inline-flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              ${recipe.costPerServingMxn} MXN/porción
            </span>
          )}
          {recipe.yieldEsMx && (
            <span className="inline-flex items-center gap-1">
              <Users className="w-3 h-3" />
              {recipe.yieldEsMx}
            </span>
          )}
          {recipe.steps.length > 0 && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.steps.length} pasos
            </span>
          )}
        </div>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full",
                  "bg-[#F8F1E4] text-[#1F1B16]/60 text-[10px] font-[Lato] font-medium"
                )}
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
