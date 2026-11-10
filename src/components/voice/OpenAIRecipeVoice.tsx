"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import { getRecipeBySlug } from "@/data/recipes";

/**
 * First bounded OpenAI voice pilot: conversation about one already-open recipe.
 * No write tools, external links or privileged actions are exposed to the agent.
 */
export default function OpenAIRecipeVoice() {
  const params = useSearchParams();
  const slug = params.get("receta") ?? "";
  const lang = params.get("lang") === "en" ? "en" : "es";
  const recipe = getRecipeBySlug(slug);
  const sessionRef = useRef<RealtimeSession | null>(null);
  const connectingRef = useRef(false);
  const [state, setState] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => () => {
    connectingRef.current = false;
    sessionRef.current?.close();
    sessionRef.current = null;
  }, []);

  async function disconnect() {
    connectingRef.current = false;
    sessionRef.current?.close();
    sessionRef.current = null;
    setState("idle");
  }

  async function connect() {
    if (connectingRef.current || sessionRef.current) return;
    if (!recipe) {
      setError(lang === "en" ? "Open a recipe before starting voice." : "Abre una receta antes de iniciar la voz.");
      setState("error");
      return;
    }
    connectingRef.current = true;
    setState("connecting");
    setError("");
    try {
      const response = await fetch("/api/realtime-token", { method: "POST", cache: "no-store" });
      if (!response.ok) throw new Error(lang === "en" ? "Voice service is not configured or available." : "El servicio de voz no está configurado o disponible.");
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || !("value" in data) || typeof data.value !== "string") throw new Error("Invalid session token.");

      const title = lang === "en" ? recipe.titleEn : recipe.titleEsMx;
      const ingredients = recipe.ingredients.map(i => lang === "en" ? i.originalEn : i.esMx);
      const steps = recipe.steps.map(s => lang === "en" ? s.textEn : s.textEsMx);
      const tips = recipe.tips.map(t => lang === "en" ? t.textEn : t.textEsMx);
      const agent = new RealtimeAgent({
        name: "Recetario Vivo Cooking Guide",
        instructions: [
          lang === "en" ? "Speak natural English." : "Habla español de México de forma natural.",
          "You are a calm, concise hands-free cooking helper. Use only the supplied recipe information for exact quantities and instructions.",
          "Never claim a timer is running, a page has turned, or a tool/action succeeded. You have no tools for those operations.",
          "When asked about missing ingredients, safety, allergies, or substitutions, explain uncertainty and do not invent recipe facts.",
          "Read one cooking step at a time if asked. Wait for the user to request the next step.",
          `CURRENT RECIPE: ${title}`,
          `INGREDIENTS: ${JSON.stringify(ingredients)}`,
          `STEPS: ${JSON.stringify(steps)}`,
          `TIPS: ${JSON.stringify(tips)}`,
        ].join("\n"),
      });
      const session = new RealtimeSession(agent, { model: "gpt-realtime-2.1" });
      sessionRef.current = session;
      await session.connect({ apiKey: data.value });
      if (!connectingRef.current) {
        session.close();
        sessionRef.current = null;
        return;
      }
      setState("connected");
    } catch (cause) {
      sessionRef.current?.close();
      sessionRef.current = null;
      setError(cause instanceof Error ? cause.message : "Voice connection failed.");
      setState("error");
    } finally {
      connectingRef.current = false;
    }
  }

  return (
    <section className="rounded-2xl border border-[#D4C5A0] bg-[#F8F1E4] p-5 space-y-3">
      <h2 className="font-bold text-lg">{lang === "en" ? "OpenAI Live Cooking Voice" : "Voz de cocina en vivo con OpenAI"}</h2>
      <p className="text-sm text-[#1F1B16]/70">
        {recipe
          ? (lang === "en" ? `Current recipe: ${recipe.titleEn}` : `Receta actual: ${recipe.titleEsMx}`)
          : (lang === "en" ? "Choose a recipe to start." : "Elige una receta para comenzar.")}
      </p>
      <p className="text-sm text-[#1F1B16]/70">
        {lang === "en"
          ? "Live microphone audio is sent to OpenAI while connected. Voice usage may incur API charges."
          : "Mientras esté conectado, se envía audio del micrófono a OpenAI. El uso de voz puede generar cargos de API."}
      </p>
      <button
        type="button"
        disabled={state === "connecting" || (!recipe && state !== "connected")}
        onClick={state === "connected" ? disconnect : connect}
        className="rounded-full bg-[#7A2E22] text-white px-5 py-3 font-semibold disabled:opacity-50"
      >
        {state === "connected" ? (lang === "en" ? "End conversation" : "Terminar conversación")
          : state === "connecting" ? (lang === "en" ? "Connecting…" : "Conectando…")
          : (lang === "en" ? "Start live voice" : "Iniciar voz en vivo")}
      </button>
      <p role="status" className="text-sm" aria-live="polite">
        {state === "connected" ? (lang === "en" ? "Connected. Speak naturally; you may interrupt." : "Conectado. Habla normalmente; puedes interrumpir.") : ""}
      </p>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
    </section>
  );
}
