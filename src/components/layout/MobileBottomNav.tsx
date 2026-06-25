"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, ChefHat, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

const bottomNavItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/libro", label: "Libro", icon: BookOpen },
  { href: "/recetas", label: "Recetas", icon: ChefHat },
  { href: "/voz", label: "Voz", icon: Mic },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#EFE2C6] shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around h-16 px-2">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-16 h-full no-underline transition-colors",
                isActive ? "text-[#C4472D]" : "text-[#1F1B16]/40 hover:text-[#1F1B16]/70"
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className={cn(
                  "text-[10px] font-medium tracking-wide",
                  isActive && "font-bold"
                )}
                style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area spacer for iPhones with home indicator */}
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-white/95" />
    </nav>
  );
}
