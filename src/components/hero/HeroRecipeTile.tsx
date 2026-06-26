"use client";

import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RecipeHeroMeta } from "@/lib/types";

const accentGradients: Record<RecipeHeroMeta["colorAccent"], string> = {
  tomato: "from-[#C4472D] via-[#E06449] to-[#7A2E22]",
  corn: "from-[#E9B949] via-[#F0D080] to-[#C49830]",
  herb: "from-[#5E7C47] via-[#7FA35E] to-[#3D5A2C]",
  chile: "from-[#7A2E22] via-[#9C4435] to-[#4A1A14]",
  paper: "from-[#F8F1E4] via-[#EFE2C6] to-[#DDD0B3]",
};

const tileSpanMap: Record<string, string> = {
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  square: "col-span-1 row-span-1",
};

interface HeroRecipeTileProps {
  title: string;
  colorAccent: RecipeHeroMeta["colorAccent"];
  slug: string;
  tilePosition: "wide" | "tall" | "square";
  index?: number;
}

export default function HeroRecipeTile({
  title,
  colorAccent,
  slug,
  tilePosition,
  index = 0,
}: HeroRecipeTileProps) {
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  const handleNavigate = () => {
    router.push(`/recetas/${slug}`);
  };

  return (
    <motion.button
      className={cn(
        "group relative overflow-hidden rounded-xl cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-[#C4472D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
        "min-h-[120px] md:min-h-[160px]",
        tileSpanMap[tilePosition]
      )}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleNavigate();
      }}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0 : 0.5,
        delay: prefersReduced ? 0 : index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={prefersReduced ? {} : { scale: 1.02 }}
      whileTap={prefersReduced ? {} : { scale: 0.98 }}
      aria-label={`Ver receta: ${title}`}
    >
      {/* Gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-500",
          accentGradients[colorAccent],
          "group-hover:brightness-110"
        )}
      />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.3),transparent_60%)]" />

      {/* Dark hover overlay */}
      <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/40 transition-all duration-300" />

      {/* Recipe name — revealed on hover */}
      <div className="absolute inset-0 flex items-end p-3 md:p-4">
        <motion.span
          className={cn(
            "font-[Raleway] font-bold text-sm md:text-base text-white",
            "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
            "transition-all duration-300 ease-out",
            "drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          )}
        >
          {title}
        </motion.span>
      </div>
    </motion.button>
  );
}
