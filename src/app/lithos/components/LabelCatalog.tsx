import React, { useState } from "react";
import { ShoppingBag, Eye, X, Volume2 } from "lucide-react";
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
    <section id="catalog" className="w-full bg-[#0c0c0d] border-b border-[#222226] text-[#E6E4DC] px-4 sm:px-8 lg:px-12 py-16 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-baseline pb-6 border-b border-[#222226]">
          <h2 className="font-['Cinzel'] font-black text-2xl sm:text-3xl text-[#E6E4DC] uppercase">
            CATALOG
          </h2>
          <span className="font-mono text-xs text-[#73716B]">5 PHYSICAL EDITIONS</span>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {VINYL_EDITIONS.map(edition => {
            return (
              <div
                key={edition.id}
                onClick={() => setSelectedEdition(edition)}
                className="group bg-[#161619]/40 border border-[#25252b] hover:border-[#A83824] transition-all p-5 flex flex-col justify-between cursor-pointer"
              >
                {/* Pure Artwork Image with Vinyl Disc Mockup */}
                <div className="relative aspect-square w-full mb-4 bg-[#0c0c0d] border border-[#25252b] flex items-center justify-center overflow-hidden p-3">
                  {/* Heavyweight Album Cover Jacket: Pure Image Only */}
                  <div className="absolute left-3 w-40 sm:w-48 h-40 sm:h-48 bg-[#161619] border border-[#2e2e34] shadow-2xl z-10 overflow-hidden">
                    <img
                      src={edition.coverArt}
                      alt={edition.title}
                      className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500"
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

                    <div className="w-14 h-14 rounded-full bg-[#0c0c0d] border border-[#A83824] flex flex-col items-center justify-center text-center p-1 font-mono text-[6px]">
                      <span className="font-['Cinzel'] font-bold text-[#E6E4DC] text-[7px] leading-tight">LITHOS</span>
                      <span className="text-[#A83824] leading-tight">{edition.catalogNumber}</span>
                    </div>
                  </div>

                  {/* Quick-Listen Button */}
                  <button
                    onClick={(e) => handlePlayEdition(edition.catalogNumber, e)}
                    className="absolute bottom-3 right-3 z-20 bg-[#0c0c0d]/90 hover:bg-[#A83824] text-[#E6E4DC] hover:text-white p-2.5 border border-[#2e2e34] hover:border-[#A83824] transition-all cursor-pointer shadow-lg"
                    title="Audition"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                {/* Title & Format */}
                <div>
                  <span className="text-[10px] font-mono text-[#A83824] font-bold block mb-1">
                    {edition.catalogNumber}
                  </span>
                  <h3 className="font-['Cinzel'] font-black text-lg text-[#E6E4DC] group-hover:text-[#A83824] transition-colors leading-snug">
                    {edition.title.split(":")[0]}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-mono text-[#73716B] mt-2">
                    <span>{edition.format.split(" ")[0]}</span>
                    <span className="text-[#E6E4DC] font-bold">${edition.priceUSD}</span>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-4 pt-4 border-t border-[#25252b] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#73716B]">
                    {edition.remainingCount} in stock
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(edition, e)}
                    className="flex items-center gap-1.5 bg-[#A83824] hover:bg-[#8F2F1E] text-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    ORDER
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Archival Edition Dossier Modal */}
        {selectedEdition && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#161619] border border-[#2e2e34] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-[#E6E4DC]">
              <button
                onClick={() => setSelectedEdition(null)}
                className="absolute top-6 right-6 text-[#73716B] hover:text-[#E6E4DC] cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 border border-[#2e2e34] shadow-xl overflow-hidden bg-black">
                  <img
                    src={selectedEdition.coverArt}
                    alt={selectedEdition.title}
                    className="w-full h-full object-cover filter contrast-110"
                  />
                </div>

                <div className="flex-1">
                  <span className="text-xs font-mono text-[#A83824] font-semibold block mb-1">
                    {selectedEdition.catalogNumber} // {selectedEdition.format}
                  </span>
                  <h2 className="font-['Cinzel'] font-black text-2xl sm:text-3xl text-[#E6E4DC] leading-tight">
                    {selectedEdition.title.split(":")[0]}
                  </h2>
                  <div className="mt-2 text-sm font-mono text-[#E6E4DC] font-bold">
                    ${selectedEdition.priceUSD} USD
                  </div>
                </div>
              </div>

              {/* Complete Tracklist */}
              <div className="border border-[#25252b] divide-y divide-[#25252b] text-xs font-mono mt-4">
                {selectedEdition.tracklist.map(t => (
                  <div key={t.side} className="p-3 flex justify-between items-center bg-[#0c0c0d]">
                    <div className="flex items-center gap-3">
                      <span className="text-[#A83824] font-bold">{t.side}</span>
                      <span className="text-[#E6E4DC]">{t.title}</span>
                    </div>
                    <span className="text-[#73716B]">{t.duration}</span>
                  </div>
                ))}
              </div>

              {/* Modal Order Button */}
              <div className="mt-6 pt-4 border-t border-[#25252b] flex items-center justify-between">
                <span className="font-mono text-xl font-bold text-[#E6E4DC]">${selectedEdition.priceUSD}</span>
                <button
                  onClick={() => {
                    onAddToCart(selectedEdition, 1);
                    onToast(`Added [${selectedEdition.catalogNumber}] to cart.`);
                    setSelectedEdition(null);
                  }}
                  className="flex items-center gap-2 bg-[#A83824] hover:bg-[#8F2F1E] text-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  ORDER {selectedEdition.format.split(" ")[0]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
