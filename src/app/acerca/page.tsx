import LicenseAttribution from "@/components/license/LicenseAttribution";

export default function AcercaPage() {
  return (
    <main className="min-h-screen pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-6" style={{ fontFamily: "Raleway, sans-serif" }}>
          Acerca de Recetario Vivo
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>
            ¿Qué es esto?
          </h2>
          <div className="prose max-w-none" style={{ fontFamily: "Lora, serif", color: "#1F1B16" }}>
            <p className="mb-3">
              Recetario Vivo es un motor de transformación de libros de cocina. Toma un libro de cocina con
              licencia abierta y lo convierte en una experiencia interactiva: páginas animadas, recetas guiadas
              por voz, listas de ingredientes, modo cocinar y todo en español mexicano.
            </p>
            <p className="mb-3">
              La primera experiencia está basada en <strong>Good and Cheap: Eat Well on $4/Day</strong> de
              Leanne Brown, un libro que demuestra que comer bien no tiene que ser caro.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>
            Sobre el presupuesto
          </h2>
          <div className="p-4 rounded-xl" style={{ backgroundColor: "#FFF8EA", border: "1px solid #EFE2C6" }}>
            <p className="text-sm" style={{ color: "#1F1B16" }}>
              El presupuesto original del libro era de <strong>US$4 al día</strong> (aproximadamente $70 pesos
              mexicanos al tipo de cambio de referencia de 17.6139 MXN/USD). Esta versión usa una conversión
              aproximada a pesos mexicanos para fines educativos. Los precios reales pueden variar por ciudad,
              temporada y año.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>
            Licencia y Atribución
          </h2>
          <LicenseAttribution size="full" />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>
            ¿Por qué es gratuito?
          </h2>
          <div className="prose max-w-none" style={{ fontFamily: "Lora, serif", color: "#1F1B16" }}>
            <p className="mb-3">
              El libro original tiene licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0.
              Esto significa que podemos adaptarlo y compartirlo, pero no podemos cobrar por ello.
            </p>
            <p className="mb-3">
              Esta app no tiene anuncios, enlaces de afiliados, suscripciones ni exportaciones de pago.
              Es un proyecto educativo y de código abierto.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>
            Tecnología
          </h2>
          <ul className="space-y-1 text-sm" style={{ color: "#1F1B16" }}>
            <li>Next.js (App Router) + TypeScript</li>
            <li>Tailwind CSS v4</li>
            <li>Framer Motion para animaciones</li>
            <li>react-pageflip para el flipbook</li>
            <li>Web Speech API para voz</li>
            <li>Fuse.js para búsqueda</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
