import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message:
      "El asistente de chat estará disponible pronto. Por ahora, usa los comandos de voz para interactuar con el recetario.",
    status: "not_configured",
  });
}
