import React, { useState } from "react";
import { Disc, Play, Pause, ShoppingBag, Volume2, ArrowRight } from "lucide-react";
import { VinylEdition } from "../types";
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
    const expMap: Record<string, string> = {
      "LITH-001": "exp-01",
      "LITH-002": "exp-02",
      "LITH-003": "exp-03",
      "LITH-004": "exp-04",
      "LITH-005": "exp-05",
    };
    const expId = expMap[activeEdition.catalogNumber] || "exp-01";
    const foundExp = EXPEDITIONS.find(e => e.id === expId) || EXPEDITIONS[0];

    lithosAudio.play(foundExp);
    onToast(`Auditioning Track: ${activeEdition.tracklist[idx].side} — ${activeEdition.tracklist[idx].title}`);
  };

  const handleOrder = () => {
    onAddToCart(activeEdition, 1);
    onToast(`Added [${activeEdition.catalogNumber}] ${activeEdition.title} to mailorder cart.`);
  };

  return (
    <section className="w-full bg-[#0c0c0d] border-b border-[#222226] text-[#E6E4DC] px-4 sm:px-8 lg:px-12 py-12 lg:py-16 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Label Sub-masthead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-10 border-b border-[#222226] text-xs font-mono text-[#73716B]">
          <div className="flex items-center gap-3">
            <span className="text-[#A83824] font-bold">LATEST PHYSICAL PRESSING</span>
            <span>/</span>
            <span className="text-[#E6E4DC]">{activeEdition.catalogNumber}</span>
            <span>/</span>
            <span>{activeEdition.releaseDate}</span>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-4 text-[11px]">
            <span>PRESSING: 180G HEAVYWEIGHT VINYL</span>
            <span className="text-[#9E9B91]">INDEPENDENT DIRECT MAILORDER</span>
          </div>
        </div>

        {/* Two-Column Featured Release Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Gatefold Sleeve + Sliding Vinyl Record (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[480px] h-[320px] sm:h-[390px] flex items-center justify-center p-2 sm:p-4">
              {/* Heavyweight Tip-on Gatefold Jacket */}
              <div className="absolute left-2 sm:left-4 w-60 sm:w-80 h-60 sm:h-80 bg-[#161619] border border-[#2e2e34] shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-7 flex flex-col justify-between z-10 select-none">
                <div className="flex justify-between items-start text-[10px] font-mono text-[#73716B]">
                  <span className="text-[#A83824] font-bold tracking-widest">{activeEdition.catalogNumber}</span>
                  <span className="text-[#9E9B91]">{activeEdition.releaseDate}</span>
                </div>

                <div className="my-auto py-4">
                  <span className="font-['Cinzel'] font-black text-xl sm:text-2xl text-[#E6E4DC] leading-tight block">
                    {activeEdition.title.split(":")[0]}
                  </span>
                  <span className="text-[11px] font-mono text-[#A83824] mt-2 block tracking-wider font-semibold">
                    {activeEdition.format} · 45 RPM
                  </span>
                  <p className="text-[10px] font-mono text-[#73716B] mt-2 leading-relaxed line-clamp-2">
                    {activeEdition.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#25252b] text-[9px] font-mono text-[#73716B] flex justify-between">
                  <span>{activeEdition.specifications.pressingPlant.split(",")[0]}</span>
                  <span className="text-[#E6E4DC] font-semibold">EDITION OF {activeEdition.editionLimit}</span>
                </div>
              </div>

              {/* Realistic Heavyweight 180g Marbled Vinyl Record sliding out */}
              <div
                className={`absolute right-2 sm:right-4 w-60 sm:w-80 h-60 sm:h-80 rounded-full shadow-[0_0_45px_rgba(0,0,0,0.95)] flex items-center justify-center transition-all duration-700 z-0 ${
                  isPlaying ? "animate-[spin_18s_linear_infinite]" : "hover:translate-x-4"
                }`}
                style={{
                  background: activeEdition.mockupTheme.marbleStyle,
                }}
              >
                {/* Vinyl Grooves Sheen */}
                <div className="absolute inset-4 rounded-full border border-black/50 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-black/50 pointer-events-none" />
                <div className="absolute inset-14 rounded-full border border-black/60 pointer-events-none" />
                <div className="absolute inset-20 rounded-full border border-black/70 pointer-events-none" />

                {/* Center Label Sticker */}
                <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-[#0c0c0d] border border-[#A83824] flex flex-col items-center justify-center p-2 text-center text-[7px] font-mono shadow-inner">
                  <span className="font-['Cinzel'] font-black text-[#E6E4DC] text-[9px] leading-tight tracking-wider">
                    LITHOS
                  </span>
                  <span className="text-[#A83824] leading-tight font-bold">{activeEdition.catalogNumber}</span>
                  <span className="text-[#73716B] mt-0.5">45 RPM</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-black border border-[#E6E4DC] mt-1" />
                </div>
              </div>
            </div>

            {/* Packaging Details Badges */}
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-[10px] font-mono text-[#73716B]">
              <span className="bg-[#161619] px-2.5 py-1 border border-[#25252b] text-[#E6E4DC]">
                {activeEdition.colorway}
              </span>
              <span className="bg-[#161619] px-2.5 py-1 border border-[#25252b]">
                Weight: {activeEdition.weightGrams}g
              </span>
              <span className="bg-[#161619] px-2.5 py-1 border border-[#25252b] text-[#E6E4DC]">
                {activeEdition.remainingCount} Copies in Stock
              </span>
            </div>
          </div>

          {/* Right Column: Album Details, Liner Notes, Tracklist & Mailorder Button (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#A83824] tracking-widest uppercase mb-2 font-semibold">
                {activeEdition.catalogNumber} // {activeEdition.format}
              </div>

              <h1 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#E6E4DC] leading-tight">
                {activeEdition.title}
              </h1>

              <p className="font-mono text-xs sm:text-sm text-[#9E9B91] mt-2 tracking-wide font-normal">
                {activeEdition.subtitle}
              </p>

              {/* Liner Note Quote */}
              <blockquote className="mt-5 p-4 bg-[#141416] border-l-2 border-[#A83824] text-xs font-mono text-[#9E9B91] leading-relaxed italic">
                "{activeEdition.curatorNotes}"
              </blockquote>

              {/* Direct Audio Audition Bar */}
              <div className="mt-6 p-4 bg-[#161619] border border-[#25252b] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onTogglePlay}
                    className={`w-10 h-10 flex items-center justify-center font-mono font-bold transition-all cursor-pointer ${
                      isPlaying
                        ? "bg-[#A83824] text-white shadow-[0_0_15px_rgba(168,56,36,0.4)]"
                        : "bg-[#25252a] hover:bg-[#A83824] text-[#E6E4DC] hover:text-white"
                    }`}
                    title={isPlaying ? "Pause Track" : "Audition Album"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>

                  <div>
                    <span className="text-[9px] font-mono uppercase text-[#73716B] block">
                      {isPlaying ? "NOW AUDITIONING //" : "CLICK TRACK TO AUDITION //"}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#E6E4DC]">
                      {activeEdition.tracklist[activeTrackIndex]?.side} — {activeEdition.tracklist[activeTrackIndex]?.title}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-[#9E9B91]">
                  <span>{activeEdition.tracklist[activeTrackIndex]?.duration}</span>
                  <span className="text-[#73716B] block text-[9px]">PEAK: {activeEdition.tracklist[activeTrackIndex]?.frequencyPeak}</span>
                </div>
              </div>

              {/* Interactive Tracklist */}
              <div className="mt-4 border border-[#25252b] bg-[#0c0c0d] divide-y divide-[#25252b] text-xs font-mono">
                {activeEdition.tracklist.map((track, i) => {
                  const isSelected = activeTrackIndex === i;
                  return (
                    <div
                      key={track.side}
                      onClick={() => handleTrackPlay(i)}
                      className={`p-3 flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected ? "bg-[#161619] text-[#A83824]" : "hover:bg-[#141417] text-[#73716B]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#A83824] w-6">{track.side}</span>
                        <span className={isSelected ? "text-[#E6E4DC] font-bold" : "text-[#9E9B91] hover:text-[#E6E4DC]"}>
                          {track.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-[10px]">
                        <span className="text-[#73716B]">{track.depthRecorded}</span>
                        <span className="text-[#9E9B91] font-mono font-bold">{track.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price & Mailorder Action Bar */}
            <div className="mt-8 pt-6 border-t border-[#25252b] flex items-center justify-between gap-4">
              <div>
                <span className="text-[#73716B] text-[9px] font-mono block">MAILORDER PHYSICAL PRICE</span>
                <span className="font-mono text-3xl font-bold text-[#E6E4DC]">${activeEdition.priceUSD}</span>
                <span className="text-[10px] font-mono text-[#73716B] block mt-0.5">
                  INCLUDES BOOKLET & LOSSLESS FLAC DOWNLOAD
                </span>
              </div>

              <button
                onClick={handleOrder}
                className="flex items-center gap-2.5 bg-[#A83824] hover:bg-[#8F2F1E] text-white px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
              >
                <ShoppingBag size={15} />
                ORDER {activeEdition.format.split(" ")[0]} // ${activeEdition.priceUSD}
              </button>
            </div>
          </div>
        </div>

        {/* Catalog Selector Thumbnails */}
        <div className="mt-14 pt-8 border-t border-[#222226]">
          <div className="flex justify-between items-center mb-4 text-[10px] font-mono text-[#73716B]">
            <span className="uppercase tracking-widest">DISCOGRAPHY (SELECT RELEASE TO AUDITION):</span>
            <span>5 PHYSICAL EDITIONS</span>
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
                      ? "bg-[#161619] border-[#A83824] shadow-[0_0_15px_rgba(168,56,36,0.25)]"
                      : "bg-[#0c0c0d] border-[#222226] hover:border-[#73716B] hover:bg-[#141417]"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                    <span className={isSelected ? "text-[#A83824] font-bold" : "text-[#73716B]"}>
                      {edition.catalogNumber}
                    </span>
                    <span className="text-[#E6E4DC] font-bold">${edition.priceUSD}</span>
                  </div>
                  <p className="font-['Cinzel'] font-bold text-xs text-[#E6E4DC] truncate">
                    {edition.title.split(":")[0]}
                  </p>
                  <p className="text-[10px] font-mono text-[#73716B] mt-1 truncate">
                    {edition.format}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
