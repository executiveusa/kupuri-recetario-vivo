"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFeaturedRecipes } from "@/data/recipes";
import HeroRecipeTile from "./HeroRecipeTile";
import HeroStatusChips from "./HeroStatusChips";
import HeroVoiceDock from "./HeroVoiceDock";

export default function AwwwardsCookbookHero() {
  const featured = getFeaturedRecipes();
  const prefersReduced = useReducedMotion();

  const fadeUp = (delay: number) =>
    prefersReduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
          },
        };

  return (
    <section
      className="relative min-h-screen w-full bg-[#050505] overflow-hidden"
      aria-label="Recetario Vivo: Come Bien con 70 Pesos al Día"
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(196,71,45,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 min-h-screen flex flex-col">
        {/* Main content area — vertical on mobile, side-by-side on desktop */}
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* ===== LEFT: Text Content ===== */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl lg:max-w-xl">
            {/* Eyebrow */}
            <motion.p
              {...fadeUp(0.1)}
              className="text-[#E9B949] text-xs sm:text-sm font-[Lato] font-semibold uppercase tracking-[0.2em] mb-4 md:mb-6"
            >
              Recetario Vivo presenta
            </motion.p>

            {/* Title */}
            <motion.h1
              {...fadeUp(0.2)}
              className={cn(
                "font-[Raleway] font-extrabold tracking-tight text-white",
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                "leading-[1.05]"
              )}
            >
              Come Bien con{" "}
              <span className="text-[#E9B949]">70 Pesos</span> al
              D&iacute;a
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.35)}
              className={cn(
                "mt-5 md:mt-7 text-white/60 font-[Lato] leading-relaxed",
                "text-sm sm:text-base md:text-lg max-w-lg"
              )}
            >
              Convierte un libro de cocina en una experiencia interactiva:
              p&aacute;ginas animadas, fotos, recetas guiadas y una voz que
              cocina contigo.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.5)}
              className="mt-7 md:mt-9 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
            >
              <Link
                href="/recetas"
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3.5 rounded-full",
                  "bg-[#C4472D] text-white font-[Raleway] font-bold text-sm",
                  "hover:bg-[#A83B26] active:bg-[#7A2E22]",
                  "transition-colors duration-200",
                  "focus-visible:ring-2 focus-visible:ring-[#E9B949] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
                  "shadow-lg shadow-[#C4472D]/25"
                )}
              >
                Explorar recetas
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/voz"
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3.5 rounded-full",
                  "border border-white/20 text-white font-[Raleway] font-bold text-sm",
                  "hover:bg-white/10 hover:border-white/30",
                  "transition-colors duration-200",
                  "focus-visible:ring-2 focus-visible:ring-[#E9B949] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                )}
              >
                Cocinar con voz
              </Link>
            </motion.div>

            {/* Flipbook link */}
            <motion.div {...fadeUp(0.6)} className="mt-4">
              <Link
                href="/libro"
                className={cn(
                  "inline-flex items-center gap-1.5 text-white/40 text-xs font-[Lato]",
                  "hover:text-white/70 transition-colors duration-200",
                  "focus-visible:ring-2 focus-visible:ring-[#E9B949] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded"
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Abrir flipbook
              </Link>
            </motion.div>
          </div>

          {/* ===== RIGHT: Recipe Tile Grid ===== */}
          <div className="flex-1 w-full max-w-xl lg:max-w-2xl">
            {/* Mobile: horizontal scroll */}
            <div className="block lg:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
                {featured.map((recipe, i) => (
                  <div
                    key={recipe.slug}
                    className="flex-shrink-0 w-[140px] h-[140px] snap-center"
                  >
                    <HeroRecipeTile
                      title={recipe.hero.shortTitleEsMx}
                      colorAccent={recipe.hero.colorAccent}
                      slug={recipe.slug}
                      tilePosition="square"
                      index={i}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: masonry-style grid */}
            <div className="hidden lg:grid grid-cols-3 auto-rows-[140px] gap-3">
              {featured.map((recipe, i) => (
                <HeroRecipeTile
                  key={recipe.slug}
                  title={recipe.hero.shortTitleEsMx}
                  colorAccent={recipe.hero.colorAccent}
                  slug={recipe.slug}
                  tilePosition={recipe.hero.tilePosition ?? "square"}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===== BOTTOM: Status Chips + Voice Dock ===== */}
        <div className="mt-auto pt-10 md:pt-14 flex flex-col items-center gap-5">
          <motion.div {...fadeUp(0.8)}>
            <HeroStatusChips />
          </motion.div>

          <HeroVoiceDock />
        </div>
      </div>
    </section>
  );
}
