import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Activity, Sliders, Radio, Volume2, ShieldAlert, Cpu, Gauge, Thermometer, Waves } from "lucide-react";
import { Expedition } from "../types";
import { EXPEDITIONS } from "../data";
import { lithosAudio } from "../audioEngine";

interface SpectrogramDeckProps {
  activeExpedition: Expedition;
  onSelectExpedition: (exp: Expedition) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const SpectrogramDeck: React.FC<SpectrogramDeckProps> = ({
  activeExpedition,
  onSelectExpedition,
  isPlaying,
  onTogglePlay,
}) => {
  const [visualizerMode, setVisualizerMode] = useState<"waveform" | "spectrogram">("waveform");
  const [filterCutoff, setFilterCutoff] = useState(140);
  const [hydroGain, setHydroGain] = useState(0.75);
  const [subBassBoost, setSubBassBoost] = useState(true);
  const [stereoWidth, setStereoWidth] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Sync controls with audioEngine
  const handleCutoffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFilterCutoff(val);
    lithosAudio.setFilterCutoff(val);
  };

  const handleGainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setHydroGain(val);
    lithosAudio.setHydrophoneGain(val);
  };

  const handleSubBassToggle = () => {
    const active = lithosAudio.toggleSubBassBoost();
    setSubBassBoost(active);
  };

  const handleStereoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setStereoWidth(val);
    lithosAudio.setStereoWidth(val);
  };

  // Real-time canvas rendering loop (Waveform & Spectrogram)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let historySpectrogram: ImageData | null = null;

    const render = () => {
      const analyser = lithosAudio.getAnalyser();
      const width = canvas.width;
      const height = canvas.height;

      if (!analyser || !isPlaying) {
        // Idle animation / standing noise line
        ctx.fillStyle = "#0A0A0B";
        ctx.fillRect(0, 0, width, height);

        // Draw center horizon datum
        ctx.strokeStyle = "#27272D";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        // Idle sub-frequency wave
        ctx.strokeStyle = "rgba(56, 239, 125, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const t = Date.now() * 0.002;
        for (let x = 0; x < width; x += 4) {
          const y = height / 2 + Math.sin(x * 0.015 + t) * 6 + Math.sin(x * 0.04 - t * 0.5) * 4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Overlay text
        ctx.fillStyle = "#8F8E8A";
        ctx.font = "10px Space Mono";
        ctx.fillText("TRANSDUCER STANDBY // CLICK [ENGAGE INFRASOUND SYNTHESIZER] TO INITIALIZE WEBAUDIO MATRIX", 20, height - 20);

        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      if (visualizerMode === "waveform") {
        // Time-domain Oscillogram
        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // Fade background slightly for persistence trail
        ctx.fillStyle = "rgba(10, 10, 11, 0.28)";
        ctx.fillRect(0, 0, width, height);

        // Draw frequency grid lines
        ctx.strokeStyle = "rgba(39, 39, 45, 0.6)";
        ctx.lineWidth = 0.5;
        for (let y = 0; y < height; y += height / 4) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Draw Primary Waveform (Phosphor Green)
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#38EF7D";
        ctx.shadowColor = "#38EF7D";
        ctx.shadowBlur = 8;
        ctx.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

          x += sliceWidth;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Sub-harmonic inverted wave (Rust Orange reflection)
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(217, 78, 40, 0.4)";
        ctx.beginPath();
        x = 0;
        for (let i = 0; i < bufferLength; i += 2) {
          const v = dataArray[i] / 128.0;
          const y = height / 2 - (v - 1.0) * (height / 2.5);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth * 2;
        }
        ctx.stroke();
      } else {
        // Waterfall Frequency Spectrogram
        const bufferLength = analyser.frequencyBinCount;
        const freqArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(freqArray);

        // Shift existing canvas image up by 2 pixels to create continuous waterfall
        if (historySpectrogram) {
          ctx.drawImage(canvas, 0, 0, width, height - 2, 0, 2, width, height - 2);
        }

        // Draw new frequency spectrum slice at top
        const barWidth = width / 120; // focus on first 120 bins (low-frequency infrasound)
        for (let i = 0; i < 120; i++) {
          const val = freqArray[i] / 255.0;
          // Color ramp: Black -> Basalt -> Rust -> Phosphor
          let r = 0, g = 0, b = 0;
          if (val < 0.3) {
            r = Math.floor(val * 3 * 39);
            g = Math.floor(val * 3 * 39);
            b = Math.floor(val * 3 * 45);
          } else if (val < 0.7) {
            const ratio = (val - 0.3) / 0.4;
            r = Math.floor(39 + ratio * (217 - 39));
            g = Math.floor(39 + ratio * (78 - 39));
            b = Math.floor(45 + ratio * (40 - 45));
          } else {
            const ratio = (val - 0.7) / 0.3;
            r = Math.floor(217 - ratio * 160);
            g = Math.floor(78 + ratio * (239 - 78));
            b = Math.floor(40 + ratio * (125 - 40));
          }

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(i * barWidth, 0, barWidth + 1, 3);
        }

        historySpectrogram = ctx.getImageData(0, 0, width, height);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, visualizerMode]);

  return (
    <section id="synthesizer" className="w-full bg-[#0A0A0B] border-b border-[#27272D] px-4 lg:px-12 py-16 text-[#ECEAE4]">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#27272D]">
        <div>
          <div className="flex items-center gap-2 text-[#D94E28] font-mono text-[10px] tracking-widest uppercase mb-2">
            <Radio size={14} className="text-[#D94E28]" />
            SECTION 02 // SEISMIC FREQUENCY SYNTHESIZER
          </div>
          <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#ECEAE4] uppercase">
            SPECTROGRAM & FIELD AUDIO DECK
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#8F8E8A] mt-2 max-w-2xl">
            Client-side Web Audio API infrasonic generator reproducing harmonic cavity resonance, sub-glacial cryo-acoustics, and deep tectonic shear waves with zero external audio assets.
          </p>
        </div>

        {/* Visualizer Mode Toggle */}
        <div className="flex items-center gap-2 bg-[#141416] p-1 border border-[#27272D] text-[11px] font-mono self-start lg:self-auto">
          <button
            onClick={() => setVisualizerMode("waveform")}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${
              visualizerMode === "waveform"
                ? "bg-[#D94E28] text-white font-bold"
                : "text-[#8F8E8A] hover:text-[#ECEAE4]"
            }`}
          >
            OSCILLOGRAM (TIME)
          </button>
          <button
            onClick={() => setVisualizerMode("spectrogram")}
            className={`px-3 py-1.5 transition-colors cursor-pointer ${
              visualizerMode === "spectrogram"
                ? "bg-[#D94E28] text-white font-bold"
                : "text-[#8F8E8A] hover:text-[#ECEAE4]"
            }`}
          >
            WATERFALL SPECTROGRAM (0-250Hz)
          </button>
        </div>
      </div>

      {/* Main Field Deck Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Canvas Spectrogram & Real-time Monitor (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Canvas Container */}
          <div className="relative w-full aspect-[16/9] max-h-[460px] bg-[#0A0A0B] border border-[#27272D] overflow-hidden shadow-2xl">
            <canvas
              ref={canvasRef}
              width={960}
              height={540}
              className="w-full h-full object-cover block"
            />

            {/* In-Canvas Telemetry HUD */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 text-[10px] font-mono text-[#8F8E8A] pointer-events-none bg-[#0A0A0B]/85 p-2.5 border border-[#27272D]">
              <span className="text-[#38EF7D] font-bold">
                STREAM // {activeExpedition.code}: {activeExpedition.title.split(":")[0]}
              </span>
              <span>CARRIER FUNDAMENTAL: {activeExpedition.baseFrequency} Hz</span>
              <span>FILTER CUTOFF: {filterCutoff} Hz // Q: 3.2</span>
              <span>INFRASOUND BOOST: {subBassBoost ? "+9.0 dB @ 45Hz" : "BYPASSED"}</span>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-[#0A0A0B]/85 p-2 border border-[#27272D] text-[10px] font-mono">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#38EF7D] animate-ping" : "bg-[#8F8E8A]"}`} />
              <span className={isPlaying ? "text-[#38EF7D] font-bold" : "text-[#8F8E8A]"}>
                {isPlaying ? "ACTIVE SYNTHESIS" : "IDLE"}
              </span>
            </div>
          </div>

          {/* Master Transport & Controls Bar */}
          <div className="bg-[#141416] border border-[#27272D] p-5 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onTogglePlay}
                className={`flex items-center gap-2.5 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  isPlaying
                    ? "bg-[#D94E28] text-white border-[#D94E28] shadow-[0_0_20px_rgba(217,78,40,0.4)]"
                    : "bg-[#27272D] hover:bg-[#35353D] text-[#ECEAE4] border-[#35353D]"
                }`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                {isPlaying ? "HALT AUDIO TRANSDUCTION" : "ENGAGE INFRASOUND SYNTHESIZER"}
              </button>

              <button
                onClick={handleSubBassToggle}
                className={`px-4 py-3 font-mono text-xs font-bold border transition-colors cursor-pointer ${
                  subBassBoost
                    ? "bg-[#27272D] text-[#38EF7D] border-[#38EF7D]"
                    : "bg-[#141416] text-[#8F8E8A] border-[#27272D] hover:text-[#ECEAE4]"
                }`}
                title="Toggle +9dB low-shelf infrasound boost"
              >
                SUB-BASS BOOST {subBassBoost ? "[ON]" : "[OFF]"}
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="text-[11px] font-mono text-[#8F8E8A]">
              DEPTH: <span className="text-[#D94E28] font-bold">{activeExpedition.depthMeters}m</span> // SAMPLING: <span className="text-[#ECEAE4]">192 kHz / 32-bit</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Parameter Sliders & Scientific Telemetry (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Acoustic Parameter Modulation Box */}
          <div className="bg-[#141416] border border-[#27272D] p-6">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#ECEAE4] uppercase pb-4 border-b border-[#27272D]">
              <Sliders size={14} className="text-[#D94E28]" />
              TRANSDUCER ACOUSTIC PARAMETERS
            </div>

            <div className="flex flex-col gap-5 mt-5 font-mono text-xs">
              {/* Filter Cutoff Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#8F8E8A] text-[11px]">STRATA LOW-PASS FILTER</span>
                  <span className="text-[#D94E28] font-bold">{filterCutoff} Hz</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="240"
                  step="2"
                  value={filterCutoff}
                  onChange={handleCutoffChange}
                  className="w-full accent-[#D94E28] bg-[#27272D] h-1.5 appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#8F8E8A] mt-1">
                  <span>20 Hz (Deep Crust)</span>
                  <span>240 Hz (Surface Fumarole)</span>
                </div>
              </div>

              {/* Hydrophone Gain Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#8F8E8A] text-[11px]">PREAMP SENSITIVITY GAIN</span>
                  <span className="text-[#38EF7D] font-bold">{Math.round(hydroGain * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.2"
                  step="0.05"
                  value={hydroGain}
                  onChange={handleGainChange}
                  className="w-full accent-[#38EF7D] bg-[#27272D] h-1.5 appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#8F8E8A] mt-1">
                  <span>-196 dB</span>
                  <span>-140 dB re 1V/µPa</span>
                </div>
              </div>

              {/* Stereo Width Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#8F8E8A] text-[11px]">HYDROPHONE STEREO SPREAD</span>
                  <span className="text-[#ECEAE4] font-bold">
                    {stereoWidth === 0 ? "BINAURAL CENTER" : stereoWidth < 0 ? `PORT ${Math.abs(Math.round(stereoWidth * 100))}%` : `STARBOARD ${Math.round(stereoWidth * 100)}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={stereoWidth}
                  onChange={handleStereoChange}
                  className="w-full accent-[#ECEAE4] bg-[#27272D] h-1.5 appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Expedition Specific Sensor Telemetry Data */}
          <div className="bg-[#141416] border border-[#27272D] p-6 font-mono text-xs">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#ECEAE4] uppercase pb-4 border-b border-[#27272D]">
              <Cpu size={14} className="text-[#38EF7D]" />
              DOWNHOLE TELEMETRY: {activeExpedition.code}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-[11px]">
              <div className="bg-[#0A0A0B] p-2.5 border border-[#27272D]">
                <span className="text-[#8F8E8A] block text-[9px]">TEMPERATURE</span>
                <span className="text-[#ECEAE4] font-bold flex items-center gap-1 mt-0.5">
                  <Thermometer size={12} className="text-[#D94E28]" />
                  {activeExpedition.temperatureC > 0 ? `+${activeExpedition.temperatureC}` : activeExpedition.temperatureC}° C
                </span>
              </div>

              <div className="bg-[#0A0A0B] p-2.5 border border-[#27272D]">
                <span className="text-[#8F8E8A] block text-[9px]">PRESSURE HEAD</span>
                <span className="text-[#ECEAE4] font-bold flex items-center gap-1 mt-0.5">
                  <Gauge size={12} className="text-[#FFB800]" />
                  {activeExpedition.pressureBar} BAR
                </span>
              </div>

              <div className="bg-[#0A0A0B] p-2.5 border border-[#27272D] col-span-2">
                <span className="text-[#8F8E8A] block text-[9px]">SENSOR SERIAL ID</span>
                <span className="text-[#38EF7D] font-bold">{activeExpedition.sensorSerial}</span>
              </div>

              <div className="bg-[#0A0A0B] p-2.5 border border-[#27272D] col-span-2">
                <span className="text-[#8F8E8A] block text-[9px]">GEOLOGICAL STRATA FORMATION</span>
                <span className="text-[#ECEAE4] text-[10px] mt-0.5 block">{activeExpedition.strata}</span>
              </div>
            </div>

            {/* Field Notes Excerpt */}
            <div className="mt-4 pt-3 border-t border-[#27272D] text-[10px] text-[#8F8E8A] leading-relaxed">
              <span className="text-[#D94E28] font-bold block mb-1">FIELD NOTE EXCERPT:</span>
              "{activeExpedition.fieldNotes}"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
