import { cn } from "@/lib/utils";

interface LicenseAttributionProps {
  size: "compact" | "full";
  className?: string;
}

export default function LicenseAttribution({
  size,
  className,
}: LicenseAttributionProps) {
  if (size === "compact") {
    return (
      <p
        className={cn(
          "text-xs text-[#1F1B16]/60 leading-relaxed",
          className
        )}
      >
        Recetas, texto y la mayoría de las fotografías por Leanne Brown.
        Basado en{" "}
        <em>Good and Cheap: Eat Well on $4/Day</em>. Usado bajo{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#C4472D] transition-colors"
        >
          Creative Commons BY-NC-SA 4.0
        </a>
        .
      </p>
    );
  }

  return (
    <div className={cn("space-y-3 text-sm text-[#1F1B16]/70 leading-relaxed", className)}>
      <p>
        Las recetas, texto y la mayoría de las fotografías de este sitio son obra de{" "}
        <strong className="text-[#1F1B16]">Leanne Brown</strong>, tomadas de su
        libro{" "}
        <em className="text-[#1F1B16]">
          Good and Cheap: Eat Well on $4/Day
        </em>
        .
      </p>
      <p>
        Este contenido se utiliza bajo la licencia{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#C4472D] underline underline-offset-2 hover:text-[#7A2E22] transition-colors"
        >
          Creative Commons Atribución-NoComercial-CompartirIgual 4.0
          Internacional (CC BY-NC-SA 4.0)
        </a>
        .
      </p>
      <p>
        Esta adaptación interactiva es de carácter no comercial y educativo.
        Cualquier redistribución debe mantener la misma licencia y dar
        atribución apropiada a la autora original.
      </p>
      <p className="text-xs text-[#1F1B16]/50">
        Los precios en pesos mexicanos son aproximaciones y pueden variar
        según tu ubicación y temporada.
      </p>
    </div>
  );
}
