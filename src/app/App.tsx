import React, { useState, useEffect } from "react";
import { LabelHeader } from "./lithos/components/LabelHeader";
import { FeaturedReleaseHero } from "./lithos/components/FeaturedReleaseHero";
import { LabelCatalog } from "./lithos/components/LabelCatalog";
import { LabelFooter } from "./lithos/components/LabelFooter";
import { VaultDrawer } from "./lithos/components/VaultDrawer";
import { PersistentPlayer } from "./lithos/components/PersistentPlayer";
import { EXPEDITIONS, VINYL_EDITIONS } from "./lithos/data";
import { Expedition, VinylEdition, CartItem } from "./lithos/types";
import { lithosAudio } from "./lithos/audioEngine";
import { X, Check } from "lucide-react";

const STORAGE_PREFIX = "lithos_archive_";

function loadSaved<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed)) {
      const valid = parsed.filter(i => i && i.edition && typeof i.edition.priceUSD === "number");
      if (valid.length > 0) return valid as unknown as T;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

function saveState<T>(key: string, val: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
  } catch {}
}

export default function App() {
  const [activeEdition, setActiveEdition] = useState<VinylEdition>(VINYL_EDITIONS[0]);
  const [activeExpedition, setActiveExpedition] = useState<Expedition>(EXPEDITIONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadSaved<CartItem[]>("vault_cart", [
      { edition: VINYL_EDITIONS[0], quantity: 1 },
    ])
  );
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    saveState("vault_cart", cart);
  }, [cart]);

  // Subscribe to audio engine state changes
  useEffect(() => {
    const unsub = lithosAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsub();
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        lithosAudio.togglePlay(activeExpedition);
      }
      if (e.code === "Escape") {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeExpedition]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleTogglePlay = () => {
    lithosAudio.togglePlay(activeExpedition);
  };

  const handleSelectExpedition = (exp: Expedition) => {
    setActiveExpedition(exp);
    const foundEd = VINYL_EDITIONS.find(ed => {
      const num = exp.code.replace("EXP-", "LITH-");
      return ed.catalogNumber === num;
    });
    if (foundEd) {
      setActiveEdition(foundEd);
    }
    if (isPlaying) {
      lithosAudio.play(exp);
    }
  };

  const handleSelectEdition = (edition: VinylEdition) => {
    setActiveEdition(edition);
    const mapCatToExp: Record<string, string> = {
      "LITH-001": "exp-01",
      "LITH-002": "exp-02",
      "LITH-003": "exp-03",
      "LITH-004": "exp-04",
      "LITH-005": "exp-05",
    };
    const expId = mapCatToExp[edition.catalogNumber] || "exp-01";
    const foundExp = EXPEDITIONS.find(e => e.id === expId) || EXPEDITIONS[0];
    setActiveExpedition(foundExp);
    if (isPlaying) {
      lithosAudio.play(foundExp);
    }
  };

  const handleAddToCart = (edition: VinylEdition, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.edition.id === edition.id);
      if (existing) {
        return prev.map(item =>
          item.edition.id === edition.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { edition, quantity: qty }];
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.edition.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.edition.id !== id));
    showToast("Item removed from cart.");
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-lithos-basalt text-lithos-chalk flex flex-col font-sans selection:bg-lithos-rust selection:text-white pb-16">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-16 right-6 z-[100] bg-lithos-charcoal text-lithos-chalk px-4 py-3 rounded border border-lithos-border shadow-xl shadow-black/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check size={15} className="text-lithos-rust shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-lithos-muted hover:text-white transition-colors duration-150 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <LabelHeader
        activeEdition={activeEdition}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col">
        {/* Section 01: Featured Release */}
        <div id="hero">
          <FeaturedReleaseHero
            activeEdition={activeEdition}
            onSelectEdition={handleSelectEdition}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onAddToCart={handleAddToCart}
            onToast={showToast}
          />
        </div>

        {/* Section 02: Full Catalog */}
        <LabelCatalog
          onAddToCart={handleAddToCart}
          onCueExpedition={(exp) => {
            handleSelectExpedition(exp);
            scrollToSection("hero");
          }}
          onToast={showToast}
        />
      </main>

      {/* Footer */}
      <LabelFooter
        onToast={showToast}
        onScrollToTop={() => scrollToSection("hero")}
      />

      {/* Persistent Bottom Audio Player Bar */}
      <PersistentPlayer
        activeEdition={activeEdition}
        onSelectEdition={handleSelectEdition}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onOpenCart={() => setIsCartOpen(true)}
        onToast={showToast}
      />

      {/* Cart Drawer */}
      <VaultDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onToast={showToast}
      />
    </div>
  );
}
