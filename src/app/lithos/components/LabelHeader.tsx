import React from "react";
import { Disc, ShoppingBag, Play, Pause } from "lucide-react";
import { Expedition, VinylEdition } from "../types";

interface LabelHeaderProps {
  activeEdition: VinylEdition;
  isPlaying: boolean;
  onTogglePlay: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (id: string) => void;
}

export const LabelHeader: React.FC<LabelHeaderProps> = ({
  activeEdition,
  isPlaying,
  onTogglePlay,
  cartCount,
  onOpenCart,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0c0d]/95 backdrop-blur-md border-b border-[#222226] text-[#E6E4DC] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-6">
        {/* Label Monolith Identity */}
        <div className="flex items-baseline gap-3">
          <button
            onClick={() => onScrollToSection("hero")}
            className="flex items-baseline gap-3 text-left group cursor-pointer"
          >
            <span className="font-['Cinzel'] font-black text-2xl sm:text-3xl tracking-widest text-[#E6E4DC] group-hover:text-[#A83824] transition-colors">
              LITHOS
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#73716B] border-l border-[#2e2e33] pl-3 hidden sm:inline-block">
              Recordings & Editions · Est. 2024
            </span>
          </button>
        </div>

        {/* Minimalist Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-[#9E9B91]">
          <button
            onClick={() => onScrollToSection("hero")}
            className="hover:text-[#E6E4DC] transition-colors cursor-pointer"
          >
            FEATURED
          </button>
          <button
            onClick={() => onScrollToSection("catalog")}
            className="hover:text-[#E6E4DC] transition-colors cursor-pointer"
          >
            CATALOG
          </button>
          <button
            onClick={() => onScrollToSection("dispatches")}
            className="hover:text-[#E6E4DC] transition-colors cursor-pointer"
          >
            DISPATCHES
          </button>
          <button
            onClick={() => onScrollToSection("about")}
            className="hover:text-[#E6E4DC] transition-colors cursor-pointer"
          >
            ABOUT
          </button>
        </nav>

        {/* Audio Audition Quick-Pill & Mailorder Cart */}
        <div className="flex items-center gap-3">
          {/* Quick Audition Pill */}
          <div className="hidden sm:flex items-center gap-2.5 bg-[#161619] border border-[#27272C] px-3 py-1.5 text-xs font-mono">
            <button
              onClick={onTogglePlay}
              className={`w-6 h-6 flex items-center justify-center transition-all cursor-pointer ${
                isPlaying
                  ? "bg-[#A83824] text-[#E6E4DC]"
                  : "bg-[#25252A] text-[#9E9B91] hover:text-[#E6E4DC]"
              }`}
              title={isPlaying ? "Pause Stream" : "Audition Active Record"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
            </button>
            <span className="text-[11px] text-[#73716B]">
              {isPlaying ? "PLAYING //" : "CUE //"}{" "}
              <strong className="text-[#E6E4DC] font-normal">{activeEdition.catalogNumber}</strong>
            </span>
          </div>

          {/* Mailorder Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#161619] hover:bg-[#A83824] border border-[#27272C] hover:border-[#A83824] text-[#E6E4DC] px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors cursor-pointer"
          >
            <ShoppingBag size={13} className="text-[#A83824] group-hover:text-white" />
            <span>CART</span>
            <span className="bg-[#A83824] text-white font-bold px-1.5 py-0.2 text-[10px] ml-0.5">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
