import React, { useState } from "react";
import { X, Disc, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check } from "lucide-react";
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

  if (!isOpen) return null;

  const totalGrams = items.reduce((sum, item) => sum + item.edition.weightGrams * item.quantity, 0);
  const subtotalUSD = items.reduce((sum, item) => sum + item.edition.priceUSD * item.quantity, 0);
  const shippingUSD = items.length > 0 ? 18 : 0;
  const totalUSD = subtotalUSD + shippingUSD;

  const handleConfirmReservation = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsConfirmed(true);
      onToast("Physical archival reservation registered. Secure confirmation dispatched.");
    }, 1200);
  };

  const handleFinish = () => {
    setIsConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-[#141416] border-l border-[#27272D] w-full max-w-md h-full flex flex-col justify-between p-6 lg:p-8 shadow-2xl relative select-none overflow-y-auto">
        {/* Drawer Header */}
        <div>
          <div className="flex justify-between items-start border-b border-[#27272D] pb-4 mb-6">
            <div>
              <span className="text-[#D94E28] font-mono text-[10px] tracking-widest uppercase block">
                ARCHIVAL STORAGE & ORDER VAULT
              </span>
              <h3 className="font-['Cinzel'] font-black text-2xl text-[#ECEAE4] mt-1">
                PHYSICAL EDITIONS CART
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-[#0A0A0B] text-[#8F8E8A] hover:text-white border border-[#27272D] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Cart Contents */}
          {isConfirmed ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0A0A0B] border border-[#38EF7D] rounded-full flex items-center justify-center text-[#38EF7D] mb-4">
                <Check size={28} />
              </div>
              <h4 className="font-['Cinzel'] font-black text-2xl text-[#ECEAE4]">
                RESERVATION REGISTERED
              </h4>
              <p className="font-mono text-xs text-[#8F8E8A] mt-2 max-w-xs leading-relaxed">
                Your archival physical edition reservation has been logged into the LITHOS dispatch ledger. Numbered copies are held for 72 hours.
              </p>
              <div className="mt-6 p-4 bg-[#0A0A0B] border border-[#27272D] text-[10px] font-mono text-[#8F8E8A] w-full text-left">
                <span>DISPATCH IDENTIFIER: LITH-VAULT-{Math.floor(100000 + Math.random() * 900000)}</span><br />
                <span>FREIGHT COURIER: DHL GEOLOGICAL SECURE COLD-CHAIN</span><br />
                <span>TOTAL WEIGHT: {totalGrams}g (HEAVYWEIGHT FREIGHT)</span>
              </div>
              <button
                onClick={handleFinish}
                className="mt-8 bg-[#D94E28] hover:bg-[#B83E1D] text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer w-full"
              >
                RETURN TO ARCHIVE
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center">
              <Disc size={42} className="text-[#27272D] mb-4" />
              <p className="font-['Cinzel'] text-lg text-[#8F8E8A]">VAULT CART IS EMPTY</p>
              <p className="font-mono text-xs text-[#8F8E8A] mt-1">
                Explore the Pressing Vault below to reserve 180g vinyl or 1/4" tape copies.
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#27272D]">
              {items.map(item => (
                <div key={item.edition.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[#D94E28] font-mono text-[10px] font-bold block">
                      {item.edition.catalogNumber}
                    </span>
                    <h4 className="font-['Cinzel'] font-bold text-sm text-[#ECEAE4] mt-0.5">
                      {item.edition.title}
                    </h4>
                    <span className="text-[#8F8E8A] text-[10px] font-mono block mt-1">
                      {item.edition.format} · {item.edition.weightGrams * item.quantity}g
                    </span>
                    <span className="text-[#ECEAE4] font-mono font-bold text-xs mt-1 block">
                      ${item.edition.priceUSD} each
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.edition.id)}
                      className="text-[#8F8E8A] hover:text-[#D94E28] transition-colors p-1"
                      title="Remove from vault cart"
                    >
                      <Trash2 size={13} />
                    </button>

                    <div className="flex items-center border border-[#27272D] bg-[#0A0A0B] text-xs font-mono">
                      <button
                        onClick={() => onUpdateQuantity(item.edition.id, -1)}
                        className="px-2 py-1 text-[#8F8E8A] hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-[#ECEAE4]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.edition.id, 1)}
                        className="px-2 py-1 text-[#8F8E8A] hover:text-white"
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
          <div className="border-t border-[#27272D] pt-6 mt-6">
            <div className="flex flex-col gap-2 font-mono text-xs mb-6">
              <div className="flex justify-between text-[#8F8E8A]">
                <span>TOTAL FREIGHT MASS</span>
                <span className="text-[#ECEAE4] font-bold">{totalGrams.toLocaleString()} g</span>
              </div>
              <div className="flex justify-between text-[#8F8E8A]">
                <span>EDITIONS SUBTOTAL</span>
                <span className="text-[#ECEAE4] font-bold">${subtotalUSD}</span>
              </div>
              <div className="flex justify-between text-[#8F8E8A]">
                <span>GEOLOGICAL SECURE FREIGHT</span>
                <span className="text-[#ECEAE4] font-bold">${shippingUSD}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#27272D] text-[#ECEAE4]">
                <span>TOTAL (USD)</span>
                <span className="text-[#D94E28] text-lg font-mono">${totalUSD}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmReservation}
              disabled={isCheckingOut}
              className="w-full bg-[#D94E28] hover:bg-[#B83E1D] text-white py-3.5 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {isCheckingOut ? (
                <span>REGISTERING RESERVATION...</span>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  CONFIRM PHYSICAL RESERVATION
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
