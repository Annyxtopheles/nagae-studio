import React, { useState } from "react";
import { FileText, MapPin, Compass, ShieldAlert, Award, Calendar, User, ChevronRight } from "lucide-react";
import { FieldLog } from "../types";
import { FIELD_LOGS, MANIFESTO_TEXT } from "../data";

export const FieldLogsManifesto: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<FieldLog>(FIELD_LOGS[0]);

  return (
    <section id="manifesto" className="w-full bg-[#0A0A0B] border-b border-[#27272D] px-4 lg:px-12 py-16 text-[#ECEAE4]">
      {/* 1. The Lithos Manifesto */}
      <div className="pb-16 border-b border-[#27272D]">
        <div className="flex items-center gap-2 text-[#D94E28] font-mono text-[10px] tracking-widest uppercase mb-2">
          <Award size={14} className="text-[#D94E28]" />
          SECTION 05 // PHILOSOPHICAL MANIFESTO
        </div>
        <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#ECEAE4] uppercase max-w-4xl">
          {MANIFESTO_TEXT.heading}
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#8F8E8A] mt-2 max-w-2xl">
          {MANIFESTO_TEXT.subheading}
        </p>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {MANIFESTO_TEXT.principles.map(p => (
            <div key={p.num} className="bg-[#141416] border border-[#27272D] p-6 flex flex-col justify-between">
              <div>
                <span className="font-['Cinzel'] font-black text-3xl text-[#D94E28] block mb-3">
                  {p.num}
                </span>
                <h3 className="font-['Cinzel'] font-bold text-lg text-[#ECEAE4] mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="font-mono text-xs text-[#8F8E8A] leading-relaxed">
                  {p.body}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#27272D] text-[9px] font-mono text-[#D94E28] uppercase tracking-widest">
                DECLARATION // VERIFIED
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Chronological Field Log Dispatches */}
      <div className="pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#38EF7D] font-mono text-[10px] tracking-widest uppercase mb-2">
              <FileText size={14} className="text-[#38EF7D]" />
              EXPEDITION FIELD DIARY & LOG ARCHIVE
            </div>
            <h3 className="font-['Cinzel'] font-black text-2xl sm:text-3xl lg:text-4xl text-[#ECEAE4] uppercase">
              DISPATCHES FROM THE DEEP CRUST
            </h3>
          </div>
          <span className="font-mono text-xs text-[#8F8E8A]">
            SHOWING 5 ARCHIVED SCIENTIFIC LOGS
          </span>
        </div>

        {/* Field Logs Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Dispatch List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {FIELD_LOGS.map(log => {
              const isSelected = selectedLog.id === log.id;
              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#141416] border-[#D94E28] shadow-[0_0_15px_rgba(217,78,40,0.2)]"
                      : "bg-[#0A0A0B] border-[#27272D] hover:border-[#8F8E8A] hover:bg-[#141416]"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                    <span className={isSelected ? "text-[#D94E28] font-bold" : "text-[#8F8E8A]"}>
                      {log.dispatchNumber}
                    </span>
                    <span className="text-[#ECEAE4]">{log.date}</span>
                  </div>
                  <h4 className="font-['Cinzel'] font-bold text-sm text-[#ECEAE4] truncate">
                    {log.title}
                  </h4>
                  <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-[#8F8E8A]">
                    <span className="truncate max-w-[200px]">{log.location}</span>
                    <span className="text-[#38EF7D] font-bold">{log.depth}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Dispatch Full Reader (7 cols) */}
          <div className="lg:col-span-7 bg-[#141416] border border-[#27272D] p-6 lg:p-8">
            <div className="border-b border-[#27272D] pb-4">
              <div className="flex justify-between items-start text-[10px] font-mono">
                <span className="text-[#D94E28] font-bold">{selectedLog.dispatchNumber}</span>
                <span className="text-[#38EF7D] font-bold bg-[#0A0A0B] px-2 py-0.5 border border-[#27272D]">
                  {selectedLog.status}
                </span>
              </div>
              <h3 className="font-['Cinzel'] font-black text-xl lg:text-2xl text-[#ECEAE4] mt-2">
                {selectedLog.title}
              </h3>
              <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-[#8F8E8A]">
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-[#D94E28]" />
                  {selectedLog.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#38EF7D]" />
                  {selectedLog.coordinates}
                </span>
                <span className="flex items-center gap-1">
                  <User size={12} className="text-[#ECEAE4]" />
                  {selectedLog.investigator}
                </span>
              </div>
            </div>

            {/* Log Body Text */}
            <div className="mt-6 text-sm font-mono text-[#ECEAE4]/90 leading-relaxed bg-[#0A0A0B] p-5 border border-[#27272D]">
              {selectedLog.logText}
            </div>

            {/* Scientific Telemetry Readouts Grid */}
            <div className="mt-6">
              <span className="text-[#8F8E8A] text-[10px] font-mono uppercase tracking-widest block mb-2">
                CALIBRATED TELEMETRY READOUTS:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {selectedLog.readings.map(r => (
                  <div key={r.label} className="bg-[#0A0A0B] p-2.5 border border-[#27272D]">
                    <span className="text-[#8F8E8A] block text-[9px]">{r.label}</span>
                    <span className="text-[#ECEAE4] font-bold mt-0.5 block">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
