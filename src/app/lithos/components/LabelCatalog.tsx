import React, { useState, useEffect } from "react";
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

  // Keyboard shortcut to close lightbox on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEdition(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <section id="catalog" className="w-full bg-lithos-basalt border-b border-lithos-border text-lithos-chalk px-4 sm:px-8 lg:px-12 py-16 select-none font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-baseline pb-6 border-b border-lithos-border">
          <h2 className="font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Catalog
          </h2>
          <span className="text-xs text-lithos-muted">5 Releases</span>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {VINYL_EDITIONS.map(edition => {
            return (
              <div
                key={edition.id}
                onClick={() => setSelectedEdition(edition)}
                className="group bg-lithos-strata border border-lithos-border hover:border-lithos-rust rounded-sm transition-colors duration-200 p-5 flex flex-col justify-between cursor-pointer shadow-lg"
              >
                {/* Pure Artwork Image with Vinyl Disc Mockup */}
                <div className="relative aspect-square w-full mb-4 bg-lithos-basalt border border-lithos-border rounded-sm flex items-center justify-center overflow-hidden p-3">
                  {/* Heavyweight Album Cover Jacket: Pure Image Only */}
                  <div className="absolute left-3 w-40 sm:w-48 h-40 sm:h-48 bg-lithos-charcoal border border-lithos-border shadow-2xl z-10 overflow-hidden rounded-sm">
                    <img
                      src={edition.coverArt}
                      alt={edition.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Grooved Vinyl Disc sliding out from the sleeve */}
                  <div
                    className="absolute right-3 w-40 sm:w-48 h-40 sm:h-48 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:rotate-45 z-0"
                    style={{
                      background: edition.mockupTheme.marbleStyle,
                      boxShadow: "0 0 25px rgba(0,0,0,0.9)",
                    }}
                  >
                    <div className="absolute inset-3 rounded-full border border-black/45 pointer-events-none" />
                    <div className="absolute inset-7 rounded-full border border-black/45 pointer-events-none" />
                    <div className="absolute inset-11 rounded-full border border-black/55 pointer-events-none" />

                    <div className="w-14 h-14 rounded-full bg-lithos-basalt border border-lithos-rust flex flex-col items-center justify-center text-center p-1 text-[7px]">
                      <span className="font-extrabold text-white text-[8px] leading-tight">LITHOS</span>
                      <span className="text-lithos-rust leading-tight font-semibold">{edition.catalogNumber}</span>
                    </div>
                  </div>

                  {/* Quick-Listen Button */}
                  <button
                    onClick={(e) => handlePlayEdition(edition.catalogNumber, e)}
                    className="absolute bottom-3 right-3 z-20 bg-lithos-basalt/90 hover:bg-lithos-rust text-white p-2.5 rounded-full border border-lithos-border hover:border-lithos-rust transition-colors duration-150 cursor-pointer shadow-lg"
                    title="Audition"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                {/* Title & Format */}
                <div>
                  <span className="text-[11px] font-semibold text-lithos-rust block mb-1">
                    {edition.catalogNumber}
                  </span>
                  <h3 className="font-bold text-lg text-white group-hover:text-lithos-rust transition-colors duration-150 leading-snug">
                    {edition.title.split(":")[0]}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-lithos-muted mt-2">
                    <span>{edition.format.split(" ")[0]}</span>
                    <span className="text-white font-semibold">${edition.priceUSD} USD</span>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-4 pt-4 border-t border-lithos-border flex items-center justify-between">
                  <span className="text-xs text-lithos-muted">
                    {edition.remainingCount} in stock
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(edition, e)}
                    className="flex items-center gap-1.5 bg-lithos-rust hover:bg-lithos-rust/90 text-white px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors duration-150 cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Archival Edition Dossier Lightbox Modal */}
        {selectedEdition && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedEdition(null)}
          >
            <div
              className="bg-lithos-charcoal border border-lithos-border max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-lithos-chalk cursor-default rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEdition(null)}
                className="absolute top-6 right-6 text-lithos-muted hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 border border-lithos-border shadow-xl overflow-hidden bg-black rounded-sm">
                  <img
                    src={selectedEdition.coverArt}
                    alt={selectedEdition.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <span className="text-xs font-semibold text-lithos-rust block mb-1">
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
              <div className="border border-lithos-border bg-lithos-basalt rounded-sm divide-y divide-lithos-border text-xs mt-4">
                {selectedEdition.tracklist.map(t => (
                  <div key={t.side} className="p-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-lithos-rust font-bold">{t.side}</span>
                      <span className="text-white">{t.title}</span>
                    </div>
                    <span className="text-lithos-muted">{t.duration}</span>
                  </div>
                ))}
              </div>

              {/* Modal Order Button */}
              <div className="mt-6 pt-4 border-t border-lithos-border flex items-center justify-between">
                <span className="text-xl font-bold text-white">${selectedEdition.priceUSD} USD</span>
                <button
                  onClick={() => {
                    onAddToCart(selectedEdition, 1);
                    onToast(`Added [${selectedEdition.catalogNumber}] to cart.`);
                    setSelectedEdition(null);
                  }}
                  className="flex items-center gap-2 bg-lithos-rust hover:bg-lithos-rust/90 text-white px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors duration-150 cursor-pointer"
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
