import React, { useState } from "react";
import { Disc, ShoppingBag, Eye, Volume2, ShieldAlert, Check, X, ArrowUpRight, Award, Layers } from "lucide-react";
import { VinylEdition, Expedition } from "../types";
import { VINYL_EDITIONS, EXPEDITIONS } from "../data";

interface PressingVaultProps {
  onAddToCart: (edition: VinylEdition, qty?: number) => void;
  onCueExpedition: (exp: Expedition) => void;
  onToast: (msg: string) => void;
}

export const PressingVault: React.FC<PressingVaultProps> = ({
  onAddToCart,
  onCueExpedition,
  onToast,
}) => {
  const [selectedEdition, setSelectedEdition] = useState<VinylEdition | null>(null);
  const [reserveQty, setReserveQty] = useState(1);

  const handleOpenInspector = (edition: VinylEdition) => {
    setSelectedEdition(edition);
    setReserveQty(1);
  };

  const handleQuickAdd = (edition: VinylEdition, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(edition, 1);
    onToast(`Added [${edition.catalogNumber}] to your Physical Vault reservation.`);
  };

  const handlePlayAssociatedExpedition = (catNum: string, e: React.MouseEvent) => {
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
      onToast(`Cued field recording for ${found.code}: ${found.title.split(":")[0]}`);
    }
  };

  return (
    <section id="vault" className="w-full bg-[#0A0A0B] border-b border-[#27272D] px-4 lg:px-12 py-16 text-[#ECEAE4]">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#27272D]">
        <div>
          <div className="flex items-center gap-2 text-[#D94E28] font-mono text-[10px] tracking-widest uppercase mb-2">
            <Disc size={14} className="text-[#D94E28]" />
            SECTION 04 // PHYSICAL ARCHIVE & VINYL VAULT
          </div>
          <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#ECEAE4] uppercase">
            PHYSICAL EDITIONS & PRESSINGS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#8F8E8A] mt-2 max-w-2xl">
            Heavyweight 180-gram mineral-marbled vinyl pressings cut at 45 RPM and 1/4" master reel-to-reel analog tapes. Strictly limited numbered archival runs.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#8F8E8A]">
          <span>TOTAL EDITIONS: 05</span>
          <span className="text-[#38EF7D]">DIRECT MASTER TRANSFERS</span>
        </div>
      </div>

      {/* Editions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {VINYL_EDITIONS.map(edition => {
          return (
            <div
              key={edition.id}
              onClick={() => handleOpenInspector(edition)}
              className="group bg-[#141416] border border-[#27272D] hover:border-[#D94E28] transition-all p-6 flex flex-col justify-between cursor-pointer shadow-lg"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4 text-[10px] font-mono">
                <span className="text-[#D94E28] font-bold text-xs">{edition.catalogNumber}</span>
                <span className="bg-[#0A0A0B] px-2 py-0.5 border border-[#27272D] text-[#8F8E8A]">
                  RUN: {edition.editionLimit} COPIES
                </span>
              </div>

              {/* Realistic Vinyl / Reel Visual Art */}
              <div className="relative aspect-square w-full my-4 bg-[#0A0A0B] border border-[#27272D] flex items-center justify-center overflow-hidden p-6">
                {/* Grooved Vinyl Disc Mockup */}
                <div
                  className="w-56 h-56 rounded-full shadow-2xl relative flex items-center justify-center transition-transform duration-700 group-hover:rotate-45"
                  style={{
                    background: edition.mockupTheme.marbleStyle,
                    boxShadow: "0 0 30px rgba(0,0,0,0.8), inset 0 0 25px rgba(0,0,0,0.9)",
                  }}
                >
                  {/* Vinyl Runout Grooves */}
                  <div className="absolute inset-4 rounded-full border border-black/40 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-black/40 pointer-events-none" />
                  <div className="absolute inset-12 rounded-full border border-black/40 pointer-events-none" />
                  <div className="absolute inset-16 rounded-full border border-black/50 pointer-events-none" />

                  {/* Center Label */}
                  <div className="w-20 h-20 rounded-full bg-[#0A0A0B] border border-[#D94E28] flex flex-col items-center justify-center p-2 text-center text-[7px] font-mono">
                    <span className="font-['Cinzel'] font-bold text-[#ECEAE4] text-[8px] leading-tight">LITHOS</span>
                    <span className="text-[#D94E28] leading-tight">{edition.catalogNumber}</span>
                    <span className="text-[#8F8E8A] mt-0.5">45 RPM</span>
                    {/* Spindle hole */}
                    <div className="w-2 h-2 rounded-full bg-black border border-[#ECEAE4] mt-1" />
                  </div>
                </div>

                {/* Hover Quick Action Buttons */}
                <div className="absolute inset-0 bg-[#0A0A0B]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                  <button
                    onClick={(e) => handlePlayAssociatedExpedition(edition.catalogNumber, e)}
                    className="flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white font-mono text-[11px] font-bold px-4 py-2 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Volume2 size={13} />
                    AUDITION FIELD RECORDING
                  </button>

                  <span className="font-mono text-[10px] text-[#8F8E8A]">CLICK CARD TO INSPECT EDITIONS</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-4">
                <h3 className="font-['Cinzel'] font-bold text-lg text-[#ECEAE4] leading-snug group-hover:text-[#D94E28] transition-colors">
                  {edition.title}
                </h3>
                <p className="font-mono text-[11px] text-[#8F8E8A] mt-1 truncate">
                  {edition.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3 text-[10px] font-mono text-[#8F8E8A]">
                  <span className="bg-[#0A0A0B] px-2 py-0.5 border border-[#27272D] text-[#ECEAE4]">
                    {edition.format}
                  </span>
                  <span className="bg-[#0A0A0B] px-2 py-0.5 border border-[#27272D]">
                    {edition.weightGrams}g
                  </span>
                </div>
              </div>

              {/* Card Footer: Price & Quick Order */}
              <div className="mt-6 pt-4 border-t border-[#27272D] flex items-center justify-between">
                <div>
                  <span className="text-[#8F8E8A] block text-[9px] font-mono">PRICE (USD)</span>
                  <span className="text-[#ECEAE4] font-mono font-bold text-lg">${edition.priceUSD}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleQuickAdd(edition, e)}
                    className="flex items-center gap-1.5 bg-[#27272D] hover:bg-[#D94E28] text-[#ECEAE4] hover:text-white px-3 py-2 text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    RESERVE
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Edition Inspector Modal */}
      {selectedEdition && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 lg:p-8">
          <div className="bg-[#141416] border border-[#27272D] max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 lg:p-8 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEdition(null)}
              className="absolute top-6 right-6 p-2 bg-[#0A0A0B] text-[#8F8E8A] hover:text-white border border-[#27272D] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="border-b border-[#27272D] pb-6 pr-12">
              <span className="text-[#D94E28] font-mono text-[10px] font-bold tracking-widest uppercase block">
                PHYSICAL EDITION DOSSIER // {selectedEdition.catalogNumber}
              </span>
              <h2 className="font-['Cinzel'] font-black text-2xl lg:text-3xl text-[#ECEAE4] mt-1">
                {selectedEdition.title}
              </h2>
              <p className="font-mono text-xs text-[#8F8E8A] mt-1">
                {selectedEdition.subtitle}
              </p>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
              {/* Left Column: Visual Mockup & Colorway */}
              <div>
                <div
                  className="aspect-square w-full rounded-none bg-[#0A0A0B] border border-[#27272D] flex items-center justify-center p-8 relative overflow-hidden"
                >
                  <div
                    className="w-64 h-64 rounded-full shadow-2xl relative flex items-center justify-center"
                    style={{
                      background: selectedEdition.mockupTheme.marbleStyle,
                      boxShadow: "0 0 35px rgba(0,0,0,0.85)",
                    }}
                  >
                    <div className="w-24 h-24 rounded-full bg-[#0A0A0B] border border-[#D94E28] flex flex-col items-center justify-center p-2 text-center text-[8px] font-mono">
                      <span className="font-['Cinzel'] font-bold text-[#ECEAE4]">LITHOS</span>
                      <span className="text-[#D94E28]">{selectedEdition.catalogNumber}</span>
                      <div className="w-3 h-3 rounded-full bg-black border border-[#ECEAE4] mt-1" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0A0B] p-4 border border-[#27272D] mt-4 font-mono text-xs">
                  <span className="text-[#8F8E8A] block text-[9px] uppercase">COLORWAY & SPEC</span>
                  <span className="text-[#ECEAE4] font-bold mt-0.5 block">{selectedEdition.colorway}</span>
                  <span className="text-[#8F8E8A] text-[10px] block mt-1">{selectedEdition.jacketType}</span>
                </div>
              </div>

              {/* Right Column: Tracklist & Manufacturing Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[#ECEAE4] font-mono text-[10px] font-bold uppercase tracking-wider block mb-2">
                    SEISMIC AUDIO TRACKLIST:
                  </span>
                  <div className="flex flex-col divide-y divide-[#27272D] border border-[#27272D] bg-[#0A0A0B] font-mono text-xs">
                    {selectedEdition.tracklist.map(trk => (
                      <div key={trk.side} className="p-2.5 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="text-[#D94E28] font-bold w-6">{trk.side}</span>
                          <span className="text-[#ECEAE4] truncate max-w-[200px]">{trk.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#8F8E8A] text-[10px]">
                          <span>{trk.frequencyPeak}</span>
                          <span className="text-[#38EF7D]">{trk.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Curator Notes */}
                  <div className="mt-4 font-mono text-xs text-[#8F8E8A] leading-relaxed">
                    <span className="text-[#ECEAE4] font-bold block mb-1">ARCHIVAL LINER NOTE:</span>
                    {selectedEdition.curatorNotes}
                  </div>

                  {/* Technical Pressing Specs */}
                  <div className="mt-4 pt-3 border-t border-[#27272D] grid grid-cols-2 gap-2 text-[10px] font-mono text-[#8F8E8A]">
                    <div>
                      <span className="text-[#ECEAE4] block font-bold">MASTERING</span>
                      <span>{selectedEdition.specifications.lacquerCut}</span>
                    </div>
                    <div>
                      <span className="text-[#ECEAE4] block font-bold">PRESSING PLANT</span>
                      <span>{selectedEdition.specifications.pressingPlant}</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Reservation Footer */}
                <div className="mt-6 pt-4 border-t border-[#27272D] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[#8F8E8A] text-[9px] font-mono block">EDITION PRICE</span>
                    <span className="font-mono text-2xl font-bold text-[#ECEAE4]">${selectedEdition.priceUSD}</span>
                    <span className="text-[#38EF7D] text-[10px] font-mono block">
                      {selectedEdition.remainingCount} OF {selectedEdition.editionLimit} AVAILABLE
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#27272D] bg-[#0A0A0B] text-xs font-mono">
                      <button
                        onClick={() => setReserveQty(Math.max(1, reserveQty - 1))}
                        className="px-2.5 py-2 text-[#8F8E8A] hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-3 py-2 font-bold text-[#ECEAE4]">{reserveQty}</span>
                      <button
                        onClick={() => setReserveQty(Math.min(5, reserveQty + 1))}
                        className="px-2.5 py-2 text-[#8F8E8A] hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(selectedEdition, reserveQty);
                        onToast(`Reserved ${reserveQty}x [${selectedEdition.catalogNumber}] in Physical Vault.`);
                        setSelectedEdition(null);
                      }}
                      className="flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <ShoppingBag size={14} />
                      RESERVE ARCHIVAL COPY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
