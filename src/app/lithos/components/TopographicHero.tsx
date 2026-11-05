import React, { useState, useEffect, useRef } from "react";
import { Compass, MapPin, Activity, ArrowDownRight, Radio, Volume2, ShieldAlert } from "lucide-react";
import { Expedition } from "../types";
import { EXPEDITIONS } from "../data";

interface TopographicHeroProps {
  activeExpedition: Expedition;
  onSelectExpedition: (exp: Expedition) => void;
  onLaunchSynthesizer: () => void;
}

export const TopographicHero: React.FC<TopographicHeroProps> = ({
  activeExpedition,
  onSelectExpedition,
  onLaunchSynthesizer,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [computedCoords, setComputedCoords] = useState({
    lat: "64.1466° N",
    lng: "21.9426° W",
    depth: -1420,
    strata: "REYKJANES BASALTIC RIFT",
    hydroDb: "-192 dB re 1V/µPa",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setMousePos({ x, y });

    // Procedurally map cursor position to realistic subterranean depth and geographic coordinates
    const baseLat = 64.1466 + (y - 0.5) * 8.4;
    const baseLng = 21.9426 + (x - 0.5) * 12.8;
    const calcDepth = Math.round(-300 - Math.pow(x, 1.8) * 9800);
    const calcHydro = -170 - Math.round(y * 28);

    let strataName = "OCEANIC BASALTIC CRUST (LAYER 2A)";
    if (calcDepth < -5000) strataName = "MOHOROVIČIĆ DISCONTINUITY";
    if (calcDepth < -9000) strataName = "HADAL SERPENTINIZED PERIDOTITE";

    setComputedCoords({
      lat: `${baseLat.toFixed(4)}° ${baseLat >= 0 ? "N" : "S"}`,
      lng: `${Math.abs(baseLng).toFixed(4)}° ${baseLng >= 0 ? "E" : "W"}`,
      depth: calcDepth,
      strata: strataName,
      hydroDb: `${calcHydro} dB re 1V/µPa`,
    });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] flex flex-col justify-between bg-[#0A0A0B] border-b border-[#27272D] overflow-hidden px-4 lg:px-12 py-8 select-none"
    >
      {/* Background Geo-Grid Overlay */}
      <div className="absolute inset-0 geo-grid-pattern opacity-30 pointer-events-none" />

      {/* Radar Sweep Effect */}
      <div className="radar-sweep" />

      {/* Interactive Morphing Topographic & Bathymetric SVG Map */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full max-w-none transform transition-transform duration-300 ease-out"
          style={{
            transform: `scale(1.1) translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * 30}px)`,
          }}
        >
          <defs>
            <linearGradient id="strataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D94E28" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38EF7D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#27272D" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="epicenterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D94E28" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0A0A0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Isobar / Bathymetric Contour Lines Morphing with Cursor */}
          {[120, 190, 260, 330, 400, 470, 540, 610, 680].map((radius, idx) => {
            const distortX = (mousePos.x - 0.5) * (idx + 1) * 35;
            const distortY = (mousePos.y - 0.5) * (idx + 1) * 25;
            return (
              <g key={radius}>
                <ellipse
                  cx={600 + distortX}
                  cy={400 + distortY}
                  rx={radius + Math.sin(idx * 1.2) * 40}
                  ry={radius * 0.55 + Math.cos(idx * 1.5) * 25}
                  fill="none"
                  stroke={idx === 3 ? "#D94E28" : "#27272D"}
                  strokeWidth={idx === 3 ? "1.5" : "1"}
                  strokeDasharray={idx % 2 === 0 ? "6 4" : undefined}
                  className="transition-all duration-500 ease-out"
                />
                <text
                  x={600 + distortX + radius - 40}
                  y={400 + distortY}
                  fill="#8F8E8A"
                  fontSize="9"
                  fontFamily="Space Mono"
                  className="opacity-70"
                >
                  -{idx * 1200 + 400}m
                </text>
              </g>
            );
          })}

          {/* Faultline Fracture Path */}
          <path
            d={`M 150 650 Q 400 ${450 + (mousePos.y - 0.5) * 60} 600 400 T 1050 150`}
            fill="none"
            stroke="#D94E28"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Epicenter Marker with Pulsing Sonar Ring */}
          <circle cx="600" cy="400" r="140" fill="url(#epicenterGlow)" />
          <circle cx="600" cy="400" r="8" fill="#D94E28" className="animate-ping" />
          <circle cx="600" cy="400" r="4" fill="#ECEAE4" />
        </svg>
      </div>

      {/* Top Coordinate & Sensor HUD Overlay */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[#27272D]/80 pb-6 text-[11px] font-mono">
        <div>
          <span className="text-[#8F8E8A] block text-[9px] uppercase tracking-widest">SUBTERRA GRID SENSORS</span>
          <span className="text-[#ECEAE4] font-bold flex items-center gap-1.5 mt-0.5">
            <Compass size={13} className="text-[#38EF7D]" />
            {computedCoords.lat} // {computedCoords.lng}
          </span>
          <span className="text-[#8F8E8A] text-[10px] block mt-0.5">
            DATUM: WGS-84 BATHYMETRIC ELLIPSOID
          </span>
        </div>

        <div>
          <span className="text-[#8F8E8A] block text-[9px] uppercase tracking-widest">CRUSTAL STRATA DEPTH</span>
          <span className="text-[#D94E28] font-bold flex items-center gap-1.5 mt-0.5">
            <ArrowDownRight size={13} className="text-[#D94E28]" />
            {computedCoords.depth.toLocaleString()} METERS BELOW SEA LEVEL
          </span>
          <span className="text-[#ECEAE4] text-[10px] block mt-0.5 truncate">
            {computedCoords.strata}
          </span>
        </div>

        <div className="md:text-right">
          <span className="text-[#8F8E8A] block text-[9px] uppercase tracking-widest">HYDROPHONE SENSITIVITY</span>
          <span className="text-[#38EF7D] font-bold flex md:justify-end items-center gap-1.5 mt-0.5">
            <Radio size={13} className="text-[#38EF7D]" />
            {computedCoords.hydroDb}
          </span>
          <span className="text-[#FFB800] text-[10px] block mt-0.5">
            BANDWIDTH: 0.05 Hz - 192 kHz (UNFILTERED)
          </span>
        </div>
      </div>

      {/* Monumental Hero Headline & Typography */}
      <div className="relative z-10 my-auto py-12 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141416] border border-[#D94E28]/60 text-[#D94E28] text-[10px] font-mono tracking-widest uppercase mb-6">
          <ShieldAlert size={12} className="text-[#D94E28]" />
          UNFILTERED SEISMOLOGICAL & INFRASONIC ARCHIVE
        </div>

        <h1 className="font-['Cinzel'] font-black text-6xl sm:text-7xl lg:text-9xl tracking-tight text-[#ECEAE4] uppercase leading-[0.9]">
          LI<span className="text-[#D94E28]">TH</span>OS
        </h1>

        <p className="font-mono text-sm sm:text-base lg:text-lg text-[#8F8E8A] tracking-wider uppercase mt-4 max-w-2xl leading-relaxed">
          Subterra Acoustic & Seismological Field Archive. Physical vinyl and analog tape editions capturing deep-earth resonance: tectonic faultline friction, sub-glacial conduit harmonics, and volcanic infrasound.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
          <button
            onClick={onLaunchSynthesizer}
            className="flex items-center gap-3 bg-[#D94E28] hover:bg-[#B83E1D] text-white font-mono text-[12px] font-bold uppercase tracking-widest px-6 py-4 transition-all shadow-[0_0_24px_rgba(217,78,40,0.35)] cursor-pointer"
          >
            <Volume2 size={16} />
            LAUNCH FIELD AUDIO SYNTHESIZER
          </button>

          <a
            href="#vault"
            className="flex items-center gap-2 bg-[#141416] hover:bg-[#27272D] text-[#ECEAE4] border border-[#27272D] hover:border-[#D94E28] font-mono text-[12px] uppercase tracking-wider px-6 py-4 transition-all cursor-pointer"
          >
            EXPLORE 180G VINYL & TAPE EDITIONS
          </a>
        </div>
      </div>

      {/* Subterranean Expeditions Selector Strip */}
      <div className="relative z-10 pt-6 border-t border-[#27272D]/80">
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[#8F8E8A]">
          <span className="uppercase tracking-widest">ACTIVE FIELD EXPEDITION SITES (SELECT TO FOCUS TELEMETRY):</span>
          <span className="hidden sm:inline">5 HARMONIC REGISTERS AVAILABLE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {EXPEDITIONS.map(exp => {
            const isSelected = activeExpedition.id === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => onSelectExpedition(exp)}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#141416] border-[#D94E28] shadow-[0_0_15px_rgba(217,78,40,0.2)]"
                    : "bg-[#0A0A0B]/80 border-[#27272D] hover:border-[#8F8E8A] hover:bg-[#141416]"
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                  <span className={isSelected ? "text-[#D94E28] font-bold" : "text-[#8F8E8A]"}>
                    {exp.code}
                  </span>
                  <span className="text-[#38EF7D] font-bold">{exp.depthMeters}m</span>
                </div>
                <div className="font-['Cinzel'] font-bold text-[13px] text-[#ECEAE4] truncate">
                  {exp.title.split(":")[0]}
                </div>
                <div className="text-[10px] font-mono text-[#8F8E8A] mt-1 truncate">
                  {exp.region}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
