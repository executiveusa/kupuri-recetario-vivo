/**
 * Browser-native speech synthesis wrapper.
 * Uses the Web Speech API — no external services required.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let currentUtterance: SpeechSynthesisUtterance | null = null;

/** Speak the given text aloud using the browser's speech synthesis. */
export function speak(text: string, lang = "es-MX"): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  stop();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  // Respect the selected language; avoid assigning a Spanish voice to English text.
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase())
    ?? voices.find((v) => v.lang.toLowerCase().startsWith(lang.split("-")[0].toLowerCase()));
  if (matchingVoice) utterance.voice = matchingVoice;

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/** Stop any current speech. */
export function stop(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

export const stopSpeaking = stop;

/** Check if speech synthesis is currently speaking. */
export function isSpeaking(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window))
    return false;
  return window.speechSynthesis.speaking;
}

/** Check if the browser supports speech synthesis. */
export function isSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window;
}
