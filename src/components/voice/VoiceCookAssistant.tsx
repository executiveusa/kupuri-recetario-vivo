"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getRecipeBySlug, sampleRecipes } from "@/data/recipes";
import { cn } from "@/lib/utils";
import { Mic, MicOff, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceAssistant } from "@/lib/voice/useVoiceAssistant";
import { speak, stopSpeaking } from "@/lib/voice/speech";
import { parseVoiceInput, type ParsedCommand } from "@/lib/voice/commands";
import VoiceTranscriptPanel, {
  type TranscriptEntry,
} from "./VoiceTranscriptPanel";

/* ------------------------------------------------------------------ */
/* Status type                                                        */
/* ------------------------------------------------------------------ */

type AssistantStatus = "idle" | "listening" | "processing" | "speaking";

/* ------------------------------------------------------------------ */
/* Suggested commands                                                 */
/* ------------------------------------------------------------------ */

const suggestedCommands = [
  "Siguiente pagina",
  "Pagina anterior",
  "Leer la receta",
  "Leeme los ingredientes",
  "Buscar lentejas",
  "Temporizador de 5 minutos",
  "Que consejos hay",
];

/* ------------------------------------------------------------------ */
/* Command response mapping                                           */
/* ------------------------------------------------------------------ */

function getResponseText(cmd: ParsedCommand): string {
  switch (cmd.action) {
    case "nextPage":
      return "Pasando a la siguiente pagina.";
    case "prevPage":
      return "Regresando a la pagina anterior.";
    case "goToPage":
      return `Yendo a la pagina ${cmd.params.pageNumber}.`;
    case "readRecipe":
      return "Leyendo la receta actual.";
    case "readIngredients":
      return "Leyendo los ingredientes.";
    case "readSteps":
      return "Leyendo los pasos de preparacion.";
    case "readStep":
      return `Leyendo el paso ${cmd.params.stepNumber}.`;
    case "search":
      return `Buscando: ${cmd.params.query}.`;
    case "startTimer":
      return "Iniciando el temporizador.";
    case "stopTimer":
      return "Deteniendo el temporizador.";
    case "setTimer":
      return `Temporizador configurado a ${cmd.params.minutes} minutos.`;
    case "setTimerSeconds":
      return `Temporizador configurado a ${cmd.params.seconds} segundos.`;
    case "stopSpeaking":
      return "";
    case "repeat":
      return "Repitiendo...";
    case "goHome":
      return "Volviendo al inicio.";
    case "openRecipe":
      return `Abriendo receta: ${cmd.params.recipeName}.`;
    case "readCost":
      return "Leyendo el costo de la receta.";
    case "readTips":
      return "Leyendo los consejos.";
    case "enableCookMode":
      return "Modo cocina activado. Te guiare paso a paso.";
    case "disableCookMode":
      return "Saliendo del modo cocina.";
    default:
      return "Comando reconocido.";
  }
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

export interface VoiceCookAssistantProps {
  /** External callback when a command is parsed */
  onCommand?: (cmd: ParsedCommand) => void;
  className?: string;
}

export default function VoiceCookAssistant({
  onCommand,
  className,
}: VoiceCookAssistantProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipe = getRecipeBySlug(searchParams.get("receta") ?? "");
  const language = searchParams.get("lang") === "en" ? "en" : "es";
  const speechLang = language === "en" ? "en-US" : "es-MX";
  const [status, setStatus] = useState<AssistantStatus>("idle");
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [textInput, setTextInput] = useState("");
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entryIdRef = useRef(0);

  /* Helper: generate unique entry id */
  const nextId = () => {
    entryIdRef.current += 1;
    return String(entryIdRef.current);
  };

  /* Helper: add transcript entry */
  const addEntry = useCallback(
    (role: "user" | "assistant", text: string) => {
      setEntries((prev) => [
        ...prev,
        { id: nextId(), role, text, timestamp: Date.now() },
      ]);
    },
    []
  );

  /* Handle a parsed command */
  const handleCommand = useCallback(
    (cmd: ParsedCommand) => {
      setStatus("processing");
      addEntry("user", cmd.raw);

      let response = getResponseText(cmd);
      const translated = (en: string, es: string) => language === "en" ? en : es;
      if (recipe && ["readRecipe", "readIngredients", "readSteps", "readStep", "readTips"].includes(cmd.action)) {
        const ingredients = recipe.ingredients.map(i => language === "en" ? i.originalEn : i.esMx);
        const steps = recipe.steps.map(s => language === "en" ? s.textEn : s.textEsMx);
        if (cmd.action === "readIngredients") response = ingredients.join(". ");
        if (cmd.action === "readSteps") response = steps.map((s, i) => `${i + 1}. ${s}`).join(". ");
        if (cmd.action === "readRecipe") response = [language === "en" ? recipe.titleEn : recipe.titleEsMx, translated("Ingredients", "Ingredientes"), ...ingredients, translated("Steps", "Pasos"), ...steps].join(". ");
        if (cmd.action === "readStep") {
          const index = Number(cmd.params.stepNumber) - 1;
          response = steps[index] ?? translated("Step not found.", "Paso no encontrado.");
        }
        if (cmd.action === "readTips") response = recipe.tips.map(t => language === "en" ? t.textEn : t.textEsMx).join(". ");
      }
      if (!recipe && ["readRecipe", "readIngredients", "readSteps", "readStep", "readTips"].includes(cmd.action)) {
        response = translated("Open a recipe first to hear its details.", "Abre una receta para escuchar sus detalles.");
      }
      if (cmd.action === "openRecipe" || cmd.action === "search") {
        const query = (cmd.params.recipeName ?? cmd.params.query ?? "").toLocaleLowerCase();
        const match = sampleRecipes.find(r => r.titleEn.toLocaleLowerCase().includes(query) || r.titleEsMx.toLocaleLowerCase().includes(query));
        if (match) {
          router.push(`/recetas/${match.slug}`);
          response = translated(`Opening ${match.titleEn}.`, `Abriendo ${match.titleEsMx}.`);
        } else {
          router.push(`/recetas?buscar=${encodeURIComponent(query)}`);
          response = translated("Opening recipe search.", "Abriendo el buscador de recetas.");
        }
      }
      if (cmd.action === "goHome") router.push("/");
      if (cmd.action === "nextPage" || cmd.action === "prevPage" || cmd.action === "goToPage") {
        response = translated("Page-turning from the assistant is not available yet. Open the cookbook.", "Para pasar páginas, abre el libro. El control por voz aún no está disponible.");
      }

      // Show feedback briefly
      setCommandFeedback(`${cmd.action}`);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = setTimeout(
        () => setCommandFeedback(null),
        3000
      );

      // Notify external handler
      onCommand?.(cmd);

      if (cmd.action === "stopSpeaking") {
        stopSpeaking();
        setStatus("idle");
        return;
      }

      if (response) {
        addEntry("assistant", response);
        setStatus("speaking");
        speak(response, speechLang);
      }

      setStatus("idle");
    },
    [addEntry, onCommand, recipe, language, speechLang, router]
  );

  /* Voice assistant hook */
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported,
  } = useVoiceAssistant({
    lang: speechLang,
    continuous: false,
    onCommand: handleCommand,
  });

  /* Sync listening state to status */
  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isListening) {
      setStatus("listening");
    } else if (status === "listening") {
      setStatus("idle");
    }
  }, [isListening]);
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  /* Toggle mic */
  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  /* Handle text input submit (fallback) */
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = textInput.trim();
    if (!val) return;
    setTextInput("");

    // Try parsing as a voice command
    const parsed = parseVoiceInput(val);
    if (parsed) {
      handleCommand(parsed);
    } else {
      addEntry("user", val);
      const fallback =
        "No entendi el comando. Intenta decir: siguiente pagina, leer receta, o buscar algo.";
      addEntry("assistant", fallback);
      speak(fallback, speechLang);
    }
  };

  /* Status label */
  const statusLabel = {
    idle: "Listo",
    listening: "Escuchando...",
    processing: "Procesando...",
    speaking: "Hablando...",
  }[status];

  const statusColor = {
    idle: "#A89B7E",
    listening: "#C4472D",
    processing: "#E9B949",
    speaking: "#5E7C47",
  }[status];

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl overflow-hidden shadow-lg",
        "bg-[#F8F1E4] border border-[#D4C5A0]",
        className
      )}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ backgroundColor: "#7A2E22" }}
      >
        <MessageCircle className="w-5 h-5 text-[#E9B949]" />
        <h2 className="text-base font-semibold text-[#F8F1E4]">
          Asistente de Cocina
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColor }}
          />
          <span className="text-xs text-[#F8F1E4]/70">{statusLabel}</span>
        </div>
      </div>

      {/* Transcript */}
      <div className="px-3 pt-3">
        <VoiceTranscriptPanel entries={entries} />
      </div>

      {/* Interim transcript */}
      <AnimatePresence>
        {isListening && transcript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2"
          >
            <p className="text-sm italic" style={{ color: "#8B7355" }}>
              &ldquo;{transcript}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command feedback */}
      <AnimatePresence>
        {commandFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-4 my-1 px-3 py-1.5 rounded-md bg-[#5E7C47]/15"
          >
            <p className="text-xs font-medium" style={{ color: "#5E7C47" }}>
              Comando: {commandFeedback}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mic button + text fallback */}
      <div className="flex items-center gap-3 px-4 py-4">
        {/* Mic button */}
        <div className="relative">
          <AnimatePresence>
            {isListening && (
              <>
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.7, opacity: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full bg-[#C4472D]/25"
                />
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.4,
                  }}
                  className="absolute inset-0 rounded-full bg-[#C4472D]/15"
                />
              </>
            )}
          </AnimatePresence>

          <button
            onClick={toggleMic}
            disabled={!isSupported && status !== "listening"}
            aria-label={isListening ? "Dejar de escuchar" : "Activar microfono"}
            className={cn(
              "relative z-10 flex items-center justify-center w-14 h-14 rounded-full",
              "transition-all duration-200 shadow-md",
              isListening
                ? "bg-[#C4472D] text-white"
                : isSupported
                  ? "bg-[#7A2E22] text-[#F8F1E4] hover:bg-[#5E2219] hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            {isListening ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Text input fallback */}
        <form onSubmit={handleTextSubmit} className="flex-1 flex gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={
              isSupported
                ? "O escribe un comando..."
                : "Escribe un comando (voz no disponible)"
            }
            className={cn(
              "flex-1 px-3 py-2 rounded-lg text-sm",
              "bg-white/70 border border-[#D4C5A0]",
              "text-[#1F1B16] placeholder:text-[#A89B7E]",
              "focus:outline-none focus:ring-2 focus:ring-[#C4472D]/30"
            )}
          />
          <button
            type="submit"
            disabled={!textInput.trim()}
            aria-label="Enviar comando"
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg",
              "transition-all duration-200",
              textInput.trim()
                ? "bg-[#7A2E22] text-[#F8F1E4] hover:bg-[#5E2219]"
                : "bg-[#D4C5A0]/50 text-[#A89B7E] cursor-not-allowed"
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Suggested commands */}
      <div className="px-4 pb-4">
        <p className="text-xs font-medium mb-2" style={{ color: "#8B7355" }}>
          Prueba decir:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {suggestedCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setTextInput(cmd);
              }}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs",
                "bg-[#7A2E22]/8 text-[#7A2E22] border border-[#7A2E22]/15",
                "hover:bg-[#7A2E22]/15 transition-colors"
              )}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
