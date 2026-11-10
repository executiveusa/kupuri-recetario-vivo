import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // This endpoint issues billable Realtime client credentials. Disable by default
  // until a deliberate deployment configuration enables the voice pilot.
  if (process.env.ENABLE_OPENAI_REALTIME_VOICE !== "true") {
    return NextResponse.json({ error: "Voice pilot not enabled." }, { status: 503 });
  }
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return NextResponse.json({ error: "Origin required." }, { status: 403 });
  try {
    if (new URL(origin).host !== host) {
      return NextResponse.json({ error: "Origin not allowed." }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Voice service not configured." }, { status: 503 });

  // Bound the OpenAI request and return only the short-lived client token.
  try {
    const upstream = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session: { type: "realtime", model: "gpt-realtime-2.1" } }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (!upstream.ok) return NextResponse.json({ error: "Voice session unavailable." }, { status: 502 });
    const payload: unknown = await upstream.json();
    if (!payload || typeof payload !== "object" || !("value" in payload) || typeof payload.value !== "string" || !payload.value.startsWith("ek_")) {
      return NextResponse.json({ error: "Invalid voice session response." }, { status: 502 });
    }
    return NextResponse.json({ value: payload.value }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Voice session request failed." }, { status: 502 });
  }
}
