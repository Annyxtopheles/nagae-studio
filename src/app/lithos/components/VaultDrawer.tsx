import React, { useState } from "react";
import { X, Disc, Trash2, ShoppingBag, Check, ShieldCheck } from "lucide-react";
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
  const shippingUSD = items.length > 0 ? 14 : 0;
  const totalUSD = subtotalUSD + shippingUSD;

  const handleConfirmReservation = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsConfirmed(true);
      onToast("Mailorder order confirmed. Dispatched to fulfillment ledger.");
    }, 1000);
  };

  const handleFinish = () => {
    setIsConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex justify-end">
      <div className="bg-[#161619] border-l border-[#2e2e34] w-full max-w-md h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl relative select-none overflow-y-auto font-mono text-[#E6E4DC]">
        {/* Drawer Header */}
        <div>
          <div className="flex justify-between items-start border-b border-[#25252b] pb-4 mb-6">
            <div>
              <span className="text-[#A83824] text-[10px] tracking-widest uppercase block font-semibold">
                MAILORDER // PHYSICAL ARCHIVE
              </span>
              <h3 className="font-['Cinzel'] font-black text-2xl text-[#E6E4DC] mt-1">
                YOUR ORDER CART
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-[#0c0c0d] text-[#73716B] hover:text-[#E6E4DC] border border-[#25252b] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Cart Contents */}
          {isConfirmed ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0c0c0d] border border-[#A83824] rounded-full flex items-center justify-center text-[#A83824] mb-4">
                <Check size={28} />
              </div>
              <h4 className="font-['Cinzel'] font-black text-2xl text-[#E6E4DC]">
                ORDER REGISTERED
              </h4>
              <p className="text-xs text-[#9E9B91] mt-2 max-w-xs leading-relaxed">
                Your physical edition order has been logged in our Reykjavik fulfillment ledger. All vinyl is packed outside sleeves to prevent seam splits.
              </p>
              <div className="mt-6 p-4 bg-[#0c0c0d] border border-[#25252b] text-[10px] text-[#73716B] w-full text-left space-y-1">
                <div>ORDER ID: LITH-ORDER-{Math.floor(100000 + Math.random() * 900000)}</div>
                <div>DISPATCH: TRACKED AIRMAIL (HEAVY CARDBOARD)</div>
                <div>TOTAL WEIGHT: {totalGrams}g</div>
              </div>
              <button
                onClick={handleFinish}
                className="mt-8 bg-[#A83824] hover:bg-[#8F2F1E] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer w-full"
              >
                RETURN TO CATALOG
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center">
              <Disc size={42} className="text-[#25252b] mb-4" />
              <p className="font-['Cinzel'] text-lg text-[#73716B]">YOUR CART IS EMPTY</p>
              <p className="text-xs text-[#575651] mt-1">
                Select an edition from the catalog to order physical copies.
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#25252b]">
              {items.map(item => (
                <div key={item.edition.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[#A83824] text-[10px] font-bold block">
                      {item.edition.catalogNumber}
                    </span>
                    <h4 className="font-['Cinzel'] font-bold text-sm text-[#E6E4DC] mt-0.5">
                      {item.edition.title}
                    </h4>
                    <span className="text-[#73716B] text-[10px] block mt-1">
                      {item.edition.format} · {item.edition.weightGrams * item.quantity}g
                    </span>
                    <span className="text-[#E6E4DC] font-bold text-xs mt-1 block">
                      ${item.edition.priceUSD} each
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.edition.id)}
                      className="text-[#73716B] hover:text-[#A83824] transition-colors p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>

                    <div className="flex items-center border border-[#2e2e34] bg-[#0c0c0d] text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.edition.id, -1)}
                        className="px-2 py-1 text-[#73716B] hover:text-[#E6E4DC] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-[#E6E4DC]">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.edition.id, 1)}
                        className="px-2 py-1 text-[#73716B] hover:text-[#E6E4DC] cursor-pointer"
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
          <div className="border-t border-[#25252b] pt-6 mt-6">
            <div className="flex flex-col gap-2 text-xs mb-6">
              <div className="flex justify-between text-[#73716B]">
                <span>TOTAL WEIGHT</span>
                <span className="text-[#E6E4DC] font-bold">{totalGrams.toLocaleString()} g</span>
              </div>
              <div className="flex justify-between text-[#73716B]">
                <span>SUBTOTAL</span>
                <span className="text-[#E6E4DC] font-bold">${subtotalUSD}</span>
              </div>
              <div className="flex justify-between text-[#73716B]">
                <span>TRACKED COURIER SHIPPING</span>
                <span className="text-[#E6E4DC] font-bold">${shippingUSD}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#25252b] text-[#E6E4DC]">
                <span>TOTAL (USD)</span>
                <span className="text-[#A83824] text-lg font-mono">${totalUSD}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmReservation}
              disabled={isCheckingOut}
              className="w-full bg-[#A83824] hover:bg-[#8F2F1E] text-white py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {isCheckingOut ? (
                <span>REGISTERING ORDER...</span>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  CONFIRM PHYSICAL MAILORDER
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
