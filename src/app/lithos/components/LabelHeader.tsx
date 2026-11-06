import React from "react";
import { ShoppingBag, Play, Pause } from "lucide-react";
import { VinylEdition } from "../types";

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
    <header className="sticky top-0 z-50 w-full bg-lithos-basalt/95 backdrop-blur-md border-b border-lithos-border text-lithos-chalk select-none font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-6">
        {/* Simple Brand Logo */}
        <button
          onClick={() => onScrollToSection("hero")}
          className="text-left cursor-pointer"
        >
          <span className="font-extrabold text-2xl tracking-tight text-white hover:text-lithos-rust transition-colors duration-150">
            LITHOS
          </span>
        </button>

        {/* Clean Minimal Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-lithos-muted">
          <button
            onClick={() => onScrollToSection("hero")}
            className="hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Featured
          </button>
          <button
            onClick={() => onScrollToSection("catalog")}
            className="hover:text-white transition-colors duration-150 cursor-pointer"
          >
            Catalog
          </button>
        </nav>

        {/* Playback Cue & Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePlay}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors duration-150 cursor-pointer ${
              isPlaying
                ? "bg-lithos-rust text-white"
                : "bg-lithos-charcoal hover:bg-lithos-strata text-lithos-muted hover:text-white border border-lithos-border"
            }`}
            title={isPlaying ? "Pause" : "Play preview"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
            <span className="hidden sm:inline">
              {isPlaying ? "Playing" : "Preview"}
            </span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-lithos-charcoal hover:bg-lithos-strata border border-lithos-border text-white px-3.5 py-1.5 rounded text-xs font-medium transition-colors duration-150 cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-lithos-rust text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
