import type { Metadata, Viewport } from "next";
import { Raleway, Lato, Lora } from "next/font/google";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recetario Vivo — Come Bien con 70 Pesos al Día",
  description:
    "Un recetario interactivo basado en Good and Cheap de Leanne Brown. Recetas deliciosas, económicas y nutritivas adaptadas para la cocina mexicana. Come bien con menos de 80 pesos al día.",
  keywords: [
    "recetas económicas",
    "cocina mexicana",
    "presupuesto",
    "recetario",
    "cocinar barato",
    "Good and Cheap",
    "Leanne Brown",
  ],
  authors: [{ name: "Recetario Vivo" }],
  openGraph: {
    title: "Recetario Vivo — Come Bien con 70 Pesos al Día",
    description:
      "Recetas deliciosas, económicas y nutritivas adaptadas para la cocina mexicana.",
    type: "website",
    locale: "es_MX",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${raleway.variable} ${lato.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-lato)" }}>
        <SiteHeader />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <SiteFooter />
        <MobileBottomNav />
      </body>
    </html>
  );
}
