import React, { useState } from "react";
import { Play, Pause, ShoppingBag } from "lucide-react";
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
    onToast(`Playing: ${activeEdition.tracklist[idx].title}`);
  };

  const handleOrder = () => {
    onAddToCart(activeEdition, 1);
    onToast(`Added [${activeEdition.catalogNumber}] to cart.`);
  };

  return (
    <section className="w-full bg-[#0c0c0d] border-b border-[#222226] text-[#E6E4DC] px-4 sm:px-8 lg:px-12 py-12 lg:py-16 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Main Stage: Image & Vinyl Left, Clean Minimal Tracklist Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Pure Album Cover Image + Sliding Vinyl Record */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[440px] h-[320px] sm:h-[400px] flex items-center justify-center p-2">
              {/* Heavyweight Jacket: PURE IMAGE ONLY. Zero text overlays. */}
              <div className="absolute left-2 sm:left-4 w-64 sm:w-80 h-64 sm:h-80 bg-[#161619] border border-[#2e2e34] shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 select-none overflow-hidden">
                <img
                  src={activeEdition.coverArt}
                  alt={activeEdition.title}
                  className="w-full h-full object-cover object-center filter contrast-110"
                />
              </div>

              {/* Heavyweight 180g Vinyl Record sliding out */}
              <div
                className={`absolute right-2 sm:right-4 w-64 sm:w-80 h-64 sm:h-80 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.95)] flex items-center justify-center transition-all duration-700 z-0 ${
                  isPlaying ? "animate-[spin_18s_linear_infinite]" : "hover:translate-x-6"
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

                {/* Center Label */}
                <div className="w-24 h-24 rounded-full bg-[#0c0c0d] border border-[#A83824] flex flex-col items-center justify-center p-2 text-center text-[7px] font-mono shadow-inner">
                  <span className="font-['Cinzel'] font-black text-[#E6E4DC] text-[9px] leading-tight tracking-wider">
                    LITHOS
                  </span>
                  <span className="text-[#A83824] leading-tight font-bold">{activeEdition.catalogNumber}</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-black border border-[#E6E4DC] mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Minimal, Music & Order */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono text-[#A83824] tracking-widest uppercase font-semibold">
              {activeEdition.catalogNumber}
            </span>

            <h1 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#E6E4DC] leading-tight mt-1">
              {activeEdition.title.split(":")[0]}
            </h1>

            <div className="flex items-center gap-4 text-xs font-mono text-[#9E9B91] mt-2">
              <span>{activeEdition.format}</span>
              <span>·</span>
              <span className="text-[#E6E4DC] font-bold">${activeEdition.priceUSD} USD</span>
            </div>

            {/* Clean Tracklist with Direct Play Buttons */}
            <div className="mt-8 border border-[#25252b] bg-[#161619]/40 divide-y divide-[#25252b] text-xs font-mono">
              {activeEdition.tracklist.map((track, i) => {
                const isSelected = activeTrackIndex === i;
                return (
                  <button
                    key={track.side}
                    onClick={() => handleTrackPlay(i)}
                    className={`w-full p-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#161619] text-[#A83824]"
                        : "hover:bg-[#161619] text-[#9E9B91] hover:text-[#E6E4DC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 font-bold text-[#A83824]">{track.side}</span>
                      <span className={isSelected ? "text-[#E6E4DC] font-bold" : ""}>
                        {track.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[#73716B] text-[11px]">{track.duration}</span>
                      {isSelected && isPlaying ? (
                        <Pause size={14} className="text-[#A83824]" />
                      ) : (
                        <Play size={14} className="opacity-60 group-hover:opacity-100" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Order Button */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleOrder}
                className="flex-1 flex items-center justify-center gap-2 bg-[#A83824] hover:bg-[#8F2F1E] text-white py-3.5 px-6 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
              >
                <ShoppingBag size={15} />
                ORDER {activeEdition.format.split(" ")[0]} — ${activeEdition.priceUSD}
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector: Pure Artwork Only */}
        <div className="mt-16 pt-8 border-t border-[#222226]">
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            {VINYL_EDITIONS.map(edition => {
              const isSelected = activeEdition.id === edition.id;
              return (
                <button
                  key={edition.id}
                  onClick={() => onSelectEdition(edition)}
                  className={`relative aspect-square border overflow-hidden transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#A83824] shadow-[0_0_15px_rgba(168,56,36,0.4)] opacity-100 scale-[1.02]"
                      : "border-[#25252b] opacity-60 hover:opacity-100"
                  }`}
                  title={edition.title}
                >
                  {/* Pure Album Artwork Image Only */}
                  <img
                    src={edition.coverArt}
                    alt={edition.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
