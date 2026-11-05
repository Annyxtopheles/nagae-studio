import React, { useState } from "react";
import { ShoppingBag, X, Volume2 } from "lucide-react";
import { VinylEdition, Expedition } from "../types";
import { VINYL_EDITIONS, EXPEDITIONS } from "../data";

interface LabelCatalogProps {
  onAddToCart: (edition: VinylEdition, qty?: number) => void;
  onCueExpedition: (exp: Expedition) => void;
  onToast: (msg: string) => void;
}

export const LabelCatalog: React.FC<LabelCatalogProps> = ({
  onAddToCart,
  onCueExpedition,
  onToast,
}) => {
  const [selectedEdition, setSelectedEdition] = useState<VinylEdition | null>(null);

  const handleQuickAdd = (edition: VinylEdition, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(edition, 1);
    onToast(`Added [${edition.catalogNumber}] to cart.`);
  };

  const handlePlayEdition = (catNum: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const mapCatToExp: Record<string, string> = {
      "LITH-001": "exp-01",
      "LITH-002": "exp-02",
      "LITH-003": "exp-03",
      "LITH-004": "exp-04",
      "LITH-005": "exp-05",
    };
    const expId = mapCatToExp[catNum];
    const found = EXPEDITIONS.find(x => x.id === expId);
    if (found) {
      onCueExpedition(found);
      onToast(`Cued: ${found.title.split(":")[0]}`);
    }
  };

  return (
    <section id="catalog" className="w-full bg-[#0c0c0d] border-b border-[#1f1f23] text-[#e5e5e7] px-4 sm:px-8 lg:px-12 py-16 select-none font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-baseline pb-6 border-b border-[#1f1f23]">
          <h2 className="font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Catalog
          </h2>
          <span className="text-xs text-[#8e8e93]">5 Releases</span>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {VINYL_EDITIONS.map(edition => {
            return (
              <div
                key={edition.id}
                onClick={() => setSelectedEdition(edition)}
                className="group bg-[#141416] border border-[#222226] hover:border-[#e04528] rounded-sm transition-all p-5 flex flex-col justify-between cursor-pointer shadow-lg"
              >
                {/* Pure Artwork Image with Vinyl Disc Mockup */}
                <div className="relative aspect-square w-full mb-4 bg-[#0c0c0d] border border-[#222226] rounded-sm flex items-center justify-center overflow-hidden p-3">
                  {/* Heavyweight Album Cover Jacket: Pure Image Only */}
                  <div className="absolute left-3 w-40 sm:w-48 h-40 sm:h-48 bg-[#161619] border border-[#2a2a30] shadow-2xl z-10 overflow-hidden rounded-sm">
                    <img
                      src={edition.coverArt}
                      alt={edition.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Grooved Vinyl Disc sliding out from the sleeve */}
                  <div
                    className="absolute right-3 w-40 sm:w-48 h-40 sm:h-48 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover:translate-x-3 group-hover:rotate-45 z-0"
                    style={{
                      background: edition.mockupTheme.marbleStyle,
                      boxShadow: "0 0 25px rgba(0,0,0,0.9)",
                    }}
                  >
                    <div className="absolute inset-3 rounded-full border border-black/45 pointer-events-none" />
                    <div className="absolute inset-7 rounded-full border border-black/45 pointer-events-none" />
                    <div className="absolute inset-11 rounded-full border border-black/55 pointer-events-none" />

                    <div className="w-14 h-14 rounded-full bg-[#0c0c0d] border border-[#e04528] flex flex-col items-center justify-center text-center p-1 text-[7px]">
                      <span className="font-extrabold text-white text-[8px] leading-tight">LITHOS</span>
                      <span className="text-[#e04528] leading-tight font-semibold">{edition.catalogNumber}</span>
                    </div>
                  </div>

                  {/* Quick-Listen Button */}
                  <button
                    onClick={(e) => handlePlayEdition(edition.catalogNumber, e)}
                    className="absolute bottom-3 right-3 z-20 bg-[#0c0c0d]/90 hover:bg-[#e04528] text-white p-2.5 rounded-full border border-[#2a2a30] hover:border-[#e04528] transition-all cursor-pointer shadow-lg"
                    title="Audition"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                {/* Title & Format */}
                <div>
                  <span className="text-[11px] font-semibold text-[#e04528] block mb-1">
                    {edition.catalogNumber}
                  </span>
                  <h3 className="font-bold text-lg text-white group-hover:text-[#e04528] transition-colors leading-snug">
                    {edition.title.split(":")[0]}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-[#8e8e93] mt-2">
                    <span>{edition.format.split(" ")[0]}</span>
                    <span className="text-white font-semibold">${edition.priceUSD} USD</span>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-4 pt-4 border-t border-[#222226] flex items-center justify-between">
                  <span className="text-xs text-[#8e8e93]">
                    {edition.remainingCount} in stock
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(edition, e)}
                    className="flex items-center gap-1.5 bg-[#e04528] hover:bg-[#c93b20] text-white px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Archival Edition Dossier Lightbox Modal (Click outside closes it) */}
        {selectedEdition && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedEdition(null)}
          >
            <div
              className="bg-[#161619] border border-[#2a2a30] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-[#e5e5e7] cursor-default rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEdition(null)}
                className="absolute top-6 right-6 text-[#8e8e93] hover:text-white cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 border border-[#2a2a30] shadow-xl overflow-hidden bg-black rounded-sm">
                  <img
                    src={selectedEdition.coverArt}
                    alt={selectedEdition.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <span className="text-xs font-semibold text-[#e04528] block mb-1">
                    {selectedEdition.catalogNumber} // {selectedEdition.format}
                  </span>
                  <h2 className="font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {selectedEdition.title.split(":")[0]}
                  </h2>
                  <div className="mt-2 text-sm text-white font-semibold">
                    ${selectedEdition.priceUSD} USD
                  </div>
                </div>
              </div>

              {/* Complete Tracklist */}
              <div className="border border-[#222226] bg-[#0c0c0d] rounded-sm divide-y divide-[#222226] text-xs mt-4">
                {selectedEdition.tracklist.map(t => (
                  <div key={t.side} className="p-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-[#e04528] font-bold">{t.side}</span>
                      <span className="text-white">{t.title}</span>
                    </div>
                    <span className="text-[#8e8e93]">{t.duration}</span>
                  </div>
                ))}
              </div>

              {/* Modal Order Button */}
              <div className="mt-6 pt-4 border-t border-[#222226] flex items-center justify-between">
                <span className="text-xl font-bold text-white">${selectedEdition.priceUSD} USD</span>
                <button
                  onClick={() => {
                    onAddToCart(selectedEdition, 1);
                    onToast(`Added [${selectedEdition.catalogNumber}] to cart.`);
                    setSelectedEdition(null);
                  }}
                  className="flex items-center gap-2 bg-[#e04528] hover:bg-[#c93b20] text-white px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  Order {selectedEdition.format.split(" ")[0]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
