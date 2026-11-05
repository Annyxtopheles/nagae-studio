// LITHOS Subterra Web Audio API Infrasound Synthesizer Engine
import { Expedition } from "./types";

class LithosAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentExpedition: Expedition | null = null;

  // Nodes
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private infrasoundBoost: BiquadFilterNode | null = null;
  private pannerNode: StereoPannerNode | null = null;
  private analyserNode: AnalyserNode | null = null;

  // Sound sources
  private baseOsc: OscillatorNode | null = null;
  private harmonicOscs: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  // State parameters
  private filterCutoff: number = 140; // Hz
  private subBassBoost: boolean = true;
  private hydrophoneGain: number = 0.75;
  private stereoWidth: number = 0; // -1 to 1

  // Callbacks for UI updates
  private onStateChangeCallbacks: Array<(playing: boolean) => void> = [];

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.onStateChangeCallbacks.push(cb);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter(c => c !== cb);
    };
  }

  private notify() {
    this.onStateChangeCallbacks.forEach(cb => cb(this.isPlaying));
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyserNode;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentExpedition(): Expedition | null {
    return this.currentExpedition;
  }

  // Generates 4 seconds of brownian / seismic tectonic noise
  private createSeismicNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brownian / integrated noise (heavy low-frequency emphasis)
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    return buffer;
  }

  public play(expedition: Expedition) {
    this.initContext();
    if (!this.ctx) return;

    // If already playing the same expedition, do nothing
    if (this.isPlaying && this.currentExpedition?.id === expedition.id) {
      return;
    }

    // If playing another expedition, stop first
    if (this.isPlaying) {
      this.stop();
    }

    this.currentExpedition = expedition;
    const now = this.ctx.currentTime;

    // 1. Analyser Node for Visualizers
    this.analyserNode = this.ctx.createAnalyser();
    this.analyserNode.fftSize = 1024;
    this.analyserNode.smoothingTimeConstant = 0.85;

    // 2. Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(this.hydrophoneGain, now + 1.2);

    // 3. Stereo Panner
    if (this.ctx.createStereoPanner) {
      this.pannerNode = this.ctx.createStereoPanner();
      this.pannerNode.pan.setValueAtTime(this.stereoWidth, now);
    }

    // 4. Low-pass Filter (Tectonic Acoustic Strata Filter)
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.frequency.setValueAtTime(this.filterCutoff, now);
    this.filterNode.Q.setValueAtTime(3.2, now);

    // 5. Infrasound Sub-bass Peaking / Shelf Filter
    this.infrasoundBoost = this.ctx.createBiquadFilter();
    this.infrasoundBoost.type = "lowshelf";
    this.infrasoundBoost.frequency.setValueAtTime(45, now);
    this.infrasoundBoost.gain.setValueAtTime(this.subBassBoost ? 9.0 : 0.0, now);

    // 6. Primary Fundamental Earth Oscillator
    this.baseOsc = this.ctx.createOscillator();
    this.baseOsc.type = expedition.ambientType === "cryo-resonance" ? "sine" : expedition.ambientType === "magma-infrasound" ? "triangle" : "sawtooth";
    this.baseOsc.frequency.setValueAtTime(expedition.baseFrequency, now);

    // 7. Slow LFO for tectonic swell & pressure fluctuations
    this.lfoOsc = this.ctx.createOscillator();
    this.lfoOsc.type = "sine";
    this.lfoOsc.frequency.setValueAtTime(0.12, now); // 8-second cycle

    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(expedition.baseFrequency * 0.08, now);
    this.lfoOsc.connect(this.lfoGain);
    this.lfoGain.connect(this.baseOsc.frequency);

    // 8. Harmonic overtone resonators
    this.harmonicOscs = [];
    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.35, now);

    expedition.harmonicRatios.forEach((ratio, idx) => {
      if (!this.ctx) return;
      const harm = this.ctx.createOscillator();
      harm.type = idx % 2 === 0 ? "sine" : "triangle";
      harm.frequency.setValueAtTime(expedition.baseFrequency * ratio, now);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.25 / (idx + 1), now);

      harm.connect(subGain);
      subGain.connect(this.filterNode!);
      harm.start(now);
      this.harmonicOscs.push(harm);
    });

    // 9. Subterranean Brownian / Tectonic Noise Bed
    const noiseBuffer = this.createSeismicNoiseBuffer(this.ctx);
    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(expedition.noiseFloor, now);

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(expedition.ambientType === "cavern-reverb" ? 220 : 95, now);

    this.noiseNode.connect(noiseFilter);
    noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.filterNode);

    // Routing graph
    this.baseOsc.connect(this.filterNode);
    this.filterNode.connect(this.infrasoundBoost);

    if (this.pannerNode) {
      this.infrasoundBoost.connect(this.pannerNode);
      this.pannerNode.connect(this.masterGain);
    } else {
      this.infrasoundBoost.connect(this.masterGain);
    }

    this.masterGain.connect(this.analyserNode);
    this.analyserNode.connect(this.ctx.destination);

    // Start playback
    this.baseOsc.start(now);
    this.lfoOsc.start(now);
    this.noiseNode.start(now);

    this.isPlaying = true;
    this.notify();
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
    }

    setTimeout(() => {
      try {
        this.baseOsc?.stop();
        this.baseOsc?.disconnect();
        this.lfoOsc?.stop();
        this.lfoOsc?.disconnect();
        this.noiseNode?.stop();
        this.noiseNode?.disconnect();
        this.harmonicOscs.forEach(o => {
          try {
            o.stop();
            o.disconnect();
          } catch {}
        });
        this.harmonicOscs = [];
      } catch {}
      this.isPlaying = false;
      this.notify();
    }, 650);
  }

  public togglePlay(expedition: Expedition) {
    if (this.isPlaying && this.currentExpedition?.id === expedition.id) {
      this.stop();
    } else {
      this.play(expedition);
    }
  }

  public setFilterCutoff(hz: number) {
    this.filterCutoff = hz;
    if (this.filterNode && this.ctx) {
      this.filterNode.frequency.setTargetAtTime(hz, this.ctx.currentTime, 0.05);
    }
  }

  public toggleSubBassBoost() {
    this.subBassBoost = !this.subBassBoost;
    if (this.infrasoundBoost && this.ctx) {
      this.infrasoundBoost.gain.setTargetAtTime(this.subBassBoost ? 9.0 : 0.0, this.ctx.currentTime, 0.08);
    }
    return this.subBassBoost;
  }

  public getSubBassBoost(): boolean {
    return this.subBassBoost;
  }

  public setHydrophoneGain(val: number) {
    this.hydrophoneGain = Math.max(0, Math.min(1.2, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.hydrophoneGain, this.ctx.currentTime, 0.05);
    }
  }

  public getHydrophoneGain(): number {
    return this.hydrophoneGain;
  }

  public setStereoWidth(val: number) {
    this.stereoWidth = Math.max(-1, Math.min(1, val));
    if (this.pannerNode && this.ctx) {
      this.pannerNode.pan.setTargetAtTime(this.stereoWidth, this.ctx.currentTime, 0.05);
    }
  }
}

export const lithosAudio = new LithosAudioEngine();
