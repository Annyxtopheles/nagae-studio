import React, { useState } from "react";
import { Disc, ShoppingBag, Eye, X, Volume2, ShieldCheck, ArrowUpRight } from "lucide-react";
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
  const [filterFormat, setFilterFormat] = useState<string>("ALL");

  const filteredEditions = VINYL_EDITIONS.filter(ed => {
    if (filterFormat === "ALL") return true;
    if (filterFormat === "VINYL") return ed.format.includes("Vinyl");
    if (filterFormat === "TAPE") return ed.format.includes("Tape") || ed.format.includes("Reel");
    return true;
  });

  const handleQuickAdd = (edition: VinylEdition, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(edition, 1);
    onToast(`Added [${edition.catalogNumber}] to mailorder cart.`);
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
      onToast(`Cued field recording: ${found.code} — ${found.title.split(":")[0]}`);
    }
  };

  return (
    <section id="catalog" className="w-full bg-[#0c0c0d] border-b border-[#222226] text-[#E6E4DC] px-4 sm:px-8 lg:px-12 py-16 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222226]">
          <div>
            <div className="text-[11px] font-mono text-[#A83824] tracking-widest uppercase mb-2 font-semibold">
              CATALOG DISCOGRAPHY // COMPLETE PHYSICAL ARCHIVE
            </div>
            <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E4DC] uppercase">
              RELEASES & PRESSINGS
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#73716B] mt-2 max-w-2xl leading-relaxed">
              Every title pressed on heavyweight 180-gram mineral vinyl or transferred to 1/4" master analog tape. Mastered directly from subterranean field transducers without compression.
            </p>
          </div>

          {/* Format Filter Bar */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {["ALL", "VINYL", "TAPE"].map(fmt => (
              <button
                key={fmt}
                onClick={() => setFilterFormat(fmt)}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                  filterFormat === fmt
                    ? "bg-[#A83824] text-white border-[#A83824]"
                    : "bg-[#161619] text-[#73716B] border-[#25252b] hover:text-[#E6E4DC]"
                }`}
              >
                {fmt === "ALL" ? "ALL FORMATS" : fmt === "VINYL" ? "180G VINYL" : "ANALOG TAPE"}
              </button>
            ))}
          </div>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredEditions.map(edition => {
            return (
              <div
                key={edition.id}
                onClick={() => setSelectedEdition(edition)}
                className="group bg-[#161619] border border-[#25252b] hover:border-[#A83824] transition-all p-6 flex flex-col justify-between cursor-pointer shadow-xl"
              >
                {/* Release Card Header */}
                <div className="flex justify-between items-start mb-4 text-[10px] font-mono">
                  <span className="text-[#A83824] font-bold text-xs tracking-wider">{edition.catalogNumber}</span>
                  <span className="bg-[#0c0c0d] px-2 py-0.5 border border-[#25252b] text-[#73716B]">
                    RUN: {edition.editionLimit} COPIES
                  </span>
                </div>

                {/* Tactile Album Cover Artwork & Sliding Vinyl Mockup */}
                <div className="relative aspect-square w-full my-4 bg-[#0c0c0d] border border-[#25252b] flex items-center justify-center overflow-hidden p-4">
                  {/* Heavyweight Album Cover Jacket with Real Artwork */}
                  <div className="absolute left-3 w-40 sm:w-48 h-40 sm:h-48 bg-[#161619] border border-[#2e2e34] shadow-2xl z-10 overflow-hidden">
                    <img
                      src={edition.coverArt}
                      alt={edition.title}
                      className="w-full h-full object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                    <span className="absolute top-2 left-2 bg-black/75 px-1.5 py-0.5 text-[8px] font-mono text-[#A83824] font-bold border border-white/10">
                      {edition.catalogNumber}
                    </span>
                  </div>

                  {/* Grooved Vinyl Disc sliding out from the sleeve */}
                  <div
                    className="absolute right-3 w-40 sm:w-48 h-40 sm:h-48 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover:translate-x-3 group-hover:rotate-45 z-0"
                    style={{
                      background: edition.mockupTheme.marbleStyle,
                      boxShadow: "0 0 25px rgba(0,0,0,0.9)",
                    }}
                  >
                    {/* Vinyl Grooves */}
                    <div className="absolute inset-3 rounded-full border border-black/45 pointer-events-none" />
                    <div className="absolute inset-7 rounded-full border border-black/45 pointer-events-none" />
                    <div className="absolute inset-11 rounded-full border border-black/55 pointer-events-none" />

                    {/* Center Label */}
                    <div className="w-14 h-14 rounded-full bg-[#0c0c0d] border border-[#A83824] flex flex-col items-center justify-center text-center p-1 font-mono text-[6px]">
                      <span className="font-['Cinzel'] font-bold text-[#E6E4DC] text-[7px] leading-tight">LITHOS</span>
                      <span className="text-[#A83824] leading-tight">{edition.catalogNumber}</span>
                    </div>
                  </div>

                  {/* Hover Quick-Listen Overlay Button */}
                  <button
                    onClick={(e) => handlePlayEdition(edition.catalogNumber, e)}
                    className="absolute bottom-3 right-3 z-20 bg-[#0c0c0d]/90 hover:bg-[#A83824] text-[#E6E4DC] hover:text-white p-2.5 border border-[#2e2e34] hover:border-[#A83824] transition-all cursor-pointer shadow-lg"
                    title="Audition this release"
                  >
                    <Volume2 size={15} />
                  </button>
                </div>

                {/* Title & Technical Specs */}
                <div>
                  <h3 className="font-['Cinzel'] font-black text-lg text-[#E6E4DC] group-hover:text-[#A83824] transition-colors leading-snug">
                    {edition.title}
                  </h3>
                  <p className="font-mono text-xs text-[#73716B] mt-1 line-clamp-2">
                    {edition.subtitle}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#25252b] text-[10px] font-mono text-[#73716B] space-y-1">
                    <div className="flex justify-between">
                      <span>FORMAT:</span>
                      <span className="text-[#E6E4DC]">{edition.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PACKAGING:</span>
                      <span className="text-[#9E9B91] truncate max-w-[170px]">
                        {edition.jacketType ? edition.jacketType.split("with")[0] : "Gatefold Jacket"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Cart Action Bar */}
                <div className="mt-6 pt-4 border-t border-[#25252b] flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold font-mono text-[#E6E4DC]">${edition.priceUSD}</span>
                    <span className="text-[10px] font-mono text-[#73716B] block">
                      {edition.remainingCount} in stock
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedEdition(edition)}
                      className="p-2 border border-[#2e2e34] hover:border-[#E6E4DC] text-[#73716B] hover:text-[#E6E4DC] transition-colors cursor-pointer"
                      title="Inspect Liner Notes"
                    >
                      <Eye size={15} />
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(edition, e)}
                      className="flex items-center gap-1.5 bg-[#A83824] hover:bg-[#8F2F1E] text-white px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <ShoppingBag size={13} />
                      ORDER
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Archival Edition Dossier Modal */}
        {selectedEdition && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#161619] border border-[#2e2e34] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-[#E6E4DC]">
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
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A83824] uppercase tracking-widest mb-1.5 font-semibold">
                    ARCHIVAL LINER DOSSIER // {selectedEdition.catalogNumber}
                  </div>

                  <h2 className="font-['Cinzel'] font-black text-2xl sm:text-3xl text-[#E6E4DC] leading-tight">
                    {selectedEdition.title}
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-[#9E9B91] mt-1.5">
                    {selectedEdition.subtitle}
                  </p>
                  <div className="mt-3 inline-block bg-[#0c0c0d] px-2.5 py-1 text-[10px] font-mono border border-[#25252b] text-[#E6E4DC]">
                    {selectedEdition.format} · EDITION OF {selectedEdition.editionLimit}
                  </div>
                </div>
              </div>

              <blockquote className="p-4 bg-[#0c0c0d] border-l-2 border-[#A83824] text-xs font-mono text-[#9E9B91] leading-relaxed italic">
                "{selectedEdition.curatorNotes}"
              </blockquote>

              {/* Complete Tracklist */}
              <div className="mt-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#73716B] block mb-2">
                  COMPLETE MASTER TRACKLIST:
                </span>
                <div className="border border-[#25252b] divide-y divide-[#25252b] text-xs font-mono">
                  {selectedEdition.tracklist.map(t => (
                    <div key={t.side} className="p-3 flex justify-between items-center bg-[#0c0c0d]">
                      <div className="flex items-center gap-3">
                        <span className="text-[#A83824] font-bold">{t.side}</span>
                        <span className="text-[#E6E4DC]">{t.title}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[#73716B] text-[10px]">
                        <span>{t.depthRecorded}</span>
                        <span className="text-[#9E9B91] font-bold">{t.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mastering & Manufacturing Details */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-[#0c0c0d] p-4 border border-[#25252b]">
                <div>
                  <span className="text-[#73716B] block text-[10px]">LACQUER CUT & MASTERING:</span>
                  <span className="text-[#E6E4DC] mt-0.5 block">{selectedEdition.specifications.lacquerCut}</span>
                </div>
                <div>
                  <span className="text-[#73716B] block text-[10px]">PRESSING PLANT:</span>
                  <span className="text-[#E6E4DC] mt-0.5 block">{selectedEdition.specifications.pressingPlant}</span>
                </div>
                <div>
                  <span className="text-[#73716B] block text-[10px]">PACKAGING ARCHIVE:</span>
                  <span className="text-[#E6E4DC] mt-0.5 block">{selectedEdition.specifications.packaging}</span>
                </div>
                <div>
                  <span className="text-[#73716B] block text-[10px]">COLORWAY / VINYL FINISH:</span>
                  <span className="text-[#E6E4DC] mt-0.5 block">{selectedEdition.colorway}</span>
                </div>
              </div>

              {/* Purchase Modal Footer */}
              <div className="mt-8 pt-6 border-t border-[#25252b] flex items-center justify-between">
                <div>
                  <span className="font-mono text-2xl font-bold text-[#E6E4DC]">${selectedEdition.priceUSD}</span>
                  <span className="text-[10px] font-mono text-[#73716B] block">PHYSICAL MAILORDER EDITION</span>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(selectedEdition, 1);
                    onToast(`Added [${selectedEdition.catalogNumber}] to mailorder cart.`);
                    setSelectedEdition(null);
                  }}
                  className="flex items-center gap-2 bg-[#A83824] hover:bg-[#8F2F1E] text-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  ORDER PHYSICAL {selectedEdition.format.split(" ")[0]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
