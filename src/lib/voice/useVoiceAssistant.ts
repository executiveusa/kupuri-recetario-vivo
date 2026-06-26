"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { parseVoiceInput, type ParsedCommand } from "./commands";

/* ------------------------------------------------------------------ */
/* Browser compatibility shim                                         */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionInstance = any;

function getSpeechRecognitionCtor():
  | (new () => SpeechRecognitionInstance)
  | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/* ------------------------------------------------------------------ */
/* Hook return type                                                   */
/* ------------------------------------------------------------------ */

export interface UseVoiceAssistantReturn {
  /** Whether the mic is actively listening */
  isListening: boolean;
  /** Latest partial/interim transcript */
  transcript: string;
  /** Latest finalized transcript */
  finalTranscript: string;
  /** Start capturing voice input */
  startListening: () => void;
  /** Stop capturing voice input */
  stopListening: () => void;
  /** Whether Web Speech API is supported */
  isSupported: boolean;
  /** Last recognised command (null if no match) */
  lastCommand: ParsedCommand | null;
  /** Clear the last command */
  clearLastCommand: () => void;
}

/* ------------------------------------------------------------------ */
/* Hook options                                                       */
/* ------------------------------------------------------------------ */

export interface UseVoiceAssistantOptions {
  /** BCP-47 language code (default: "es-MX") */
  lang?: string;
  /** Keep listening after each result (default: false) */
  continuous?: boolean;
  /** Show interim (partial) results (default: true) */
  interimResults?: boolean;
  /** Callback when a command is parsed */
  onCommand?: (cmd: ParsedCommand) => void;
}

/* ------------------------------------------------------------------ */
/* Hook implementation                                                */
/* ------------------------------------------------------------------ */

export function useVoiceAssistant(
  options: UseVoiceAssistantOptions = {}
): UseVoiceAssistantReturn {
  const {
    lang = "es-MX",
    continuous = false,
    interimResults = true,
    onCommand,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState<ParsedCommand | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSupported, _setIsSupported] = useState(() =>
    typeof window !== "undefined" ? getSpeechRecognitionCtor() !== null : false
  );

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onCommandRef = useRef(onCommand);

  useEffect(() => {
    onCommandRef.current = onCommand;
  }, [onCommand]);


  /* Build recognition instance lazily */
  const getRecognition = useCallback((): SpeechRecognitionInstance | null => {
    if (recognitionRef.current) return recognitionRef.current;
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return null;

    const rec = new Ctor();
    rec.lang = lang;
    rec.continuous = continuous;
    rec.interimResults = interimResults;
    rec.maxAlternatives = 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;
        if (result.isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }

      if (interim) setTranscript(interim);

      if (final) {
        setFinalTranscript(final);
        setTranscript(final);

        const parsed = parseVoiceInput(final);
        if (parsed) {
          setLastCommand(parsed);
          onCommandRef.current?.(parsed);
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (event: any) => {
      if (event.error === "aborted" || event.error === "no-speech") {
        // benign errors
      } else {
        console.warn("[VoiceAssistant] recognition error:", event.error);
      }
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
    return rec;
  }, [lang, continuous, interimResults]);

  /* Start */
  const startListening = useCallback(() => {
    const rec = getRecognition();
    if (!rec) return;
    try {
      setTranscript("");
      setFinalTranscript("");
      rec.start();
      setIsListening(true);
    } catch {
      // already started
    }
  }, [getRecognition]);

  /* Stop */
  const stopListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.stop();
      } catch {
        // not started
      }
    }
    setIsListening(false);
  }, []);

  /* Clear last command */
  const clearLastCommand = useCallback(() => {
    setLastCommand(null);
  }, []);

  /* Clean up on unmount */
  useEffect(() => {
    return () => {
      const rec = recognitionRef.current;
      if (rec) {
        try {
          rec.abort();
        } catch {
          /* noop */
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    finalTranscript,
    startListening,
    stopListening,
    isSupported,
    lastCommand,
    clearLastCommand,
  };
}
