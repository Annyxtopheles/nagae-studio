import React, { useState } from "react";
import { Mail, ArrowUp, Send, Check } from "lucide-react";

interface LabelFooterProps {
  onToast: (msg: string) => void;
  onScrollToTop: () => void;
}

export const LabelFooter: React.FC<LabelFooterProps> = ({
  onToast,
  onScrollToTop,
}) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      onToast("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    onToast("Subscribed to the Lithos Physical Mailorder Dispatch.");
  };

  return (
    <footer className="w-full bg-[#08080a] border-t border-[#222226] text-[#E6E4DC] px-4 sm:px-8 lg:px-12 py-16 select-none font-mono">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#222226]">
          {/* Col 1: Label Manifesto */}
          <div>
            <span className="font-['Cinzel'] font-black text-xl text-[#E6E4DC] tracking-wider block">
              LITHOS RECORDINGS
            </span>
            <span className="text-[10px] text-[#A83824] uppercase tracking-widest block mt-1 font-semibold">
              Subterra Acoustic & Seismological Field Archive
            </span>
            <p className="text-xs text-[#73716B] mt-4 leading-relaxed">
              Independent archival pressings and analog tape editions capturing the resonant infrasound of tectonic faults, sub-glacial ice cavities, and ocean abysses.
            </p>
          </div>

          {/* Col 2: Mailorder & Shipping Info */}
          <div className="text-xs">
            <span className="text-[10px] text-[#73716B] uppercase tracking-widest block mb-3 font-semibold">
              MAILORDER & FULFILLMENT
            </span>
            <p className="text-[#9E9B91] leading-relaxed">
              All physical records are packed by hand in heavy-duty cardboard mailers with edge protection. Vinyl is shipped outside the jacket to prevent seam splits during transit.
            </p>
            <div className="mt-4 pt-3 border-t border-[#222226] text-[11px] text-[#73716B]">
              <span>DISTRIBUTION PARTNERS:</span>
              <span className="text-[#E6E4DC] block mt-1">Boomkat · Forced Exposure · Norman Records</span>
            </div>
          </div>

          {/* Col 3: Demo Policy */}
          <div className="text-xs">
            <span className="text-[10px] text-[#73716B] uppercase tracking-widest block mb-3 font-semibold">
              DEMO SUBMISSION POLICY
            </span>
            <p className="text-[#9E9B91] leading-relaxed">
              We do not accept digital streaming links or cloud attachments. Unsolicited physical cassette tapes and 1/4" analog reels may be sent to our archive postbox in Reykjavik.
            </p>
            <span className="text-[10px] text-[#A83824] block mt-3">
              POSTBOX 4402 // 101 REYKJAVÍK, ICELAND
            </span>
          </div>

          {/* Col 4: Postal Newsletter */}
          <div className="text-xs">
            <span className="text-[10px] text-[#73716B] uppercase tracking-widest block mb-3 font-semibold">
              PRESSING ANNOUNCEMENTS
            </span>
            <p className="text-[#9E9B91] leading-relaxed">
              Notified strictly upon new lacquer test-pressings and limited lathe runs. No promotional marketing.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex">
              <input
                type="email"
                placeholder="subscriber@domain.org"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-[#161619] border border-[#2e2e34] px-3 py-2 text-xs text-[#E6E4DC] placeholder-[#575651] focus:outline-none focus:border-[#A83824] flex-1 min-w-0"
              />
              <button
                type="submit"
                className="bg-[#A83824] hover:bg-[#8F2F1E] text-white px-3.5 flex items-center justify-center transition-colors cursor-pointer"
                title="Subscribe"
              >
                {subscribed ? <Check size={14} /> : <Send size={14} />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#73716B]">
          <div className="flex items-center gap-4 text-[10px]">
            <span>© 2024–2026 LITHOS ARCHIVE RECORDINGS</span>
            <span>·</span>
            <span>OPEN RESEARCH ACCESS</span>
            <span>·</span>
            <span>45 RPM DMM CUTS</span>
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 hover:text-[#E6E4DC] transition-colors cursor-pointer text-[10px]"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
