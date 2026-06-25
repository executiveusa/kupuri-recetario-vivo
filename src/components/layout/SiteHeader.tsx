"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BookOpen,
  ChefHat,
  Mic,
  Leaf,
  ShoppingBasket,
  Utensils,
  Info,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/libro", label: "Libro", icon: BookOpen },
  { href: "/recetas", label: "Recetas", icon: ChefHat },
  { href: "/ingredientes", label: "Ingredientes", icon: Leaf },
  { href: "/tecnicas", label: "Técnicas", icon: Utensils },
  { href: "/despensa", label: "Despensa", icon: ShoppingBasket },
  { href: "/voz", label: "Voz", icon: Mic },
  { href: "/acerca", label: "Acerca", icon: Info },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#050505]/95 backdrop-blur-md shadow-lg"
            : "bg-[#050505]"
        )}
      >
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-white no-underline"
          >
            <span
              className="text-lg font-bold tracking-[0.2em] uppercase transition-colors group-hover:text-[#E9B949]"
              style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
            >
              Recetario Vivo
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium tracking-wide transition-colors no-underline",
                    isActive
                      ? "text-[#E9B949]"
                      : "text-white/70 hover:text-white"
                  )}
                  style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E9B949] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-[#E9B949] transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile slide-out sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#050505] shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span
                  className="text-sm font-bold tracking-[0.2em] uppercase text-[#E9B949]"
                  style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                >
                  Menú
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col py-4">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors no-underline",
                    pathname === "/"
                      ? "text-[#E9B949] bg-white/5"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                  style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                >
                  <Home size={18} />
                  Inicio
                </Link>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors no-underline",
                        isActive
                          ? "text-[#E9B949] bg-white/5"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                      style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="absolute bottom-8 left-6 right-6">
                <p className="text-[10px] text-white/30 leading-relaxed">
                  Basado en Good and Cheap de Leanne Brown.
                  CC BY-NC-SA 4.0.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-14" />
    </>
  );
}
