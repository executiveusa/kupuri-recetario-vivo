"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getRecipeBySlug } from "@/data/recipes";
import Link from "next/link";

type SpeechResult = { isFinal: boolean; 0: { transcript: string } };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { resultIndex: number; results: ArrayLike<SpeechResult> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => Recognition;
  webkitSpeechRecognition?: new () => Recognition;
};
const finishWords = /^(done|finished|complete|completed|listo|lista|hecho|hecha|ya|termin[eé]|siguiente|next)(?:[.!])?$/i;
const repeatWords = /^(repeat|again|repite|repetir|otra vez)(?:[.!])?$/i;
const backWords = /^(back|previous|anterior|atrás|atras)(?:[.!])?$/i;

export default function SharedCookingPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const recipe = getRecipeBySlug(slug);
  // Atomic stages allow hands-free confirmation of each addition.
  const cookieStages: Array<{ textEn: string; textEsMx: string; timers?: { label: string; seconds: number }[] }> = [
    { textEn: "Add half a cup of butter to a large saucepan.", textEsMx: "Agrega media taza de mantequilla a una cacerola grande." },
    { textEn: "Add one and a half cups of white sugar.", textEsMx: "Agrega una taza y media de azúcar blanca." },
    { textEn: "Add half a cup of packed brown sugar.", textEsMx: "Agrega media taza de azúcar morena compactada." },
    { textEn: "Add half a cup of milk.", textEsMx: "Agrega media taza de leche." },
    { textEn: "Add four tablespoons of unsweetened cocoa powder.", textEsMx: "Agrega cuatro cucharadas de cocoa en polvo sin azúcar." },
    { textEn: "Add a pinch of kosher salt.", textEsMx: "Agrega una pizca de sal kosher." },
    { textEn: "Heat and stir the mixture until it reaches a full rolling boil, then boil for one minute.", textEsMx: "Calienta y revuelve hasta que hierva intensamente; después mantén el hervor durante un minuto.", timers: [{ label: "Boil / Hervir", seconds: 60 }] },
    { textEn: "Remove the saucepan from heat. Add half a cup of creamy peanut butter and stir until melted.", textEsMx: "Retira la cacerola del fuego. Agrega media taza de crema de cacahuate y revuelve hasta que se derrita." },
    { textEn: "Stir in two teaspoons of vanilla extract.", textEsMx: "Incorpora dos cucharaditas de extracto de vainilla." },
    { textEn: "Add three cups of dry quick-cooking oats and mix until all the oats are coated.", textEsMx: "Agrega tres tazas de avena seca de cocción rápida y mezcla hasta cubrir toda la avena." },
    { textEn: "Drop tablespoon-sized portions onto wax paper and let them cool until firm.", textEsMx: "Coloca porciones de una cucharada sobre papel encerado y deja enfriar hasta que estén firmes." },
  ];
  const stages = recipe?.slug === "no-bake-chocolate-peanut-butter-oat-cookies" ? cookieStages : (recipe?.steps ?? []);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<number[]>([]);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [message, setMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const recognition = useRef<Recognition | null>(null);
  const active = useRef(false);
  const progress = useRef({ step: 0, checked: [] as number[], lang: "es" as "es" | "en" });
  const speakRef = useRef<(text: string) => void>(() => {});

  useEffect(() => {
    if (!slug) return;
    try {
      const value = JSON.parse(localStorage.getItem(`recetario-cook-${slug}`) ?? "{}") as { step?: number; checked?: number[] };
      const max = stages.length;
      if (typeof value.step === "number" && value.step >= 0 && value.step <= max) setStep(value.step);
      if (Array.isArray(value.checked)) setChecked(value.checked.filter((i) => Number.isInteger(i) && i >= 0 && i < max));
    } catch { /* malformed local storage: start fresh */ }
  }, [slug, recipe]);

  useEffect(() => {
    if (!slug) return;
    try { localStorage.setItem(`recetario-cook-${slug}`, JSON.stringify({ step, checked })); } catch { /* storage optional */ }
    progress.current = { step, checked, lang };
  }, [slug, step, checked, lang]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window as SpeechWindow;
      setSupported(Boolean(w.SpeechRecognition ?? w.webkitSpeechRecognition));
    }
    return () => {
      active.current = false;
      recognition.current?.abort();
      recognition.current = null;
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const say = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = progress.current.lang === "en" ? "en-US" : "es-MX";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  }, []);
  speakRef.current = say;

  const instruction = useCallback((index: number, locale: "es" | "en") => {
    if (!recipe || index >= stages.length) {
      return locale === "en" ? "All steps complete. Enjoy your cookies!" : "Terminaste todos los pasos. ¡Disfruta tus galletas!";
    }
    const s = stages[index];
    return `${locale === "en" ? "Step" : "Paso"} ${index + 1}. ${locale === "en" ? s.textEn : s.textEsMx}`;
  }, [recipe]);

  const complete = useCallback(() => {
    if (!recipe) return;
    const current = progress.current;
    if (current.step >= stages.length) return;
    const next = current.step + 1;
    const nextChecked = Array.from(new Set([...current.checked, current.step]));
    progress.current = { ...current, step: next, checked: nextChecked };
    setChecked(nextChecked);
    setStep(next);
    setMessage(current.lang === "en" ? `Step ${current.step + 1} completed` : `Paso ${current.step + 1} completado`);
    speakRef.current(instruction(next, current.lang));
  }, [recipe, instruction]);

  const processCommand = useCallback((speech: string) => {
    const normalized = speech.trim().toLocaleLowerCase().replace(/[.!?]+$/, "");
    if (finishWords.test(normalized)) complete();
    else if (repeatWords.test(normalized)) speakRef.current(instruction(progress.current.step, progress.current.lang));
    else if (backWords.test(normalized)) {
      const previous = Math.max(0, progress.current.step - 1);
      progress.current.step = previous;
      setStep(previous);
      speakRef.current(instruction(previous, progress.current.lang));
    } else setMessage(progress.current.lang === "en" ? `Not recognized: ${speech}. Say done, repeat, or back.` : `No se reconoció: ${speech}. Di listo, repite o anterior.`);
  }, [complete, instruction]);

  const startVoice = useCallback(() => {
    const w = window as SpeechWindow;
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) { setMessage("Speech recognition unsupported. Use the buttons."); return; }
    if (active.current) return;
    const rec = new Ctor();
    recognition.current = rec;
    rec.lang = progress.current.lang === "en" ? "en-US" : "es-MX";
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) processCommand(event.results[i][0].transcript);
      }
    };
    rec.onerror = event => {
      setMessage(`Microphone / mic: ${event.error}`);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        active.current = false;
        setListening(false);
      }
    };
    rec.onend = () => {
      if (!active.current) { setListening(false); return; }
      // Browsers may stop recognition automatically; restart only on user-enabled sessions.
      try { rec.start(); } catch { active.current = false; setListening(false); }
    };
    active.current = true;
    try { rec.start(); setListening(true); say(instruction(progress.current.step, progress.current.lang)); }
    catch { active.current = false; setListening(false); setMessage("Unable to start microphone."); }
  }, [instruction, processCommand, say]);

  const stopVoice = () => {
    active.current = false;
    recognition.current?.abort();
    recognition.current = null;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setListening(false);
  };

  async function share() {
    const url = window.location.href.split("?")[0];
    try {
      if (navigator.share) await navigator.share({ title: recipe?.titleEn ?? "Recetario Vivo", url });
      else { await navigator.clipboard.writeText(url); setShareMessage(lang === "en" ? "Link copied" : "Enlace copiado"); }
    } catch { setShareMessage(lang === "en" ? "Copy the address from your browser" : "Copia la dirección de tu navegador"); }
  }

  if (!recipe) return <main className="min-h-screen p-12"><h1>Receta no encontrada / Recipe not found</h1><Link href="/recetas">Recetas</Link></main>;
  const done = step >= stages.length;
  const currentStep = stages[step];
  return (
    <main className="min-h-screen bg-[#F8F1E4] text-[#1F1B16] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex gap-3 justify-between items-center">
          <Link href={`/recetas/${recipe.slug}`} className="underline text-sm">{lang === "en" ? "Full recipe" : "Receta completa"}</Link>
          <div className="flex gap-2">
            <button type="button" onClick={() => { stopVoice(); setLang("es"); progress.current.lang = "es"; }} aria-pressed={lang === "es"} className="border rounded px-3 py-1">ES</button>
            <button type="button" onClick={() => { stopVoice(); setLang("en"); progress.current.lang = "en"; }} aria-pressed={lang === "en"} className="border rounded px-3 py-1">EN</button>
          </div>
        </div>
        <h1 className="text-3xl font-bold">{lang === "en" ? recipe.titleEn : recipe.titleEsMx}</h1>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={share} className="rounded-full px-5 py-3 bg-[#7A2E22] text-white">{lang === "en" ? "Share this recipe" : "Compartir receta"}</button>
          <button type="button" onClick={listening ? stopVoice : startVoice} disabled={!supported} className="rounded-full px-5 py-3 border border-[#7A2E22] disabled:opacity-50">
            {listening ? (lang === "en" ? "Stop listening" : "Dejar de escuchar") : (lang === "en" ? "Start voice guide" : "Iniciar guía de voz")}
          </button>
        </div>
        <p role="status" aria-live="polite" className="text-sm">{shareMessage || message || (!supported ? (lang === "en" ? "Microphone unavailable in this browser. Buttons still work." : "Micrófono no disponible. Puedes usar los botones.") : "")}</p>
        <p className="text-sm text-[#555]">{lang === "en" ? "Each person has their own progress on their device. Say 'done', 'repeat', or 'back'." : "Cada persona guarda su progreso en su dispositivo. Di 'listo', 'repite' o 'anterior'."}</p>
        <section className="bg-white rounded-2xl p-5 border border-[#D4C5A0]">
          <h2 className="font-bold text-xl mb-3">{lang === "en" ? "Ingredients" : "Ingredientes"}</h2>
          <ul className="space-y-2">{recipe.ingredients.map((ing,i)=><li key={i} className="text-sm">{lang === "en" ? ing.originalEn : ing.esMx}</li>)}</ul>
        </section>
        <section className="bg-white rounded-2xl p-5 border border-[#D4C5A0] space-y-4">
          <p className="font-semibold">{lang === "en" ? "Progress" : "Progreso"}: {checked.length} / {stages.length}</p>
          <div className="w-full h-2 bg-[#EFE2C6] rounded-full overflow-hidden"><div className="h-full bg-[#5E7C47]" style={{ width: `${checked.length / stages.length * 100}%` }}/></div>
          <h2 className="font-bold text-2xl">{done ? (lang === "en" ? "Finished!" : "¡Terminado!") : `${lang === "en" ? "Step" : "Paso"} ${step + 1}`}</h2>
          <p className="text-lg leading-relaxed">{done ? (lang === "en" ? "Your cookies are ready to cool and enjoy." : "Deja enfriar las galletas y disfrútalas.") : (lang === "en" ? currentStep.textEn : currentStep.textEsMx)}</p>
          {currentStep?.timers?.map((timer,i)=><p className="text-sm" key={i}>{lang === "en" ? "Suggested timer" : "Temporizador sugerido"}: {timer.seconds} {lang === "en" ? "seconds" : "segundos"} — {lang === "en" ? "not started automatically" : "no se inicia automáticamente"}</p>)}
          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={done} onClick={complete} className="bg-[#5E7C47] text-white px-5 py-3 rounded-lg disabled:opacity-50">{lang === "en" ? "Done — next step" : "Listo — siguiente paso"}</button>
            <button type="button" onClick={() => say(instruction(step,lang))} className="border px-4 py-3 rounded-lg">{lang === "en" ? "Read aloud" : "Leer en voz alta"}</button>
            <button type="button" disabled={step===0} onClick={()=> { setStep(x=>Math.max(0,x-1)); progress.current.step=Math.max(0,step-1); }} className="border px-4 py-3 rounded-lg disabled:opacity-50">{lang === "en" ? "Back" : "Anterior"}</button>
          </div>
        </section>
        <section className="bg-white rounded-2xl p-5 border border-[#D4C5A0]">
          <h2 className="font-bold mb-3">{lang === "en" ? "Step checklist" : "Lista de pasos"}</h2>
          <ol className="space-y-3">
            {stages.map((item,i)=><li key={i}>
              <button type="button" onClick={()=> { if (i===step) complete(); else { const next=checked.includes(i) ? checked.filter(n=>n!==i) : [...checked,i]; setChecked(next); progress.current.checked=next; } }} aria-label={`${checked.includes(i) ? "Uncheck" : "Check"} step ${i+1}`} className="flex text-left items-start gap-3 w-full">
                <span aria-hidden="true" className="border-2 rounded w-6 h-6 text-center shrink-0">{checked.includes(i) ? "✓" : ""}</span>
                <span className={checked.includes(i) ? "line-through opacity-50" : ""}>{i+1}. {lang === "en" ? item.textEn : item.textEsMx}</span>
              </button>
            </li>)}
          </ol>
        </section>
        <p className="text-xs text-[#555]">{lang === "en" ? "Original user-contributed recipe, adapted from a photographed printout citing Food.com recipe 23821 (2017). Do not interpret this as the original Good and Cheap cookbook content." : "Receta aportada por un usuario, adaptada de una impresión que cita Food.com receta 23821 (2017). No pertenece al libro original Bueno y Barato."}</p>
      </div>
    </main>
  );
}
