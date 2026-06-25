import Link from "next/link";
import LicenseAttribution from "@/components/license/LicenseAttribution";

export default function SiteFooter() {
  return (
    <footer className="bg-[#F8F1E4] border-t border-[#EFE2C6]">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo mark */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-sm font-bold tracking-[0.25em] uppercase text-[#1F1B16]/40"
              style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
            >
              Recetario Vivo
            </span>
            <div className="w-12 h-px bg-[#1F1B16]/15" />
          </div>

          {/* Attribution */}
          <div className="max-w-lg">
            <LicenseAttribution size="compact" className="text-center" />
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-6 text-xs">
            <Link
              href="/acerca"
              className="text-[#1F1B16]/50 hover:text-[#C4472D] transition-colors no-underline"
              style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
            >
              Acerca del Proyecto
            </Link>
            <span className="text-[#1F1B16]/20">|</span>
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1F1B16]/50 hover:text-[#C4472D] transition-colors no-underline"
              style={{ fontFamily: "var(--font-raleway), Raleway, sans-serif" }}
            >
              CC BY-NC-SA 4.0
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
