"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { sampleRecipes, sections } from "@/data/recipes";
import { playPageTurn } from "@/lib/audio/pageTurn";
import FlipbookPage from "./FlipbookPage";
import FlipbookControls from "./FlipbookControls";
import type { Recipe } from "@/lib/types";

/* react-pageflip is browser-only, so we dynamically import it */
const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center"
      style={{ width: 550, height: 733, backgroundColor: "#F8F1E4" }}
    >
      <p className="text-sm" style={{ color: "#8B7355" }}>
        Cargando recetario...
      </p>
    </div>
  ),
});

/* ------------------------------------------------------------------ */
/* Build page list from recipe data                                   */
/* ------------------------------------------------------------------ */

interface PageData {
  type: "cover" | "recipe" | "text" | "blank";
  recipe?: Recipe;
  text?: string;
}

function buildPages(): PageData[] {
  const pages: PageData[] = [];

  // Front cover
  pages.push({ type: "cover", text: "Recetario Vivo" });

  // Table of contents / intro text
  pages.push({
    type: "text",
    text: "Bienvenido al Recetario Vivo. Una coleccion de recetas economicas y deliciosas para el dia a dia. Navega con las flechas o con el teclado.",
  });

  // Group recipes by section
  const sectionOrder = sections.map((s) => s.id);
  const grouped = new Map<string, Recipe[]>();
  for (const r of sampleRecipes) {
    const list = grouped.get(r.section) ?? [];
    list.push(r);
    grouped.set(r.section, list);
  }

  for (const sectionId of sectionOrder) {
    const sectionRecipes = grouped.get(sectionId);
    if (!sectionRecipes || sectionRecipes.length === 0) continue;

    const sectionMeta = sections.find((s) => s.id === sectionId);
    const sectionTitle = sectionMeta
      ? `${sectionMeta.titleEsMx}`
      : sectionId;

    // Section divider page
    pages.push({
      type: "text",
      text: sectionTitle,
    });

    // Recipe pages
    for (const recipe of sectionRecipes) {
      pages.push({ type: "recipe", recipe });
    }
  }

  // If odd number, add a blank to make even (flipbook needs even pages)
  if (pages.length % 2 !== 0) {
    pages.push({ type: "blank" });
  }

  // Back cover
  pages.push({
    type: "text",
    text: "Gracias por cocinar con nosotros. Buen provecho.",
  });

  // Ensure even count
  if (pages.length % 2 !== 0) {
    pages.push({ type: "blank" });
  }

  return pages;
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export default function FlipbookReader({ className }: { className?: string }) {
  const flipBookRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [currentPage, setCurrentPage] = useState(0);
  const [pages] = useState(buildPages);
  const totalPages = pages.length;

  /* Page flip handler */
  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
    playPageTurn();
  }, []);

  /* Navigation */
  const goNext = useCallback(() => {
    const book = flipBookRef.current;
    if (book && book.pageFlip) {
      book.pageFlip().flipNext();
    }
  }, []);

  const goPrev = useCallback(() => {
    const book = flipBookRef.current;
    if (book && book.pageFlip) {
      book.pageFlip().flipPrev();
    }
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4",
        className
      )}
    >
      {/* Flipbook */}
      <div className="relative">
        <HTMLFlipBook
          ref={flipBookRef}
          width={550}
          height={733}
          size="stretch"
          minWidth={300}
          maxWidth={550}
          minHeight={400}
          maxHeight={733}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={600}
          useMouseEvents={true}
          swipeDistance={30}
          maxShadowOpacity={0.4}
          onFlip={onFlip}
          className="flipbook-container"
          style={{}}
          startPage={0}
          startZIndex={0}
          autoSize={true}
          clickEventForward={false}
          usePortrait={false}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((page, index) => (
            <FlipbookPage
              key={index}
              pageNumber={index}
              type={page.type}
              content={page.recipe ?? null}
              text={page.text}
            />
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <FlipbookControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
