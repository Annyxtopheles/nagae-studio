import React, { useState, useEffect, useRef } from "react";
import { Compass, ArrowDownRight, Radio, Volume2, ShieldAlert, Activity, Play, Pause, Layers } from "lucide-react";
import { Expedition } from "../types";
import { EXPEDITIONS } from "../data";
import { lithosAudio } from "../audioEngine";

interface TopographicHeroProps {
  activeExpedition: Expedition;
  onSelectExpedition: (exp: Expedition) => void;
  onLaunchSynthesizer: () => void;
}

export const TopographicHero: React.FC<TopographicHeroProps> = ({
  activeExpedition,
  onSelectExpedition,
  onLaunchSynthesizer,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const seismographCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Sync local playing state with audio engine
  useEffect(() => {
    const unsub = lithosAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  // Continuous, 100% reliable 2D Seismograph Drum Canvas Animation
  useEffect(() => {
    const canvas = seismographCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let offset = 0;
    const history: number[] = new Array(120).fill(0);

    const draw = () => {
      offset += 0.05;
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Dark strata background
      ctx.fillStyle = "#0D0D0F";
      ctx.fillRect(0, 0, width, height);

      // Fine horizontal seismograph baseline & grid lines
      ctx.strokeStyle = "rgba(39, 39, 45, 0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.moveTo(0, midY - 20);
      ctx.lineTo(width, midY - 20);
      ctx.moveTo(0, midY + 20);
      ctx.lineTo(width, midY + 20);
      ctx.stroke();

      // Compute next tremor amplitude based on expedition characteristics & playing state
      const tremorBase = isPlaying ? 16 : 5;
      const freqMultiplier = activeExpedition.baseFrequency * 0.05;
      const nextVal =
        Math.sin(offset * freqMultiplier) * tremorBase +
        Math.sin(offset * 0.3) * (tremorBase * 0.4) +
        (Math.random() - 0.5) * (isPlaying ? 8 : 2);

      history.push(nextVal);
      if (history.length > 120) history.shift();

      // Draw seismograph trace line
      ctx.lineWidth = 1.75;
      ctx.strokeStyle = isPlaying ? "#38EF7D" : "#D94E28";
      ctx.shadowColor = isPlaying ? "#38EF7D" : "#D94E28";
      ctx.shadowBlur = 6;
      ctx.beginPath();

      const step = width / (history.length - 1);
      for (let i = 0; i < history.length; i++) {
        const x = i * step;
        const y = midY + history[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw active recording needle point
      const lastX = width - 4;
      const lastY = midY + history[history.length - 1];
      ctx.fillStyle = "#ECEAE4";
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activeExpedition, isPlaying]);

  const handleAuditionClick = () => {
    lithosAudio.togglePlay(activeExpedition);
  };

  return (
    <section id="hero" className="w-full bg-[#0A0A0B] border-b border-[#27272D] px-4 lg:px-12 py-8 select-none">
      {/* 1. Precision Technical Telemetry Header Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[#27272D] pb-5 text-xs font-mono">
        <div className="flex items-center gap-3">
          <Compass size={15} className="text-[#38EF7D] shrink-0" />
          <div>
            <span className="text-[#8F8E8A] block text-[9px] uppercase tracking-widest">STATION COORDINATES</span>
            <span className="text-[#ECEAE4] font-bold">{activeExpedition.coordinates}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ArrowDownRight size={15} className="text-[#D94E28] shrink-0" />
          <div>
            <span className="text-[#8F8E8A] block text-[9px] uppercase tracking-widest">RECORDING DEPTH</span>
            <span className="text-[#D94E28] font-bold">{activeExpedition.depthMeters.toLocaleString()} METERS BSL</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:justify-end">
          <Radio size={15} className="text-[#38EF7D] shrink-0" />
          <div className="md:text-right">
            <span className="text-[#8F8E8A] block text-[9px] uppercase tracking-widest">TRANSDUCER FREQUENCY</span>
            <span className="text-[#38EF7D] font-bold">{activeExpedition.frequencyBand}</span>
          </div>
        </div>
      </div>

      {/* 2. Main High-Craft Split Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 lg:py-14 items-center">
        {/* Left Column: Monumental Brand Narrative (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141416] border border-[#27272D] text-[#D94E28] text-[10px] font-mono tracking-widest uppercase mb-4">
            <ShieldAlert size={12} className="text-[#D94E28]" />
            GEOPHYSICAL FIELD ARCHIVE // EST. 2024
          </div>

          <h1 className="font-['Cinzel'] font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#ECEAE4] uppercase leading-none">
            LITHOS
          </h1>

          <p className="font-['Cinzel'] text-sm sm:text-base text-[#D94E28] tracking-widest uppercase font-bold mt-3">
            Subterra Acoustic & Seismological Field Archive
          </p>

          <p className="font-mono text-xs sm:text-sm text-[#8F8E8A] mt-5 max-w-xl leading-relaxed">
            Documenting Earth's sub-audible infrasound through passive deep-borehole geophones, sub-glacial hydrophone arrays, and volcanic cavity transducers. Inscribed onto heavyweight 180g mineral-marbled vinyl and 1/4" analog master tapes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={onLaunchSynthesizer}
              className="flex items-center gap-2.5 bg-[#D94E28] hover:bg-[#B83E1D] text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3.5 transition-colors cursor-pointer shadow-lg"
            >
              <Volume2 size={15} />
              LAUNCH FIELD AUDIO SYNTHESIZER
            </button>

            <a
              href="#vault"
              className="flex items-center gap-2 bg-[#141416] hover:bg-[#27272D] text-[#ECEAE4] border border-[#27272D] hover:border-[#D94E28] font-mono text-xs uppercase tracking-wider px-6 py-3.5 transition-colors cursor-pointer"
            >
              EXPLORE 180G VINYL PRESSINGS
            </a>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-6 border-t border-[#27272D] w-full text-xs font-mono">
            <div>
              <span className="text-[#8F8E8A] text-[9px] block">GLOBAL STATIONS</span>
              <span className="text-[#ECEAE4] font-bold text-sm">05 ACTIVE</span>
            </div>
            <div>
              <span className="text-[#8F8E8A] text-[9px] block">SAMPLING MATRIX</span>
              <span className="text-[#38EF7D] font-bold text-sm">192 kHz / 32b</span>
            </div>
            <div>
              <span className="text-[#8F8E8A] text-[9px] block">MAXIMUM DEPTH</span>
              <span className="text-[#D94E28] font-bold text-sm">-10,920m BSL</span>
            </div>
            <div>
              <span className="text-[#8F8E8A] text-[9px] block">BANDWIDTH</span>
              <span className="text-[#ECEAE4] font-bold text-sm">0.05Hz - 240Hz</span>
            </div>
          </div>
        </div>

        {/* Right Column: Active Station Dossier & Real Seismograph Canvas (5 Cols) */}
        <div className="lg:col-span-5 bg-[#141416] border border-[#27272D] p-5 shadow-2xl flex flex-col gap-4">
          {/* Station Photo Window */}
          <div className="relative aspect-[16/10] w-full bg-[#0A0A0B] border border-[#27272D] overflow-hidden group">
            <img
              src={activeExpedition.imageUrl}
              alt={activeExpedition.title}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-90" />

            {/* Overlaid Badges */}
            <div className="absolute top-3 left-3 bg-[#0A0A0B]/90 border border-[#27272D] px-2.5 py-1 text-[10px] font-mono text-[#38EF7D] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-ping" />
              LIVE TELEMETRY // {activeExpedition.code}
            </div>

            <div className="absolute top-3 right-3 bg-[#0A0A0B]/90 border border-[#27272D] px-2 py-1 text-[10px] font-mono text-[#D94E28] font-bold">
              {activeExpedition.depthMeters}m DEPTH
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <p className="font-['Cinzel'] font-bold text-base text-[#ECEAE4] truncate">
                {activeExpedition.title}
              </p>
              <p className="text-[10px] font-mono text-[#8F8E8A] mt-0.5 truncate">
                {activeExpedition.location}
              </p>
            </div>
          </div>

          {/* Continuous Seismograph Drum Waveform */}
          <div className="bg-[#0A0A0B] border border-[#27272D] p-3 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-[#8F8E8A] flex items-center gap-1.5">
                <Activity size={12} className={isPlaying ? "text-[#38EF7D]" : "text-[#D94E28]"} />
                REAL-TIME CRUSTAL SEISMOGRAPH DRUM
              </span>
              <span className={isPlaying ? "text-[#38EF7D] font-bold" : "text-[#8F8E8A]"}>
                {isPlaying ? "RECEIVING SIGNAL" : "MONITORING"}
              </span>
            </div>

            <canvas
              ref={seismographCanvasRef}
              width={400}
              height={70}
              className="w-full h-[70px] block"
            />
          </div>

          {/* Audition Bar */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={handleAuditionClick}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 font-mono text-xs font-bold uppercase transition-colors cursor-pointer border ${
                isPlaying
                  ? "bg-[#D94E28] text-white border-[#D94E28]"
                  : "bg-[#27272D] hover:bg-[#35353D] text-[#ECEAE4] border-[#35353D]"
              }`}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              {isPlaying ? "PAUSE RECORDING" : "AUDITION SEISMIC AUDIO"}
            </button>

            <span className="text-[11px] font-mono text-[#8F8E8A] whitespace-nowrap">
              {activeExpedition.sampleRate.split("/")[0].trim()}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Expedition Switcher Bar */}
      <div className="border-t border-[#27272D] pt-6">
        <div className="flex justify-between items-center mb-3 text-[10px] font-mono text-[#8F8E8A]">
          <span className="uppercase tracking-widest">ACTIVE FIELD STATIONS (SELECT TO SWITCH DOSSIER):</span>
          <span>5 GEOLOGICAL REGISTERS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {EXPEDITIONS.map(exp => {
            const isSelected = activeExpedition.id === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => onSelectExpedition(exp)}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#141416] border-[#D94E28] shadow-[0_0_12px_rgba(217,78,40,0.25)]"
                    : "bg-[#0A0A0B] border-[#27272D] hover:border-[#8F8E8A] hover:bg-[#141416]"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                  <span className={isSelected ? "text-[#D94E28] font-bold" : "text-[#8F8E8A]"}>
                    {exp.code}
                  </span>
                  <span className="text-[#38EF7D] font-bold">{exp.depthMeters}m</span>
                </div>
                <p className="font-['Cinzel'] font-bold text-xs text-[#ECEAE4] truncate">
                  {exp.title.split(":")[0]}
                </p>
                <p className="text-[10px] font-mono text-[#8F8E8A] mt-1 truncate">
                  {exp.region}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
