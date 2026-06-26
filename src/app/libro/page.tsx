"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";

const FlipbookReader = dynamic(
  () => import("@/components/flipbook/FlipbookReader"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#C4472D]" />
        <p className="text-sm text-[#1F1B16]/50">Cargando el libro...</p>
      </div>
    ),
  }
);

export default function LibroPage() {
  return (
    <div className="min-h-screen bg-[#1F1B16]">
      {/* Top bar */}
      <div className="sticky top-14 z-30 bg-[#1F1B16]/95 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors no-underline"
          >
            <ArrowLeft size={16} />
            <span
              className="hidden sm:inline"
              style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
            >
              Volver al inicio
            </span>
          </Link>

          <div className="flex items-center gap-2 text-white/80">
            <BookOpen size={18} />
            <h1
              className="text-sm font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
            >
              Good and Cheap — Edición Interactiva
            </h1>
          </div>

          <div className="w-20" />
        </div>
      </div>

      {/* Flipbook area */}
      <div className="w-full">
        <FlipbookReader />
      </div>
    </div>
  );
}
