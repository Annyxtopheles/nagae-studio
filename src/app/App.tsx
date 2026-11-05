import React, { useState, useEffect } from "react";
import { HeaderHUD } from "./lithos/components/HeaderHUD";
import { TopographicHero } from "./lithos/components/TopographicHero";
import { SpectrogramDeck } from "./lithos/components/SpectrogramDeck";
import { HardwareSchematics } from "./lithos/components/HardwareSchematics";
import { PressingVault } from "./lithos/components/PressingVault";
import { FieldLogsManifesto } from "./lithos/components/FieldLogsManifesto";
import { VaultDrawer } from "./lithos/components/VaultDrawer";
import { ColophonFooter } from "./lithos/components/ColophonFooter";
import { EXPEDITIONS, VINYL_EDITIONS } from "./lithos/data";
import { Expedition, VinylEdition, CartItem } from "./lithos/types";
import { lithosAudio } from "./lithos/audioEngine";
import { CheckCircle, X, ShieldAlert } from "lucide-react";

const STORAGE_PREFIX = "lithos_archive_";

function loadSaved<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
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

  // Keyboard controls (Space to toggle audio, Esc to close modals)
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
    if (isPlaying) {
      lithosAudio.play(exp);
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
    showToast("Edition removed from physical vault cart.");
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
    <div className="min-h-screen w-full bg-[#0A0A0B] text-[#ECEAE4] flex flex-col font-mono selection:bg-[#D94E28] selection:text-[#ECEAE4]">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#141416] text-[#ECEAE4] px-5 py-4 border border-[#D94E28] shadow-[0_0_25px_rgba(217,78,40,0.35)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <ShieldAlert size={16} className="text-[#D94E28] shrink-0" />
          <span className="font-mono text-xs tracking-wide">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-3 text-[#8F8E8A] hover:text-white cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Global Navigation HUD */}
      <HeaderHUD
        activeExpedition={activeExpedition}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* Section 01: Seismic & Topographic Hero */}
        <TopographicHero
          activeExpedition={activeExpedition}
          onSelectExpedition={handleSelectExpedition}
          onLaunchSynthesizer={() => scrollToSection("synthesizer")}
        />

        {/* Section 02: Interactive Field Recording Deck & Spectrogram Synthesizer */}
        <SpectrogramDeck
          activeExpedition={activeExpedition}
          onSelectExpedition={handleSelectExpedition}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />

        {/* Section 03: Sensor Rig & Transducer Hardware Schematics */}
        <HardwareSchematics />

        {/* Section 04: Physical Editions & Pressing Vault */}
        <PressingVault
          onAddToCart={handleAddToCart}
          onCueExpedition={(exp) => {
            handleSelectExpedition(exp);
            scrollToSection("synthesizer");
          }}
          onToast={showToast}
        />

        {/* Section 05: Field Log Dispatches & Collective Manifesto */}
        <FieldLogsManifesto />
      </main>

      {/* Colophon & Network Status Footer */}
      <ColophonFooter
        onToast={showToast}
        onScrollToTop={() => scrollToSection("hero")}
      />

      {/* Slide-out Physical Vault Drawer */}
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
