import React from "react";
import { FIELD_LOGS } from "../data";

export const LabelDispatches: React.FC = () => {
  // Show the first 3 poignant dispatches
  const dispatches = FIELD_LOGS.slice(0, 3);

  return (
    <section id="dispatches" className="w-full bg-[#0c0c0d] border-b border-[#222226] text-[#E6E4DC] px-4 sm:px-8 lg:px-12 py-16 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-baseline pb-6 border-b border-[#222226]">
          <h2 className="font-['Cinzel'] font-black text-2xl sm:text-3xl text-[#E6E4DC] uppercase">
            DISPATCHES
          </h2>
          <span className="font-mono text-xs text-[#73716B]">FIELD NOTES & LINER LOGS</span>
        </div>

        {/* 3 Clean Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {dispatches.map(log => (
            <div
              key={log.id}
              className="bg-[#161619]/30 border border-[#25252b] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-[#73716B] mb-3">
                  <span className="text-[#A83824] font-bold">{log.date}</span>
                  <span>{log.depth}</span>
                </div>

                <h3 className="font-['Cinzel'] font-bold text-lg text-[#E6E4DC] leading-snug">
                  {log.title}
                </h3>

                <p className="font-mono text-xs text-[#9E9B91] mt-3 leading-relaxed line-clamp-4">
                  {log.logText}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#25252b] text-[10px] font-mono text-[#73716B] flex justify-between">
                <span>{log.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
