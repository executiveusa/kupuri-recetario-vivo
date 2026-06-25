import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    app: "recetario-vivo",
    timestamp: new Date().toISOString(),
  });
}
