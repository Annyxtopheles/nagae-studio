import React, { useState } from "react";
import { Disc, Play, Pause, ShoppingBag, Volume2, ArrowRight, ShieldCheck, Check, Sparkles } from "lucide-react";
import { VinylEdition, Expedition } from "../types";
import { VINYL_EDITIONS, EXPEDITIONS } from "../data";
import { lithosAudio } from "../audioEngine";

interface FeaturedReleaseHeroProps {
  activeEdition: VinylEdition;
  onSelectEdition: (edition: VinylEdition) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onAddToCart: (edition: VinylEdition, qty?: number) => void;
  onToast: (msg: string) => void;
}

export const FeaturedReleaseHero: React.FC<FeaturedReleaseHeroProps> = ({
  activeEdition,
  onSelectEdition,
  isPlaying,
  onTogglePlay,
  onAddToCart,
  onToast,
}) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const handleTrackPlay = (idx: number) => {
    setActiveTrackIndex(idx);
    // Find corresponding expedition to drive the audio engine
    const expMap: Record<string, string> = {
      "LITH-001": "exp-01",
      "LITH-002": "exp-02",
      "LITH-003": "exp-03",
      "LITH-004": "exp-04",
      "LITH-005": "exp-05",
    };
    const expId = expMap[activeEdition.catalogNumber] || "exp-01";
    const foundExp = EXPEDITIONS.find(e => e.id === expId) || EXPEDITIONS[0];

    if (!isPlaying) {
      lithosAudio.play(foundExp);
    } else {
      lithosAudio.play(foundExp);
    }
    onToast(`Now Playing: ${activeEdition.tracklist[idx].side} — ${activeEdition.tracklist[idx].title}`);
  };

  const handleOrder = () => {
    onAddToCart(activeEdition, 1);
    onToast(`Added [${activeEdition.catalogNumber}] ${activeEdition.title} to your cart.`);
  };

  return (
    <section className="w-full bg-[#0A0A0B] border-b border-[#27272D] px-4 lg:px-12 py-12 lg:py-16 text-[#ECEAE4] select-none">
      {/* Label Category Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#27272D] text-xs font-mono text-[#8F8E8A]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D94E28] animate-ping" />
          <span className="text-[#ECEAE4] font-bold">LITHOS RECORDINGS</span>
          <span>//</span>
          <span>SUBTERRA ACOUSTIC & SEISMOLOGICAL FIELD ARCHIVE</span>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-4 text-[11px]">
          <span>FORMAT: 180G VINYL & 1/4" ANALOG TAPE</span>
          <span className="text-[#38EF7D]">WORLDWIDE DISTRIBUTION</span>
        </div>
      </div>

      {/* Main Release Hero Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Realistic Physical Vinyl Package Presentation (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-[480px] h-[320px] sm:h-[380px] flex items-center justify-center p-2 sm:p-4">
            {/* Vinyl Gatefold Jacket */}
            <div className="absolute left-2 sm:left-4 w-60 sm:w-76 md:w-80 h-60 sm:h-76 md:h-80 bg-[#141416] border border-[#27272D] shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-5 sm:p-6 flex flex-col justify-between z-10 select-none">
              <div className="flex justify-between items-start text-[10px] font-mono text-[#8F8E8A]">
                <span className="text-[#D94E28] font-bold tracking-wider">{activeEdition.catalogNumber}</span>
                <span className="text-[#ECEAE4]">{activeEdition.releaseDate}</span>
              </div>

              <div>
                <span className="font-['Cinzel'] font-black text-xl sm:text-2xl text-[#ECEAE4] leading-tight block">
                  {activeEdition.title.split(":")[0]}
                </span>
                <span className="text-[10px] font-mono text-[#D94E28] mt-1 block">
                  {activeEdition.format} · 45 RPM
                </span>
                <span className="text-[9px] font-mono text-[#8F8E8A] mt-0.5 block truncate">
                  {activeEdition.subtitle}
                </span>
              </div>

              <div className="pt-3 border-t border-[#27272D] text-[9px] font-mono text-[#8F8E8A] flex justify-between">
                <span>{activeEdition.specifications.pressingPlant.split(",")[0]}</span>
                <span className="text-[#38EF7D] font-bold">LIMITED {activeEdition.editionLimit}</span>
              </div>
            </div>

            {/* Heavyweight 180g Marbled Vinyl Record sliding out */}
            <div
              className={`absolute right-2 sm:right-4 w-60 sm:w-76 md:w-80 h-60 sm:h-76 md:h-80 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.95)] flex items-center justify-center transition-all duration-700 z-0 ${
                isPlaying ? "animate-[spin_18s_linear_infinite]" : "hover:translate-x-4"
              }`}
              style={{
                background: activeEdition.mockupTheme.marbleStyle,
              }}
            >
              {/* Concentric Vinyl Grooves */}
              <div className="absolute inset-3 sm:inset-4 rounded-full border border-black/40 pointer-events-none" />
              <div className="absolute inset-6 sm:inset-8 rounded-full border border-black/40 pointer-events-none" />
              <div className="absolute inset-10 sm:inset-14 rounded-full border border-black/50 pointer-events-none" />
              <div className="absolute inset-16 sm:inset-20 rounded-full border border-black/60 pointer-events-none" />

              {/* Center Label Badge */}
              <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-[#0A0A0B] border border-[#D94E28] flex flex-col items-center justify-center p-2 text-center text-[7px] font-mono shadow-inner">
                <span className="font-['Cinzel'] font-bold text-[#ECEAE4] text-[9px] leading-tight">LITHOS</span>
                <span className="text-[#D94E28] leading-tight font-bold">{activeEdition.catalogNumber}</span>
                <span className="text-[#8F8E8A] mt-0.5">45 RPM</span>
                <div className="w-2.5 h-2.5 rounded-full bg-black border border-[#ECEAE4] mt-1" />
              </div>
            </div>
          </div>

          {/* Packaging Spec Pills */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px] font-mono text-[#8F8E8A]">
            <span className="bg-[#141416] px-2.5 py-1 border border-[#27272D] text-[#ECEAE4]">
              {activeEdition.colorway}
            </span>
            <span className="bg-[#141416] px-2.5 py-1 border border-[#27272D]">
              Weight: {activeEdition.weightGrams}g
            </span>
            <span className="bg-[#141416] px-2.5 py-1 border border-[#27272D] text-[#38EF7D]">
              {activeEdition.remainingCount} Copies Remaining
            </span>
          </div>
        </div>

        {/* Right Column: Album Details, Direct Audio Player & Order Action (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141416] border border-[#D94E28] text-[#D94E28] text-[10px] font-mono tracking-widest uppercase mb-4">
              <Disc size={12} className="text-[#D94E28]" />
              FEATURED PHYSICAL RELEASE // {activeEdition.catalogNumber}
            </div>

            <h1 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#ECEAE4] leading-tight">
              {activeEdition.title}
            </h1>

            <p className="font-mono text-xs sm:text-sm text-[#D94E28] mt-2 font-bold tracking-wider">
              {activeEdition.subtitle}
            </p>

            <p className="font-mono text-xs text-[#8F8E8A] mt-4 leading-relaxed">
              {activeEdition.curatorNotes}
            </p>

            {/* Direct Audio Play / Audition Bar */}
            <div className="mt-6 p-4 bg-[#141416] border border-[#27272D] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onTogglePlay}
                  className={`w-11 h-11 flex items-center justify-center font-mono font-bold transition-all cursor-pointer ${
                    isPlaying
                      ? "bg-[#D94E28] text-white shadow-[0_0_15px_rgba(217,78,40,0.5)]"
                      : "bg-[#27272D] hover:bg-[#D94E28] text-[#ECEAE4] hover:text-white"
                  }`}
                  title={isPlaying ? "Pause Stream" : "Play Release"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                <div>
                  <span className="text-[9px] font-mono uppercase text-[#8F8E8A] block">
                    {isPlaying ? "STREAMING NOW //" : "CLICK TO AUDITION //"}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#ECEAE4]">
                    {activeEdition.tracklist[activeTrackIndex]?.side} — {activeEdition.tracklist[activeTrackIndex]?.title}
                  </span>
                </div>
              </div>

              <div className="text-right text-[11px] font-mono text-[#38EF7D]">
                <span>{activeEdition.tracklist[activeTrackIndex]?.duration}</span>
                <span className="text-[#8F8E8A] block text-[9px]">PEAK: {activeEdition.tracklist[activeTrackIndex]?.frequencyPeak}</span>
              </div>
            </div>

            {/* Interactive Tracklist */}
            <div className="mt-5 border border-[#27272D] bg-[#0A0A0B] divide-y divide-[#27272D] text-xs font-mono">
              {activeEdition.tracklist.map((track, i) => {
                const isSelected = activeTrackIndex === i;
                return (
                  <div
                    key={track.side}
                    onClick={() => handleTrackPlay(i)}
                    className={`p-3 flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected ? "bg-[#141416] text-[#D94E28]" : "hover:bg-[#141416] text-[#8F8E8A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#D94E28] w-6">{track.side}</span>
                      <span className={isSelected ? "text-[#ECEAE4] font-bold" : "text-[#8F8E8A] hover:text-[#ECEAE4]"}>
                        {track.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[10px]">
                      <span>{track.depthRecorded}</span>
                      <span className="text-[#38EF7D] font-bold">{track.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing & Preorder Action Footer */}
          <div className="mt-8 pt-6 border-t border-[#27272D] flex items-center justify-between gap-4">
            <div>
              <span className="text-[#8F8E8A] text-[9px] font-mono block">PHYSICAL EDITION PRICE</span>
              <span className="font-mono text-3xl font-bold text-[#ECEAE4]">${activeEdition.priceUSD}</span>
              <span className="text-[10px] font-mono text-[#8F8E8A] block mt-0.5">
                INCLUDES 32-PAGE BOOKLET & FLAC DOWNLOAD
              </span>
            </div>

            <button
              onClick={handleOrder}
              className="flex items-center gap-2.5 bg-[#D94E28] hover:bg-[#B83E1D] text-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xl"
            >
              <ShoppingBag size={16} />
              PREORDER {activeEdition.format.split(" ")[0]} // ${activeEdition.priceUSD}
            </button>
          </div>
        </div>
      </div>

      {/* Label Release Selector Switcher */}
      <div className="mt-14 pt-8 border-t border-[#27272D]">
        <div className="flex justify-between items-center mb-4 text-[10px] font-mono text-[#8F8E8A]">
          <span className="uppercase tracking-widest">LITHOS PHYSICAL RELEASES (SELECT EDITION TO INSPECT):</span>
          <span>5 ARCHIVAL CATALOG ENTRIES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {VINYL_EDITIONS.map(edition => {
            const isSelected = activeEdition.id === edition.id;
            return (
              <button
                key={edition.id}
                onClick={() => onSelectEdition(edition)}
                className={`p-3.5 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#141416] border-[#D94E28] shadow-[0_0_15px_rgba(217,78,40,0.3)]"
                    : "bg-[#0A0A0B] border-[#27272D] hover:border-[#8F8E8A] hover:bg-[#141416]"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                  <span className={isSelected ? "text-[#D94E28] font-bold" : "text-[#8F8E8A]"}>
                    {edition.catalogNumber}
                  </span>
                  <span className="text-[#ECEAE4] font-bold">${edition.priceUSD}</span>
                </div>
                <p className="font-['Cinzel'] font-bold text-xs text-[#ECEAE4] truncate">
                  {edition.title.split(":")[0]}
                </p>
                <p className="text-[10px] font-mono text-[#8F8E8A] mt-1 truncate">
                  {edition.format}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
