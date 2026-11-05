import React, { useState } from "react";
import { BookOpen, Scroll, ChevronRight } from "lucide-react";
import { FIELD_LOGS } from "../data";

export const LabelDispatches: React.FC = () => {
  const [selectedLogIndex, setSelectedLogIndex] = useState(0);
  const activeLog = FIELD_LOGS[selectedLogIndex] || FIELD_LOGS[0];

  return (
    <section id="dispatches" className="w-full bg-[#0c0c0d] border-b border-[#222226] text-[#E6E4DC] px-4 sm:px-8 lg:px-12 py-16 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-8 border-b border-[#222226]">
          <div className="text-[11px] font-mono text-[#A83824] tracking-widest uppercase mb-2 font-semibold">
            ARCHIVAL DISPATCHES & LINER WRITINGS // ESSAYS & LOGS
          </div>
          <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E4DC] uppercase">
            DISPATCHES & MANIFESTO
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#73716B] mt-2 max-w-2xl leading-relaxed">
            Observations on physical sound preservation, sub-glacial acoustic friction, and the philosophy of deep listening recorded on location by the collective.
          </p>
        </div>

        {/* Editorial Layout: Left Selector, Right Essay Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          {/* Left Column: Dispatches List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#73716B] block mb-2">
              EXPEDITION ENTRIES:
            </span>
            {FIELD_LOGS.map((log, idx) => {
              const isSelected = selectedLogIndex === idx;
              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLogIndex(idx)}
                  className={`p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#161619] border-[#A83824] shadow-[0_0_15px_rgba(168,56,36,0.2)]"
                      : "bg-[#0c0c0d] border-[#25252b] hover:border-[#73716B] hover:bg-[#141417]"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#73716B] mb-1">
                    <span className={isSelected ? "text-[#A83824] font-bold" : "text-[#73716B]"}>
                      {log.date}
                    </span>
                    <span className="text-[#9E9B91]">{log.depth}</span>
                  </div>
                  <h4 className="font-['Cinzel'] font-bold text-sm text-[#E6E4DC] leading-snug">
                    {log.title}
                  </h4>
                  <p className="text-[10px] font-mono text-[#73716B] mt-1 truncate">
                    {log.location}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Full Dispatch Essay Reader */}
          <div className="lg:col-span-7 bg-[#161619] border border-[#25252b] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start text-xs font-mono text-[#73716B] pb-4 mb-6 border-b border-[#25252b]">
                <div>
                  <span className="text-[#A83824] font-bold block">{activeLog.date}</span>
                  <span className="text-[#E6E4DC] text-[11px]">{activeLog.location}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[#E6E4DC]">{activeLog.depth}</span>
                  <span className="text-[10px] text-[#73716B]">COORDINATES LOGGED</span>
                </div>
              </div>

              <h3 className="font-['Cinzel'] font-black text-2xl sm:text-3xl text-[#E6E4DC] leading-tight">
                {activeLog.title}
              </h3>

              {activeLog.investigator && (
                <div className="text-xs font-mono text-[#A83824] mt-2">
                  INVESTIGATOR: {activeLog.investigator}
                </div>
              )}

              {/* Log Essay Text */}
              <div className="mt-6 space-y-4 font-mono text-xs text-[#9E9B91] leading-relaxed">
                <p>{activeLog.logText}</p>
              </div>

              {/* Readings / Telemetry Badges */}
              {activeLog.readings && activeLog.readings.length > 0 && (
                <div className="mt-6 pt-4 border-t border-[#25252b] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                  {activeLog.readings.map((reading, rIdx) => (
                    <div key={rIdx} className="bg-[#0c0c0d] p-2 border border-[#25252b]">
                      <span className="text-[#73716B] block text-[9px] uppercase">{reading.label}</span>
                      <span className="text-[#E6E4DC] font-bold mt-0.5 block">{reading.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#25252b] flex justify-between items-center text-[10px] font-mono text-[#73716B]">
              <span>AUTHENTIC FIELD TRANSCRIPTION</span>
              <span className="text-[#A83824]">{activeLog.dispatchNumber || "LITHOS SOUND ARCHIVE"}</span>
            </div>
          </div>
        </div>

        {/* The Lithos Label Manifesto */}
        <div id="about" className="mt-16 pt-12 border-t border-[#222226]">
          <div className="text-[11px] font-mono text-[#A83824] tracking-widest uppercase mb-2 font-semibold">
            PHILOSOPHICAL STATEMENT // FOUNDATIONAL PILLARS
          </div>
          <h3 className="font-['Cinzel'] font-black text-2xl sm:text-3xl text-[#E6E4DC] uppercase">
            THE PHYSICAL ARCHIVE MANIFESTO
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-xs font-mono">
            <div className="p-5 bg-[#161619] border border-[#25252b]">
              <span className="text-[#A83824] font-bold text-sm block mb-2 font-['Cinzel']">I. THE PLANETARY ORGAN</span>
              <p className="text-[#9E9B91] leading-relaxed">
                Earth's crust is not silent stone. It is a continuous acoustic cavity vibrating between 0.05 Hz and 80 Hz. We do not generate sound; we build transducers that listen to the weight of continents.
              </p>
            </div>

            <div className="p-5 bg-[#161619] border border-[#25252b]">
              <span className="text-[#A83824] font-bold text-sm block mb-2 font-['Cinzel']">II. THE PERMANENCE OF LACQUER</span>
              <p className="text-[#9E9B91] leading-relaxed">
                Streaming audio is fragile and temporary. Physical vinyl cut at 45 RPM and 1/4" magnetic tape preserve mechanical acoustic waveforms that endure across centuries. Physical media is an act of defiance against algorithmic disposability.
              </p>
            </div>

            <div className="p-5 bg-[#161619] border border-[#25252b]">
              <span className="text-[#A83824] font-bold text-sm block mb-2 font-['Cinzel']">III. NON-INVASIVE ACOUSTICS</span>
              <p className="text-[#9E9B91] leading-relaxed">
                We never inject active seismic charges or synthetic impulse explosions. We lower passive titanium velocity geophones and hadal hydrophones, honoring the silence of the subterranean world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
