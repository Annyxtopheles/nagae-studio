import React, { useState, useEffect, useRef } from "react";
import {
  Home, Grid, BookOpen, Folder, User, Search, Filter, Heart, Share2,
  ArrowLeft, Menu, Bell, Star, Award, Trophy, ChevronRight, ChevronDown,
  MessageSquare, Mic, ThumbsUp, ThumbsDown, Play, Pause, CheckCircle, Circle,
  BarChart2, Users, Settings, Package, Megaphone, PlusCircle, Edit2,
  Trash2, Upload, Download, X, Check, AlertCircle, TrendingUp, Activity,
  Zap, Gift, LogIn, Lock, Mail, Eye, EyeOff, Send, Clock, Tag,
  Layers, Info, ShoppingBag, LayoutDashboard, RefreshCw, Copy, ExternalLink, Calendar,
  Database, Smartphone, LayoutGrid, ArrowRight
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── CSV DOWNLOAD HELPER ──────────────────────────────────────────────────────
function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ─── TOAST NOTIFICATION ───────────────────────────────────────────────────────
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-[#1A1A1A] text-[#FFFFFF] px-5 py-3.5 border border-[#E5E5E5] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle size={16} className="text-[#FFFFFF] shrink-0" />
      <span className="font-['Red_Hat_Display'] text-[13px] font-medium tracking-wide">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 text-[#FFFFFF]/70 hover:text-[#FFFFFF]"><X size={14} /></button>
    </div>
  );
}

// ─── MOBILE HOOK ─────────────────────────────────────────────────────────────
function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─── MOBILE NAV DRAWER ───────────────────────────────────────────────────────
function NavDrawer({
  open, onClose, title, subtitle, navItems, activeSection, onNavigate, footer
}: {
  open: boolean; onClose: () => void; title: string; subtitle: string;
  navItems: { id: string; icon: React.ElementType; label: string }[];
  activeSection: string; onNavigate: (id: string) => void;
  footer?: React.ReactNode;
}) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-[#E5E5E5] flex items-start justify-between">
          <div>
            <p className="font-['Instrument_Serif'] italic text-[#1A1A1A] text-[22px]">{title}</p>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[10px] uppercase tracking-wider mt-1">{subtitle}</p>
          </div>
          <button onClick={onClose} className="p-1.5 mt-0.5"><X size={18} className="text-[#737373]" /></button>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { onNavigate(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${activeSection === item.id ? "bg-[#1A1A1A] text-[#FFFFFF]" : "text-[#1A1A1A] hover:bg-[#F5F5F5]"}`}>
              <item.icon size={18} className={activeSection === item.id ? "text-[#FFFFFF]" : "text-[#1A1A1A]"} />
              <span className={`font-['Red_Hat_Display'] font-semibold text-[13px] uppercase tracking-wider ${activeSection === item.id ? "text-[#FFFFFF]" : "text-[#1A1A1A]"}`}>{item.label}</span>
            </button>
          ))}
        </nav>
        {footer && <div className="p-4 border-t border-[#E5E5E5]">{footer}</div>}
      </div>
    </>
  );
}

// ─── BRAND COLORS ────────────────────────────────────────────────────────────
const C = {
  charcoal: "#1A1A1A",
  cream: "#FFFFFF",
  champagne: "#F5F5F5",
  grey: "#E5E5E5",
  white: "#FFFFFF",
  success: "#F4F4F5",
  error: "#F4F4F5",
  black: "#000000",
};

// ─── SAMPLE DATA ─────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id: 1, name: "Sloan Mikado", fabric: ["Mikado"], silhouette: ["A-Line"], neckline: "Off-Shoulder", price: "3,200", badge: "Bestseller", desc: "Our signature A-line silhouette in luxurious Mikado silk. The off-shoulder neckline frames the collarbone beautifully.", modifications: ["A-Line Skirt", "Fitted Bodice", "Chapel Train", "Cathedral Train", "Detachable Overskirt"], fitNotes: "True to size. Mikado adds structure — ideal for hourglass and pear shapes. Size up if between sizes.", stylingTips: "Pairs beautifully with a cathedral-length veil and pearl drop earrings. Shapewear not required.", similarStyles: ["Sloan Crepe", "Sloan Fitted Mikado", "Gemma"] },
  { id: 2, name: "Sloan Crepe", fabric: ["Crepe"], silhouette: ["A-Line"], neckline: "Off-Shoulder", price: "2,900", badge: "New", desc: "The beloved Sloan silhouette reimagined in soft crepe for a more relaxed, flowing look.", modifications: ["Standard A-Line", "Pockets", "Open Back Variation"], fitNotes: "Runs slightly large. Crepe drapes over curves elegantly. Great for athletic builds.", stylingTips: "Simple accessories let this dress shine. Consider a silk ribbon sash.", similarStyles: ["Sloan Mikado", "Mara"] },
  { id: 3, name: "Sloan Fitted Mikado", fabric: ["Mikado"], silhouette: ["Fitted"], neckline: "Off-Shoulder", price: "3,400", badge: "Customizable", desc: "A fitted interpretation of the Sloan family. Sculpted bodice with a sleek skirt for maximum elegance.", modifications: ["Fitted Skirt", "Trumpet Flare", "Detachable Bow"], fitNotes: "Fitted through hips — measure carefully. Best for hourglass silhouettes.", stylingTips: "Dramatic earrings and a sleek updo elevate this style.", similarStyles: ["Sloan Trumpet", "Gemma"] },
  { id: 4, name: "Sloan Trumpet", fabric: ["Mikado"], silhouette: ["Trumpet"], neckline: "Off-Shoulder", price: "3,600", badge: "Bestseller", desc: "Show-stopping trumpet silhouette with a dramatic flared skirt that begins at the knee.", modifications: ["Extended Train", "Ruching Detail", "Lace Overlay"], fitNotes: "Slim through hips and thighs. Allow extra movement in the skirt.", stylingTips: "Let the silhouette speak — keep accessories minimal.", similarStyles: ["Sloan Fitted Mikado"] },
  { id: 5, name: "Gemma", fabric: ["Stretch Crepe", "Crepe"], silhouette: ["Fitted"], neckline: "Scoop", price: "2,600", badge: "New", desc: "A sleek, modern fitted gown in stretch crepe that moves with you. Clean lines, effortless luxury.", modifications: ["Scoop Back", "V-Back", "Long Sleeve"], fitNotes: "Stretchy and forgiving. Perfect for all body types. Shapewear recommended for smoothest look.", stylingTips: "Minimalist jewelry keeps the focus on the silhouette.", similarStyles: ["Sloan Fitted Mikado", "Mara"] },
  { id: 6, name: "Ophelia", fabric: ["Tulle"], silhouette: ["A-Line"], neckline: "Sweetheart", price: "3,800", badge: "Bestseller", desc: "Romantic layered tulle with a sweetheart neckline. Full, dreamy skirt perfect for the classic bride.", modifications: ["Pockets", "Floral Appliqué", "Colored Underlay"], fitNotes: "True to size. The tulle adds volume — great for petite and athletic frames.", stylingTips: "Pairs perfectly with a cathedral veil and floral crown. Best for broad shoulders.", similarStyles: ["Sloan Mikado", "Peyton"] },
  { id: 7, name: "Peyton", fabric: ["Mikado", "Tulle"], silhouette: ["A-Line"], neckline: "Bateau", price: "3,100", badge: "Customizable", desc: "A sophisticated blend of structured Mikado bodice and soft tulle skirt. Timeless elegance.", modifications: ["A-Line Skirt Option", "Fitted Skirt", "Colored Sash"], fitNotes: "The Mikado bodice runs true to size. Order fabric swatches before deciding on modifications.", stylingTips: "Delicate pearl jewelry complements the bateau neckline beautifully.", similarStyles: ["Ophelia", "Sloan Mikado"] },
  { id: 8, name: "Mara", fabric: ["Crepe"], silhouette: ["Sheath"], neckline: "V-Neck", price: "2,400", badge: "New", desc: "A minimalist sheath gown with a deep V-neckline. Modern, confident, effortlessly chic.", modifications: ["Long Sleeve", "3/4 Sleeve", "Open Back"], fitNotes: "Slim cut — size up if between sizes. The V-neck creates an elongating effect.", stylingTips: "Bold statement earrings and strappy heels for a fashion-forward look.", similarStyles: ["Gemma", "Kaia"] },
  { id: 9, name: "Kaia", fabric: ["Silk Charmeuse"], silhouette: ["Bias Cut", "Fitted"], neckline: "Cowl", price: "4,200", badge: "Customizable", desc: "Liquid silk charmeuse in a vintage-inspired bias cut. Utterly sensuous and sophisticated.", modifications: ["Spaghetti Straps", "Halter", "Low Back"], fitNotes: "Very body-conscious. Size up. Best for slender and hourglass silhouettes.", stylingTips: "Gold jewelry and satin heels. Keep hair simple.", similarStyles: ["Mara"] },
  { id: 10, name: "Simone", fabric: ["Lace", "Crepe"], silhouette: ["A-Line"], neckline: "Illusion", price: "3,900", badge: "Bestseller", desc: "Intricate lace overlay on soft crepe with a romantic illusion neckline. Effortlessly bridal.", modifications: ["Long Sleeve Lace", "Cap Sleeve", "Colored Lining"], fitNotes: "True to size. Lace overlay is delicate — minimize shapewear layers.", stylingTips: "Crystal accessories and a fingertip veil complete the romantic look.", similarStyles: ["Ophelia", "Peyton"] },
];

const INITIAL_TRAINING = [
  { id: 1, title: "Introduction to Mikado Fabric", category: "Fabric Education", duration: "12 min", progress: 100, completed: true, description: "Understand the weight, drape, and characteristics of NAGAE's signature Mikado silk. Learn what brides feel when they wear it.", takeaways: ["Mikado holds structure beautifully", "Best for brides wanting definition", "Pairs with most silhouettes", "Wrinkle-resistant for all-day wear"], points: 150 },
  { id: 2, title: "Understanding NAGAE Fit Philosophy", category: "Fit Education", duration: "18 min", progress: 60, completed: false, description: "Deep dive into NAGAE Studio's approach to fit. How each dress is designed to move and feel on real bodies.", takeaways: ["Every sample is a size 10", "Modifications available for most styles", "Fit notes guide is your best tool", "Bride's comfort is priority"], points: 200 },
  { id: 3, title: "Styling Athletic Body Types", category: "Styling Philosophy", duration: "15 min", progress: 0, completed: false, description: "Which NAGAE styles work best for athletic, straight, or broad-shoulder body types. Practical guidance.", takeaways: ["A-lines balance broad shoulders", "Tulle adds volume where needed", "Sweetheart and off-shoulder are flattering", "Avoid styles that cling at hip"], points: 175 },
  { id: 4, title: "Spring 2026 Collection Overview", category: "Collection Inspiration", duration: "20 min", progress: 0, completed: false, description: "First look at the Spring 2026 collection. Design inspirations, new fabrics, and key talking points for brides.", takeaways: ["3 new silhouettes introduced", "Soft romance is the theme", "Focus on sustainable fabrics", "Expanded size range"], points: 250 },
  { id: 5, title: "How to Sell Modifications", category: "Selling Techniques", duration: "22 min", progress: 0, completed: false, description: "Turn customizations into upsells. How to present modification options to brides in a way that feels exciting, not overwhelming.", takeaways: ["Start with the base dress", "Introduce modifications as personalization", "Use the modification guide visual", "Always show price difference"], points: 225 },
  { id: 6, title: "Accessorizing with Confidence", category: "Styling Philosophy", duration: "10 min", progress: 30, completed: false, description: "Veils, jewelry, shoes — how to guide brides to the perfect accessories. What NAGAE recommends per style.", takeaways: ["Match veil length to train", "Less is more for embellished gowns", "Earrings frame the face", "Shoes affect hemline length"], points: 125 },
];

const INITIAL_BADGES = [
  { id: 1, emoji: "🎓", title: "First Training Complete", desc: "Complete your first training module", earned: true, date: "Jan 15, 2026", rarity: "82%" },
  { id: 2, emoji: "👗", title: "Fabric Expert", desc: "Complete all fabric education modules", earned: true, date: "Feb 3, 2026", rarity: "34%" },
  { id: 3, emoji: "💎", title: "Quiz Master", desc: "Score 100% on 5 quizzes", earned: false, date: null, rarity: "12%" },
  { id: 4, emoji: "🏆", title: "Top Seller", desc: "Sell a featured dress during promotion", earned: true, date: "Mar 1, 2026", rarity: "28%" },
  { id: 5, emoji: "⭐", title: "NAGAE Ambassador", desc: "Complete all core training modules", earned: false, date: null, rarity: "8%" },
  { id: 6, emoji: "💪", title: "Fit Guru", desc: "Complete all fit education modules", earned: false, date: null, rarity: "19%" },
  { id: 7, emoji: "🎨", title: "Style Maven", desc: "Complete all styling modules", earned: false, date: null, rarity: "22%" },
  { id: 8, emoji: "🔥", title: "30-Day Streak", desc: "Log in 30 days in a row", earned: false, date: null, rarity: "6%" },
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, emoji: "🎉", title: "New Training: Spring 2026 Collection is live!", time: "2h ago", read: false, type: "training" },
  { id: 2, emoji: "💰", title: "Flash Sale: Sell Sloan this week, earn $50 bonus", time: "5h ago", read: false, type: "incentive" },
  { id: 3, emoji: "🏆", title: "You earned the \"Fabric Expert\" badge!", time: "1d ago", read: true, type: "badge" },
  { id: 4, emoji: "🔥", title: "Trending: Ophelia is selling fast this month", time: "2d ago", read: true, type: "trending" },
  { id: 5, emoji: "📚", title: "Quick reminder: Complete your quiz to earn points", time: "3d ago", read: true, type: "quiz" },
  { id: 6, emoji: "✨", title: "New modification options now available for Peyton", time: "4d ago", read: true, type: "update" },
];

const AI_PROMPTS = [
  "Can Peyton be made with an A-line skirt?",
  "Which gowns work best for athletic body types?",
  "What accessories pair best with Ophelia?",
  "Show me all mikado styles under $4,000",
];

const AI_RESPONSES: Record<string, string> = {
  "Can Peyton be made with an A-line skirt?": "Yes! Peyton is available with an A-line skirt option as one of its modifications. The base Peyton features a structured Mikado bodice with a tulle skirt, and we can swap the tulle for a more structured A-line silhouette. This modification is popular with brides who love the bodice but want something a bit more streamlined. Starting price for the A-line modification is an additional $200. Would you like to see the Peyton product page?",
  "Which gowns work best for athletic body types?": "Great question! For athletic builds with a straighter figure, we recommend: **Ophelia** (tulle adds beautiful volume), **Sloan Mikado** (A-line creates curves), **Peyton** (the tulle skirt balances broad shoulders), and **Simone** (lace adds texture and dimension). Off-shoulder and sweetheart necklines are especially flattering for athletic frames as they frame the collarbone and create a feminine silhouette.",
  "What accessories pair best with Ophelia?": "Ophelia's romantic tulle and sweetheart neckline call for accessories that complement without competing. We recommend: a cathedral or chapel-length veil (the tulle layers beautifully), pearl or crystal drop earrings, a delicate bracelet or nothing at all, and strappy heeled sandals. For hair, an updo with soft tendrils works wonderfully. Keep the necklace minimal — the sweetheart neckline is the star.",
  "Show me all mikado styles under $4,000": "Here are all NAGAE Mikado styles priced under $4,000: **Sloan Mikado** ($3,200) — A-line, off-shoulder bestseller. **Sloan Fitted Mikado** ($3,400) — Fitted silhouette variation. **Sloan Trumpet** ($3,600) — Dramatic trumpet flare. **Peyton** ($3,100) — Mixed Mikado & Tulle. All four are available with various modifications. Sloan Mikado is our top-seller in this category!",
};

function getSmartAIResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("sloan")) {
    return "The Sloan family is NAGAE's defining signature line! Available in Mikado ($3,200), Soft Crepe ($2,900), Fitted Mikado ($3,400), and Dramatic Trumpet ($3,600). Each features our sculpted off-shoulder neckline that frames the collarbone. Popular modifications include cathedral train extensions and detachable overskirts.";
  }
  if (q.includes("ophelia")) {
    return "Ophelia ($3,800) is crafted in layered romantic tulle with a sweetheart neckline. It is our top recommendation for classic romantic brides and athletic silhouettes wanting dramatic soft volume. Pairs best with a cathedral veil!";
  }
  if (q.includes("gemma")) {
    return "Gemma ($2,600) is our sleek modern gown in stretch crepe. It features a scoop neckline and clean architectural lines. Ultra-forgiving stretch fabric makes it a favorite for destination weddings!";
  }
  if (q.includes("peyton")) {
    return "Peyton ($3,100) bridges structured elegance and soft romance by combining a structured Mikado bodice with a soft tulle skirt and bateau neckline. A-line skirt and custom sash options are available.";
  }
  if (q.includes("mara") || q.includes("kaia") || q.includes("simone")) {
    return "Mara ($2,400) is our minimalist V-neck crepe sheath; Kaia ($4,200) is liquid bias-cut silk charmeuse with a cowl neck; and Simone ($3,900) features exquisite lace overlay on crepe with an illusion neckline.";
  }
  if (q.includes("rush") || q.includes("timeline") || q.includes("lead time") || q.includes("delivery")) {
    return "Standard production timeline for NAGAE Studio is 12–14 weeks. We offer a Priority Rush service (6–8 weeks) for a $350 fee, and Super Rush (4 weeks) upon factory approval. Sample gowns can be dispatched in 48 hours.";
  }
  if (q.includes("mikado")) {
    return "NAGAE's signature Mikado silk is woven with substantial weight and a soft lustrous sheen. It holds structure impeccably, is wrinkle-resistant for all-day ceremony wear, and provides natural waist definition without heavy boning.";
  }
  if (q.includes("fit") || q.includes("size") || q.includes("sizing") || q.includes("philosophy")) {
    return "NAGAE Studio's fit philosophy prioritizes real body movement. All showroom samples are cut in standard US Size 10. Split sizing (e.g. Size 6 bust, Size 10 hip) is available on all styles at no extra modification charge!";
  }
  if (q.includes("custom") || q.includes("modification") || q.includes("train") || q.includes("pocket")) {
    return "All NAGAE gowns can be personalized! Common modifications: adding hidden pockets (+$150), extending train to cathedral length (+$300), adding detachable sleeves/overskirt (+$400), or raising/lowering backline (+$200).";
  }
  return AI_RESPONSES[query] ?? "Thank you for asking! NAGAE Studio handcrafted gowns feature premium fabrics (Mikado, Stretch Crepe, French Tulle, and Silk Charmeuse) with full customization available. You can request swatches, check fit guides in Resources, or contact your NAGAE regional sales representative for special client customizations.";
}

const LEADERBOARD = [
  { rank: 1, name: "Jessica M.", store: "Bella Bridal", points: 4820, level: "Expert 5", badge: "🏆" },
  { rank: 2, name: "Sarah K.", store: "Pearl Bridal", points: 4210, level: "Expert 4", badge: "⭐" },
  { rank: 3, name: "Amanda R.", store: "The White Dress", points: 3980, level: "Expert 4", badge: "💎" },
  { rank: 4, name: "Katie T.", store: "Ivory & Beau", points: 3450, level: "Expert 3", badge: "👗" },
  { rank: 5, name: "You (Sarah M.)", store: "Grace & Lace", points: 2840, level: "Expert 3", badge: "🎓", isYou: true },
  { rank: 6, name: "Lauren P.", store: "Blush Bridal", points: 2200, level: "Expert 2", badge: "🎨" },
  { rank: 7, name: "Emma W.", store: "Something Blue", points: 1950, level: "Expert 2", badge: "💪" },
];

const QUIZ_QUESTIONS = [
  { question: "Mikado fabric is best described as:", options: ["Lightweight and flowy", "Structured with a slight sheen", "Stretchy and casual", "Transparent with embroidery"], correct: 1 },
  { question: "Which silhouette is most flattering for broad shoulders?", options: ["Fitted sheath", "Mermaid", "A-Line or Ball Gown", "Asymmetrical"], correct: 2 },
  { question: "The Sloan family's defining characteristic is:", options: ["Its deep V-neckline", "The sculpted off-shoulder design", "The all-over lace overlay", "The bias cowl cut"], correct: 1 },
  { question: "For Ophelia, which veil length is recommended?", options: ["Blusher (face length)", "Elbow length", "Cathedral or Chapel length", "No veil — it competes"], correct: 2 },
  { question: "True or False: NAGAE samples are all made in a size 10.", options: ["True", "False"], correct: 0 },
];

const INITIAL_TASKS = [
  { id: 1, account: "Grace & Lace", task: "Call to address delivery concerns", due: "Today", priority: "High", assigned: "You", overdue: false, completed: false },
  { id: 2, account: "The Dress Theory", task: "Follow up on sample feedback", due: "Jul 3", priority: "High", assigned: "You", overdue: false, completed: false },
  { id: 3, account: "Bella Bridal", task: "Send Spring 2026 lookbook", due: "Jul 5", priority: "Medium", assigned: "You", overdue: false, completed: false },
  { id: 4, account: "Blush Bridal", task: "Discuss fitted style expansion", due: "Jul 6", priority: "Medium", assigned: "Account Mgr", overdue: false, completed: false },
  { id: 5, account: "Modern Bride", task: "Finalize minimum order terms", due: "Jul 7", priority: "High", assigned: "Sales Lead", overdue: false, completed: false },
  { id: 6, account: "Forever & Always", task: "Re-engagement call — inactive 30+ days", due: "Jun 25", priority: "Low", assigned: "You", overdue: true, completed: false },
];

const INITIAL_ADMIN_USERS = [
  { id: 1, name: "Sarah Mitchell", store: "Bella Bridal", email: "sarah@bellabridal.com", role: "Stylist", status: "Active", lastLogin: "2h ago", points: 2840, level: "Expert 3" },
  { id: 2, name: "Jessica Chen", store: "Pearl Bridal", email: "jessica@pearlbridal.com", role: "Stylist", status: "Active", lastLogin: "1d ago", points: 4210, level: "Expert 4" },
  { id: 3, name: "Amanda Rodriguez", store: "Ivory & Beau", email: "amanda@ivoryenbeau.com", role: "Admin", status: "Active", lastLogin: "3h ago", points: 3450, level: "Expert 3" },
  { id: 4, name: "Katie Thompson", store: "Grace & Lace", email: "katie@graceandlace.com", role: "Stylist", status: "Inactive", lastLogin: "14d ago", points: 890, level: "Expert 1" },
  { id: 5, name: "Lauren Park", store: "Blush Bridal", email: "lauren@blushbridal.com", role: "Stylist", status: "Active", lastLogin: "5h ago", points: 2200, level: "Expert 2" },
];

// ─── DESIGN SYSTEM PRIMITIVES ─────────────────────────────────────────────────

function PrimaryBtn({ children, onClick, className = "", disabled = false }: { children: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center px-6 h-12 bg-[#1A1A1A] text-[#FFFFFF] text-[13px] font-semibold tracking-[1.4px] uppercase transition-all hover:bg-[#333333] active:bg-[#000000] disabled:bg-[#E5E5E5] disabled:text-[#737373] disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ children, onClick, className = "", disabled = false }: { children: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center px-6 h-12 border border-[#1A1A1A] text-[#1A1A1A] text-[13px] font-semibold tracking-[1.4px] uppercase bg-transparent transition-all hover:bg-[#1A1A1A] hover:text-[#FFFFFF] active:bg-[#333333] disabled:border-[#E5E5E5] disabled:text-[#737373] disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-['Red_Hat_Display'] font-semibold text-[10px] tracking-[1.5px] uppercase text-[#737373] ${className}`}>
      {children}
    </span>
  );
}

function DisplayText({ children, size = "hero", className = "" }: { children: React.ReactNode; size?: "hero" | "large" | "medium"; className?: string }) {
  const sizes = { hero: "text-[48px]", large: "text-[36px]", medium: "text-[28px]" };
  return (
    <p className={`font-['Instrument_Serif'] italic text-[#1A1A1A] leading-tight ${sizes[size]} ${className}`}>
      {children}
    </p>
  );
}

function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-['Instrument_Serif'] text-[#1A1A1A] leading-tight ${className}`}>
      {children}
    </p>
  );
}

function UILabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-['Red_Hat_Display'] font-semibold text-[10px] uppercase tracking-wide ${className}`}>
      {children}
    </span>
  );
}

function Badge({ label, variant = "default" }: { label: string; variant?: "default" | "new" | "custom" | "bestseller" }) {
  const styles: Record<string, string> = {
    default: "bg-[#F5F5F5] text-[#1A1A1A]",
    new: "bg-[#F5F5F5] text-[#1A1A1A]",
    custom: "bg-[#FFFFFF] border border-[#E5E5E5] text-[#1A1A1A]",
    bestseller: "bg-[#1A1A1A] text-[#FFFFFF]",
  };
  return (
    <span className={`px-2 py-0.5 text-[9px] font-['Red_Hat_Display'] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {label}
    </span>
  );
}

function ProductCard({
  product, onClick, isLiked, onToggleLike
}: {
  product: typeof INITIAL_PRODUCTS[0];
  onClick: () => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
}) {
  const badgeVariant: Record<string, "bestseller" | "new" | "custom"> = {
    Bestseller: "bestseller", New: "new", Customizable: "custom"
  };
  return (
    <div className="bg-white border border-[#E5E5E5] hover:border-[#1A1A1A] transition-all cursor-pointer group" onClick={onClick}>
      <div className="bg-[#F5F5F5] aspect-[3/4] flex items-center justify-center relative border-b border-[#E5E5E5]/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-25 group-hover:scale-105 transition-transform duration-300">
          <ShoppingBag size={48} className="text-[#1A1A1A]" />
        </div>
        <button
          className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 hover:bg-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onToggleLike?.(); }}
          aria-label="Favorite"
        >
          <Heart size={16} className={isLiked ? "fill-[#1A1A1A] text-[#1A1A1A]" : "text-[#1A1A1A]"} />
        </button>
        <div className="absolute bottom-3 left-3">
          <Badge label={product.badge} variant={badgeVariant[product.badge] ?? "default"} />
        </div>
      </div>
      <div className="p-4">
        <CardTitle className="text-[20px]">{product.name}</CardTitle>
        <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px] mt-1">{product.fabric.join(", ")} · {product.silhouette.join(", ")}</p>
        <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[14px] mt-2">${product.price}</p>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-5 flex flex-col gap-2">
      <div className="w-6 h-0.5 bg-[#1A1A1A]" />
      <CardTitle className="text-[40px]">{value}</CardTitle>
      <UILabel className="text-[#737373] text-[10px]">{label}</UILabel>
    </div>
  );
}


// ─── STYLIST SCREENS ──────────────────────────────────────────────────────────

function StylistLogin({ onLogin, onToast }: { onLogin: () => void; onToast: (msg: string) => void }) {
  const [email, setEmail] = useState("sarah@bellabridal.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModal, setForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setForgotModal(false);
    onToast(`Password reset link dispatched to ${resetEmail}`);
    setResetEmail("");
  };

  return (
    <div className="flex-1 bg-[#FFFFFF] flex flex-col justify-between p-8 overflow-y-auto">
      <div className="pt-8 text-center">
        <DisplayText size="large" className="text-[38px]">NAGAE Studio</DisplayText>
        <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373] uppercase tracking-[3px] mt-2">Retailer & Stylist Portal</p>
      </div>

      <div className="flex flex-col gap-5 max-w-sm mx-auto w-full my-8">
        <div className="flex flex-col gap-2">
          <Label className="text-[#1A1A1A]">Retailer Email</Label>
          <div className="bg-white border border-[#E5E5E5] h-12 flex items-center px-4 focus-within:border-[#1A1A1A] transition-colors">
            <Mail size={16} className="text-[#737373] mr-2 shrink-0" />
            <input
              className="flex-1 bg-transparent text-[14px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="stylist@boutique.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-[#1A1A1A]">Password</Label>
          <div className="bg-white border border-[#E5E5E5] h-12 flex items-center px-4 focus-within:border-[#1A1A1A] transition-colors">
            <Lock size={16} className="text-[#737373] mr-2 shrink-0" />
            <input
              className="flex-1 bg-transparent text-[14px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#737373] hover:text-[#1A1A1A]">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[12px]">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-4 h-4 border flex items-center justify-center transition-colors ${rememberMe ? "bg-[#1A1A1A] border-[#1A1A1A]" : "border-[#E5E5E5]"}`}
            >
              {rememberMe && <Check size={11} className="text-[#FFFFFF]" />}
            </div>
            <span className="font-['Red_Hat_Display'] text-[#737373]">Remember me</span>
          </label>
          <button type="button" onClick={() => setForgotModal(true)} className="font-['Red_Hat_Display'] font-medium text-[12px] text-[#1A1A1A] underline cursor-pointer">
            Forgot password?
          </button>
        </div>

        <PrimaryBtn onClick={onLogin} className="w-full mt-2">
          <LogIn size={15} className="mr-2" />Sign In to Portal
        </PrimaryBtn>
      </div>

      <div className="text-center pb-4">
        <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373] uppercase tracking-wider">© 2026 NAGAE Studio</p>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <CardTitle className="text-[20px]">Reset Password</CardTitle>
              <button onClick={() => setForgotModal(false)} className="text-[#737373] hover:text-[#1A1A1A]"><X size={18} /></button>
            </div>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[13px] mb-4">Enter your verified store email and we will send you an authentication link.</p>
            <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
              <div className="border border-[#E5E5E5] h-11 flex items-center px-3 focus-within:border-[#1A1A1A]">
                <Mail size={15} className="text-[#737373] mr-2" />
                <input
                  required
                  type="email"
                  placeholder="name@store.com"
                  className="w-full bg-transparent text-[13px] outline-none"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Send Link</PrimaryBtn>
                <SecondaryBtn onClick={() => setForgotModal(false)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function HomeDashboard({
  onNavigate, onShowResources, onSelectProduct, products, notifications, userPoints
}: {
  onNavigate: (screen: string) => void;
  onShowResources?: () => void;
  onSelectProduct: (p: typeof INITIAL_PRODUCTS[0]) => void;
  products: typeof INITIAL_PRODUCTS;
  notifications: typeof INITIAL_NOTIFICATIONS;
  userPoints: number;
}) {
  const ophelia = products.find(p => p.name === "Ophelia") || products[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] px-5 h-14 flex items-center justify-between sticky top-0 z-20">
        <CardTitle className="text-[22px]">NAGAE Studio</CardTitle>
        <button className="relative p-1.5 cursor-pointer" onClick={() => onNavigate("notifications")} aria-label="Notifications">
          <Bell size={20} className="text-[#1A1A1A]" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-[#1A1A1A] text-[#FFFFFF] text-[9px] font-['Red_Hat_Display'] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      <div className="px-5 py-6 flex flex-col gap-6">
        {/* Welcome */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px] uppercase tracking-wider">Welcome back</p>
            <DisplayText size="medium" className="text-[26px]">Sarah Mitchell</DisplayText>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px] mt-0.5">Grace & Lace · NAGAE Expert Level 3</p>
          </div>
          <div className="bg-[#F5F5F5] px-3 py-1 text-right">
            <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[18px]">{userPoints.toLocaleString()}</p>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[9px] uppercase tracking-wider">Points</p>
          </div>
        </div>

        {/* Promotion Banner */}
        <div
          onClick={() => onNavigate("catalog")}
          className="bg-[#1A1A1A] p-4 flex items-center gap-3 cursor-pointer hover:bg-[#333333] transition-colors"
        >
          <div className="text-2xl">💰</div>
          <div className="flex-1">
            <p className="font-['Red_Hat_Display'] font-bold text-[#FFFFFF] text-[13px]">Flash Sale Active</p>
            <p className="font-['Red_Hat_Display'] text-[#FFFFFF]/70 text-[12px]">Sell Sloan this week — earn $50 stylist commission</p>
          </div>
          <ChevronRight size={16} className="text-[#FFFFFF]/70" />
        </div>

        {/* Quick Access Tiles */}
        <div>
          <Label className="text-[#1A1A1A] mb-3 block">Quick Access</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Search, label: "Search Products", screen: "catalog", color: "bg-[#F5F5F5]", light: false },
              { icon: MessageSquare, label: "Ask NAGAE AI", screen: "ai", color: "bg-[#1A1A1A]", light: true },
              { icon: BookOpen, label: "Training Center", screen: "training", color: "bg-[#F5F5F5]", light: false },
              { icon: Folder, label: "Resources", screen: "resources", color: "bg-[#F5F5F5]", light: false },
            ].map(tile => (
              <button
                key={tile.label}
                onClick={() => tile.screen === "resources" ? onShowResources?.() : onNavigate(tile.screen)}
                className={`${tile.color} p-4 flex flex-col gap-3 text-left transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer`}
              >
                <tile.icon size={22} className={tile.light ? "text-[#FFFFFF]" : "text-[#1A1A1A]"} />
                <UILabel className={`text-[11px] leading-tight ${tile.light ? "text-[#FFFFFF]" : "text-[#1A1A1A]"}`}>{tile.label}</UILabel>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Dress */}
        <div>
          <Label className="text-[#1A1A1A] mb-3 block">Dress of the Week</Label>
          <div className="bg-white border border-[#E5E5E5] flex gap-4 p-4 hover:border-[#1A1A1A] transition-colors">
            <div className="bg-[#F5F5F5] w-20 h-24 flex items-center justify-center shrink-0">
              <ShoppingBag size={28} className="text-[#1A1A1A]" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <CardTitle className="text-[18px]">{ophelia.name}</CardTitle>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px]">{ophelia.fabric.join(" & ")} · {ophelia.silhouette.join(" ")}</p>
                <p className="font-['Red_Hat_Display'] font-semibold text-[14px] text-[#1A1A1A] mt-1">${ophelia.price}</p>
              </div>
              <button
                className="font-['Red_Hat_Display'] font-bold text-[11px] text-[#1A1A1A] uppercase tracking-wider underline text-left cursor-pointer hover:opacity-70 mt-2"
                onClick={() => onSelectProduct(ophelia)}
              >
                View Details →
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <Label className="text-[#1A1A1A] mb-3 block">Recent Activity</Label>
          <div className="flex flex-col gap-1 border border-[#E5E5E5] bg-white divide-y divide-[#E5E5E5]">
            {[
              { icon: "🏆", text: 'Earned "Fabric Expert" badge', time: "2d ago" },
              { icon: "📚", text: "Completed Introduction to Mikado", time: "3d ago" },
              { icon: "❤️", text: "Favorited Sloan Mikado", time: "4d ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <span className="text-lg shrink-0">{item.icon}</span>
                <p className="flex-1 font-['Red_Hat_Display'] text-[12px] text-[#1A1A1A]">{item.text}</p>
                <span className="font-['Inter'] text-[11px] text-[#737373] shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCatalog({
  products, onSelectProduct, savedFavorites, onToggleFavorite
}: {
  products: typeof INITIAL_PRODUCTS;
  onSelectProduct: (product: typeof INITIAL_PRODUCTS[0]) => void;
  savedFavorites: number[];
  onToggleFavorite: (id: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedSilhouettes, setSelectedSilhouettes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const filters = ["All", "Mikado", "Crepe", "Tulle", "A-Line", "Fitted", "Trumpet"];

  // Filter logic
  let filtered = products.filter(p => {
    const matchesFilter = activeFilter === "All" || p.fabric.includes(activeFilter) || p.silhouette.includes(activeFilter);
    const matchesQuery = query === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.fabric.some(f => f.toLowerCase().includes(query.toLowerCase())) ||
      p.silhouette.some(s => s.toLowerCase().includes(query.toLowerCase()));
    const matchesSilhouettes = selectedSilhouettes.length === 0 || p.silhouette.some(s => selectedSilhouettes.includes(s));
    const priceNum = parseInt(p.price.replace(/,/g, ""), 10) || 0;
    const matchesPrice = priceNum <= maxPrice;
    return matchesFilter && matchesQuery && matchesSilhouettes && matchesPrice;
  });

  // Sort logic
  filtered = [...filtered].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/,/g, ""), 10) || 0;
    const priceB = parseInt(b.price.replace(/,/g, ""), 10) || 0;
    if (sort === "Price ↑") return priceA - priceB;
    if (sort === "Price ↓") return priceB - priceA;
    if (sort === "A–Z") return a.name.localeCompare(b.name);
    if (sort === "Bestseller") return (b.badge === "Bestseller" ? 1 : 0) - (a.badge === "Bestseller" ? 1 : 0);
    return b.id - a.id; // Newest
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-[#E5E5E5] px-5 h-14 flex items-center justify-between sticky top-0 z-10">
        <CardTitle className="text-[18px] uppercase tracking-wide">Catalog</CardTitle>
        <button
          onClick={() => setFilterModalOpen(true)}
          className={`p-1.5 border transition-colors ${selectedSilhouettes.length > 0 || maxPrice < 5000 ? "bg-[#1A1A1A] text-[#FFFFFF] border-[#1A1A1A]" : "border-[#E5E5E5] text-[#1A1A1A] hover:border-[#1A1A1A]"}`}
          aria-label="Filter"
        >
          <Filter size={16} />
        </button>
      </div>

      <div className="px-5 pt-4 pb-2 bg-[#FFFFFF] sticky top-14 z-10 border-b border-[#E5E5E5]">
        {/* Search */}
        <div className="bg-white border border-[#E5E5E5] h-11 flex items-center px-4 gap-3 focus-within:border-[#1A1A1A] transition-colors mb-3">
          <Search size={16} className="text-[#737373] shrink-0" />
          <input
            className="flex-1 bg-transparent text-[14px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
            placeholder="Search styles, fabrics, silhouettes..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && <button onClick={() => setQuery("")}><X size={14} className="text-[#737373]" /></button>}
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-3 py-1.5 text-[10px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${activeFilter === f ? "bg-[#1A1A1A] text-[#FFFFFF]" : "bg-white border border-[#E5E5E5] text-[#737373] hover:text-[#1A1A1A]"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort row */}
        <div className="flex items-center justify-between py-1.5">
          <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">{filtered.length} styles shown</p>
          <div className="flex items-center gap-1.5">
            <span className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">Sort:</span>
            <select
              className="bg-transparent text-[11px] font-['Red_Hat_Display'] font-medium text-[#1A1A1A] outline-none cursor-pointer border-b border-dashed border-[#1A1A1A] pb-0.5"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {["Newest", "Bestseller", "Price ↑", "Price ↓", "A–Z"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Search size={36} className="text-[#737373]" />
            <p className="font-['Red_Hat_Display'] font-medium text-[#1A1A1A] text-[15px]">No styles match your filters</p>
            <button
              onClick={() => { setQuery(""); setActiveFilter("All"); setSelectedSilhouettes([]); setMaxPrice(5000); }}
              className="font-['Red_Hat_Display'] text-[12px] text-[#1A1A1A] underline uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => onSelectProduct(p)}
                isLiked={savedFavorites.includes(p.id)}
                onToggleLike={() => onToggleFavorite(p.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm p-6 border-t sm:border border-[#E5E5E5] shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Filter Collection</CardTitle>
              <button onClick={() => setFilterModalOpen(false)}><X size={18} /></button>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <Label className="text-[#1A1A1A] mb-2 block">Silhouette</Label>
                <div className="flex flex-wrap gap-2">
                  {["A-Line", "Fitted", "Trumpet", "Sheath", "Bias Cut"].map(s => {
                    const active = selectedSilhouettes.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSilhouettes(active ? selectedSilhouettes.filter(x => x !== s) : [...selectedSilhouettes, s])}
                        className={`px-3 py-1.5 text-[11px] font-['Red_Hat_Display'] uppercase font-medium border transition-colors ${active ? "bg-[#1A1A1A] text-[#FFFFFF] border-[#1A1A1A]" : "border-[#E5E5E5] text-[#737373]"}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-[#1A1A1A]">Max Price</Label>
                  <span className="font-['Red_Hat_Display'] font-semibold text-[13px] text-[#1A1A1A]">${maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={e => setMaxPrice(parseInt(e.target.value, 10))}
                  className="w-full accent-[#1A1A1A]"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <PrimaryBtn onClick={() => setFilterModalOpen(false)} className="flex-1 h-11 text-[11px]">
                  Apply Filters ({filtered.length})
                </PrimaryBtn>
                <SecondaryBtn onClick={() => { setSelectedSilhouettes([]); setMaxPrice(5000); }} className="flex-1 h-11 text-[11px]">
                  Reset
                </SecondaryBtn>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductDetail({
  product, onBack, onAskAIWithStyle, onSelectSimilar, onToast, isLiked, onToggleLike
}: {
  product: typeof INITIAL_PRODUCTS[0];
  onBack: () => void;
  onAskAIWithStyle: (dressName: string) => void;
  onSelectSimilar: (dressName: string) => void;
  onToast: (msg: string) => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedMods, setSelectedMods] = useState<string[]>([]);
  const [imageAngle, setImageAngle] = useState(0);
  const [shareModal, setShareModal] = useState(false);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Size 10 (Showroom Sample)");
  const [timeline, setTimeline] = useState("Standard (12-14 weeks)");
  const [notes, setNotes] = useState("");

  const tabs = ["Overview", "Modifications", "Fit Notes", "Styling Tips", "Similar Styles"];
  const angles = ["Front View", "Back Silhouette", "Fabric Texture", "Movement"];

  // Base price + $250 for each custom modification
  const basePrice = parseInt(product.price.replace(/,/g, ""), 10) || 0;
  const modTotal = selectedMods.length * 250;
  const totalPrice = basePrice + modTotal;

  const toggleMod = (mod: string) => {
    setSelectedMods(prev => prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    onToast(`Link to ${product.name} copied to clipboard!`);
    setShareModal(false);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderDrawerOpen(false);
    onToast(`Sample order placed for ${product.name} (${selectedSize})!`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5] h-14 px-5 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="cursor-pointer p-1"><ArrowLeft size={22} className="text-[#1A1A1A]" /></button>
        <CardTitle className="text-[18px] uppercase tracking-wide">Style Details</CardTitle>
        <button onClick={() => setShareModal(true)} className="cursor-pointer p-1" aria-label="Share">
          <Share2 size={20} className="text-[#1A1A1A]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Interactive Gallery */}
        <div className="bg-[#F5F5F5] aspect-square flex flex-col items-center justify-center relative border-b border-[#E5E5E5]">
          <ShoppingBag size={64} className="text-[#1A1A1A] opacity-30" />
          <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373] uppercase tracking-widest mt-2">{angles[imageAngle]}</p>

          <button
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white shadow-sm transition-colors cursor-pointer"
            onClick={onToggleLike}
            aria-label="Favorite"
          >
            <Heart size={20} className={isLiked ? "fill-[#1A1A1A] text-[#1A1A1A]" : "text-[#1A1A1A]"} />
          </button>

          {/* Interactive angle selector dots */}
          <div className="absolute bottom-4 flex gap-2">
            {angles.map((_, i) => (
              <button
                key={i}
                onClick={() => setImageAngle(i)}
                className={`h-2 transition-all cursor-pointer ${i === imageAngle ? "w-6 bg-[#1A1A1A]" : "w-2 bg-[#E5E5E5] hover:bg-[#737373]"}`}
                aria-label={`View angle ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="px-5 py-5 border-b border-[#E5E5E5]">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-[26px]">{product.name}</CardTitle>
              <p className="font-['Red_Hat_Display'] text-[#737373] text-[13px] mt-1">{product.fabric.join(" & ")}</p>
            </div>
            <div className="text-right">
              <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[20px]">${totalPrice.toLocaleString()}</p>
              {modTotal > 0 && <p className="font-['Red_Hat_Display'] text-[10px] text-[#737373]">+${modTotal} mods</p>}
            </div>
          </div>
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: "Fabric", value: product.fabric.join(", ") },
              { label: "Silhouette", value: product.silhouette.join(", ") },
              { label: "Neckline", value: product.neckline },
            ].map(stat => (
              <div key={stat.label} className="bg-[#F5F5F5] p-3 border border-[#E5E5E5]/40">
                <Label className="text-[#737373] text-[8px]">{stat.label}</Label>
                <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[11px] mt-1 uppercase tracking-wide truncate">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 bg-white border-b border-[#E5E5E5] z-10">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-3 text-[10px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${activeTab === tab ? "border-[#1A1A1A] text-[#1A1A1A]" : "border-transparent text-[#737373] hover:text-[#1A1A1A]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="px-5 py-5">
          {activeTab === "Overview" && (
            <div className="flex flex-col gap-4">
              <p className="font-['Inter'] text-[#1A1A1A] text-[14px] leading-relaxed">{product.desc}</p>
              <div className="bg-[#F5F5F5] p-4 border border-[#E5E5E5]">
                <p className="font-['Red_Hat_Display'] font-semibold text-[11px] text-[#1A1A1A] uppercase tracking-wider">Stylist Pro Tip</p>
                <p className="font-['Inter'] text-[#737373] text-[12px] mt-1">Order showroom fabric ring swatches to show brides the light catch on our Mikado weave.</p>
              </div>
            </div>
          )}
          {activeTab === "Modifications" && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px]">Tap to customize this gown (+$250 per option):</p>
                {selectedMods.length > 0 && (
                  <button onClick={() => setSelectedMods([])} className="font-['Red_Hat_Display'] text-[11px] text-[#1A1A1A] underline">Clear</button>
                )}
              </div>
              <div className="border border-[#E5E5E5] divide-y divide-[#E5E5E5] bg-white">
                {product.modifications.map((mod, i) => {
                  const checked = selectedMods.includes(mod);
                  return (
                    <div
                      key={i}
                      onClick={() => toggleMod(mod)}
                      className="flex items-center justify-between p-3.5 hover:bg-[#F5F5F5] transition-colors cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${checked ? "bg-[#1A1A1A] border-[#1A1A1A]" : "border-[#E5E5E5]"}`}>
                          {checked && <Check size={11} className="text-[#FFFFFF]" />}
                        </div>
                        <p className="font-['Red_Hat_Display'] font-medium text-[#1A1A1A] text-[13px]">{mod}</p>
                      </div>
                      <span className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">+$250</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {activeTab === "Fit Notes" && (
            <div>
              <p className="font-['Inter'] text-[#1A1A1A] text-[14px] leading-relaxed">{product.fitNotes}</p>
            </div>
          )}
          {activeTab === "Styling Tips" && (
            <div>
              <p className="font-['Inter'] text-[#1A1A1A] text-[14px] leading-relaxed">{product.stylingTips}</p>
            </div>
          )}
          {activeTab === "Similar Styles" && (
            <div className="flex flex-col gap-3">
              {product.similarStyles.map((name, i) => (
                <div
                  key={i}
                  onClick={() => onSelectSimilar(name)}
                  className="flex items-center justify-between bg-[#F5F5F5] border border-[#E5E5E5] p-4 hover:border-[#1A1A1A] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-[#E5E5E5] flex items-center justify-center">
                      <ShoppingBag size={18} className="text-[#1A1A1A]" />
                    </div>
                    <div>
                      <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[16px] group-hover:underline">{name}</p>
                      <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px]">Tap to view style</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#737373]" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-5 pb-8 flex flex-col gap-3">
          <PrimaryBtn onClick={() => setOrderDrawerOpen(true)} className="w-full">
            <ShoppingBag size={15} className="mr-2" />Request Showroom Sample / Order
          </PrimaryBtn>
          <SecondaryBtn onClick={() => onAskAIWithStyle(product.name)} className="w-full">
            <MessageSquare size={14} className="mr-2" />Ask NAGAE AI About {product.name}
          </SecondaryBtn>
        </div>
      </div>

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-[20px]">Share {product.name}</CardTitle>
              <button onClick={() => setShareModal(false)}><X size={18} /></button>
            </div>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[13px] mb-4">Share this lookbook sheet or specification with your client.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopyLink}
                className="w-full h-11 border border-[#1A1A1A] flex items-center justify-center gap-2 font-['Red_Hat_Display'] font-semibold text-[12px] uppercase tracking-wider hover:bg-[#F5F5F5] cursor-pointer"
              >
                <Copy size={15} />Copy Style Link
              </button>
              <button
                onClick={() => { setShareModal(false); onToast("Client Lookbook PDF generated & sent via email!"); }}
                className="w-full h-11 bg-[#1A1A1A] text-[#FFFFFF] flex items-center justify-center gap-2 font-['Red_Hat_Display'] font-semibold text-[12px] uppercase tracking-wider hover:bg-[#333333] cursor-pointer"
              >
                <Mail size={15} />Send Lookbook to Bride
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Sample Drawer */}
      {orderDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md p-6 border-t sm:border border-[#E5E5E5] shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <div>
                <CardTitle className="text-[22px]">Sample Order</CardTitle>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px]">{product.name} · ${totalPrice.toLocaleString()}</p>
              </div>
              <button onClick={() => setOrderDrawerOpen(false)}><X size={18} /></button>
            </div>

            <form onSubmit={handleOrderSubmit} className="flex flex-col gap-4">
              <div>
                <Label className="text-[#1A1A1A] mb-1.5 block">Showroom Size</Label>
                <select
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  className="w-full border border-[#E5E5E5] h-11 px-3 text-[13px] font-['Red_Hat_Display'] outline-none focus:border-[#1A1A1A]"
                >
                  {["Size 0", "Size 2", "Size 4", "Size 6", "Size 8", "Size 10 (Showroom Sample)", "Size 12", "Size 14", "Size 16", "Size 18 (Curve Sample)", "Size 20", "Size 22", "Size 24"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-[#1A1A1A] mb-1.5 block">Production Timeline</Label>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Standard (12-14 weeks)", fee: "Included" },
                    { label: "Priority Rush (6-8 weeks)", fee: "+$350" },
                  ].map(t => (
                    <label key={t.label} className="flex items-center justify-between border border-[#E5E5E5] p-3 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="timeline"
                          checked={timeline === t.label}
                          onChange={() => setTimeline(t.label)}
                          className="accent-[#1A1A1A]"
                        />
                        <span className="font-['Red_Hat_Display'] text-[12px] text-[#1A1A1A]">{t.label}</span>
                      </div>
                      <span className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">{t.fee}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-[#1A1A1A] mb-1.5 block">Store Delivery Notes</Label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. For trunk show preview June 15..."
                  className="w-full border border-[#E5E5E5] p-3 text-[13px] outline-none focus:border-[#1A1A1A] resize-none"
                />
              </div>

              <div className="bg-[#F5F5F5] p-3 text-[12px] flex justify-between font-['Red_Hat_Display']">
                <span className="text-[#737373]">Estimated Total:</span>
                <span className="font-bold text-[#1A1A1A]">${(totalPrice + (timeline.includes("Priority") ? 350 : 0)).toLocaleString()}</span>
              </div>

              <PrimaryBtn className="w-full h-11 text-[12px]">Confirm Sample Request</PrimaryBtn>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


function AskAI({ initialPrompt = "" }: { initialPrompt?: string }) {
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([
    { role: "ai", text: "Hi! I'm NAGAE AI, your product knowledge assistant. Ask me anything about NAGAE Studio styles, modifications, fit recommendations, or styling tips." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, "up" | "down">>({});
  const [isListening, setIsListening] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsgs = [...messages, { role: "user", text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const response = getSmartAIResponse(text);
      setMessages([...newMsgs, { role: "ai", text: response }]);
      setLoading(false);
    }, 900);
  };

  useEffect(() => {
    if (initialPrompt) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleVoiceInput = () => {
    if (isListening) return;
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInput("Can I customize the train length on Sloan Mikado?");
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-[#E5E5E5] px-5 h-14 flex items-center justify-between sticky top-0 z-10">
        <CardTitle className="text-[18px] uppercase tracking-wide">Ask NAGAE AI</CardTitle>
        <div className="flex items-center gap-2 bg-[#F5F5F5] px-2.5 py-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <UILabel className="text-[9px] text-[#1A1A1A]">Online Assistant</UILabel>
        </div>
      </div>

      {/* Prompt suggestions */}
      <div className="px-4 py-3 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373] uppercase tracking-wider mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {AI_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => sendMessage(prompt)}
              className="bg-white border border-[#E5E5E5] px-3 py-1.5 text-[11px] font-['Red_Hat_Display'] text-[#1A1A1A] text-left hover:border-[#1A1A1A] transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] p-4 ${msg.role === "user" ? "bg-[#1A1A1A] text-[#FFFFFF]" : "bg-white border border-[#E5E5E5]"}`}>
              <p className="font-['Inter'] leading-relaxed text-[13px]">{msg.text}</p>
              {msg.role === "ai" && i > 0 && (
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E5E5E5] text-[10px] font-['Red_Hat_Display'] text-[#737373] uppercase tracking-wider">
                  <button
                    onClick={() => setFeedback(prev => ({ ...prev, [i]: "up" }))}
                    className={`flex items-center gap-1 cursor-pointer transition-colors ${feedback[i] === "up" ? "text-[#1A1A1A] font-bold" : "hover:text-[#1A1A1A]"}`}
                  >
                    <ThumbsUp size={12} className={feedback[i] === "up" ? "fill-[#1A1A1A]" : ""} />
                    {feedback[i] === "up" ? "Helpful ✓" : "Helpful"}
                  </button>
                  <button
                    onClick={() => setFeedback(prev => ({ ...prev, [i]: "down" }))}
                    className={`flex items-center gap-1 cursor-pointer transition-colors ${feedback[i] === "down" ? "text-[#1A1A1A] font-bold" : "hover:text-[#1A1A1A]"}`}
                  >
                    <ThumbsDown size={12} className={feedback[i] === "down" ? "fill-[#1A1A1A]" : ""} />
                    {feedback[i] === "down" ? "Noted" : "Not Helpful"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#E5E5E5] px-4 py-3 flex items-center gap-2">
              <span className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">NAGAE AI is typing</span>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input row */}
      <div className="bg-white border-t border-[#E5E5E5] px-4 py-3 flex gap-2">
        <div className={`flex-1 bg-[#FFFFFF] border h-11 flex items-center px-3 gap-2 transition-colors ${isListening ? "border-red-500 bg-red-50/20" : "border-[#E5E5E5] focus-within:border-[#1A1A1A]"}`}>
          <input
            className="flex-1 bg-transparent text-[13px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
            placeholder={isListening ? "Listening to your voice..." : "Ask about styles, modifications, lead times..."}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage(input)}
          />
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-1 transition-colors cursor-pointer ${isListening ? "text-red-500 animate-pulse" : "text-[#737373] hover:text-[#1A1A1A]"}`}
            title="Voice input simulation"
          >
            <Mic size={18} />
          </button>
        </div>
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="w-11 h-11 bg-[#1A1A1A] disabled:bg-[#E5E5E5] flex items-center justify-center hover:bg-[#333333] transition-colors cursor-pointer"
        >
          <Send size={16} className="text-[#FFFFFF]" />
        </button>
      </div>
    </div>
  );
}

function TrainingLibrary({
  modules, onSelectModule
}: {
  modules: typeof INITIAL_TRAINING;
  onSelectModule: (module: typeof INITIAL_TRAINING[0]) => void;
}) {
  const categories = ["All", "Fabric Education", "Fit Education", "Styling Philosophy", "Selling Techniques", "Collection Inspiration"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = modules.filter(m => {
    const matchCat = activeCategory === "All" || m.category === activeCategory;
    const matchQ = query === "" || m.title.toLowerCase().includes(query.toLowerCase()) || m.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-[#E5E5E5] px-5 h-14 flex items-center justify-between sticky top-0 z-10">
        <CardTitle className="text-[18px] uppercase tracking-wide">Training Center</CardTitle>
        <div className="bg-[#F5F5F5] px-2.5 py-1">
          <UILabel className="text-[9px] text-[#1A1A1A]">{modules.filter(m => m.completed).length}/{modules.length} Completed</UILabel>
        </div>
      </div>

      <div className="px-5 pt-4 pb-2 bg-[#FFFFFF] border-b border-[#E5E5E5]">
        {/* Search */}
        <div className="bg-white border border-[#E5E5E5] h-10 flex items-center px-3 gap-2 mb-3 focus-within:border-[#1A1A1A]">
          <Search size={15} className="text-[#737373]" />
          <input
            className="flex-1 bg-transparent text-[13px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
            placeholder="Search modules..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-3 py-1 text-[10px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${activeCategory === c ? "bg-[#1A1A1A] text-[#FFFFFF] border-[#1A1A1A]" : "bg-white border-[#E5E5E5] text-[#737373] hover:text-[#1A1A1A]"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {filtered.map(m => (
          <div
            key={m.id}
            onClick={() => onSelectModule(m)}
            className="bg-white border border-[#E5E5E5] p-4 hover:border-[#1A1A1A] transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-['Red_Hat_Display'] font-semibold text-[10px] uppercase tracking-wider text-[#737373]">{m.category}</span>
              <span className="font-['Red_Hat_Display'] text-[11px] text-[#737373] flex items-center gap-1"><Clock size={11} />{m.duration}</span>
            </div>
            <CardTitle className="text-[18px] group-hover:underline">{m.title}</CardTitle>
            <p className="font-['Inter'] text-[#737373] text-[12px] mt-1 line-clamp-2">{m.description}</p>
            <div className="mt-3 pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-[#F5F5F5] overflow-hidden">
                  <div className="h-full bg-[#1A1A1A] transition-all" style={{ width: `${m.progress}%` }} />
                </div>
                <span className="font-['Red_Hat_Display'] font-bold text-[10px] text-[#1A1A1A]">{m.progress}%</span>
              </div>
              <div className="flex items-center gap-1 font-['Red_Hat_Display'] text-[11px] font-semibold text-[#1A1A1A]">
                <Zap size={13} />+{m.points} pts
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainingModule({
  module, onBack, onTakeQuiz, onMarkComplete
}: {
  module: typeof INITIAL_TRAINING[0];
  onBack: () => void;
  onTakeQuiz: () => void;
  onMarkComplete: (id: number) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(module.progress);
  const [checkedTakeaways, setCheckedTakeaways] = useState<number[]>([]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 5;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleTakeaway = (idx: number) => {
    setCheckedTakeaways(prev => prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-[#E5E5E5] h-14 px-5 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="p-1 cursor-pointer"><ArrowLeft size={22} className="text-[#1A1A1A]" /></button>
        <CardTitle className="text-[16px] uppercase tracking-wide">{module.category}</CardTitle>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Interactive Video player simulation */}
        <div className="bg-[#1A1A1A] aspect-video flex items-center justify-center relative">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 border-2 border-[#FFFFFF] flex items-center justify-center rounded-full hover:bg-white/20 transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} className="text-[#FFFFFF]" /> : <Play size={24} className="text-[#FFFFFF] ml-1" />}
          </button>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <div className="flex-1 h-1 bg-white/30 cursor-pointer overflow-hidden">
              <div className="h-full bg-white transition-all duration-300" style={{ width: `${videoProgress}%` }} />
            </div>
            <span className="font-['Red_Hat_Display'] text-[10px] text-[#FFFFFF]">{videoProgress}%</span>
          </div>
          <div className="absolute top-4 right-4 bg-black/50 px-2 py-1">
            <span className="font-['Red_Hat_Display'] text-[11px] text-[#FFFFFF]">{module.duration}</span>
          </div>
        </div>

        <div className="px-5 py-5 flex flex-col gap-5">
          <div>
            <Label className="text-[#737373] mb-1 block">{module.category}</Label>
            <CardTitle className="text-[24px]">{module.title}</CardTitle>
            <p className="font-['Inter'] text-[#737373] text-[14px] mt-2 leading-relaxed">{module.description}</p>
          </div>

          <div className="border-t border-[#E5E5E5] pt-4">
            <div className="flex justify-between items-center mb-3">
              <Label className="text-[#1A1A1A]">Key Takeaways (Check to verify)</Label>
              <span className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">{checkedTakeaways.length}/{module.takeaways.length} checked</span>
            </div>
            <div className="flex flex-col gap-2">
              {module.takeaways.map((t, i) => {
                const checked = checkedTakeaways.includes(i);
                return (
                  <div
                    key={i}
                    onClick={() => toggleTakeaway(i)}
                    className={`flex items-start gap-3 p-3 border transition-colors cursor-pointer select-none ${checked ? "bg-[#F5F5F5] border-[#1A1A1A]" : "bg-white border-[#E5E5E5]"}`}
                  >
                    <div className={`w-4 h-4 mt-0.5 border flex items-center justify-center shrink-0 ${checked ? "bg-[#1A1A1A] border-[#1A1A1A]" : "border-[#E5E5E5]"}`}>
                      {checked && <Check size={11} className="text-[#FFFFFF]" />}
                    </div>
                    <p className={`font-['Inter'] text-[13px] leading-relaxed ${checked ? "text-[#1A1A1A] font-medium" : "text-[#737373]"}`}>{t}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#F5F5F5] p-4 border border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#1A1A1A]" />
              <p className="font-['Red_Hat_Display'] font-bold text-[#1A1A1A] text-[13px]">+{module.points} points on completion</p>
            </div>
            {module.completed && <span className="bg-[#1A1A1A] text-[#FFFFFF] text-[10px] font-['Red_Hat_Display'] uppercase px-2 py-0.5 font-bold">Earned</span>}
          </div>

          <div className="flex flex-col gap-2.5">
            <PrimaryBtn onClick={onTakeQuiz} className="w-full">
              Take Quiz to Earn Points
            </PrimaryBtn>
            <SecondaryBtn
              onClick={() => onMarkComplete(module.id)}
              disabled={module.completed}
              className="w-full"
            >
              {module.completed ? "✓ Module Already Completed" : "Mark as Complete (+Points)"}
            </SecondaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizScreen({
  module, onBack, onCompleteQuiz
}: {
  module: typeof INITIAL_TRAINING[0];
  onBack: () => void;
  onCompleteQuiz: (scorePct: number, pointsEarned: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_QUESTIONS[current];
  const score = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length;

  const handleNext = () => {
    if (selected === null) return;
    const next = [...answers, selected];
    setAnswers(next);
    setSelected(null);
    if (current + 1 < QUIZ_QUESTIONS.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      const finalScore = next.filter((a, i) => a === QUIZ_QUESTIONS[i].correct).length;
      const pct = Math.round((finalScore / QUIZ_QUESTIONS.length) * 100);
      const points = pct >= 80 ? module.points : Math.round(module.points * 0.5);
      onCompleteQuiz(pct, points);
    }
  };

  if (finished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    const passed = pct >= 80;
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-[#E5E5E5] h-14 px-5 flex items-center justify-between">
          <button onClick={onBack} className="p-1"><ArrowLeft size={22} className="text-[#1A1A1A]" /></button>
          <CardTitle className="text-[16px] uppercase tracking-wide">Quiz Results</CardTitle>
          <div className="w-6" />
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col items-center px-5 py-8 gap-5">
          <div className="w-28 h-28 border border-[#1A1A1A] flex items-center justify-center bg-[#F5F5F5]">
            <span className="font-['Instrument_Serif'] text-[#1A1A1A] text-[48px]">{pct}%</span>
          </div>
          <div className="text-center">
            <CardTitle className="text-[26px]">{passed ? "Mastery Achieved!" : "Keep Practicing"}</CardTitle>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[13px] mt-1">{score} of {QUIZ_QUESTIONS.length} correct</p>
          </div>
          <div className="bg-[#F5F5F5] border border-[#E5E5E5] w-full p-4 text-center">
            <span className="text-3xl">{passed ? "💎" : "📚"}</span>
            <CardTitle className="text-[18px] mt-1">{passed ? "+Points Credited!" : "Review Module Notes"}</CardTitle>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px] mt-1">
              {passed ? `+${module.points} points awarded to your profile balance!` : "Score 80%+ to unlock the full Quiz Master badge."}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 w-full mt-2">
            <PrimaryBtn onClick={onBack} className="w-full">Continue Learning</PrimaryBtn>
            <SecondaryBtn onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setFinished(false); }} className="w-full">
              Retake Quiz
            </SecondaryBtn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-[#E5E5E5] h-14 px-5 flex items-center justify-between">
        <button onClick={onBack} className="p-1"><ArrowLeft size={22} className="text-[#1A1A1A]" /></button>
        <Label className="text-[#1A1A1A]">Question {current + 1} of {QUIZ_QUESTIONS.length}</Label>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
        {/* Progress bar */}
        <div className="h-1.5 bg-[#F5F5F5] w-full">
          <div className="h-full bg-[#1A1A1A] transition-all" style={{ width: `${((current + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
        </div>

        <CardTitle className="text-[22px] leading-snug">{q.question}</CardTitle>

        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full p-4 text-left border transition-all font-['Inter'] text-[13px] cursor-pointer ${selected === i ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#FFFFFF]" : "border-[#E5E5E5] text-[#1A1A1A] hover:border-[#1A1A1A] bg-white"}`}
            >
              <span className="font-bold mr-2.5">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <PrimaryBtn onClick={handleNext} disabled={selected === null} className="w-full">
            {current + 1 === QUIZ_QUESTIONS.length ? "Submit Answers" : "Next Question →"}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

function ProfilePoints({
  userPoints, onNavigate, onToast, onDeductPoints
}: {
  userPoints: number;
  onNavigate: (s: string) => void;
  onToast: (msg: string) => void;
  onDeductPoints: (pts: number) => void;
}) {
  const [settingsModal, setSettingsModal] = useState(false);
  const [badgesModal, setBadgesModal] = useState(false);
  const [rewardsModal, setRewardsModal] = useState(false);

  // Settings state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [darkModePref, setDarkModePref] = useState(false);

  const rewards = [
    { id: 1, title: "Fabric Swatch Ring (All Fabrics)", cost: 400, desc: "Physical ring with 10 NAGAE silk and crepe swatches." },
    { id: 2, title: "Lookbook Hardcover Vol. 1", cost: 800, desc: "Luxury studio book for your bridal lounge table." },
    { id: 3, title: "Priority Sample Production Pass", cost: 1200, desc: "Dispatches 1 showroom sample gown with 5-day rush." },
    { id: 4, title: "Trunk Show Marketing Kit", cost: 2000, desc: "Physical acrylic branded signage and social media pack." },
  ];

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (userPoints < reward.cost) {
      onToast(`Not enough points. You need ${reward.cost - userPoints} more points.`);
      return;
    }
    onDeductPoints(reward.cost);
    onToast(`Redeemed: ${reward.title}! Our team will ship to your boutique.`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-[#E5E5E5] px-5 h-14 flex items-center justify-between sticky top-0 z-10">
        <CardTitle className="text-[18px] uppercase tracking-wide">My Profile</CardTitle>
        <button onClick={() => setSettingsModal(true)} className="p-1 cursor-pointer" aria-label="Settings">
          <Settings size={20} className="text-[#1A1A1A]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile header */}
        <div className="bg-[#1A1A1A] px-5 py-7 flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center">
            <User size={30} className="text-[#1A1A1A]" />
          </div>
          <div className="text-center">
            <DisplayText size="medium" className="text-[#FFFFFF] text-[24px]">Sarah Mitchell</DisplayText>
            <p className="font-['Red_Hat_Display'] text-[#FFFFFF]/70 text-[12px]">Grace & Lace · Chicago, IL</p>
          </div>
          <div className="bg-[#FFFFFF] px-3 py-1">
            <UILabel className="text-[#1A1A1A] text-[10px]">NAGAE Expert Level 3</UILabel>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border-b border-[#E5E5E5] bg-white">
          {[
            { value: userPoints.toLocaleString(), label: "Points" },
            { value: "#5", label: "Leaderboard" },
            { value: `${INITIAL_BADGES.filter(b => b.earned).length}/${INITIAL_BADGES.length}`, label: "Badges" },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center py-4 border-r border-[#E5E5E5] last:border-0">
              <CardTitle className="text-[20px]">{stat.value}</CardTitle>
              <Label className="text-[#737373] mt-0.5">{stat.label}</Label>
            </div>
          ))}
        </div>

        {/* Progress to next level */}
        <div className="px-5 py-5 border-b border-[#E5E5E5] bg-white">
          <div className="flex justify-between mb-2">
            <Label className="text-[#1A1A1A]">Progress to Expert Level 4</Label>
            <Label className="text-[#737373]">{userPoints.toLocaleString()} / 4,000</Label>
          </div>
          <div className="h-2 bg-[#F5F5F5] border border-[#E5E5E5]">
            <div className="h-full bg-[#1A1A1A] transition-all" style={{ width: `${Math.min(100, Math.round((userPoints / 4000) * 100))}%` }} />
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="font-['Red_Hat_Display'] text-[12px] text-[#737373]">
              {Math.max(0, 4000 - userPoints)} points needed to level up
            </p>
            <button
              onClick={() => setRewardsModal(true)}
              className="px-3 py-1.5 bg-[#1A1A1A] text-[#FFFFFF] text-[11px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider hover:bg-[#333333] cursor-pointer"
            >
              <Gift size={12} className="inline mr-1" />Redeem Perks
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="px-5 py-5 border-b border-[#E5E5E5] bg-white">
          <div className="flex justify-between items-center mb-3">
            <Label className="text-[#1A1A1A]">Earned Badges</Label>
            <button onClick={() => setBadgesModal(true)} className="font-['Red_Hat_Display'] text-[11px] text-[#1A1A1A] underline uppercase tracking-wider cursor-pointer">
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {INITIAL_BADGES.slice(0, 4).map(badge => (
              <div key={badge.id} className={`flex flex-col items-center gap-1 p-2 border border-[#E5E5E5] ${badge.earned ? "bg-[#F5F5F5]" : "opacity-40"}`}>
                <span className="text-2xl">{badge.emoji}</span>
                <UILabel className="text-[8px] text-center leading-tight text-[#1A1A1A] truncate w-full">{badge.title}</UILabel>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard teaser */}
        <div className="px-5 py-5 bg-white">
          <div className="flex justify-between items-center mb-3">
            <Label className="text-[#1A1A1A]">Monthly Leaderboard</Label>
            <button onClick={() => onNavigate("leaderboard")} className="font-['Red_Hat_Display'] text-[11px] text-[#1A1A1A] underline uppercase tracking-wider cursor-pointer">
              Full Standings
            </button>
          </div>
          <div className="border border-[#E5E5E5] divide-y divide-[#E5E5E5]">
            {LEADERBOARD.slice(0, 3).map(entry => (
              <div key={entry.rank} className={`flex items-center gap-3 p-3 ${entry.isYou ? "bg-[#F5F5F5]" : "bg-white"}`}>
                <span className="font-['Instrument_Serif'] text-[#1A1A1A] text-[18px] w-6 text-center">{entry.rank}</span>
                <span className="text-lg">{entry.badge}</span>
                <div className="flex-1">
                  <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[13px]">{entry.name}</p>
                  <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px]">{entry.store}</p>
                </div>
                <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[16px]">{entry.points.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rewards Store Modal */}
      {rewardsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <div>
                <CardTitle className="text-[20px]">Points Store</CardTitle>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px]">Available Balance: {userPoints.toLocaleString()} pts</p>
              </div>
              <button onClick={() => setRewardsModal(false)}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3">
              {rewards.map(r => (
                <div key={r.id} className="border border-[#E5E5E5] p-3 flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[13px]">{r.title}</p>
                      <span className="bg-[#F5F5F5] font-['Red_Hat_Display'] font-bold text-[11px] text-[#1A1A1A] px-2 py-0.5">{r.cost} pts</span>
                    </div>
                    <p className="font-['Inter'] text-[#737373] text-[11px] mt-1">{r.desc}</p>
                  </div>
                  <PrimaryBtn
                    onClick={() => handleRedeem(r)}
                    disabled={userPoints < r.cost}
                    className="h-8 text-[10px] w-full"
                  >
                    {userPoints >= r.cost ? "Redeem Perk" : "Insufficient Points"}
                  </PrimaryBtn>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badges Modal */}
      {badgesModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">All Badges</CardTitle>
              <button onClick={() => setBadgesModal(false)}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3">
              {INITIAL_BADGES.map(b => (
                <div key={b.id} className={`p-3 border flex items-center gap-3 ${b.earned ? "bg-[#F5F5F5] border-[#1A1A1A]" : "border-[#E5E5E5] opacity-50"}`}>
                  <span className="text-3xl">{b.emoji}</span>
                  <div className="flex-1">
                    <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[13px]">{b.title}</p>
                    <p className="font-['Inter'] text-[#737373] text-[11px]">{b.desc}</p>
                    <p className="font-['Red_Hat_Display'] text-[10px] text-[#737373] mt-0.5">{b.earned ? `Unlocked on ${b.date}` : `Locked · Rarity: ${b.rarity}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Stylist Settings</CardTitle>
              <button onClick={() => setSettingsModal(false)}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-[#1A1A1A]">Store Location</Label>
                <input disabled value="Grace & Lace (Chicago, IL)" className="border border-[#E5E5E5] p-2.5 bg-[#F5F5F5] text-[12px] font-['Red_Hat_Display']" />
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-[#E5E5E5]">
                <Label className="text-[#1A1A1A]">Preferences</Label>
                <label className="flex items-center justify-between text-[12px] cursor-pointer">
                  <span className="font-['Red_Hat_Display'] text-[#1A1A1A]">Email Drop Alerts</span>
                  <input type="checkbox" checked={emailAlerts} onChange={e => setEmailAlerts(e.target.checked)} className="accent-[#1A1A1A]" />
                </label>
                <label className="flex items-center justify-between text-[12px] cursor-pointer">
                  <span className="font-['Red_Hat_Display'] text-[#1A1A1A]">SMS Commission Alerts</span>
                  <input type="checkbox" checked={smsAlerts} onChange={e => setSmsAlerts(e.target.checked)} className="accent-[#1A1A1A]" />
                </label>
                <label className="flex items-center justify-between text-[12px] cursor-pointer">
                  <span className="font-['Red_Hat_Display'] text-[#1A1A1A]">Dark Mode Contrast</span>
                  <input type="checkbox" checked={darkModePref} onChange={e => setDarkModePref(e.target.checked)} className="accent-[#1A1A1A]" />
                </label>
              </div>

              <PrimaryBtn onClick={() => { setSettingsModal(false); onToast("Preferences successfully updated!"); }} className="w-full mt-2">
                Save Preferences
              </PrimaryBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LeaderboardScreen({ onBack }: { onBack: () => void }) {
  const [period, setPeriod] = useState("This Month");
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-[#E5E5E5] h-14 px-5 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-1"><ArrowLeft size={22} className="text-[#1A1A1A]" /></button>
        <CardTitle className="text-[18px] uppercase tracking-wide">Leaderboard</CardTitle>
        <div className="w-6" />
      </div>
      <div className="flex border-b border-[#E5E5E5] bg-white">
        {["This Week", "This Month", "All Time", "My Store"].map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-3 text-[10px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wide border-b-2 transition-colors cursor-pointer ${period === p ? "border-[#1A1A1A] text-[#1A1A1A]" : "border-transparent text-[#737373] hover:text-[#1A1A1A]"}`}
          >
            {p.split(" ")[0]}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="border border-[#E5E5E5] divide-y divide-[#E5E5E5] bg-white">
          {LEADERBOARD.map(entry => (
            <div key={entry.rank} className={`flex items-center gap-4 p-4 ${entry.isYou ? "bg-[#F5F5F5]" : "bg-white"}`}>
              <span className="font-['Instrument_Serif'] text-[#1A1A1A] text-[22px] w-8 text-center">{entry.rank}</span>
              <span className="text-xl">{entry.badge}</span>
              <div className="flex-1 min-w-0">
                <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[14px]">
                  {entry.name} {entry.isYou && <span className="text-[10px] text-[#737373] font-normal">(You)</span>}
                </p>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px] truncate">{entry.store} · {entry.level}</p>
              </div>
              <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[20px]">{entry.points.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsScreen({
  notifications, onBack, onMarkRead, onMarkAllRead, onClearAll
}: {
  notifications: typeof INITIAL_NOTIFICATIONS;
  onBack: () => void;
  onMarkRead: (id: number) => void;
  onMarkAllRead: () => void;
  onClearAll: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-[#E5E5E5] h-14 px-5 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-1"><ArrowLeft size={22} className="text-[#1A1A1A]" /></button>
        <CardTitle className="text-[18px] uppercase tracking-wide">Notifications</CardTitle>
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllRead}
            className="p-1.5 hover:bg-[#F5F5F5] rounded transition-colors cursor-pointer"
            title="Mark all as read"
          >
            <Check size={18} className="text-[#1A1A1A]" />
          </button>
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="p-1.5 hover:bg-[#F5F5F5] rounded transition-colors cursor-pointer"
              title="Clear all"
            >
              <Trash2 size={16} className="text-[#737373]" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-2">
            <Bell size={36} className="text-[#737373]" />
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[14px]">No notifications right now</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E5E5]">
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => onMarkRead(n.id)}
                className={`w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-[#F5F5F5] transition-colors cursor-pointer ${!n.read ? "bg-white" : "bg-[#F5F5F5]/40"}`}
              >
                <span className="text-xl shrink-0 mt-0.5">{n.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-['Inter'] text-[13px] leading-snug ${!n.read ? "text-[#1A1A1A] font-medium" : "text-[#737373]"}`}>{n.title}</p>
                  <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373] mt-1">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 bg-[#1A1A1A] rounded-full shrink-0 mt-2" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResourcesLibrary({ onBack, onToast }: { onBack?: () => void; onToast: (msg: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Lookbooks", "Line Sheets", "Fit Guides", "Marketing", "Trunk Show", "Fabrics"];

  const resources = [
    { id: 1, category: "Lookbooks", title: "Spring 2026 Lookbook", type: "PDF", size: "8.4 MB", desc: "Complete visual guide to all Spring 2026 collection styles and campaign imagery." },
    { id: 2, category: "Line Sheets", title: "Spring 2026 Line Sheet & Pricing", type: "PDF", size: "2.1 MB", desc: "Wholesale & retail pricing, fabric codes, and available modification options." },
    { id: 3, category: "Fit Guides", title: "NAGAE Sizing Chart 2026", type: "PDF", size: "0.8 MB", desc: "Complete size chart (0–24) with measurement guide for bust, waist, and hip." },
    { id: 4, category: "Fit Guides", title: "Modification Options Guide", type: "PDF", size: "1.4 MB", desc: "Visual guide to train extensions, sleeve additions, neckline adjustments, and rush fees." },
    { id: 5, category: "Trunk Show", title: "Trunk Show Planning Checklist", type: "PDF", size: "0.4 MB", desc: "Everything your store needs to run a successful NAGAE trunk show." },
    { id: 6, category: "Marketing", title: "Social Media Asset Pack", type: "ZIP", size: "45 MB", desc: "High-resolution campaign photos, Instagram story templates, and caption copy." },
    { id: 7, category: "Fabrics", title: "Fabric Swatch Reference Guide", type: "PDF", size: "2.1 MB", desc: "Visual guide to all NAGAE fabrics with care instructions and cleaning recommendations." },
  ];

  const filtered = resources.filter(r => {
    const matchCat = activeCategory === "All" || r.category === activeCategory;
    const matchSearch = search === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (r: typeof resources[0]) => {
    onToast(`Downloading ${r.title} (${r.size})...`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <div className="bg-white border-b border-[#E5E5E5] px-5 h-14 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {onBack && <button onClick={onBack} className="p-1"><ArrowLeft size={20} /></button>}
          <CardTitle className="text-[18px] uppercase tracking-wide">Brand Resources</CardTitle>
        </div>
        <UILabel className="text-[9px] text-[#737373]">{filtered.length} documents</UILabel>
      </div>

      <div className="px-5 pt-4 pb-2 border-b border-[#E5E5E5]">
        <div className="border border-[#E5E5E5] h-10 flex items-center px-3 gap-2 mb-3 focus-within:border-[#1A1A1A]">
          <Search size={15} className="text-[#737373]" />
          <input
            className="flex-1 bg-transparent text-[13px] outline-none"
            placeholder="Search guides, line sheets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`shrink-0 px-3 py-1 text-[10px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${activeCategory === c ? "bg-[#1A1A1A] text-[#FFFFFF] border-[#1A1A1A]" : "bg-white border-[#E5E5E5] text-[#737373]"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {filtered.map(r => (
          <div key={r.id} className="border border-[#E5E5E5] p-4 flex flex-col justify-between gap-3 hover:border-[#1A1A1A] transition-colors">
            <div>
              <div className="flex justify-between items-start">
                <span className="font-['Red_Hat_Display'] text-[10px] font-bold uppercase text-[#737373]">{r.category}</span>
                <span className="bg-[#F5F5F5] font-['Red_Hat_Display'] text-[9px] px-2 py-0.5 font-bold uppercase text-[#1A1A1A]">{r.type} · {r.size}</span>
              </div>
              <CardTitle className="text-[17px] mt-1">{r.title}</CardTitle>
              <p className="font-['Inter'] text-[#737373] text-[12px] mt-1 leading-relaxed">{r.desc}</p>
            </div>
            <SecondaryBtn onClick={() => handleDownload(r)} className="h-9 text-[11px] w-full">
              <Download size={14} className="mr-2" />Download Document
            </SecondaryBtn>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STYLIST WRAPPER WITH STATE ──────────────────────────────────────────────
function StylistApp({
  products,
  trainingModules,
  notifications,
  userPoints,
  savedFavorites,
  onToggleFavorite,
  onAddNotification,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onClearAllNotifications,
  onCompleteModule,
  onCompleteQuiz,
  onDeductPoints,
  onToast
}: {
  products: typeof INITIAL_PRODUCTS;
  trainingModules: typeof INITIAL_TRAINING;
  notifications: typeof INITIAL_NOTIFICATIONS;
  userPoints: number;
  savedFavorites: number[];
  onToggleFavorite: (id: number) => void;
  onAddNotification: (n: any) => void;
  onMarkNotificationRead: (id: number) => void;
  onMarkAllNotificationsRead: () => void;
  onClearAllNotifications: () => void;
  onCompleteModule: (id: number) => void;
  onCompleteQuiz: (scorePct: number, pointsEarned: number) => void;
  onDeductPoints: (pts: number) => void;
  onToast: (msg: string) => void;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [screen, setScreen] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState<typeof INITIAL_PRODUCTS[0] | null>(null);
  const [selectedModule, setSelectedModule] = useState<typeof INITIAL_TRAINING[0] | null>(null);
  const [quizModule, setQuizModule] = useState<typeof INITIAL_TRAINING[0] | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "catalog", icon: Grid, label: "Catalog" },
    { id: "ai", icon: MessageSquare, label: "Ask NAGAE" },
    { id: "training", icon: BookOpen, label: "Training" },
    { id: "resources", icon: Folder, label: "Resources" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  if (!isLoggedIn) {
    return <StylistLogin onLogin={() => setIsLoggedIn(true)} onToast={onToast} />;
  }

  const navigateTo = (scr: string) => {
    setSelectedProduct(null);
    setSelectedModule(null);
    setQuizModule(null);
    setScreen(scr);
  };

  const handleAskAIWithStyle = (dressName: string) => {
    setAiPrompt(`What are the key styling tips, fit notes, and popular modifications for ${dressName}?`);
    setScreen("ai");
  };

  const handleSelectSimilar = (dressName: string) => {
    const found = products.find(p => p.name.toLowerCase() === dressName.toLowerCase());
    if (found) {
      setSelectedProduct(found);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFFFF] relative overflow-hidden select-none">
      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="NAGAE Studio"
        subtitle="Stylist Portal"
        navItems={navItems}
        activeSection={screen}
        onNavigate={navigateTo}
        footer={
          <button
            onClick={() => { setIsLoggedIn(false); setDrawerOpen(false); }}
            className="w-full text-left font-['Red_Hat_Display'] text-[11px] font-semibold uppercase tracking-wider text-[#737373] hover:text-[#1A1A1A] flex items-center gap-2 cursor-pointer"
          >
            <LogIn size={15} />Sign Out
          </button>
        }
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAskAIWithStyle={handleAskAIWithStyle}
            onSelectSimilar={handleSelectSimilar}
            onToast={onToast}
            isLiked={savedFavorites.includes(selectedProduct.id)}
            onToggleLike={() => onToggleFavorite(selectedProduct.id)}
          />
        ) : quizModule ? (
          <QuizScreen
            module={quizModule}
            onBack={() => setQuizModule(null)}
            onCompleteQuiz={(pct, pts) => {
              onCompleteQuiz(pct, pts);
              onToast(`Quiz finished: ${pct}%! +${pts} points credited.`);
            }}
          />
        ) : selectedModule ? (
          <TrainingModule
            module={selectedModule}
            onBack={() => setSelectedModule(null)}
            onTakeQuiz={() => setQuizModule(selectedModule)}
            onMarkComplete={(id) => {
              onCompleteModule(id);
              onToast(`Module completed! +${selectedModule.points} points credited.`);
            }}
          />
        ) : screen === "home" ? (
          <HomeDashboard
            onNavigate={navigateTo}
            onShowResources={() => setScreen("resources")}
            onSelectProduct={p => setSelectedProduct(p)}
            products={products}
            notifications={notifications}
            userPoints={userPoints}
          />
        ) : screen === "catalog" ? (
          <ProductCatalog
            products={products}
            onSelectProduct={p => setSelectedProduct(p)}
            savedFavorites={savedFavorites}
            onToggleFavorite={onToggleFavorite}
          />
        ) : screen === "ai" ? (
          <AskAI initialPrompt={aiPrompt} />
        ) : screen === "training" ? (
          <TrainingLibrary
            modules={trainingModules}
            onSelectModule={m => setSelectedModule(m)}
          />
        ) : screen === "resources" ? (
          <ResourcesLibrary onBack={() => navigateTo("home")} onToast={onToast} />
        ) : screen === "profile" ? (
          <ProfilePoints
            userPoints={userPoints}
            onNavigate={navigateTo}
            onToast={onToast}
            onDeductPoints={onDeductPoints}
          />
        ) : screen === "leaderboard" ? (
          <LeaderboardScreen onBack={() => navigateTo("profile")} />
        ) : screen === "notifications" ? (
          <NotificationsScreen
            notifications={notifications}
            onBack={() => navigateTo("home")}
            onMarkRead={onMarkNotificationRead}
            onMarkAllRead={onMarkAllNotificationsRead}
            onClearAll={onClearAllNotifications}
          />
        ) : null}
      </div>

      {/* Bottom Tab Bar */}
      <div className="h-16 bg-white border-t border-[#E5E5E5] flex items-center justify-around shrink-0 z-20">
        {navItems.map(tab => {
          const isActive = screen === tab.id && !selectedProduct && !selectedModule && !quizModule;
          return (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 w-14 h-full cursor-pointer transition-colors ${isActive ? "text-[#1A1A1A]" : "text-[#737373] hover:text-[#1A1A1A]"}`}
            >
              <tab.icon size={18} strokeWidth={isActive ? 2.2 : 1.6} />
              <span className={`font-['Red_Hat_Display'] text-[9px] uppercase tracking-wider ${isActive ? "font-bold" : "font-medium"}`}>{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center justify-center gap-1 w-12 h-full text-[#737373] hover:text-[#1A1A1A] cursor-pointer"
        >
          <Menu size={18} />
          <span className="font-['Red_Hat_Display'] text-[9px] uppercase tracking-wider font-medium">Menu</span>
        </button>
      </div>
    </div>
  );
}


// ─── ADMIN SCREENS ────────────────────────────────────────────────────────────

const FABRIC_OPTIONS = ["Mikado", "Crepe", "Stretch Crepe", "Tulle", "Silk Charmeuse", "Lace", "Organza"];
const SILHOUETTE_OPTIONS = ["A-Line", "Fitted", "Trumpet", "Sheath", "Ball Gown", "Bias Cut"];

function TagChips({ label, options, selected, onChange }: { label: string; options: string[]; selected: string[]; onChange: (s: string[]) => void }) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(x => x !== opt) : [...selected, opt]);
  };
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[#1A1A1A]">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-1.5 text-[12px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${selected.includes(opt) ? "bg-[#1A1A1A] text-[#FFFFFF]" : "border border-[#E5E5E5] text-[#737373] hover:border-[#1A1A1A]"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function AdminProducts({
  products, onAddProduct, onUpdateProduct, onDeleteProduct, onToast
}: {
  products: typeof INITIAL_PRODUCTS;
  onAddProduct: (p: any) => void;
  onUpdateProduct: (p: any) => void;
  onDeleteProduct: (id: number) => void;
  onToast: (msg: string) => void;
}) {
  const [view, setView] = useState<"list" | "add">("list");
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<typeof INITIAL_PRODUCTS[0] | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [neckline, setNeckline] = useState("");
  const [desc, setDesc] = useState("");
  const [badge, setBadge] = useState("New");
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(["Mikado"]);
  const [selectedSilhouettes, setSelectedSilhouettes] = useState<string[]>(["A-Line"]);

  const isMobile = useMobile();

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newP = {
      id: Date.now(),
      name,
      fabric: selectedFabrics.length > 0 ? selectedFabrics : ["Mikado"],
      silhouette: selectedSilhouettes.length > 0 ? selectedSilhouettes : ["A-Line"],
      neckline: neckline || "Off-Shoulder",
      price: price || "3,200",
      badge: badge as any,
      desc: desc || "Handcrafted bridal silhouette from NAGAE Studio.",
      modifications: ["Standard A-Line", "Chapel Train", "Detachable Sleeves"],
      fitNotes: "True to size. Structural silhouette with comfortable movement.",
      stylingTips: "Pairs beautifully with cathedral veil and pearl accessories.",
      similarStyles: ["Sloan Mikado", "Gemma"]
    };
    onAddProduct(newP);
    onToast(`Published "${name}" to NAGAE Studio catalog!`);
    setName("");
    setPrice("");
    setNeckline("");
    setDesc("");
    setView("list");
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    onUpdateProduct(editProduct);
    onToast(`Updated style "${editProduct.name}"!`);
    setEditProduct(null);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Fabrics", "Silhouettes", "Neckline", "Price", "Badge"];
    const rows = products.map(p => [
      p.id,
      p.name,
      p.fabric.join("; "),
      p.silhouette.join("; "),
      p.neckline,
      p.price,
      p.badge
    ]);
    exportToCSV("nagae_products_export.csv", headers, rows);
    onToast("Products catalog exported to CSV!");
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.fabric.some(f => f.toLowerCase().includes(search.toLowerCase())) ||
    p.silhouette.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  if (view === "add") {
    return (
      <div className={`overflow-y-auto h-full ${isMobile ? "p-4" : "p-8"}`}>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setView("list")} className="p-2 -ml-2 cursor-pointer"><ArrowLeft size={20} className="text-[#1A1A1A]" /></button>
          <div>
            <Label className="text-[#737373]">Products</Label>
            <DisplayText size="medium" className={isMobile ? "text-[22px]" : "text-[26px]"}>Add New Product</DisplayText>
          </div>
        </div>

        <form onSubmit={handleCreateProduct} className="flex flex-col gap-5 pb-24 max-w-2xl">
          <div className="flex flex-col gap-2">
            <Label className="text-[#1A1A1A]">Style Name *</Label>
            <div className="bg-white border border-[#E5E5E5] h-12 flex items-center px-4 focus-within:border-[#1A1A1A] transition-colors">
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1 bg-transparent text-[14px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
                placeholder="e.g. Sloan Mikado"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-[#1A1A1A]">Price ($ USD) *</Label>
              <div className="bg-white border border-[#E5E5E5] h-12 flex items-center px-4 focus-within:border-[#1A1A1A] transition-colors">
                <input
                  required
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
                  placeholder="3,400"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[#1A1A1A]">Neckline</Label>
              <div className="bg-white border border-[#E5E5E5] h-12 flex items-center px-4 focus-within:border-[#1A1A1A] transition-colors">
                <input
                  value={neckline}
                  onChange={e => setNeckline(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
                  placeholder="Off-Shoulder / Sweetheart"
                />
              </div>
            </div>
          </div>

          <TagChips label="Fabrics" options={FABRIC_OPTIONS} selected={selectedFabrics} onChange={setSelectedFabrics} />
          <TagChips label="Silhouettes" options={SILHOUETTE_OPTIONS} selected={selectedSilhouettes} onChange={setSelectedSilhouettes} />

          <div className="flex flex-col gap-2">
            <Label className="text-[#1A1A1A]">Description</Label>
            <div className="bg-white border border-[#E5E5E5] focus-within:border-[#1A1A1A] transition-colors">
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value)}
                className="w-full p-4 text-[14px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373] resize-none bg-transparent"
                rows={3}
                placeholder="Style description, drape notes, craftsmanship..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[#1A1A1A]">Badge Tag</Label>
            <select
              value={badge}
              onChange={e => setBadge(e.target.value)}
              className="bg-white border border-[#E5E5E5] h-12 px-4 text-[14px] font-['Red_Hat_Display'] outline-none"
            >
              <option value="New">New</option>
              <option value="Bestseller">Bestseller</option>
              <option value="Customizable">Customizable</option>
            </select>
          </div>

          <div className="border border-dashed border-[#E5E5E5] p-6 flex flex-col items-center gap-2 bg-[#F5F5F5]/40">
            <Upload size={22} className="text-[#737373]" />
            <p className="font-['Red_Hat_Display'] text-[12px] text-[#737373]">Product Imagery Preview Ready (Auto-linked)</p>
          </div>

          <div className="flex gap-3 pt-4">
            <PrimaryBtn className="flex-1">Publish to Catalog</PrimaryBtn>
            <SecondaryBtn onClick={() => setView("list")} className="flex-1">Cancel</SecondaryBtn>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`overflow-y-auto h-full ${isMobile ? "p-4" : "p-8"}`}>
      <div className={`flex ${isMobile ? "flex-col gap-4" : "items-center justify-between"} mb-6`}>
        <div>
          <Label className="text-[#737373]">Management</Label>
          <DisplayText size="medium" className={isMobile ? "text-[22px]" : "text-[26px]"}>Product Catalog ({products.length})</DisplayText>
        </div>
        <div className="flex gap-2">
          <SecondaryBtn onClick={handleExportCSV}>
            <Download size={14} className="mr-2" />Export CSV
          </SecondaryBtn>
          <PrimaryBtn onClick={() => setView("add")}>
            <PlusCircle size={14} className="mr-2" />Add Product
          </PrimaryBtn>
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E5] h-12 flex items-center px-4 gap-3 mb-4 focus-within:border-[#1A1A1A] transition-colors">
        <Search size={16} className="text-[#737373] shrink-0" />
        <input
          className="flex-1 bg-transparent text-[14px] font-['Inter'] text-[#1A1A1A] outline-none placeholder:text-[#737373]"
          placeholder="Search products by name, fabric, silhouette..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button onClick={() => setSearch("")}><X size={14} className="text-[#737373]" /></button>}
      </div>

      {/* Desktop Table */}
      <div className="bg-white border border-[#E5E5E5]">
        <div className="grid grid-cols-[60px_1.5fr_1.5fr_100px_100px_90px] border-b border-[#E5E5E5] px-4 py-3 bg-[#F5F5F5]/30">
          {["", "Style Name", "Fabric & Silhouette", "Price", "Badge", "Actions"].map(h => (
            <p key={h} className="font-['Red_Hat_Display'] font-bold text-[#737373] text-[10px] uppercase tracking-wider">{h}</p>
          ))}
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {filtered.map(p => (
            <div key={p.id} className="grid grid-cols-[60px_1.5fr_1.5fr_100px_100px_90px] px-4 py-3.5 items-center hover:bg-[#F5F5F5]/30 transition-colors">
              <div className="w-9 h-11 bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center">
                <ShoppingBag size={14} className="text-[#737373]" />
              </div>
              <div>
                <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[16px]">{p.name}</p>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px]">{p.neckline}</p>
              </div>
              <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px]">{p.fabric.join(", ")} · {p.silhouette.join(", ")}</p>
              <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[13px]">${p.price}</p>
              <div><Badge label={p.badge} variant={p.badge === "Bestseller" ? "bestseller" : "default"} /></div>
              <div className="flex gap-1">
                <button
                  onClick={() => setEditProduct(p)}
                  className="p-1.5 hover:bg-[#F5F5F5] text-[#1A1A1A] transition-colors cursor-pointer"
                  title="Edit style"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove "${p.name}" from catalog?`)) {
                      onDeleteProduct(p.id);
                      onToast(`Removed "${p.name}" from catalog.`);
                    }
                  }}
                  className="p-1.5 hover:bg-[#F5F5F5] text-red-500 transition-colors cursor-pointer"
                  title="Delete style"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Edit {editProduct.name}</CardTitle>
              <button onClick={() => setEditProduct(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Style Name</Label>
                <input
                  value={editProduct.name}
                  onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                  className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[#1A1A1A]">Price</Label>
                  <input
                    value={editProduct.price}
                    onChange={e => setEditProduct({ ...editProduct, price: e.target.value })}
                    className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                  />
                </div>
                <div>
                  <Label className="text-[#1A1A1A]">Badge</Label>
                  <select
                    value={editProduct.badge}
                    onChange={e => setEditProduct({ ...editProduct, badge: e.target.value })}
                    className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Customizable">Customizable</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Description</Label>
                <textarea
                  rows={3}
                  value={editProduct.desc}
                  onChange={e => setEditProduct({ ...editProduct, desc: e.target.value })}
                  className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Save Changes</PrimaryBtn>
                <SecondaryBtn onClick={() => setEditProduct(null)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminTraining({
  modules, onAddModule, onUpdateModule, onDeleteModule, onToast
}: {
  modules: typeof INITIAL_TRAINING;
  onAddModule: (m: any) => void;
  onUpdateModule: (m: any) => void;
  onDeleteModule: (id: number) => void;
  onToast: (msg: string) => void;
}) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModule, setEditModule] = useState<typeof INITIAL_TRAINING[0] | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Fabric Education");
  const [duration, setDuration] = useState("15 min");
  const [points, setPoints] = useState(200);
  const [desc, setDesc] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newM = {
      id: Date.now(),
      title,
      category,
      duration,
      progress: 0,
      completed: false,
      description: desc || "Comprehensive stylist education module.",
      takeaways: ["Key brand philosophy", "Fit and styling technique", "Modifications guide"],
      points: Number(points) || 150
    };
    onAddModule(newM);
    onToast(`Added new training module: "${title}"!`);
    setTitle("");
    setDesc("");
    setAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModule) return;
    onUpdateModule(editModule);
    onToast(`Updated module: "${editModule.title}"!`);
    setEditModule(null);
  };

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Label className="text-[#737373]">Management</Label>
          <DisplayText size="medium" className="text-[26px]">Stylist Training Curriculum ({modules.length})</DisplayText>
        </div>
        <PrimaryBtn onClick={() => setAddModalOpen(true)}>
          <PlusCircle size={14} className="mr-2" />Add Module
        </PrimaryBtn>
      </div>

      <div className="bg-white border border-[#E5E5E5]">
        <div className="grid grid-cols-[1fr_150px_90px_120px_90px_90px] border-b border-[#E5E5E5] px-5 py-3 bg-[#F5F5F5]/30">
          {["Module Title", "Category", "Duration", "Stylist Progress", "Status", "Actions"].map(h => (
            <p key={h} className="font-['Red_Hat_Display'] font-bold text-[#737373] text-[10px] uppercase tracking-wider">{h}</p>
          ))}
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {modules.map(m => (
            <div key={m.id} className="grid grid-cols-[1fr_150px_90px_120px_90px_90px] px-5 py-4 items-center hover:bg-[#F5F5F5]/30 transition-colors">
              <div>
                <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[16px]">{m.title}</p>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px] mt-0.5">+{m.points} points awarded</p>
              </div>
              <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px]">{m.category}</p>
              <p className="font-['Red_Hat_Display'] text-[#1A1A1A] text-[12px]">{m.duration}</p>
              <div className="flex flex-col gap-1 pr-4">
                <div className="h-1.5 bg-[#F5F5F5] w-full overflow-hidden">
                  <div className="h-full bg-[#1A1A1A]" style={{ width: `${m.progress}%` }} />
                </div>
                <p className="font-['Red_Hat_Display'] text-[10px] text-[#737373]">{m.progress}% complete</p>
              </div>
              <div>
                <span className={`px-2 py-0.5 text-[9px] font-['Red_Hat_Display'] font-bold uppercase ${m.completed ? "bg-[#1A1A1A] text-[#FFFFFF]" : "bg-[#F5F5F5] text-[#1A1A1A]"}`}>
                  {m.completed ? "Active" : "Published"}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditModule(m)} className="p-1.5 hover:bg-[#F5F5F5] text-[#1A1A1A] cursor-pointer" title="Edit">
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete training module "${m.title}"?`)) {
                      onDeleteModule(m.id);
                      onToast(`Deleted module "${m.title}".`);
                    }
                  }}
                  className="p-1.5 hover:bg-[#F5F5F5] text-red-500 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Module Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Add Training Module</CardTitle>
              <button onClick={() => setAddModalOpen(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Module Title</Label>
                <input
                  required
                  placeholder="e.g. Advanced Crepe Alterations"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[#1A1A1A]">Category</Label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none"
                  >
                    {["Fabric Education", "Fit Education", "Styling Philosophy", "Selling Techniques", "Collection Inspiration"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-[#1A1A1A]">Duration</Label>
                  <input
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                    placeholder="15 min"
                  />
                </div>
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Points Value</Label>
                <input
                  type="number"
                  value={points}
                  onChange={e => setPoints(Number(e.target.value))}
                  className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Description</Label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="What will stylists master in this lesson?"
                  className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Publish Module</PrimaryBtn>
                <SecondaryBtn onClick={() => setAddModalOpen(false)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Module Modal */}
      {editModule && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Edit {editModule.title}</CardTitle>
              <button onClick={() => setEditModule(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Title</Label>
                <input
                  value={editModule.title}
                  onChange={e => setEditModule({ ...editModule, title: e.target.value })}
                  className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[#1A1A1A]">Duration</Label>
                  <input
                    value={editModule.duration}
                    onChange={e => setEditModule({ ...editModule, duration: e.target.value })}
                    className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                  />
                </div>
                <div>
                  <Label className="text-[#1A1A1A]">Points</Label>
                  <input
                    type="number"
                    value={editModule.points}
                    onChange={e => setEditModule({ ...editModule, points: Number(e.target.value) })}
                    className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none"
                  />
                </div>
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Description</Label>
                <textarea
                  rows={3}
                  value={editModule.description}
                  onChange={e => setEditModule({ ...editModule, description: e.target.value })}
                  className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Save Changes</PrimaryBtn>
                <SecondaryBtn onClick={() => setEditModule(null)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminAnalytics({ onToast }: { onToast: (msg: string) => void }) {
  const [range, setRange] = useState<"7D" | "30D" | "90D" | "1Y">("30D");

  const metricsMap = {
    "7D": { users: 34, logins: 112, views: 620, completions: "94%" },
    "30D": { users: 104, logins: 387, views: 2450, completions: "89%" },
    "90D": { users: 280, logins: 1140, views: 7800, completions: "86%" },
    "1Y": { users: 512, logins: 4890, views: 31200, completions: "88%" },
  };

  const currentMetrics = metricsMap[range];

  const handleExport = () => {
    const headers = ["Metric", "Value", "TimeRange"];
    const rows = [
      ["Active Stylists", currentMetrics.users, range],
      ["Stylist Logins", currentMetrics.logins, range],
      ["Catalog Views", currentMetrics.views, range],
      ["Curriculum Completion", currentMetrics.completions, range]
    ];
    exportToCSV(`nagae_analytics_${range}.csv`, headers, rows);
    onToast(`Analytics report (${range}) exported!`);
  };

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Label className="text-[#737373]">Overview</Label>
          <DisplayText size="medium" className="text-[26px]">Platform Performance</DisplayText>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-[#E5E5E5] bg-white">
            {(["7D", "30D", "90D", "1Y"] as const).map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-[11px] font-['Red_Hat_Display'] font-semibold transition-colors cursor-pointer ${range === r ? "bg-[#1A1A1A] text-[#FFFFFF]" : "text-[#737373] hover:text-[#1A1A1A]"}`}
              >
                {r}
              </button>
            ))}
          </div>
          <SecondaryBtn onClick={handleExport} className="h-9 px-3 text-[11px]">
            <Download size={13} className="mr-1.5" />Export Report
          </SecondaryBtn>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard value={currentMetrics.users} label="Active Stylists" />
        <StatCard value={currentMetrics.logins} label="Monthly Logins" />
        <StatCard value={currentMetrics.views} label="Catalog Style Views" />
        <StatCard value={currentMetrics.completions} label="Quiz Passing Rate" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-[#E5E5E5] p-5">
          <Label className="text-[#1A1A1A] mb-4 block">Stylist Activity & Growth</Label>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={analyticsLineData}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "Red Hat Display", fill: "#737373" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: "Red Hat Display", fill: "#737373" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ border: "1px solid #E5E5E5", borderRadius: 0, fontFamily: "Red Hat Display", fontSize: 12 }} />
              <Line type="monotone" dataKey="users" stroke="#1A1A1A" strokeWidth={2} dot={{ fill: "#1A1A1A", r: 3 }} name="Active Stylists" />
              <Line type="monotone" dataKey="logins" stroke="#737373" strokeWidth={1.5} dot={false} name="Logins" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-[#E5E5E5] p-5">
          <Label className="text-[#1A1A1A] mb-4 block">Most Viewed Showroom Styles</Label>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={productViewData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11, fontFamily: "Red Hat Display", fill: "#737373" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fontFamily: "Red Hat Display", fill: "#1A1A1A" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={{ border: "1px solid #E5E5E5", borderRadius: 0, fontFamily: "Red Hat Display", fontSize: 12 }} />
              <Bar dataKey="views" fill="#1A1A1A" barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function AdminUsers({
  users, onAddUser, onUpdateUser, onToast
}: {
  users: typeof INITIAL_ADMIN_USERS;
  onAddUser: (u: any) => void;
  onUpdateUser: (u: any) => void;
  onToast: (msg: string) => void;
}) {
  const [addModal, setAddModal] = useState(false);
  const [editUser, setEditUser] = useState<typeof INITIAL_ADMIN_USERS[0] | null>(null);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Stylist");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newU = {
      id: Date.now(),
      name,
      store: store || "Independent Boutique",
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@store.com`,
      role,
      status: "Active",
      lastLogin: "Just now",
      points: 500,
      level: "Expert 1"
    };
    onAddUser(newU);
    onToast(`Added user: ${name}!`);
    setName("");
    setStore("");
    setEmail("");
    setAddModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    onUpdateUser(editUser);
    onToast(`Updated user details for ${editUser.name}!`);
    setEditUser(null);
  };

  const toggleStatus = (user: typeof INITIAL_ADMIN_USERS[0]) => {
    const updated = { ...user, status: user.status === "Active" ? "Inactive" : "Active" };
    onUpdateUser(updated);
    onToast(`${user.name} is now ${updated.status}.`);
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.store.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Label className="text-[#737373]">Team & Partners</Label>
          <DisplayText size="medium" className="text-[26px]">Retailers & Stylists ({users.length})</DisplayText>
        </div>
        <PrimaryBtn onClick={() => setAddModal(true)}>
          <PlusCircle size={14} className="mr-2" />Add User
        </PrimaryBtn>
      </div>

      <div className="bg-white border border-[#E5E5E5] h-11 flex items-center px-3 gap-2 mb-4 focus-within:border-[#1A1A1A]">
        <Search size={16} className="text-[#737373]" />
        <input
          placeholder="Search users by name, boutique, or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-[13px] outline-none"
        />
      </div>

      <div className="bg-white border border-[#E5E5E5]">
        <div className="grid grid-cols-[1.5fr_1.5fr_100px_90px_100px_100px] border-b border-[#E5E5E5] px-5 py-3 bg-[#F5F5F5]/30">
          {["User / Email", "Store Location", "Role", "Status", "Points", "Actions"].map(h => (
            <p key={h} className="font-['Red_Hat_Display'] font-bold text-[#737373] text-[10px] uppercase tracking-wider">{h}</p>
          ))}
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {filtered.map(u => (
            <div key={u.id} className="grid grid-cols-[1.5fr_1.5fr_100px_90px_100px_100px] px-5 py-3.5 items-center hover:bg-[#F5F5F5]/30 transition-colors">
              <div>
                <p className="font-['Red_Hat_Display'] font-semibold text-[#1A1A1A] text-[13px]">{u.name}</p>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px]">{u.email}</p>
              </div>
              <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px]">{u.store}</p>
              <p className="font-['Red_Hat_Display'] text-[#1A1A1A] text-[12px]">{u.role}</p>
              <div>
                <button
                  onClick={() => toggleStatus(u)}
                  className={`px-2 py-0.5 text-[9px] font-['Red_Hat_Display'] font-bold uppercase transition-colors cursor-pointer ${u.status === "Active" ? "bg-[#1A1A1A] text-[#FFFFFF]" : "bg-[#F5F5F5] text-[#737373]"}`}
                >
                  {u.status}
                </button>
              </div>
              <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[16px]">{u.points.toLocaleString()} pts</p>
              <div className="flex gap-2">
                <button onClick={() => setEditUser(u)} className="p-1 hover:bg-[#F5F5F5] text-[#1A1A1A] cursor-pointer" title="Edit">
                  <Edit2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      {addModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Invite New Stylist</CardTitle>
              <button onClick={() => setAddModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Full Name</Label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mia Johansson" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Store / Boutique</Label>
                <input value={store} onChange={e => setStore(e.target.value)} placeholder="e.g. Ivory Bridal Lounge" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Email</Label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="mia@ivorybridal.com" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Role</Label>
                <select value={role} onChange={e => setRole(e.target.value)} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                  <option value="Stylist">Stylist</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Send Invitation</PrimaryBtn>
                <SecondaryBtn onClick={() => setAddModal(false)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Edit User</CardTitle>
              <button onClick={() => setEditUser(null)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Full Name</Label>
                <input value={editUser.name} onChange={e => setEditUser({ ...editUser, name: e.target.value })} className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Store</Label>
                <input value={editUser.store} onChange={e => setEditUser({ ...editUser, store: e.target.value })} className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Role</Label>
                <select value={editUser.role} onChange={e => setEditUser({ ...editUser, role: e.target.value })} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                  <option value="Stylist">Stylist</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Save Details</PrimaryBtn>
                <SecondaryBtn onClick={() => setEditUser(null)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminCommunications({
  onBroadcastNotification, onToast
}: {
  onBroadcastNotification: (title: string, body: string, audience: string) => void;
  onToast: (msg: string) => void;
}) {
  const [audience, setAudience] = useState("All Users");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const audienceOptions = ["All Users", "Specific Stores", "Top Performers", "Inactive Users"];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    onBroadcastNotification(title, message, audience);
    onToast(`Notification broadcast to ${audience}!`);
    setTitle("");
    setMessage("");
  };

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="mb-6">
        <Label className="text-[#737373]">Broadcast</Label>
        <DisplayText size="medium" className="text-[26px]">Send Stylist Notification</DisplayText>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-4xl">
        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-[#1A1A1A]">Notification Title *</Label>
            <div className="border border-[#E5E5E5] h-11 flex items-center px-3 focus-within:border-[#1A1A1A]">
              <input
                required
                placeholder="e.g. New Spring Collection Drop!"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-transparent text-[13px] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[#1A1A1A]">Message Body *</Label>
            <div className="border border-[#E5E5E5] focus-within:border-[#1A1A1A]">
              <textarea
                required
                rows={4}
                placeholder="Write message copy..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full p-3 text-[13px] outline-none resize-none bg-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[#1A1A1A]">Target Audience</Label>
            <div className="flex flex-wrap gap-2">
              {audienceOptions.map(opt => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setAudience(opt)}
                  className={`px-3 py-1.5 text-[11px] font-['Red_Hat_Display'] uppercase font-medium border transition-colors cursor-pointer ${audience === opt ? "bg-[#1A1A1A] text-[#FFFFFF] border-[#1A1A1A]" : "border-[#E5E5E5] text-[#737373]"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <PrimaryBtn className="w-full mt-2">
            <Send size={15} className="mr-2" />Broadcast Notification
          </PrimaryBtn>
        </form>

        <div className="flex flex-col gap-3">
          <Label className="text-[#1A1A1A]">Live Preview on Stylist App</Label>
          <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-5 shadow-sm">
            <div className="bg-white border border-[#E5E5E5] p-4 shadow-sm flex items-start gap-3">
              <span className="text-xl">✨</span>
              <div className="flex-1">
                <p className="font-['Red_Hat_Display'] text-[10px] text-[#737373] uppercase tracking-wider">NAGAE Studio · Just now</p>
                <p className="font-['Red_Hat_Display'] font-bold text-[#1A1A1A] text-[14px] mt-0.5">{title || "Your Title Appears Here"}</p>
                <p className="font-['Inter'] text-[#737373] text-[12px] mt-1 leading-relaxed">{message || "The notification body will preview here in real time for stylists."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminIntelligence() {
  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="mb-6">
        <Label className="text-[#737373]">Artificial Intelligence</Label>
        <DisplayText size="medium" className="text-[26px]">NAGAE AI Knowledge Base</DisplayText>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard value="487" label="Stylist Questions Asked" />
        <StatCard value="98.2%" label="Resolution Confidence" />
        <StatCard value="4.9 / 5" label="Helpfulness Rating" />
      </div>

      <div className="bg-white border border-[#E5E5E5] p-6 mb-6">
        <Label className="text-[#1A1A1A] mb-3 block">Top Question Themes This Month</Label>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={aiQuestionData}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "Red Hat Display", fill: "#737373" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: "Red Hat Display", fill: "#737373" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ border: "1px solid #E5E5E5", borderRadius: 0, fontFamily: "Red Hat Display", fontSize: 12 }} />
            <Bar dataKey="count" fill="#1A1A1A" barSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AdminDashboard({
  onNavigateTab
}: {
  onNavigateTab: (tab: string) => void;
}) {
  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Label className="text-[#737373]">Management Overview</Label>
          <DisplayText size="medium" className="text-[28px]">NAGAE Studio Operations</DisplayText>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard value="10" label="Active Gown Styles" />
        <StatCard value="6" label="Education Modules" />
        <StatCard value="15" label="Authorized Boutiques" />
        <StatCard value="$482K" label="YTD Showroom Orders" />
      </div>

      {/* Quick Action Shortcuts */}
      <div className="mb-8">
        <Label className="text-[#1A1A1A] mb-3 block">Quick Actions</Label>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Add New Product", icon: PlusCircle, tab: "products" },
            { label: "Curriculum Manager", icon: BookOpen, tab: "training" },
            { label: "Broadcast Announcement", icon: Megaphone, tab: "comms" },
            { label: "Platform Analytics", icon: BarChart2, tab: "analytics" },
          ].map(action => (
            <button
              key={action.label}
              onClick={() => onNavigateTab(action.tab)}
              className="bg-white border border-[#E5E5E5] p-4 flex items-center gap-3 hover:border-[#1A1A1A] transition-colors text-left cursor-pointer group"
            >
              <action.icon size={18} className="text-[#1A1A1A] group-hover:scale-110 transition-transform" />
              <span className="font-['Red_Hat_Display'] font-semibold text-[12px] uppercase text-[#1A1A1A]">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminPortal({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  trainingModules,
  onAddModule,
  onUpdateModule,
  onDeleteModule,
  onBroadcastNotification,
  onToast
}: {
  products: typeof INITIAL_PRODUCTS;
  onAddProduct: (p: any) => void;
  onUpdateProduct: (p: any) => void;
  onDeleteProduct: (id: number) => void;
  trainingModules: typeof INITIAL_TRAINING;
  onAddModule: (m: any) => void;
  onUpdateModule: (m: any) => void;
  onDeleteModule: (id: number) => void;
  onBroadcastNotification: (title: string, body: string, audience: string) => void;
  onToast: (msg: string) => void;
}) {
  const [tab, setTab] = useState("dashboard");
  const [users, setUsers] = useState(INITIAL_ADMIN_USERS);

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
    { id: "products", icon: ShoppingBag, label: "Products" },
    { id: "training", icon: BookOpen, label: "Training" },
    { id: "analytics", icon: BarChart2, label: "Analytics" },
    { id: "users", icon: Users, label: "Retailers" },
    { id: "comms", icon: Megaphone, label: "Broadcasts" },
    { id: "ai", icon: MessageSquare, label: "NAGAE AI" },
  ];

  return (
    <div className="flex h-full bg-[#FFFFFF]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#E5E5E5] bg-white flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-[#E5E5E5]">
            <CardTitle className="text-[20px]">NAGAE Studio</CardTitle>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[10px] uppercase tracking-wider mt-0.5">Admin Management</p>
          </div>
          <nav className="p-3 flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 text-[12px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${tab === item.id ? "bg-[#1A1A1A] text-[#FFFFFF]" : "text-[#737373] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"}`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-[#E5E5E5] text-[11px] font-['Red_Hat_Display'] text-[#737373]">
          Connected: Production DB
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {tab === "dashboard" && <AdminDashboard onNavigateTab={setTab} />}
        {tab === "products" && (
          <AdminProducts
            products={products}
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onToast={onToast}
          />
        )}
        {tab === "training" && (
          <AdminTraining
            modules={trainingModules}
            onAddModule={onAddModule}
            onUpdateModule={onUpdateModule}
            onDeleteModule={onDeleteModule}
            onToast={onToast}
          />
        )}
        {tab === "analytics" && <AdminAnalytics onToast={onToast} />}
        {tab === "users" && (
          <AdminUsers
            users={users}
            onAddUser={u => setUsers([u, ...users])}
            onUpdateUser={u => setUsers(users.map(x => x.id === u.id ? u : x))}
            onToast={onToast}
          />
        )}
        {tab === "comms" && (
          <AdminCommunications
            onBroadcastNotification={onBroadcastNotification}
            onToast={onToast}
          />
        )}
        {tab === "ai" && <AdminIntelligence />}
      </div>
    </div>
  );
}


// ─── CRM SYSTEM ───────────────────────────────────────────────────────────────

const INITIAL_CRM_ACCOUNTS = [
  { id: 1, name: "Bella Bridal", city: "Minneapolis, MN", territory: "Midwest", tier: 1, status: "High Growth", health: 5, lastContact: "2 days ago", nextFollowUp: "Jul 1", ytd: "$74,200", lastOrder: "Jun 12, 2026" },
  { id: 2, name: "Pearl Bridal House", city: "Toronto, ON", territory: "Canada", tier: 1, status: "High Growth", health: 5, lastContact: "Yesterday", nextFollowUp: "Jul 3", ytd: "$68,400", lastOrder: "Jun 18, 2026" },
  { id: 3, name: "Ivory & Beau", city: "Savannah, GA", territory: "Southeast", tier: 2, status: "Stable", health: 4, lastContact: "1 week ago", nextFollowUp: "Jul 8", ytd: "$42,100", lastOrder: "May 28, 2026" },
  { id: 4, name: "The Dress Theory", city: "Seattle, WA", territory: "West", tier: 1, status: "High Growth", health: 5, lastContact: "3 days ago", nextFollowUp: "Jul 2", ytd: "$81,900", lastOrder: "Jun 20, 2026" },
  { id: 5, name: "Grace & Lace", city: "Chicago, IL", territory: "Midwest", tier: 2, status: "At Risk", health: 2, lastContact: "Today", nextFollowUp: "Today", ytd: "$31,800", lastOrder: "Apr 14, 2026" },
  { id: 6, name: "Blush Bridal Lounge", city: "Austin, TX", territory: "South", tier: 2, status: "Stable", health: 4, lastContact: "4 days ago", nextFollowUp: "Jul 6", ytd: "$48,600", lastOrder: "Jun 5, 2026" },
  { id: 7, name: "Something Blue", city: "San Francisco, CA", territory: "West", tier: 3, status: "Stable", health: 3, lastContact: "2 weeks ago", nextFollowUp: "Jul 15", ytd: "$22,400", lastOrder: "May 10, 2026" },
  { id: 8, name: "Modern Bride Studio", city: "Denver, CO", territory: "West", tier: 0, status: "Negotiating", health: 3, lastContact: "Yesterday", nextFollowUp: "Jul 7", ytd: "$0", lastOrder: "None" },
  { id: 9, name: "Magnolia Bridal", city: "Charleston, SC", territory: "Southeast", tier: 3, status: "Stable", health: 4, lastContact: "1 week ago", nextFollowUp: "Jul 12", ytd: "$19,800", lastOrder: "Jun 2, 2026" },
  { id: 10, name: "Silk & White", city: "Boston, MA", territory: "Northeast", tier: 0, status: "Sample Sent", health: 4, lastContact: "Jun 22", nextFollowUp: "Jul 5", ytd: "$0", lastOrder: "None" },
  { id: 11, name: "Forever & Always", city: "Phoenix, AZ", territory: "Southwest", tier: 3, status: "At Risk", health: 2, lastContact: "3 weeks ago", nextFollowUp: "Jun 25", ytd: "$14,200", lastOrder: "Mar 30, 2026" },
  { id: 12, name: "Chic Bridal Atelier", city: "New York, NY", territory: "Northeast", tier: 0, status: "Prospecting", health: 3, lastContact: "Jun 18", nextFollowUp: "Jul 9", ytd: "$0", lastOrder: "None" },
  { id: 13, name: "Lace & Bloom", city: "Portland, OR", territory: "West", tier: 2, status: "Expansion Opportunity", health: 4, lastContact: "5 days ago", nextFollowUp: "Jul 4", ytd: "$52,300", lastOrder: "Jun 8, 2026" },
  { id: 14, name: "Velvet Bride", city: "Nashville, TN", territory: "Southeast", tier: 2, status: "Expansion Opportunity", health: 4, lastContact: "3 days ago", nextFollowUp: "Jul 3", ytd: "$45,700", lastOrder: "Jun 14, 2026" },
  { id: 15, name: "L'Avenir Bridal", city: "Montreal, QC", territory: "Canada", tier: 0, status: "Prospecting", health: 3, lastContact: "Jun 15", nextFollowUp: "Jul 10", ytd: "$0", lastOrder: "None" },
];

function HealthDots({ score }: { score: number }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          className={`w-2 h-2 ${i <= score ? (score >= 4 ? "bg-[#1A1A1A]" : score === 3 ? "bg-[#737373]" : "bg-red-500") : "bg-[#E5E5E5]"}`}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "High Growth": "bg-[#1A1A1A] text-[#FFFFFF]",
    "Stable": "bg-[#F5F5F5] text-[#1A1A1A]",
    "At Risk": "bg-red-50 text-red-600 border border-red-200",
    "Expansion Opportunity": "bg-[#1A1A1A] text-[#FFFFFF]",
    "Prospecting": "border border-[#E5E5E5] text-[#737373]",
    "Sample Sent": "bg-[#F5F5F5] text-[#1A1A1A]",
    "Negotiating": "bg-[#1A1A1A] text-[#FFFFFF]",
  };
  return (
    <span className={`px-2 py-0.5 text-[9px] font-['Red_Hat_Display'] font-bold uppercase tracking-wider ${styles[status] ?? "bg-[#F5F5F5] text-[#1A1A1A]"}`}>
      {status}
    </span>
  );
}

function AccountList({
  accounts, onSelectAccount, onAddAccount, onToast
}: {
  accounts: typeof INITIAL_CRM_ACCOUNTS;
  onSelectAccount: (a: typeof INITIAL_CRM_ACCOUNTS[0]) => void;
  onAddAccount: (a: any) => void;
  onToast: (msg: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterTier, setFilterTier] = useState("All");
  const [addModal, setAddModal] = useState(false);

  // Add Account form
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [territory, setTerritory] = useState("Midwest");
  const [tier, setTier] = useState("1");
  const [status, setStatus] = useState("High Growth");

  const statuses = ["All", "High Growth", "Stable", "At Risk", "Expansion Opportunity", "Prospecting", "Sample Sent", "Negotiating"];

  const filtered = accounts.filter(a =>
    (filterStatus === "All" || a.status === filterStatus) &&
    (filterTier === "All" || (filterTier === "Tier 1" && a.tier === 1) || (filterTier === "Tier 2" && a.tier === 2) || (filterTier === "Tier 3" && a.tier === 3) || (filterTier === "Pipeline" && a.tier === 0)) &&
    (search === "" || a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase()) || a.territory.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newAcc = {
      id: Date.now(),
      name,
      city: city || "New York, NY",
      territory,
      tier: Number(tier),
      status,
      health: status === "At Risk" ? 2 : 5,
      lastContact: "Just now",
      nextFollowUp: "Jul 10",
      ytd: "$0",
      lastOrder: "None"
    };
    onAddAccount(newAcc);
    onToast(`Added account "${name}" to CRM!`);
    setName("");
    setCity("");
    setAddModal(false);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Store Name", "City", "Territory", "Tier", "Status", "Health", "YTD Sales", "Last Contact"];
    const rows = accounts.map(a => [
      a.id, a.name, a.city, a.territory, a.tier === 0 ? "Pipeline" : `Tier ${a.tier}`, a.status, `${a.health}/5`, a.ytd, a.lastContact
    ]);
    exportToCSV("nagae_crm_accounts.csv", headers, rows);
    onToast("Accounts exported to CSV!");
  };

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <Label className="text-[#737373]">Sales Intelligence</Label>
          <DisplayText size="medium" className="text-[26px]">All Retailer Accounts ({accounts.length})</DisplayText>
        </div>
        <div className="flex gap-2">
          <SecondaryBtn onClick={handleExportCSV}>
            <Download size={14} className="mr-2" />Export CSV
          </SecondaryBtn>
          <PrimaryBtn onClick={() => setAddModal(true)}>
            <PlusCircle size={14} className="mr-2" />Add Account
          </PrimaryBtn>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white border border-[#E5E5E5] h-11 flex items-center px-3 gap-2 focus-within:border-[#1A1A1A]">
          <Search size={15} className="text-[#737373]" />
          <input
            placeholder="Search accounts or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[13px] outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-white border border-[#E5E5E5] h-11 px-3 text-[12px] font-['Red_Hat_Display'] outline-none"
        >
          {statuses.map(s => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
        </select>
        <select
          value={filterTier}
          onChange={e => setFilterTier(e.target.value)}
          className="bg-white border border-[#E5E5E5] h-11 px-3 text-[12px] font-['Red_Hat_Display'] outline-none"
        >
          {["All", "Tier 1", "Tier 2", "Tier 3", "Pipeline"].map(t => <option key={t} value={t}>{t === "All" ? "All Tiers" : t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E5E5]">
        <div className="grid grid-cols-[1.5fr_120px_130px_90px_110px_90px_60px] border-b border-[#E5E5E5] px-5 py-3 bg-[#F5F5F5]/30">
          {["Store / Boutique", "Territory", "Status", "Health", "Last Contact", "YTD Sales", ""].map(h => (
            <p key={h} className="font-['Red_Hat_Display'] font-bold text-[#737373] text-[10px] uppercase tracking-wider">{h}</p>
          ))}
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {filtered.map(a => (
            <div
              key={a.id}
              onClick={() => onSelectAccount(a)}
              className="grid grid-cols-[1.5fr_120px_130px_90px_110px_90px_60px] px-5 py-3.5 items-center hover:bg-[#F5F5F5]/40 transition-colors cursor-pointer group"
            >
              <div>
                <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[16px] group-hover:underline">{a.name}</p>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px]">{a.city}</p>
              </div>
              <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px]">{a.territory}</p>
              <div><StatusBadge status={a.status} /></div>
              <div><HealthDots score={a.health} /></div>
              <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px]">{a.lastContact}</p>
              <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[15px] font-semibold">{a.ytd}</p>
              <div className="text-right">
                <ChevronRight size={16} className="text-[#737373] group-hover:text-[#1A1A1A] inline" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Account Modal */}
      {addModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Add Retailer Account</CardTitle>
              <button onClick={() => setAddModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateAccount} className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Boutique Name</Label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ivory Atelier" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">City, State</Label>
                <input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Boston, MA" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[#1A1A1A]">Territory</Label>
                  <select value={territory} onChange={e => setTerritory(e.target.value)} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                    {["Midwest", "Northeast", "Southeast", "West", "South", "Canada"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-[#1A1A1A]">Tier</Label>
                  <select value={tier} onChange={e => setTier(e.target.value)} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                    <option value="1">Tier 1</option>
                    <option value="2">Tier 2</option>
                    <option value="3">Tier 3</option>
                    <option value="0">Pipeline</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Account Status</Label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                  {["High Growth", "Stable", "At Risk", "Expansion Opportunity", "Prospecting", "Sample Sent", "Negotiating"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Create Account</PrimaryBtn>
                <SecondaryBtn onClick={() => setAddModal(false)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AccountDetail({
  account, onBack, onToast
}: {
  account: typeof INITIAL_CRM_ACCOUNTS[0];
  onBack: () => void;
  onToast: (msg: string) => void;
}) {
  const [tab, setTab] = useState("Overview");
  const [activityModal, setActivityModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // Commitments state
  const [commitments, setCommitments] = useState([
    { id: 1, commitment: "Send swatches for Sloan Fitted Mikado", due: "Nov 2025", status: "Completed" },
    { id: 2, commitment: "Provide curve sizing timeline update", due: "Jul 2026", status: "Open" },
    { id: 3, commitment: "Send Spring 2026 lookbook", due: "Jul 5", status: "Open" },
  ]);

  // Activity timeline state
  const [activities, setActivities] = useState([
    { id: 1, type: "Phone Call", date: "Today", notes: "Discussed Spring orders and Sloan samples request." },
    { id: 2, type: "Market Meeting", date: "Oct 15, 2025", notes: "Met with buyer at bridal booth. Discussed fitted gowns." },
  ]);

  const [actType, setActType] = useState("Phone Call");
  const [actNotes, setActNotes] = useState("");

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actNotes.trim()) return;
    setActivities([{ id: Date.now(), type: actType, date: "Just now", notes: actNotes }, ...activities]);
    onToast(`Logged ${actType.toLowerCase()} with ${account.name}!`);
    setActNotes("");
    setActivityModal(false);
  };

  const toggleCommitment = (id: number) => {
    setCommitments(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === "Completed" ? "Open" : "Completed";
        onToast(`Commitment marked as ${nextStatus}!`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const tabs = ["Overview", "Commitments", "Activity Timeline"];

  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      {/* Account header */}
      <div className="border-b border-[#E5E5E5] px-8 py-5 shrink-0 bg-white">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-1 cursor-pointer"><ArrowLeft size={20} className="text-[#1A1A1A]" /></button>
            <div>
              <div className="flex items-center gap-3">
                <CardTitle className="text-[28px]">{account.name}</CardTitle>
                <StatusBadge status={account.status} />
              </div>
              <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px] mt-0.5">{account.city} · {account.territory} · {account.tier ? `Tier ${account.tier}` : "Pipeline"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <SecondaryBtn onClick={() => setEditModal(true)} className="h-9 px-3 text-[11px]">
              <Edit2 size={13} className="mr-1.5" />Edit Account
            </SecondaryBtn>
            <PrimaryBtn onClick={() => setActivityModal(true)} className="h-9 px-3 text-[11px]">
              <Activity size={13} className="mr-1.5" />Log Activity
            </PrimaryBtn>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[12px] font-['Red_Hat_Display'] text-[#737373]">
          <span className="flex items-center gap-1.5"><Clock size={13} />Next Follow-up: {account.nextFollowUp}</span>
          <span className="flex items-center gap-1.5"><TrendingUp size={13} />YTD Sales: {account.ytd}</span>
          <div className="flex items-center gap-2">
            <span>Account Health:</span>
            <HealthDots score={account.health} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E5E5E5] px-8 bg-[#FFFFFF]">
        <div className="flex gap-4">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-[11px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${tab === t ? "border-[#1A1A1A] text-[#1A1A1A]" : "border-transparent text-[#737373]"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {tab === "Overview" && (
          <div className="grid grid-cols-2 gap-8 max-w-4xl">
            <div className="border border-[#E5E5E5] p-5">
              <Label className="text-[#1A1A1A] mb-3 block">Boutique Information</Label>
              <div className="divide-y divide-[#E5E5E5]">
                {[
                  { l: "Store Name", v: account.name },
                  { l: "Location", v: account.city },
                  { l: "Territory", v: account.territory },
                  { l: "Assigned Rep", v: "Sarah Mitchell (Regional Lead)" },
                  { l: "Last Showroom Order", v: account.lastOrder },
                ].map(item => (
                  <div key={item.l} className="flex justify-between py-2 text-[12px]">
                    <span className="text-[#737373] font-['Red_Hat_Display']">{item.l}</span>
                    <span className="text-[#1A1A1A] font-semibold font-['Red_Hat_Display']">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#E5E5E5] p-5">
              <Label className="text-[#1A1A1A] mb-3 block">Account Health Strategy</Label>
              <p className="font-['Inter'] text-[#737373] text-[13px] leading-relaxed mb-4">
                Partner boutique since 2019. Known for high customer engagement and consistent Sloan reorders.
                Next strategic initiative is expanding their curve assortment for Spring.
              </p>
              <PrimaryBtn onClick={() => setActivityModal(true)} className="h-9 text-[11px] w-full">
                Schedule Market Visit
              </PrimaryBtn>
            </div>
          </div>
        )}

        {tab === "Commitments" && (
          <div className="max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-[#1A1A1A]">Team Commitments & Action Items</Label>
              <span className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">Click to toggle completion</span>
            </div>
            <div className="border border-[#E5E5E5] divide-y divide-[#E5E5E5] bg-white">
              {commitments.map(c => {
                const isDone = c.status === "Completed";
                return (
                  <div
                    key={c.id}
                    onClick={() => toggleCommitment(c.id)}
                    className="p-4 flex items-center justify-between hover:bg-[#F5F5F5] transition-colors cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 border flex items-center justify-center ${isDone ? "bg-[#1A1A1A] border-[#1A1A1A]" : "border-[#E5E5E5]"}`}>
                        {isDone && <Check size={11} className="text-[#FFFFFF]" />}
                      </div>
                      <div>
                        <p className={`font-['Red_Hat_Display'] text-[13px] ${isDone ? "line-through text-[#737373]" : "text-[#1A1A1A] font-medium"}`}>
                          {c.commitment}
                        </p>
                        <p className="font-['Red_Hat_Display'] text-[10px] text-[#737373]">Due: {c.due}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-['Red_Hat_Display'] font-bold uppercase ${isDone ? "bg-[#F5F5F5] text-[#1A1A1A]" : "bg-[#1A1A1A] text-[#FFFFFF]"}`}>
                      {c.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "Activity Timeline" && (
          <div className="max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-[#1A1A1A]">Logged Touchpoints & Notes</Label>
              <SecondaryBtn onClick={() => setActivityModal(true)} className="h-8 px-3 text-[10px]">
                + Add Entry
              </SecondaryBtn>
            </div>
            <div className="border border-[#E5E5E5] divide-y divide-[#E5E5E5] bg-white">
              {activities.map(act => (
                <div key={act.id} className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-['Red_Hat_Display'] font-bold text-[#1A1A1A] text-[13px]">{act.type}</span>
                    <span className="font-['Red_Hat_Display'] text-[#737373] text-[11px]">{act.date}</span>
                  </div>
                  <p className="font-['Inter'] text-[#737373] text-[13px] leading-relaxed">{act.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Log Activity Modal */}
      {activityModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Log Activity</CardTitle>
              <button onClick={() => setActivityModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleLogActivity} className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Activity Type</Label>
                <select value={actType} onChange={e => setActType(e.target.value)} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                  <option value="Phone Call">Phone Call</option>
                  <option value="Market Meeting">Market Meeting</option>
                  <option value="Trunk Show Check-in">Trunk Show Check-in</option>
                  <option value="Email Follow-up">Email Follow-up</option>
                </select>
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Discussion Notes</Label>
                <textarea
                  required
                  rows={4}
                  value={actNotes}
                  onChange={e => setActNotes(e.target.value)}
                  placeholder="Key takeaways, orders discussed, buyer feedback..."
                  className="w-full border border-[#E5E5E5] p-2.5 text-[13px] outline-none resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Save Activity</PrimaryBtn>
                <SecondaryBtn onClick={() => setActivityModal(false)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Account Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Edit Account</CardTitle>
              <button onClick={() => setEditModal(false)}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Store Name</Label>
                <input defaultValue={account.name} className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Territory</Label>
                <select defaultValue={account.territory} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                  {["Midwest", "Canada", "Southeast", "West", "South", "Northeast", "Southwest"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <PrimaryBtn onClick={() => { setEditModal(false); onToast("Account details updated!"); }} className="w-full mt-2 h-10 text-[11px]">
                Save Changes
              </PrimaryBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CRMPipeline({
  accounts, onUpdateAccountStage, onToast
}: {
  accounts: typeof INITIAL_CRM_ACCOUNTS;
  onUpdateAccountStage: (id: number, nextStage: string) => void;
  onToast: (msg: string) => void;
}) {
  const [addPipelineModal, setAddPipelineModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newStage, setNewStage] = useState("Prospecting");

  const stageDefs = [
    { label: "Prospecting" },
    { label: "Initial Contact" },
    { label: "Sample Sent" },
    { label: "Negotiating" },
    { label: "Won" },
  ];

  const handleAdvance = (accId: number, currentStage: string) => {
    const idx = stageDefs.findIndex(s => s.label === currentStage);
    if (idx < stageDefs.length - 1) {
      const next = stageDefs[idx + 1].label;
      onUpdateAccountStage(accId, next);
      onToast(`Moved account to "${next}"!`);
    }
  };

  const handleBack = (accId: number, currentStage: string) => {
    const idx = stageDefs.findIndex(s => s.label === currentStage);
    if (idx > 0) {
      const prev = stageDefs[idx - 1].label;
      onUpdateAccountStage(accId, prev);
      onToast(`Moved account back to "${prev}".`);
    }
  };

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Label className="text-[#737373]">Sales Pipeline</Label>
          <DisplayText size="medium" className="text-[26px]">Boutique Deal Pipeline</DisplayText>
        </div>
        <PrimaryBtn onClick={() => setAddPipelineModal(true)}>
          <PlusCircle size={14} className="mr-2" />Add to Pipeline
        </PrimaryBtn>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6">
        {stageDefs.map(stage => {
          const stageAccounts = accounts.filter(a =>
            stage.label === "Won"
              ? (a.status === "High Growth" || a.status === "Won") && a.tier > 0
              : a.status === stage.label
          );

          return (
            <div key={stage.label} className="w-64 shrink-0 bg-[#FFFFFF] border border-[#E5E5E5] flex flex-col">
              <div className="bg-[#1A1A1A] p-3 flex justify-between items-center">
                <span className="font-['Red_Hat_Display'] font-bold text-[11px] uppercase tracking-wider text-[#FFFFFF]">{stage.label}</span>
                <span className="bg-white/20 text-[#FFFFFF] text-[10px] font-bold px-1.5 py-0.5 rounded">{stageAccounts.length}</span>
              </div>
              <div className="p-3 flex flex-col gap-2.5 flex-1 min-h-[300px]">
                {stageAccounts.map(a => (
                  <div key={a.id} className="bg-white border border-[#E5E5E5] p-3 hover:border-[#1A1A1A] transition-colors shadow-sm">
                    <p className="font-['Instrument_Serif'] text-[#1A1A1A] text-[16px]">{a.name}</p>
                    <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px]">{a.city}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5E5E5] text-[10px]">
                      <button
                        onClick={() => handleBack(a.id, stage.label)}
                        disabled={stage.label === "Prospecting"}
                        className="text-[#737373] hover:text-[#1A1A1A] disabled:opacity-30 cursor-pointer font-bold"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={() => handleAdvance(a.id, stage.label)}
                        disabled={stage.label === "Won"}
                        className="text-[#1A1A1A] hover:underline disabled:opacity-30 cursor-pointer font-bold"
                      >
                        Advance →
                      </button>
                    </div>
                  </div>
                ))}
                {stageAccounts.length === 0 && (
                  <div className="border border-dashed border-[#E5E5E5] p-6 text-center text-[#737373] text-[11px] font-['Red_Hat_Display']">
                    No active deals in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Pipeline Modal */}
      {addPipelineModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">Add to Deal Pipeline</CardTitle>
              <button onClick={() => setAddPipelineModal(false)}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Store Name</Label>
                <input required value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Modern Veil Boutique" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">City</Label>
                <input value={newCity} onChange={e => setNewCity(e.target.value)} placeholder="e.g. Seattle, WA" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Starting Stage</Label>
                <select value={newStage} onChange={e => setNewStage(e.target.value)} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                  {stageDefs.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                </select>
              </div>
              <PrimaryBtn
                onClick={() => {
                  if (!newName.trim()) return;
                  setAddPipelineModal(false);
                  onToast(`Added "${newName}" to ${newStage}!`);
                  setNewName("");
                  setNewCity("");
                }}
                className="w-full mt-2 h-10 text-[11px]"
              >
                Add Deal
              </PrimaryBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CRMTasks({
  tasks, onToggleTask, onAddTask, onToast
}: {
  tasks: typeof INITIAL_TASKS;
  onToggleTask: (id: number) => void;
  onAddTask: (t: any) => void;
  onToast: (msg: string) => void;
}) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [modalOpen, setModalOpen] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [account, setAccount] = useState("Bella Bridal");
  const [due, setDue] = useState("Today");
  const [priority, setPriority] = useState("High");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    const newT = {
      id: Date.now(),
      account,
      task: taskName,
      due,
      priority,
      assigned: "You",
      overdue: false,
      completed: false
    };
    onAddTask(newT);
    onToast(`Added task for ${account}!`);
    setTaskName("");
    setModalOpen(false);
  };

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Label className="text-[#737373]">Follow-ups</Label>
          <DisplayText size="medium" className="text-[26px]">Tasks & Action Items ({tasks.filter(t => !t.completed).length} open)</DisplayText>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-[#E5E5E5] bg-white">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 text-[11px] font-['Red_Hat_Display'] font-semibold transition-colors cursor-pointer ${view === "list" ? "bg-[#1A1A1A] text-[#FFFFFF]" : "text-[#737373]"}`}
            >
              List View
            </button>
            <button
              onClick={() => setView("calendar")}
              className={`px-3 py-1.5 text-[11px] font-['Red_Hat_Display'] font-semibold transition-colors cursor-pointer ${view === "calendar" ? "bg-[#1A1A1A] text-[#FFFFFF]" : "text-[#737373]"}`}
            >
              Calendar View
            </button>
          </div>
          <PrimaryBtn onClick={() => setModalOpen(true)}>
            <PlusCircle size={14} className="mr-2" />Add Task
          </PrimaryBtn>
        </div>
      </div>

      {view === "list" ? (
        <div className="flex flex-col gap-2 max-w-3xl">
          {tasks.map(t => (
            <div
              key={t.id}
              onClick={() => onToggleTask(t.id)}
              className={`border p-4 flex items-center gap-4 bg-white transition-all cursor-pointer select-none hover:border-[#1A1A1A] ${t.completed ? "border-[#E5E5E5] bg-[#F5F5F5]/30 opacity-60" : t.due === "Today" ? "border-[#1A1A1A]" : "border-[#E5E5E5]"}`}
            >
              <div className={`w-5 h-5 border flex items-center justify-center shrink-0 ${t.completed ? "bg-[#1A1A1A] border-[#1A1A1A]" : "border-[#E5E5E5]"}`}>
                {t.completed && <Check size={12} className="text-[#FFFFFF]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-['Red_Hat_Display'] font-semibold text-[13px] ${t.completed ? "line-through text-[#737373]" : "text-[#1A1A1A]"}`}>{t.task}</p>
                <p className="font-['Red_Hat_Display'] text-[#737373] text-[11px] mt-0.5">{t.account} · Assigned: {t.assigned}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`font-['Red_Hat_Display'] font-bold text-[10px] uppercase px-2 py-0.5 ${t.due === "Today" ? "bg-[#1A1A1A] text-[#FFFFFF]" : "bg-[#F5F5F5] text-[#1A1A1A]"}`}>{t.due}</span>
                <span className="font-['Red_Hat_Display'] text-[#737373] text-[10px] uppercase px-2 py-0.5 border border-[#E5E5E5]">{t.priority}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E5E5] p-6 max-w-3xl">
          <Label className="text-[#1A1A1A] mb-4 block">Calendar View · July 2026</Label>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <div key={day} className="font-['Red_Hat_Display'] text-[11px] font-bold text-center text-[#737373] pb-2 uppercase">{day}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => {
              const hasTask = d === 1 || d === 3 || d === 5 || d === 7;
              return (
                <div key={d} className={`h-16 border border-[#E5E5E5] p-1.5 flex flex-col justify-between ${hasTask ? "bg-[#F5F5F5]" : ""}`}>
                  <span className="font-['Red_Hat_Display'] text-[10px] text-[#737373]">{d}</span>
                  {hasTask && <div className="w-full bg-[#1A1A1A] text-[#FFFFFF] text-[8px] font-['Red_Hat_Display'] p-0.5 truncate">Follow-up</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E5E5] max-w-sm w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E5E5E5]">
              <CardTitle className="text-[20px]">New Follow-Up Task</CardTitle>
              <button onClick={() => setModalOpen(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="flex flex-col gap-3">
              <div>
                <Label className="text-[#1A1A1A]">Task Description</Label>
                <input required value={taskName} onChange={e => setTaskName(e.target.value)} placeholder="e.g. Call to discuss rush gown order" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div>
                <Label className="text-[#1A1A1A]">Account</Label>
                <input value={account} onChange={e => setAccount(e.target.value)} placeholder="e.g. Grace & Lace" className="w-full border border-[#E5E5E5] p-2 text-[13px] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[#1A1A1A]">Due Date</Label>
                  <select value={due} onChange={e => setDue(e.target.value)} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Week">This Week</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>
                <div>
                  <Label className="text-[#1A1A1A]">Priority</Label>
                  <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full border border-[#E5E5E5] p-2 text-[12px] outline-none">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <PrimaryBtn className="flex-1 h-10 text-[11px]">Create Task</PrimaryBtn>
                <SecondaryBtn onClick={() => setModalOpen(false)} className="flex-1 h-10 text-[11px]">Cancel</SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CRMIntegrations({ onToast }: { onToast: (msg: string) => void }) {
  const [integrations, setIntegrations] = useState([
    { id: "sheets", name: "Google Sheets", icon: "📊", status: "Connected", desc: "Showroom orders sync automatically every 24 hours.", connected: true },
    { id: "front", name: "Front (Email)", icon: "✉️", status: "Disconnected", desc: "Syncs buyer communication timelines and email chains.", connected: false },
    { id: "cal", name: "Calendar Sync", icon: "📅", status: "Disconnected", desc: "Syncs trunk show dates and market meetings with Google Calendar.", connected: false },
    { id: "ai", name: "AI Meeting Notes", icon: "🤖", status: "Connected", desc: "Auto-summarizes sales calls into CRM account timelines.", connected: true },
  ]);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onToast("✓ Google Sheets sync complete: 15 accounts updated!");
    }, 1500);
  };

  const toggleConnection = (id: string) => {
    setIntegrations(prev => prev.map(int => {
      if (int.id === id) {
        const nextConnected = !int.connected;
        const nextStatus = nextConnected ? "Connected" : "Disconnected";
        onToast(`${int.name} is now ${nextStatus}!`);
        return { ...int, connected: nextConnected, status: nextStatus };
      }
      return int;
    }));
  };

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <Label className="text-[#737373]">External Connectors</Label>
          <DisplayText size="medium" className="text-[26px]">System Integrations</DisplayText>
        </div>
        <PrimaryBtn onClick={handleManualSync} disabled={isSyncing} className="h-10 text-[11px]">
          <RefreshCw size={14} className={`mr-2 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Syncing..." : "Sync All Sources"}
        </PrimaryBtn>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-4xl">
        {integrations.map(int => (
          <div key={int.id} className="bg-white border border-[#E5E5E5] p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{int.icon}</span>
                  <div>
                    <CardTitle className="text-[18px]">{int.name}</CardTitle>
                    <span className={`px-2 py-0.5 text-[9px] font-['Red_Hat_Display'] font-bold uppercase ${int.connected ? "bg-[#1A1A1A] text-[#FFFFFF]" : "bg-[#F5F5F5] text-[#737373]"}`}>
                      {int.status}
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-['Inter'] text-[#737373] text-[12px] leading-relaxed my-3">{int.desc}</p>
            </div>
            <div className="pt-2 border-t border-[#E5E5E5] flex gap-2">
              <SecondaryBtn onClick={() => toggleConnection(int.id)} className="h-8 text-[10px] flex-1">
                {int.connected ? "Disconnect" : "Connect"}
              </SecondaryBtn>
              {int.connected && (
                <SecondaryBtn onClick={handleManualSync} disabled={isSyncing} className="h-8 text-[10px] flex-1">
                  Sync Now
                </SecondaryBtn>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CRMPortal() {
  const [tab, setTab] = useState("accounts");
  const [selectedAccount, setSelectedAccount] = useState<typeof INITIAL_CRM_ACCOUNTS[0] | null>(null);
  const [accounts, setAccounts] = useState(INITIAL_CRM_ACCOUNTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => setToast(msg);

  const navItems = [
    { id: "accounts", icon: Users, label: "Accounts" },
    { id: "pipeline", icon: TrendingUp, label: "Pipeline" },
    { id: "tasks", icon: CheckCircle, label: "Tasks" },
    { id: "integrations", icon: Layers, label: "Integrations" },
  ];

  return (
    <div className="flex h-full bg-[#FFFFFF]">
      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <div className="w-64 border-r border-[#E5E5E5] bg-white flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-[#E5E5E5]">
            <CardTitle className="text-[20px]">NAGAE Studio</CardTitle>
            <p className="font-['Red_Hat_Display'] text-[#737373] text-[10px] uppercase tracking-wider mt-0.5">Sales Intelligence CRM</p>
          </div>
          <nav className="p-3 flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setSelectedAccount(null); setTab(item.id); }}
                className={`flex items-center gap-3 px-3 py-2.5 text-[12px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${tab === item.id && !selectedAccount ? "bg-[#1A1A1A] text-[#FFFFFF]" : "text-[#737373] hover:text-[#1A1A1A] hover:bg-[#F5F5F5]"}`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-[#E5E5E5] text-[11px] font-['Red_Hat_Display'] text-[#737373]">
          Sales DB: Connected
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {selectedAccount ? (
          <AccountDetail
            account={selectedAccount}
            onBack={() => setSelectedAccount(null)}
            onToast={showToast}
          />
        ) : tab === "accounts" ? (
          <AccountList
            accounts={accounts}
            onSelectAccount={a => setSelectedAccount(a)}
            onAddAccount={a => setAccounts([a, ...accounts])}
            onToast={showToast}
          />
        ) : tab === "pipeline" ? (
          <CRMPipeline
            accounts={accounts}
            onUpdateAccountStage={(id, stage) => {
              setAccounts(accounts.map(a => a.id === id ? { ...a, status: stage } : a));
            }}
            onToast={showToast}
          />
        ) : tab === "tasks" ? (
          <CRMTasks
            tasks={tasks}
            onToggleTask={id => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))}
            onAddTask={t => setTasks([t, ...tasks])}
            onToast={showToast}
          />
        ) : tab === "integrations" ? (
          <CRMIntegrations onToast={showToast} />
        ) : null}
      </div>
    </div>
  );
}

// ─── ARCHITECTURE DIAGRAM ─────────────────────────────────────────────────────

function ArchitectureDiagram({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const portalTables = ["PRODUCTS", "USERS", "TRAINING", "QUIZZES", "BADGES", "NOTIFICATIONS", "ANALYTICS"];
  const crmTables = ["ACCOUNTS", "CONTACTS", "COMMUNICATIONS", "MEETINGS", "TASKS", "SURVEYS", "SALES_DATA"];

  return (
    <div className="min-h-full bg-[#FFFFFF] text-[#1A1A1A] overflow-y-auto pb-24 selection:bg-[#1A1A1A] selection:text-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-[#E5E5E5] px-8 py-3.5 flex items-center justify-between sticky top-0 bg-[#FFFFFF]/95 backdrop-blur-sm z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-7 px-3 border border-[#E5E5E5] flex items-center gap-2 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer font-['Red_Hat_Display'] text-[10px] uppercase tracking-wider font-semibold"
            title="Back to System Modes"
          >
            <ArrowLeft size={12} />
            <span>Modes</span>
          </button>
          <span className="font-['Red_Hat_Display'] text-[11px] uppercase tracking-[0.2em] text-[#737373] font-medium">
            SYSTEM ARCHITECTURE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#E5E5E5] bg-[#F5F5F5] font-['Red_Hat_Display'] text-[9px] uppercase tracking-wider font-semibold text-[#1A1A1A]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Production Blueprint
          </span>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center">
        
        {/* Title & Subtitle */}
        <div className="text-center mb-10">
          <h1 className="font-['Instrument_Serif'] italic text-[44px] sm:text-[52px] leading-tight text-[#1A1A1A] tracking-tight">
            Platform Architecture
          </h1>
          <p className="font-['Red_Hat_Display'] text-[11px] uppercase tracking-[0.25em] text-[#737373] mt-2 font-semibold">
            ONE PLATFORM · TWO SYSTEMS · MOBILE-FIRST · SCALABLE
          </p>
        </div>

        {/* SECTION 1: TWO ISOLATED DATABASES */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
          {/* Left: Portal Database (Dark Charcoal Primary Container) */}
          <div className="bg-[#1A1A1A] text-white p-7 border border-[#1A1A1A] shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 pointer-events-none rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Database size={13} className="text-[#A3A3A3]" />
                <span className="font-['Red_Hat_Display'] text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3] font-bold">
                  POSTGRESQL
                </span>
              </div>
              <h2 className="font-['Instrument_Serif'] italic text-[30px] text-white tracking-wide mb-6">
                Portal Database
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {portalTables.map(tbl => (
                <span
                  key={tbl}
                  onClick={() => setActiveTab(tbl === activeTab ? null : tbl)}
                  className={`px-3 py-1 text-[10px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === tbl ? "bg-white text-[#1A1A1A]" : "bg-white/10 hover:bg-white/20 text-[#E5E5E5] border border-white/10"
                  }`}
                >
                  {tbl}
                </span>
              ))}
            </div>
          </div>

          {/* Right: CRM Database (Clean Light Container) */}
          <div className="bg-[#F9F9F9] text-[#1A1A1A] p-7 border border-[#E5E5E5] shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#1A1A1A] transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Database size={13} className="text-[#737373]" />
                <span className="font-['Red_Hat_Display'] text-[10px] uppercase tracking-[0.2em] text-[#737373] font-bold">
                  POSTGRESQL
                </span>
              </div>
              <h2 className="font-['Instrument_Serif'] italic text-[30px] text-[#1A1A1A] tracking-wide mb-6">
                CRM Database
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {crmTables.map(tbl => (
                <span
                  key={tbl}
                  onClick={() => setActiveTab(tbl === activeTab ? null : tbl)}
                  className={`px-3 py-1 text-[10px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === tbl ? "bg-[#1A1A1A] text-white" : "bg-white hover:bg-[#E5E5E5] text-[#1A1A1A] border border-[#E5E5E5]"
                  }`}
                >
                  {tbl}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Schema Inspector Popup if table clicked */}
        {activeTab && (
          <div className="w-full mb-3 p-4 bg-[#FFFFFF] border-2 border-[#1A1A1A] text-[12px] font-['Red_Hat_Display'] flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold bg-[#1A1A1A] text-white px-2 py-0.5 text-[10px]">TABLE: {activeTab}</span>
              <span className="text-[#737373]">PostgreSQL relational table schema with indexed primary keys, foreign constraints, and audit timestamps.</span>
            </div>
            <button onClick={() => setActiveTab(null)} className="text-[11px] font-bold uppercase underline hover:text-[#737373] cursor-pointer">Close</button>
          </div>
        )}

        {/* CONNECTOR LINE */}
        <div className="w-px h-5 bg-[#E5E5E5] my-0.5"></div>

        {/* SECTION 2: API LAYER (Horizontal Banner) */}
        <div className="w-full bg-[#E5E5E5]/70 border border-[#E5E5E5] py-3.5 px-6 text-center mb-3 relative group hover:border-[#1A1A1A] transition-colors">
          <div className="font-['Red_Hat_Display'] text-[11px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]">
            API LAYER
          </div>
          <div className="font-['Red_Hat_Display'] text-[11px] text-[#525252] tracking-wider mt-0.5 font-medium">
            REST + Auth · Rate Limiting · Caching
          </div>
        </div>

        {/* CONNECTOR LINE */}
        <div className="w-px h-5 bg-[#E5E5E5] my-0.5"></div>

        {/* SECTION 3: FRONTEND SURFACES (3 Columns) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-7">
          {/* Surface 1: Stylist App */}
          <div className="bg-white border border-[#E5E5E5] p-6 hover:border-[#1A1A1A] transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 border border-[#E5E5E5] flex items-center justify-center group-hover:border-[#1A1A1A] transition-colors">
                  <Smartphone size={16} className="text-[#1A1A1A]" />
                </div>
                <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[8px] font-['Red_Hat_Display'] font-bold uppercase tracking-wider">
                  LIVE
                </span>
              </div>
              <h3 className="font-['Instrument_Serif'] italic text-[24px] text-[#1A1A1A] mb-1">
                Stylist App
              </h3>
              <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373] leading-relaxed">
                React · Mobile-First · PWA-ready · 375px base
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5E5E5]/60 flex items-center justify-between text-[11px] text-[#737373]">
              <span>Retailer / In-Store</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Surface 2: Admin Portal */}
          <div className="bg-white border border-[#E5E5E5] p-6 hover:border-[#1A1A1A] transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 border border-[#E5E5E5] flex items-center justify-center group-hover:border-[#1A1A1A] transition-colors">
                  <LayoutGrid size={16} className="text-[#1A1A1A]" />
                </div>
                <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[8px] font-['Red_Hat_Display'] font-bold uppercase tracking-wider">
                  LIVE
                </span>
              </div>
              <h3 className="font-['Instrument_Serif'] italic text-[24px] text-[#1A1A1A] mb-1">
                Admin Portal
              </h3>
              <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373] leading-relaxed">
                React · Desktop · 1440px · Management Interface
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5E5E5]/60 flex items-center justify-between text-[11px] text-[#737373]">
              <span>Brand HQ Operations</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Surface 3: CRM System */}
          <div className="bg-white border border-[#E5E5E5] p-6 hover:border-[#1A1A1A] transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 border border-[#E5E5E5] flex items-center justify-center group-hover:border-[#1A1A1A] transition-colors">
                  <BarChart2 size={16} className="text-[#1A1A1A]" />
                </div>
                <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[8px] font-['Red_Hat_Display'] font-bold uppercase tracking-wider">
                  LIVE
                </span>
              </div>
              <h3 className="font-['Instrument_Serif'] italic text-[24px] text-[#1A1A1A] mb-1">
                CRM System
              </h3>
              <p className="font-['Red_Hat_Display'] text-[11px] text-[#737373] leading-relaxed">
                React · Desktop · 1440px · Sales Intelligence
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5E5E5]/60 flex items-center justify-between text-[11px] text-[#737373]">
              <span>Boutique Relations & Pipeline</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* SECTION 4: INTEGRATIONS & FUTURE CONNECTIONS (Contained Block) */}
        <div className="w-full bg-[#F5F5F5] border border-[#E5E5E5] p-7 mb-10">
          <div className="font-['Red_Hat_Display'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#737373] mb-5">
            INTEGRATIONS & FUTURE CONNECTIONS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Google Sheets */}
            <div className="bg-white border border-[#E5E5E5] p-4 flex items-center justify-between hover:border-[#1A1A1A] transition-colors">
              <div>
                <div className="font-['Red_Hat_Display'] font-bold text-[13px] text-[#1A1A1A]">
                  Google Sheets
                </div>
                <div className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">
                  Sales data sync for CRM
                </div>
              </div>
              <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[8px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider">
                CONNECTED
              </span>
            </div>

            {/* Push Notifications */}
            <div className="bg-white border border-[#E5E5E5] p-4 flex items-center justify-between hover:border-[#1A1A1A] transition-colors">
              <div>
                <div className="font-['Red_Hat_Display'] font-bold text-[13px] text-[#1A1A1A]">
                  Push Notifications
                </div>
                <div className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">
                  Stylist engagement & alerts
                </div>
              </div>
              <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[8px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider">
                ACTIVE
              </span>
            </div>

            {/* Front (Email) */}
            <div className="bg-white border border-[#E5E5E5] p-4 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
              <div>
                <div className="font-['Red_Hat_Display'] font-bold text-[13px] text-[#1A1A1A]">
                  Front (Email)
                </div>
                <div className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">
                  CRM email timeline integration
                </div>
              </div>
              <span className="px-2 py-0.5 border border-[#D4D4D4] bg-[#F5F5F5] text-[#737373] text-[8px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider">
                COMING SOON
              </span>
            </div>

            {/* AI Service (Claude) */}
            <div className="bg-white border border-[#E5E5E5] p-4 flex items-center justify-between hover:border-[#1A1A1A] transition-colors">
              <div>
                <div className="font-['Red_Hat_Display'] font-bold text-[13px] text-[#1A1A1A]">
                  AI Service (Claude)
                </div>
                <div className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">
                  Ask NAGAE AI + CRM insights
                </div>
              </div>
              <span className="px-2 py-0.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[8px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider">
                ACTIVE
              </span>
            </div>

            {/* Video Platform */}
            <div className="bg-white border border-[#E5E5E5] p-4 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
              <div>
                <div className="font-['Red_Hat_Display'] font-bold text-[13px] text-[#1A1A1A]">
                  Video Platform
                </div>
                <div className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">
                  Training module hosting
                </div>
              </div>
              <span className="px-2 py-0.5 border border-[#D4D4D4] bg-[#F5F5F5] text-[#737373] text-[8px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider">
                COMING SOON
              </span>
            </div>

            {/* Survey Platform */}
            <div className="bg-white border border-[#E5E5E5] p-4 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
              <div>
                <div className="font-['Red_Hat_Display'] font-bold text-[13px] text-[#1A1A1A]">
                  Survey Platform
                </div>
                <div className="font-['Red_Hat_Display'] text-[11px] text-[#737373]">
                  Retailer feedback collection
                </div>
              </div>
              <span className="px-2 py-0.5 border border-[#D4D4D4] bg-[#F5F5F5] text-[#737373] text-[8px] font-['Red_Hat_Display'] font-semibold uppercase tracking-wider">
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 5: STATS FOOTER BAR (4 Metrics) */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#E5E5E5] text-center">
          <div>
            <div className="font-['Instrument_Serif'] italic text-[48px] text-[#1A1A1A] leading-none mb-1">
              500+
            </div>
            <div className="font-['Red_Hat_Display'] text-[10px] uppercase tracking-[0.2em] text-[#737373] font-semibold">
              PRODUCTS CAPACITY
            </div>
          </div>

          <div>
            <div className="font-['Instrument_Serif'] italic text-[48px] text-[#1A1A1A] leading-none mb-1">
              150+
            </div>
            <div className="font-['Red_Hat_Display'] text-[10px] uppercase tracking-[0.2em] text-[#737373] font-semibold">
              RETAILER ACCOUNTS
            </div>
          </div>

          <div>
            <div className="font-['Instrument_Serif'] italic text-[48px] text-[#1A1A1A] leading-none mb-1">
              2 DBs
            </div>
            <div className="font-['Red_Hat_Display'] text-[10px] uppercase tracking-[0.2em] text-[#737373] font-semibold">
              ISOLATED SYSTEMS
            </div>
          </div>

          <div>
            <div className="font-['Instrument_Serif'] italic text-[48px] text-[#1A1A1A] leading-none mb-1">
              &infin;
            </div>
            <div className="font-['Red_Hat_Display'] text-[10px] uppercase tracking-[0.2em] text-[#737373] font-semibold">
              SCALABLE VIA API
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


export default function App() {
  const [mode, setMode] = useState<null | "stylist" | "admin" | "crm" | "arch">(null);

  // Global Synchronized State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [trainingModules, setTrainingModules] = useState(INITIAL_TRAINING);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [userPoints, setUserPoints] = useState(2840);
  const [savedFavorites, setSavedFavorites] = useState<number[]>([1, 6]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => setToastMessage(msg);

  const handleToggleFavorite = (id: number) => {
    setSavedFavorites(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(x => x !== id) : [...prev, id];
      showToast(exists ? "Removed from Favorites" : "Saved to Favorites!");
      return next;
    });
  };

  const handleAddNotification = (newN: any) => {
    setNotifications(prev => [newN, ...prev]);
  };

  const handleBroadcastNotification = (title: string, body: string, audience: string) => {
    const newNote = {
      id: Date.now(),
      emoji: "✨",
      title: `${title} — ${body}`,
      time: "Just now",
      read: false,
      type: "broadcast"
    };
    setNotifications(prev => [newNote, ...prev]);
    showToast(`Notification broadcasted to ${audience}!`);
  };

  const handleCompleteModule = (id: number) => {
    setTrainingModules(prev => prev.map(m => {
      if (m.id === id) {
        setUserPoints(p => p + m.points);
        return { ...m, progress: 100, completed: true };
      }
      return m;
    }));
  };

  const handleCompleteQuiz = (scorePct: number, pointsEarned: number) => {
    setUserPoints(p => p + pointsEarned);
  };

  const handleDeductPoints = (pts: number) => {
    setUserPoints(p => Math.max(0, p - pts));
  };

  return (
    <div className="size-full overflow-hidden flex flex-col font-['Red_Hat_Display']">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {mode === null ? (
        <div className="size-full overflow-y-auto bg-[#FFFFFF]">
          <div className="min-h-full flex flex-col items-center justify-center p-8 gap-12">
            <div className="text-center">
              <DisplayText size="hero" className="text-[52px]">NAGAE Studio</DisplayText>
              <p className="font-['Red_Hat_Display'] text-[#737373] text-[13px] uppercase tracking-[3px] mt-3">
                Retailer Platform · High-Contrast Japanese Minimalist Architecture
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
              {/* Stylist App */}
              <button
                onClick={() => setMode("stylist")}
                className="group bg-white border border-[#E5E5E5] p-7 flex flex-col gap-4 text-left hover:border-[#1A1A1A] hover:bg-[#F5F5F5] transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center">
                    <ShoppingBag size={22} className="text-[#FFFFFF]" />
                  </div>
                  <span className="bg-[#F5F5F5] px-2 py-0.5 font-['Red_Hat_Display'] font-bold text-[8px] uppercase tracking-wider text-[#1A1A1A]">Mobile · 393px</span>
                </div>
                <div>
                  <CardTitle className="text-[22px]">Stylist App</CardTitle>
                  <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px] mt-1">Mobile-first portal for retailers & stylists — Product catalog, AI assistant, training, gamification</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {["Catalog", "Ask NAGAE AI", "Training", "Quiz", "Points", "Notifications", "Resources"].map(tag => (
                    <span key={tag} className="bg-[#F5F5F5] px-2 py-0.5 font-['Red_Hat_Display'] font-semibold text-[9px] uppercase tracking-wider text-[#1A1A1A]">{tag}</span>
                  ))}
                </div>
              </button>

              {/* Admin Portal */}
              <button
                onClick={() => setMode("admin")}
                className="group bg-[#1A1A1A] border border-[#1A1A1A] p-7 flex flex-col gap-4 text-left hover:bg-[#262626] transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#FFFFFF] flex items-center justify-center">
                    <LayoutDashboard size={22} className="text-[#1A1A1A]" />
                  </div>
                  <span className="bg-[#FFFFFF]/20 px-2 py-0.5 font-['Red_Hat_Display'] font-bold text-[8px] uppercase tracking-wider text-[#FFFFFF]">Desktop · 1440px</span>
                </div>
                <div>
                  <CardTitle className="text-[22px] text-[#FFFFFF]">Admin Portal</CardTitle>
                  <p className="font-['Red_Hat_Display'] text-[#FFFFFF]/70 text-[12px] mt-1">Management dashboard for NAGAE team — Products, training, gamification, analytics, users</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {["Products", "Training", "Analytics", "Gamification", "Broadcasts", "Retailers"].map(tag => (
                    <span key={tag} className="bg-[#FFFFFF]/15 px-2 py-0.5 font-['Red_Hat_Display'] font-semibold text-[9px] uppercase tracking-wider text-[#FFFFFF]">{tag}</span>
                  ))}
                </div>
              </button>

              {/* CRM System */}
              <button
                onClick={() => setMode("crm")}
                className="group bg-[#F5F5F5] border border-[#E5E5E5] p-7 flex flex-col gap-4 text-left hover:border-[#1A1A1A] transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center">
                    <BarChart2 size={22} className="text-[#FFFFFF]" />
                  </div>
                  <span className="bg-white border border-[#E5E5E5] px-2 py-0.5 font-['Red_Hat_Display'] font-bold text-[8px] uppercase tracking-wider text-[#1A1A1A]">Sales Intelligence</span>
                </div>
                <div>
                  <CardTitle className="text-[22px]">CRM System</CardTitle>
                  <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px] mt-1">Internal sales intelligence — 15 accounts, pipeline stages, tasks, reports, integrations</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {["Accounts", "Pipeline", "Health Score", "Reports", "Integrations", "Tasks"].map(tag => (
                    <span key={tag} className="bg-white border border-[#E5E5E5]/40 px-2 py-0.5 font-['Red_Hat_Display'] font-semibold text-[9px] uppercase tracking-wider text-[#1A1A1A]">{tag}</span>
                  ))}
                </div>
              </button>

              {/* Architecture */}
              <button
                onClick={() => setMode("arch")}
                className="group bg-white border border-[#E5E5E5] p-7 flex flex-col gap-4 text-left hover:border-[#1A1A1A] transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#FFFFFF] border border-[#E5E5E5] flex items-center justify-center group-hover:border-[#1A1A1A] transition-colors">
                    <Layers size={22} className="text-[#1A1A1A]" />
                  </div>
                  <span className="bg-[#F5F5F5] px-2 py-0.5 font-['Red_Hat_Display'] font-bold text-[8px] uppercase tracking-wider text-[#1A1A1A]">Technical Architecture</span>
                </div>
                <div>
                  <CardTitle className="text-[22px]">System Architecture</CardTitle>
                  <p className="font-['Red_Hat_Display'] text-[#737373] text-[12px] mt-1">PostgreSQL databases · API layer · Frontend surfaces · Integrations · Scalability</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {["2 Databases", "API Layer", "Integrations", "Scalable"].map(tag => (
                    <span key={tag} className="bg-[#F5F5F5] px-2 py-0.5 font-['Red_Hat_Display'] font-semibold text-[9px] uppercase tracking-wider text-[#1A1A1A]">{tag}</span>
                  ))}
                </div>
              </button>
            </div>

            <p className="font-['Instrument_Serif'] italic text-[#737373] text-[16px] text-center">
              Select a system to explore the fully functional prototype
            </p>
          </div>
        </div>
      ) : (
        <div className="size-full flex flex-col overflow-hidden">
          {/* Top Bar for Navigating Back */}
          <div className="bg-white border-b border-[#E5E5E5] h-10 flex items-center px-4 shrink-0 z-50">
            <button
              onClick={() => setMode(null)}
              className="flex items-center gap-2 font-['Red_Hat_Display'] text-[10px] text-[#737373] uppercase tracking-wider hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              <ArrowLeft size={12} />Back to System Modes
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {mode === "stylist" ? (
              <div className="size-full flex items-center justify-center bg-[#F5F5F5]">
                <div className="w-[393px] h-full max-h-[844px] shadow-2xl overflow-hidden flex flex-col relative border border-[#E5E5E5]">
                  <StylistApp
                    products={products}
                    trainingModules={trainingModules}
                    notifications={notifications}
                    userPoints={userPoints}
                    savedFavorites={savedFavorites}
                    onToggleFavorite={handleToggleFavorite}
                    onAddNotification={handleAddNotification}
                    onMarkNotificationRead={id => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))}
                    onMarkAllNotificationsRead={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    onClearAllNotifications={() => setNotifications([])}
                    onCompleteModule={handleCompleteModule}
                    onCompleteQuiz={handleCompleteQuiz}
                    onDeductPoints={handleDeductPoints}
                    onToast={showToast}
                  />
                </div>
              </div>
            ) : mode === "admin" ? (
              <AdminPortal
                products={products}
                onAddProduct={p => setProducts([p, ...products])}
                onUpdateProduct={p => setProducts(products.map(x => x.id === p.id ? p : x))}
                onDeleteProduct={id => setProducts(products.filter(x => x.id !== id))}
                trainingModules={trainingModules}
                onAddModule={m => setTrainingModules([m, ...trainingModules])}
                onUpdateModule={m => setTrainingModules(trainingModules.map(x => x.id === m.id ? m : x))}
                onDeleteModule={id => setTrainingModules(trainingModules.filter(x => x.id !== id))}
                onBroadcastNotification={handleBroadcastNotification}
                onToast={showToast}
              />
            ) : mode === "crm" ? (
              <CRMPortal />
            ) : mode === "arch" ? (
              <ArchitectureDiagram onBack={() => setMode(null)} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
