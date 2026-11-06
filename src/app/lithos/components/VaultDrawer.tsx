import React, { useState } from "react";
import { X, Disc, Trash2, Check, ShieldCheck, Copy, CheckCheck } from "lucide-react";
import { CartItem } from "../types";

interface VaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onToast: (msg: string) => void;
}

export const VaultDrawer: React.FC<VaultDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onToast,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [dispatchRef, setDispatchRef] = useState("LITH-2026-X883");
  const [hasCopied, setHasCopied] = useState(false);

  if (!isOpen) return null;

  const subtotalUSD = items.reduce((sum, item) => sum + item.edition.priceUSD * item.quantity, 0);
  const shippingUSD = items.length > 0 ? 12 : 0;
  const totalUSD = subtotalUSD + shippingUSD;

  const handleConfirmReservation = () => {
    setIsCheckingOut(true);
    const generatedRef = `LITH-2026-X${Math.floor(100 + Math.random() * 900)}`;
    setDispatchRef(generatedRef);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsConfirmed(true);
      onToast("Order reserved. Archival dispatch manifest logged.");
    }, 850);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(dispatchRef).then(() => {
      setHasCopied(true);
      onToast(`Copied reference code: ${dispatchRef}`);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  const handleFinish = () => {
    setIsConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-lithos-charcoal border-l border-lithos-border w-full max-w-md h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl relative select-none overflow-y-auto font-sans text-lithos-chalk cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex justify-between items-center border-b border-lithos-border pb-4 mb-6">
            <h3 className="font-bold text-xl text-white">
              Your Cart
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-lithos-muted hover:text-white rounded-sm hover:bg-lithos-strata transition-colors duration-150 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Contents */}
          {isConfirmed ? (
            <div className="py-2 flex flex-col items-start text-left font-sans">
              <div className="w-full bg-lithos-basalt border border-lithos-border p-5 rounded-sm space-y-4">
                {/* Manifest Header */}
                <div className="flex items-center justify-between border-b border-lithos-border pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-lithos-rust uppercase tracking-wider block">
                      LITHOS ARCHIVE DISPATCH
                    </span>
                    <span className="font-bold text-xs text-white uppercase tracking-wider mt-0.5 block">
                      ORDER RESERVED // SHIPMENT LOGGED
                    </span>
                  </div>
                  <div className="w-8 h-8 bg-lithos-strata border border-lithos-rust rounded-full flex items-center justify-center text-lithos-rust shrink-0">
                    <Check size={16} />
                  </div>
                </div>

                {/* Reference Code Box */}
                <div className="bg-lithos-charcoal border border-lithos-border/80 p-3 rounded-sm flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-lithos-muted uppercase tracking-wider block font-medium">Archive Manifest Reference</span>
                    <span className="font-mono text-sm font-bold text-lithos-chalk tracking-wider">{dispatchRef}</span>
                  </div>
                  <button
                    onClick={handleCopyRef}
                    className="flex items-center gap-1.5 bg-lithos-strata hover:bg-lithos-rust border border-lithos-border hover:border-lithos-rust text-lithos-chalk hover:text-white px-2.5 py-1.5 rounded-sm text-xs transition-colors duration-150 cursor-pointer"
                    title="Copy Reference Code"
                  >
                    {hasCopied ? <CheckCheck size={13} className="text-lithos-rust" /> : <Copy size={13} />}
                    <span className="text-[11px] font-medium">{hasCopied ? "Copied" : "Copy Ref"}</span>
                  </button>
                </div>

                {/* Archival Packaging Specs */}
                <div className="text-xs space-y-2 border-t border-b border-lithos-border/70 py-3 text-lithos-muted leading-relaxed">
                  <p className="text-white font-medium text-[11px] uppercase tracking-wider">
                    Packaging Specification:
                  </p>
                  <p className="text-[11px] text-lithos-chalk bg-lithos-charcoal/70 p-2.5 rounded-sm border border-lithos-border/50 font-mono">
                    180G VINYL PACKED IN HEAVY UNBLEACHED CARDBOARD
                  </p>
                  <p className="text-[11px]">
                    All physical vinyl is shipped outside the jacket in heavy unbleached cardboard mailers to prevent seam splits in transit.
                  </p>
                </div>

                {/* Reserved Items Manifest */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-lithos-muted block font-medium">
                    Reserved Pressings ({items.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                  <div className="divide-y divide-lithos-border/50 text-xs">
                    {items.map(it => (
                      <div key={it.edition.id} className="py-2 flex justify-between items-center text-[11px]">
                        <div>
                          <span className="text-lithos-rust font-semibold mr-2">{it.edition.catalogNumber}</span>
                          <span className="text-white">{it.edition.title.split(":")[0]}</span>
                          <span className="text-lithos-muted ml-2">×{it.quantity}</span>
                        </div>
                        <span className="text-white font-medium">${it.edition.priceUSD * it.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-lithos-border text-xs font-semibold text-white">
                    <span>Total Reserved</span>
                    <span className="text-lithos-rust text-sm">${totalUSD} USD</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="mt-6 bg-lithos-rust hover:bg-lithos-rust/90 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors duration-150 cursor-pointer w-full text-center"
              >
                Confirm & Clear Vault
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center">
              <Disc size={40} className="text-lithos-border mb-3" />
              <p className="text-sm text-lithos-muted">Your cart is currently empty.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-lithos-border">
              {items.map(item => (
                <div key={item.edition.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-lithos-rust text-xs font-semibold block">
                      {item.edition.catalogNumber}
                    </span>
                    <h4 className="font-semibold text-sm text-white mt-0.5">
                      {item.edition.title.split(":")[0]}
                    </h4>
                    <span className="text-lithos-muted text-xs block mt-0.5">
                      {item.edition.format.split(" ")[0]} · ${item.edition.priceUSD} each
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.edition.id)}
                      className="text-lithos-muted/70 hover:text-lithos-rust transition-colors duration-150 p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="flex items-center border border-lithos-border bg-lithos-basalt rounded-sm text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.edition.id, -1)}
                        className="px-2 py-1 text-lithos-muted hover:text-white transition-colors duration-150 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-semibold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.edition.id, 1)}
                        className="px-2 py-1 text-lithos-muted hover:text-white transition-colors duration-150 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout Summary */}
        {!isConfirmed && items.length > 0 && (
          <div className="border-t border-lithos-border pt-6 mt-6">
            <div className="flex flex-col gap-2 text-xs mb-6">
              <div className="flex justify-between text-lithos-muted">
                <span>Subtotal</span>
                <span className="text-white font-semibold">${subtotalUSD}</span>
              </div>
              <div className="flex justify-between text-lithos-muted">
                <span>Standard Shipping</span>
                <span className="text-white font-semibold">${shippingUSD}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-lithos-border text-white">
                <span>Total</span>
                <span className="text-lithos-rust text-base">${totalUSD} USD</span>
              </div>
            </div>

            <button
              onClick={handleConfirmReservation}
              disabled={isCheckingOut}
              className="w-full bg-lithos-rust hover:bg-lithos-rust/90 text-white py-3.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
            >
              {isCheckingOut ? (
                <span>Processing...</span>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Checkout — ${totalUSD}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
