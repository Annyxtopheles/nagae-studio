import React from "react";
import { Activity, Radio, Disc, Volume2, VolumeX, Play, Pause, ShoppingBag, ShieldAlert } from "lucide-react";
import { Expedition } from "../types";
import { lithosAudio } from "../audioEngine";

interface HeaderHUDProps {
  activeExpedition: Expedition;
  isPlaying: boolean;
  onTogglePlay: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (id: string) => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  activeExpedition,
  isPlaying,
  onTogglePlay,
  cartCount,
  onOpenCart,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#27272D] text-[#ECEAE4] select-none">
      {/* Top Telemetry Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 border-b border-[#27272D]/60 text-[10px] font-mono tracking-widest text-[#8F8E8A]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[#38EF7D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#38EF7D] -ml-3" />
            REC // 192kHz · 32-BIT FLOAT
          </span>
          <span className="text-[#8F8E8A]">ARRAY: 12/12 STATIONS SYNCHRONIZED</span>
          <span className="text-[#8F8E8A]">DEPTH MAX: -10,920m (CHALLENGER DEEP)</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[#FFB800] flex items-center gap-1">
            <Activity size={11} className="text-[#FFB800]" />
            CRUSTAL INFRASOUND: ACTIVE
          </span>
          <span className="text-[#8F8E8A]">LAT: 64°N - 11°S // GLOBAL SEISMIC NETWORK</span>
          <span className="text-[#D94E28] font-bold">PHYSICAL EDITIONS: 180G VINYL & 1/4" TAPE</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Monolith */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onScrollToSection("hero")}
            className="flex items-baseline gap-2.5 text-left group cursor-pointer"
          >
            <span className="font-['Cinzel'] font-black text-2xl lg:text-3xl tracking-wider text-[#ECEAE4] group-hover:text-[#D94E28] transition-colors">
              LITHOS
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-[0.25em] text-[#D94E28] border-l border-[#27272D] pl-2.5">
              Subterra Field Archive
            </span>
          </button>
        </div>

        {/* Section Anchor Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#141416] p-1 border border-[#27272D] text-[11px] font-mono">
          {[
            { id: "hero", label: "01 // TOPOGRAPHY" },
            { id: "synthesizer", label: "02 // AUDIO DECK" },
            { id: "schematics", label: "03 // TRANSDUCER RIGS" },
            { id: "vault", label: "04 // PRESSING VAULT" },
            { id: "manifesto", label: "05 // MANIFESTO & LOGS" },
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => onScrollToSection(sec.id)}
              className="px-3 py-1.5 text-[#8F8E8A] hover:text-[#ECEAE4] hover:bg-[#27272D] transition-colors cursor-pointer"
            >
              {sec.label}
            </button>
          ))}
        </nav>

        {/* Audio Quick Bar & Physical Vault Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Expedition Player Pill */}
          <div className="flex items-center gap-2 bg-[#141416] border border-[#27272D] px-2.5 py-1.5 text-[11px] font-mono">
            <button
              onClick={onTogglePlay}
              className={`w-7 h-7 flex items-center justify-center border transition-all cursor-pointer ${
                isPlaying
                  ? "bg-[#D94E28] text-white border-[#D94E28] shadow-[0_0_12px_rgba(217,78,40,0.5)]"
                  : "bg-[#27272D] text-[#ECEAE4] border-[#35353D] hover:border-[#D94E28]"
              }`}
              title={isPlaying ? "Mute / Pause Infrasound" : "Play Active Seismic Infrasound"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
            </button>

            <div className="hidden md:flex flex-col text-left pr-2">
              <span className="text-[9px] uppercase tracking-wider text-[#8F8E8A] leading-tight">
                {isPlaying ? "TRANSDUCING //" : "STANDBY //"} {activeExpedition.code}
              </span>
              <span className="text-[11px] font-bold text-[#ECEAE4] truncate max-w-[140px] leading-tight">
                {activeExpedition.title.split(":")[0]}
              </span>
            </div>

            {/* Micro Audio Waveform Bar Animation */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-4 px-1">
                <span className="w-0.5 bg-[#38EF7D] animate-[pulse_0.4s_ease-in-out_infinite] h-2" />
                <span className="w-0.5 bg-[#38EF7D] animate-[pulse_0.7s_ease-in-out_infinite] h-4" />
                <span className="w-0.5 bg-[#38EF7D] animate-[pulse_0.5s_ease-in-out_infinite] h-3" />
                <span className="w-0.5 bg-[#38EF7D] animate-[pulse_0.9s_ease-in-out_infinite] h-1" />
              </div>
            )}
          </div>

          {/* Cart / Pressing Vault Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#141416] hover:bg-[#27272D] text-[#ECEAE4] border border-[#27272D] hover:border-[#D94E28] px-3 py-2 text-[11px] font-mono transition-colors cursor-pointer"
          >
            <Disc size={14} className="text-[#D94E28]" />
            <span className="hidden sm:inline">EDITIONS VAULT</span>
            <span className="bg-[#D94E28] text-white font-bold px-1.5 py-0.2 text-[10px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
