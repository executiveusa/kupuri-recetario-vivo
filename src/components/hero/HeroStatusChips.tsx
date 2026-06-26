import {
  BookOpen,
  ChefHat,
  Globe,
  Mic,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusChip {
  icon: React.ReactNode;
  text: string;
}

const chips: StatusChip[] = [
  { icon: <BookOpen className="w-3.5 h-3.5" />, text: "89 páginas" },
  {
    icon: <UtensilsCrossed className="w-3.5 h-3.5" />,
    text: "70+ recetas",
  },
  { icon: <Globe className="w-3.5 h-3.5" />, text: "Español MX" },
  { icon: <Mic className="w-3.5 h-3.5" />, text: "Control por voz" },
  { icon: <ChefHat className="w-3.5 h-3.5" />, text: "Modo cocinar" },
];

export default function HeroStatusChips() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
      role="list"
      aria-label="Características del recetario"
    >
      {chips.map((chip) => (
        <div
          key={chip.text}
          role="listitem"
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "bg-white/8 backdrop-blur-sm border border-white/10",
            "text-white/70 text-xs font-[Lato] font-medium",
            "select-none"
          )}
        >
          {chip.icon}
          <span>{chip.text}</span>
        </div>
      ))}
    </div>
  );
}
