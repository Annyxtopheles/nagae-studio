import React, { useState } from "react";
import { ArrowUp, Send, Check } from "lucide-react";

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
    onToast("Subscribed for release updates.");
  };

  return (
    <footer className="w-full bg-[#08080a] border-t border-[#1f1f23] text-[#8e8e93] px-4 sm:px-8 lg:px-12 py-12 select-none font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="font-extrabold text-xl text-white tracking-tight block">
            LITHOS
          </span>
          <p className="text-xs text-[#636366] mt-1">
            © {new Date().getFullYear()} LITHOS. All rights reserved.
          </p>
        </div>

        {/* Clean Newsletter Subscription */}
        <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-[#141416] border border-[#2a2a30] px-3.5 py-2 text-xs text-white placeholder-[#575651] focus:outline-none focus:border-[#e04528] rounded-l-sm min-w-[220px]"
          />
          <button
            type="submit"
            className="bg-[#e04528] hover:bg-[#c93b20] text-white px-4 text-xs font-semibold rounded-r-sm transition-colors cursor-pointer flex items-center justify-center"
          >
            {subscribed ? <Check size={14} /> : "Subscribe"}
          </button>
        </form>

        {/* Back to top */}
        <button
          onClick={onScrollToTop}
          className="flex items-center gap-2 text-xs text-[#8e8e93] hover:text-white transition-colors cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
};
