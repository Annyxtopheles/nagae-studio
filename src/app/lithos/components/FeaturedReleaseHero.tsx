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
    <section className="w-full bg-lithos-basalt border-b border-lithos-border text-lithos-chalk px-4 sm:px-8 lg:px-12 py-12 lg:py-16 select-none font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Pure Album Cover Image + Sliding Vinyl Record */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] h-[320px] sm:h-[400px] flex items-center justify-center p-2">
              {/* Heavyweight Jacket: Pure Image Only */}
              <div className="absolute left-2 sm:left-4 w-60 sm:w-80 h-60 sm:h-80 bg-lithos-charcoal border border-lithos-border shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10 select-none overflow-hidden rounded-sm transition-transform duration-300 ease-out hover:-translate-x-1">
                <img
                  src={activeEdition.coverArt}
                  alt={activeEdition.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Heavyweight 180g Vinyl Record sliding out */}
              <div
                className={`absolute right-2 sm:right-4 w-60 sm:w-80 h-60 sm:h-80 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.95)] flex items-center justify-center transition-transform duration-500 ease-out z-0 ${
                  isPlaying ? "motion-safe:animate-[spin_18s_linear_infinite]" : "hover:translate-x-3 sm:hover:translate-x-6"
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
                <div className="w-24 h-24 rounded-full bg-lithos-basalt border border-lithos-rust flex flex-col items-center justify-center p-2 text-center text-[9px] shadow-inner">
                  <span className="font-extrabold text-white text-xs tracking-wider">
                    LITHOS
                  </span>
                  <span className="text-lithos-rust font-semibold mt-0.5">{activeEdition.catalogNumber}</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/80 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Minimal Details & Player */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-lithos-rust">
              {activeEdition.catalogNumber}
            </span>

            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mt-2">
              {activeEdition.title.split(":")[0]}
            </h1>

            <div className="flex items-center gap-3 text-sm text-lithos-muted mt-2">
              <span>{activeEdition.format}</span>
              <span>·</span>
              <span className="text-white font-semibold">${activeEdition.priceUSD} USD</span>
            </div>

            {/* Clean Tracklist */}
            <div className="mt-8 border border-lithos-border bg-lithos-strata rounded-sm divide-y divide-lithos-border text-sm">
              {activeEdition.tracklist.map((track, i) => {
                const isSelected = activeTrackIndex === i;
                return (
                  <button
                    key={track.side}
                    onClick={() => handleTrackPlay(i)}
                    className={`w-full p-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-lithos-charcoal text-white"
                        : "hover:bg-lithos-charcoal/60 text-lithos-muted hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 font-semibold text-lithos-rust text-xs">{track.side}</span>
                      <span className={isSelected ? "font-semibold text-white" : ""}>
                        {track.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-lithos-muted text-xs">{track.duration}</span>
                      {isSelected && isPlaying ? (
                        <Pause size={14} className="text-lithos-rust" />
                      ) : (
                        <Play size={14} className="opacity-60 hover:opacity-100" />
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
                className="flex-1 flex items-center justify-center gap-2 bg-lithos-rust hover:bg-lithos-rust/90 text-white py-3.5 px-6 rounded-sm text-sm font-semibold tracking-wide transition-colors cursor-pointer shadow-lg shadow-lithos-rust-glow"
              >
                <ShoppingBag size={16} />
                Order Vinyl — ${activeEdition.priceUSD}
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector: Pure Artwork Only */}
        <div className="mt-16 pt-8 border-t border-lithos-border">
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            {VINYL_EDITIONS.map(edition => {
              const isSelected = activeEdition.id === edition.id;
              return (
                <button
                  key={edition.id}
                  onClick={() => onSelectEdition(edition)}
                  className={`relative aspect-square border overflow-hidden rounded-sm transition-transform duration-200 cursor-pointer ${
                    isSelected
                      ? "border-lithos-rust shadow-[0_0_15px_rgba(224,69,40,0.4)] opacity-100 scale-[1.02]"
                      : "border-lithos-border opacity-60 hover:opacity-100 hover:scale-[1.01]"
                  }`}
                  title={edition.title}
                >
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
