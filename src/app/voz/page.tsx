"use client";

import dynamic from "next/dynamic";

const VoiceCookAssistant = dynamic(
  () => import("@/components/voice/VoiceCookAssistant"),
  { ssr: false }
);

export default function VozPage() {
  return (
    <main className="min-h-screen pt-20 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>
          Asistente de Voz
        </h1>
        <p className="text-lg mb-8" style={{ color: "#1F1B16", opacity: 0.7 }}>
          Cocina con las manos libres usando comandos de voz
        </p>

        <VoiceCookAssistant />

        <section className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: "#FFF8EA" }}>
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>
            Comandos disponibles
          </h2>
          <div className="grid gap-2 text-sm">
            {[
              { cmd: "Busca tacos", desc: "Buscar recetas por nombre o ingrediente" },
              { cmd: "Siguiente página", desc: "Avanzar en el flipbook" },
              { cmd: "Página anterior", desc: "Retroceder en el flipbook" },
              { cmd: "Léeme la receta", desc: "Leer la receta en voz alta" },
              { cmd: "Léeme los pasos", desc: "Leer los pasos de la receta" },
              { cmd: "Repetir", desc: "Repetir lo último dicho" },
              { cmd: "Temporizador 5 minutos", desc: "Iniciar un temporizador" },
              { cmd: "Modo cocina", desc: "Activar modo cocinar" },
              { cmd: "Silencio", desc: "Detener la voz" },
            ].map((item) => (
              <div key={item.cmd} className="flex items-baseline gap-2">
                <code className="px-2 py-1 rounded text-xs font-mono" style={{ backgroundColor: "#EFE2C6" }}>
                  &quot;{item.cmd}&quot;
                </code>
                <span style={{ color: "#1F1B16", opacity: 0.7 }}>— {item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-6 text-xs text-center" style={{ color: "#1F1B16", opacity: 0.5 }}>
          El reconocimiento de voz funciona mejor en Chrome y Edge. Si tu navegador no lo soporta, puedes escribir los comandos.
        </p>
      </div>
    </main>
  );
}
