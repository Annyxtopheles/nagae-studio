import React, { useState } from "react";
import { Radio, ArrowUpRight, Compass, ShieldAlert, Send, Activity } from "lucide-react";

interface ColophonFooterProps {
  onToast: (msg: string) => void;
  onScrollToTop: () => void;
}

export const ColophonFooter: React.FC<ColophonFooterProps> = ({
  onToast,
  onScrollToTop,
}) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onToast(`Station dispatch subscription confirmed for ${email}. You will receive new seismic release notifications.`);
    setEmail("");
  };

  const GLOBAL_STATIONS = [
    { code: "ST-01", name: "Reykjavik Geothermal Array", coords: "64.1466° N, 21.9426° W", depth: "-1,420m", uptime: "99.98%" },
    { code: "ST-02", name: "Halemaʻumaʻu Magma Monitor", coords: "19.4069° N, 155.2834° W", depth: "-84m", uptime: "99.85%" },
    { code: "ST-03", name: "Challenger Deep Hydro Array", coords: "11.3733° N, 142.5917° E", depth: "-10,920m", uptime: "98.92%" },
    { code: "ST-04", name: "Wieliczka Halite Acoustic Lab", coords: "49.9831° N, 20.0558° E", depth: "-327m", uptime: "100.0%" },
    { code: "ST-05", name: "Parkfield SAFOD Deep Geophone", coords: "35.8997° N, 120.4328° W", depth: "-3,200m", uptime: "99.94%" },
    { code: "ST-06", name: "Svalbard Cryo-Seismic Observatory", coords: "78.2232° N, 15.6267° E", depth: "-410m", uptime: "99.78%" },
  ];

  return (
    <footer className="w-full bg-[#070708] border-t border-[#27272D] text-[#ECEAE4] px-4 lg:px-12 py-16 font-mono select-none">
      {/* Global Sensor Array Status Grid */}
      <div className="pb-12 border-b border-[#27272D]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2 text-[#38EF7D] text-[10px] uppercase tracking-widest">
            <Radio size={14} className="text-[#38EF7D]" />
            GLOBAL LITHOS TELEMETRY NETWORK // 12 STATIONS SYNCHRONIZED
          </div>
          <span className="text-[10px] text-[#8F8E8A]">CONTINUOUS SAMPLING RATE: 192 kHz / 32-BIT FLOAT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GLOBAL_STATIONS.map(st => (
            <div key={st.code} className="bg-[#0A0A0B] p-3 border border-[#27272D] text-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-[#D94E28] font-bold">{st.code}</span>
                <span className="text-[#38EF7D]">{st.uptime} UPTIME</span>
              </div>
              <p className="font-['Cinzel'] font-bold text-sm text-[#ECEAE4] mt-1">{st.name}</p>
              <div className="flex justify-between items-center text-[10px] text-[#8F8E8A] mt-2">
                <span>{st.coords}</span>
                <span className="text-[#D94E28]">{st.depth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Colophon & Newsletter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-b border-[#27272D]">
        {/* Brand & Purpose (5 cols) */}
        <div className="lg:col-span-5">
          <span className="font-['Cinzel'] font-black text-3xl tracking-wider text-[#ECEAE4] block">
            LITHOS
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#D94E28] block mt-1">
            Subterra Acoustic & Seismological Field Archive
          </span>
          <p className="text-xs text-[#8F8E8A] leading-relaxed mt-4 max-w-md">
            LITHOS is an independent acoustic research collective and physical record label committed to the documentation, vinyl preservation, and scientific dissemination of Earth's subterranean soundfields.
          </p>

          <div className="mt-6 flex items-center gap-2 text-[10px] text-[#8F8E8A]">
            <span className="w-2 h-2 rounded-full bg-[#38EF7D]" />
            HEADQUARTERS: REYKJAVIK // RESEARCH BASES: OAHU · GDANSK · SAN FRANCISCO
          </div>
        </div>

        {/* Dispatch Bulletin Subscription (4 cols) */}
        <div className="lg:col-span-4">
          <span className="text-[10px] uppercase tracking-widest text-[#ECEAE4] font-bold block mb-2">
            SEISMIC DISPATCH BULLETIN
          </span>
          <p className="text-xs text-[#8F8E8A] mb-4">
            Receive private notifications of new vinyl pressings, unreleased master tape runs, and field log coordinates.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="operator@network.org"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-[#0A0A0B] border border-[#27272D] px-3.5 py-2.5 text-xs text-[#ECEAE4] placeholder-[#8F8E8A]/60 outline-none focus:border-[#D94E28] flex-1 font-mono"
            />
            <button
              type="submit"
              className="bg-[#D94E28] hover:bg-[#B83E1D] text-white px-4 py-2.5 text-xs font-bold uppercase transition-colors cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* Archival Standards & Navigation (3 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#ECEAE4] font-bold block mb-2">
              OPEN ACCESS LICENSING
            </span>
            <p className="text-[11px] text-[#8F8E8A] leading-relaxed">
              All raw hydrophone and geophone 192kHz audio matrices are released under Creative Commons BY-NC 4.0 for non-commercial scientific research. Physical master audio recordings copyright © 2026 LITHOS Collective.
            </p>
          </div>

          <button
            onClick={onScrollToTop}
            className="mt-6 text-left text-[11px] text-[#D94E28] hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
          >
            ↑ RETURN TO TOPOGRAPHIC DATUM
          </button>
        </div>
      </div>

      {/* Micro Copyright Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#8F8E8A]">
        <span>MMXXVI LITHOS SUBTERRA ARCHIVE · ALL RIGHTS RESERVED</span>
        <span>AESTHETIC ARCHITECTURE: BRUTALIST GEOLOGICAL EDITORIAL</span>
      </div>
    </footer>
  );
};
