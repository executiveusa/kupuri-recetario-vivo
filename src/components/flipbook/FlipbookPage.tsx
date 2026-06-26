"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/lib/types";

export type FlipbookPageType = "cover" | "recipe" | "text" | "blank";

export interface FlipbookPageProps {
  pageNumber: number;
  content?: Recipe | null;
  type: FlipbookPageType;
  text?: string;
}

const FlipbookPage = React.forwardRef<HTMLDivElement, FlipbookPageProps>(
  function FlipbookPage({ pageNumber, content, type, text }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-full w-full overflow-hidden",
          "shadow-inner select-none"
        )}
        style={{ backgroundColor: "#F8F1E4" }}
      >
        {type === "cover" && <CoverContent text={text} />}
        {type === "recipe" && content && <RecipeContent recipe={content} pageNumber={pageNumber} />}
        {type === "text" && <TextContent text={text ?? ""} pageNumber={pageNumber} />}
        {type === "blank" && <BlankContent pageNumber={pageNumber} />}
      </div>
    );
  }
);

FlipbookPage.displayName = "FlipbookPage";

export default FlipbookPage;

/* ------------------------------------------------------------------ */

function CoverContent({ text }: { text?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full px-6 text-center"
      style={{ backgroundColor: "#7A2E22" }}
    >
      <div
        className="w-24 h-0.5 mb-6"
        style={{ backgroundColor: "#E9B949" }}
      />
      <h1
        className="text-3xl font-bold tracking-wide leading-tight"
        style={{ color: "#F8F1E4", fontFamily: "serif" }}
      >
        {text ?? "Recetario Vivo"}
      </h1>
      <p
        className="mt-3 text-sm italic"
        style={{ color: "#E9B949" }}
      >
        Cocina con alma y presupuesto
      </p>
      <div
        className="w-24 h-0.5 mt-6"
        style={{ backgroundColor: "#E9B949" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function RecipeContent({
  recipe,
  pageNumber,
}: {
  recipe: Recipe;
  pageNumber: number;
}) {
  return (
    <div className="flex flex-col h-full px-5 py-4 overflow-hidden">
      {/* Title */}
      <div className="mb-3">
        <h2
          className="text-xl font-bold leading-snug"
          style={{ color: "#7A2E22", fontFamily: "serif" }}
        >
          {recipe.titleEsMx}
        </h2>
        <p
          className="text-xs italic mt-0.5"
          style={{ color: "#8B7355" }}
        >
          {recipe.titleEn}
        </p>
        {recipe.yieldEsMx && (
          <p className="text-xs mt-1" style={{ color: "#5E7C47" }}>
            {recipe.yieldEsMx}
            {recipe.costPerServingMxn &&
              ` · $${recipe.costPerServingMxn} MXN/porcion`}
          </p>
        )}
      </div>

      <div
        className="w-full h-px mb-3"
        style={{ backgroundColor: "#D4C5A0" }}
      />

      {/* Ingredients */}
      <div className="mb-3 flex-shrink-0">
        <h3
          className="text-xs font-semibold uppercase tracking-wider mb-1.5"
          style={{ color: "#C4472D" }}
        >
          Ingredientes
        </h3>
        <ul className="space-y-0.5">
          {recipe.ingredients.slice(0, 8).map((ing, i) => (
            <li
              key={i}
              className="text-xs leading-snug flex items-start gap-1.5"
              style={{ color: "#1F1B16" }}
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#C4472D" }}
              />
              <span>{ing.esMx}</span>
            </li>
          ))}
          {recipe.ingredients.length > 8 && (
            <li className="text-xs italic" style={{ color: "#8B7355" }}>
              ... y {recipe.ingredients.length - 8} mas
            </li>
          )}
        </ul>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-hidden">
        <h3
          className="text-xs font-semibold uppercase tracking-wider mb-1.5"
          style={{ color: "#C4472D" }}
        >
          Preparacion
        </h3>
        <ol className="space-y-1">
          {recipe.steps.slice(0, 5).map((step) => (
            <li
              key={step.order}
              className="text-xs leading-snug flex items-start gap-1.5"
              style={{ color: "#1F1B16" }}
            >
              <span
                className="font-bold flex-shrink-0"
                style={{ color: "#7A2E22" }}
              >
                {step.order}.
              </span>
              <span className="line-clamp-2">{step.textEsMx}</span>
            </li>
          ))}
          {recipe.steps.length > 5 && (
            <li className="text-xs italic" style={{ color: "#8B7355" }}>
              ... {recipe.steps.length - 5} pasos mas
            </li>
          )}
        </ol>
      </div>

      {/* Tips */}
      {recipe.tips.length > 0 && (
        <div className="mt-2 pt-2 border-t" style={{ borderColor: "#D4C5A0" }}>
          <p
            className="text-xs italic leading-snug line-clamp-2"
            style={{ color: "#5E7C47" }}
          >
            Tip: {recipe.tips[0].textEsMx}
          </p>
        </div>
      )}

      {/* Page number */}
      <div className="mt-auto pt-2 text-center">
        <span className="text-xs" style={{ color: "#A89B7E" }}>
          {pageNumber}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TextContent({ text, pageNumber }: { text: string; pageNumber: number }) {
  return (
    <div className="flex flex-col h-full px-6 py-6">
      <div className="flex-1 flex items-center justify-center">
        <p
          className="text-sm leading-relaxed text-center italic"
          style={{ color: "#1F1B16", fontFamily: "serif" }}
        >
          {text}
        </p>
      </div>
      <div className="mt-auto text-center">
        <span className="text-xs" style={{ color: "#A89B7E" }}>
          {pageNumber}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function BlankContent({ pageNumber }: { pageNumber: number }) {
  return (
    <div className="flex flex-col h-full px-6 py-6">
      <div className="flex-1" />
      <div className="mt-auto text-center">
        <span className="text-xs" style={{ color: "#A89B7E" }}>
          {pageNumber}
        </span>
      </div>
    </div>
  );
}
