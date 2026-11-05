import React, { useState } from "react";
import { Cpu, Eye, ShieldAlert, Layers, ExternalLink, Info, Check } from "lucide-react";
import { HardwareSchematic, ComponentPart } from "../types";
import { HARDWARE_SCHEMATICS } from "../data";

export const HardwareSchematics: React.FC = () => {
  const [selectedRig, setSelectedRig] = useState<HardwareSchematic>(HARDWARE_SCHEMATICS[0]);
  const [selectedPart, setSelectedPart] = useState<ComponentPart>(HARDWARE_SCHEMATICS[0].parts[0]);

  const handleSelectRig = (rig: HardwareSchematic) => {
    setSelectedRig(rig);
    setSelectedPart(rig.parts[0]);
  };

  return (
    <section id="schematics" className="w-full bg-[#0A0A0B] border-b border-[#27272D] px-4 lg:px-12 py-16 text-[#ECEAE4]">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#27272D]">
        <div>
          <div className="flex items-center gap-2 text-[#38EF7D] font-mono text-[10px] tracking-widest uppercase mb-2">
            <Cpu size={14} className="text-[#38EF7D]" />
            SECTION 03 // SUBTERRANEAN SENSOR ENGINEERING
          </div>
          <h2 className="font-['Cinzel'] font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#ECEAE4] uppercase">
            TRANSDUCER RIG & HARDWARE SCHEMATICS
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#8F8E8A] mt-2 max-w-2xl">
            Custom-milled titanium housings, piezoceramic hadal transducers, and modified analog tape transports engineered to survive extreme hydrostatic pressure and geothermal heat.
          </p>
        </div>

        {/* Hardware Rig Tabs */}
        <div className="flex flex-wrap gap-2">
          {HARDWARE_SCHEMATICS.map(rig => {
            const isSelected = selectedRig.id === rig.id;
            return (
              <button
                key={rig.id}
                onClick={() => handleSelectRig(rig)}
                className={`px-4 py-2.5 font-mono text-xs font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#D94E28] text-white border-[#D94E28] shadow-[0_0_15px_rgba(217,78,40,0.3)]"
                    : "bg-[#141416] text-[#8F8E8A] border-[#27272D] hover:text-[#ECEAE4] hover:border-[#8F8E8A]"
                }`}
              >
                {rig.code} // {rig.name.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Schematic Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        {/* Left Column: Interactive Technical SVG Cutaway Diagram (7 Cols) */}
        <div className="lg:col-span-7 bg-[#141416] border border-[#27272D] p-6 lg:p-8 flex flex-col justify-between min-h-[580px] relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 geo-grid-pattern opacity-40 pointer-events-none" />

          {/* Blueprint Title Block */}
          <div className="relative z-10 flex justify-between items-start border-b border-[#27272D] pb-4 mb-4 text-[10px] font-mono text-[#8F8E8A]">
            <div>
              <span className="text-[#ECEAE4] font-bold text-xs uppercase block">{selectedRig.name}</span>
              <span>CLASSIFICATION: {selectedRig.type}</span>
            </div>
            <div className="text-right">
              <span className="text-[#38EF7D] font-bold block">{selectedRig.deploymentDepthMax}</span>
              <span>METALLURGY: {selectedRig.casingMetallurgy.split(" ")[0]}</span>
            </div>
          </div>

          {/* Interactive Exploded Blueprint SVG */}
          <div className="relative z-10 my-auto w-full max-w-[500px] mx-auto aspect-square flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full select-none">
              <defs>
                <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Central Technical Crosshairs */}
              <line x1="250" y1="20" x2="250" y2="480" stroke="#27272D" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="250" x2="480" y2="250" stroke="#27272D" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="250" cy="250" r="180" fill="none" stroke="#27272D" strokeWidth="1" strokeDasharray="6 6" />

              {selectedRig.schematicSvgType === "geophone" && (
                /* Borehole Geophone Exploded Layers */
                <g>
                  {/* Outer Titanium Hull Shell */}
                  <rect x="180" y="60" width="140" height="380" rx="14" fill="#0A0A0B" stroke={selectedPart.id === "p-01" ? "#D94E28" : "#8F8E8A"} strokeWidth="2" />
                  <line x1="180" y1="120" x2="320" y2="120" stroke="#27272D" strokeWidth="1" />
                  <line x1="180" y1="380" x2="320" y2="380" stroke="#27272D" strokeWidth="1" />

                  {/* Internal Suspension Coils */}
                  <path d="M 220 160 Q 250 140 280 160 T 220 200 T 280 240 T 220 280" fill="none" stroke={selectedPart.id === "p-02" ? "#38EF7D" : "#ECEAE4"} strokeWidth="2.5" />
                  <circle cx="250" cy="220" r="28" fill="#141416" stroke={selectedPart.id === "p-02" ? "#38EF7D" : "#ECEAE4"} strokeWidth="2" />

                  {/* SmCo Magnets & Sensing Coils */}
                  <rect x="200" y="300" width="100" height="45" fill="#1F1F24" stroke={selectedPart.id === "p-03" ? "#D94E28" : "#8F8E8A"} strokeWidth="2" />
                  <line x1="210" y1="310" x2="290" y2="310" stroke="#D94E28" strokeWidth="1.5" />
                  <line x1="210" y1="322" x2="290" y2="322" stroke="#D94E28" strokeWidth="1.5" />
                  <line x1="210" y1="334" x2="290" y2="334" stroke="#D94E28" strokeWidth="1.5" />

                  {/* Downhole Preamp */}
                  <rect x="210" y="390" width="80" height="35" fill="#0A0A0B" stroke={selectedPart.id === "p-04" ? "#38EF7D" : "#8F8E8A"} strokeWidth="1.5" />
                  <circle cx="230" cy="407" r="4" fill="#38EF7D" />
                  <circle cx="270" cy="407" r="4" fill="#38EF7D" />
                </g>
              )}

              {selectedRig.schematicSvgType === "hydrophone" && (
                /* Deep-Trench Hydrophone Layers */
                <g>
                  {/* Polyurethane Acoustic Window Dome */}
                  <path d="M 170 140 C 170 70, 330 70, 330 140 L 330 260 L 170 260 Z" fill="#0A0A0B" stroke={selectedPart.id === "p-11" ? "#38EF7D" : "#8F8E8A"} strokeWidth="2" />

                  {/* PZT Piezoceramic Cylinder */}
                  <rect x="200" y="150" width="100" height="90" rx="6" fill="#1F1F24" stroke={selectedPart.id === "p-12" ? "#D94E28" : "#ECEAE4"} strokeWidth="2.5" />
                  <ellipse cx="250" cy="150" rx="50" ry="12" fill="#27272D" stroke="#D94E28" strokeWidth="1.5" />
                  <ellipse cx="250" cy="240" rx="50" ry="12" fill="#27272D" stroke="#D94E28" strokeWidth="1.5" />

                  {/* Inconel Pressure Bellows */}
                  <path d="M 190 280 L 310 280 L 300 310 L 320 330 L 300 350 L 310 370 L 190 370 L 200 350 L 180 330 L 200 310 Z" fill="#141416" stroke={selectedPart.id === "p-13" ? "#D94E28" : "#8F8E8A"} strokeWidth="2" />

                  {/* Titanium Base Bulkhead Penetrator */}
                  <rect x="180" y="380" width="140" height="60" rx="4" fill="#0A0A0B" stroke={selectedPart.id === "p-14" ? "#38EF7D" : "#ECEAE4"} strokeWidth="2" />
                  <line x1="220" y1="440" x2="220" y2="470" stroke="#38EF7D" strokeWidth="2" />
                  <line x1="280" y1="440" x2="280" y2="470" stroke="#38EF7D" strokeWidth="2" />
                </g>
              )}

              {selectedRig.schematicSvgType === "reel-to-reel" && (
                /* Reel-to-Reel Modulator Transport */
                <g>
                  {/* Heavy Duralumin Chassis */}
                  <rect x="80" y="100" width="340" height="300" rx="10" fill="#0A0A0B" stroke={selectedPart.id === "p-24" ? "#D94E28" : "#8F8E8A"} strokeWidth="2" />

                  {/* Left Supply Reel */}
                  <circle cx="170" cy="190" r="65" fill="#141416" stroke={selectedPart.id === "p-21" ? "#38EF7D" : "#ECEAE4"} strokeWidth="2" />
                  <circle cx="170" cy="190" r="22" fill="#27272D" stroke="#ECEAE4" strokeWidth="1" />
                  {/* Three-leaf NAB center */}
                  <line x1="170" y1="175" x2="170" y2="205" stroke="#D94E28" strokeWidth="3" />
                  <line x1="155" y1="190" x2="185" y2="190" stroke="#D94E28" strokeWidth="3" />

                  {/* Right Takeup Reel */}
                  <circle cx="330" cy="190" r="65" fill="#141416" stroke={selectedPart.id === "p-21" ? "#38EF7D" : "#ECEAE4"} strokeWidth="2" />
                  <circle cx="330" cy="190" r="22" fill="#27272D" stroke="#ECEAE4" strokeWidth="1" />
                  <line x1="330" y1="175" x2="330" y2="205" stroke="#D94E28" strokeWidth="3" />
                  <line x1="315" y1="190" x2="345" y2="190" stroke="#D94E28" strokeWidth="3" />

                  {/* Center Tape Head Block */}
                  <rect x="200" y="290" width="100" height="48" rx="4" fill="#1F1F24" stroke={selectedPart.id === "p-22" ? "#D94E28" : "#ECEAE4"} strokeWidth="2" />
                  <circle cx="225" cy="314" r="8" fill="#D94E28" />
                  <circle cx="250" cy="314" r="8" fill="#ECEAE4" />
                  <circle cx="275" cy="314" r="8" fill="#38EF7D" />

                  {/* FM Modulator Circuit Block */}
                  <rect x="120" y="345" width="260" height="40" fill="#0A0A0B" stroke={selectedPart.id === "p-23" ? "#38EF7D" : "#8F8E8A"} strokeWidth="1.5" />
                  <line x1="140" y1="365" x2="360" y2="365" stroke="#38EF7D" strokeWidth="1" strokeDasharray="3 3" />
                </g>
              )}

              {/* Clickable Hotspot Callout Markers */}
              {selectedRig.parts.map((part, index) => {
                const isPartSelected = selectedPart.id === part.id;
                // Target coordinate mapping for callout pills
                const calloutY = 110 + index * 80;
                return (
                  <g
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing Target Ring */}
                    <circle
                      cx="60"
                      cy={calloutY}
                      r={isPartSelected ? "14" : "10"}
                      fill={isPartSelected ? "#D94E28" : "#141416"}
                      stroke={isPartSelected ? "#ECEAE4" : "#8F8E8A"}
                      strokeWidth="1.5"
                      className="transition-all"
                    />
                    <text
                      x="60"
                      y={calloutY + 4}
                      textAnchor="middle"
                      fill={isPartSelected ? "#FFFFFF" : "#ECEAE4"}
                      fontSize="10"
                      fontFamily="Space Mono"
                      fontWeight="bold"
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Sub-Assembly Selector Buttons */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#27272D] text-[10px] font-mono">
            {selectedRig.parts.map((part, i) => {
              const isSelected = selectedPart.id === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  className={`p-2 border text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#D94E28] text-white border-[#D94E28] font-bold"
                      : "bg-[#0A0A0B] text-[#8F8E8A] border-[#27272D] hover:text-[#ECEAE4]"
                  }`}
                >
                  <span className="block opacity-75">PART 0{i + 1} //</span>
                  <span className="truncate block">{part.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Exploded Part Metallurgy & Specifications (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Active Part Detailed Inspector */}
          <div className="bg-[#141416] border border-[#27272D] p-6 lg:p-8">
            <div className="flex justify-between items-start border-b border-[#27272D] pb-4">
              <div>
                <span className="text-[#D94E28] font-mono text-[10px] tracking-widest uppercase block">
                  COMPONENT SPECIFICATION
                </span>
                <h3 className="font-['Cinzel'] font-bold text-xl text-[#ECEAE4] mt-1">
                  {selectedPart.name}
                </h3>
              </div>
              <span className="bg-[#0A0A0B] text-[#38EF7D] border border-[#27272D] px-2 py-1 font-mono text-[10px]">
                {selectedPart.partNumber}
              </span>
            </div>

            {/* Description & Functional Purpose */}
            <div className="mt-4 text-xs font-mono text-[#8F8E8A] leading-relaxed">
              <span className="text-[#ECEAE4] font-bold block mb-1">ACOUSTIC / MECHANICAL FUNCTION:</span>
              {selectedPart.function}
            </div>

            {/* Technical Attribute Grid */}
            <div className="grid grid-cols-2 gap-3 mt-6 text-[11px] font-mono">
              <div className="bg-[#0A0A0B] p-3 border border-[#27272D]">
                <span className="text-[#8F8E8A] text-[9px] block">MATERIAL / METALLURGY</span>
                <span className="text-[#ECEAE4] font-bold mt-0.5 block">{selectedPart.material}</span>
              </div>

              <div className="bg-[#0A0A0B] p-3 border border-[#27272D]">
                <span className="text-[#8F8E8A] text-[9px] block">MAX DEPTH TOLERANCE</span>
                <span className="text-[#D94E28] font-bold mt-0.5 block">{selectedPart.depthRating}</span>
              </div>

              <div className="bg-[#0A0A0B] p-3 border border-[#27272D] col-span-2">
                <span className="text-[#8F8E8A] text-[9px] block">FREQUENCY RESPONSE WINDOW</span>
                <span className="text-[#38EF7D] font-bold mt-0.5 block">{selectedPart.frequencyTolerance}</span>
              </div>
            </div>

            {/* Laboratory Test Specifications */}
            <div className="mt-6 pt-4 border-t border-[#27272D]">
              <span className="text-[#ECEAE4] font-mono text-[10px] font-bold tracking-wider uppercase block mb-3">
                BENCHMARK CALIBRATION SPECS:
              </span>
              <div className="flex flex-col gap-2 font-mono text-xs">
                {Object.entries(selectedPart.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-1 border-b border-[#27272D]/50">
                    <span className="text-[#8F8E8A]">{key}</span>
                    <span className="text-[#ECEAE4] font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rig Summary & Deployment Brief */}
          <div className="bg-[#141416] border border-[#27272D] p-6 text-xs font-mono">
            <span className="text-[#8F8E8A] text-[10px] uppercase tracking-widest block mb-2">FIELD DEPLOYMENT PROTOCOL</span>
            <p className="text-[#8F8E8A] leading-relaxed">
              {selectedRig.summary}
            </p>
            <div className="mt-4 pt-3 border-t border-[#27272D] text-[10px] text-[#8F8E8A] flex justify-between">
              <span>DIMENSIONS: {selectedRig.dimensions.split("//")[0]}</span>
              <span className="text-[#38EF7D]">STATUS: DEPLOYABLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
