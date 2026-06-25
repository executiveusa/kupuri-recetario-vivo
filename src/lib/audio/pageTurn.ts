let audioContext: AudioContext | null = null;
let isMuted = false;
let volume = 0.3;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }

  return buffer;
}

export function playPageTurn(): void {
  if (isMuted || typeof window === "undefined") return;

  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const duration = 0.25;

  const noiseBuffer = createNoiseBuffer(ctx, duration);
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(volume * 0.15, now + 0.02);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(3000, now);
  bandpass.frequency.exponentialRampToValueAtTime(800, now + duration);
  bandpass.Q.value = 0.8;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 200;

  noiseSource.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  const swooshOsc = ctx.createOscillator();
  swooshOsc.type = "sine";
  swooshOsc.frequency.setValueAtTime(600, now);
  swooshOsc.frequency.exponentialRampToValueAtTime(150, now + duration * 0.8);

  const swooshGain = ctx.createGain();
  swooshGain.gain.setValueAtTime(0, now);
  swooshGain.gain.linearRampToValueAtTime(volume * 0.04, now + 0.01);
  swooshGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.6);

  swooshOsc.connect(swooshGain);
  swooshGain.connect(ctx.destination);

  const clickOsc = ctx.createOscillator();
  clickOsc.type = "triangle";
  clickOsc.frequency.value = 1200;

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(volume * 0.1, now + 0.005);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);

  noiseSource.start(now);
  noiseSource.stop(now + duration);

  swooshOsc.start(now);
  swooshOsc.stop(now + duration);

  clickOsc.start(now + 0.005);
  clickOsc.stop(now + 0.04);
}

export function setPageTurnMuted(muted: boolean): void {
  isMuted = muted;
}

export function isPageTurnMuted(): boolean {
  return isMuted;
}

export function setPageTurnVolume(v: number): void {
  volume = Math.max(0, Math.min(1, v));
}

export function getPageTurnVolume(): number {
  return volume;
}

export function disposeAudioContext(): void {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
