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

  const subtotalUSD = items.reduce((sum, item) => sum + item.edition.priceUSD * item.quantity, 0);
  const shippingUSD = items.length > 0 ? 12 : 0;
  const totalUSD = subtotalUSD + shippingUSD;

  const handleConfirmReservation = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsConfirmed(true);
      onToast("Order received. Confirmation email sent.");
    }, 900);
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
        className="bg-[#161619] border-l border-[#2a2a30] w-full max-w-md h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl relative select-none overflow-y-auto font-sans text-[#e5e5e7] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex justify-between items-center border-b border-[#222226] pb-4 mb-6">
            <h3 className="font-bold text-xl text-white">
              Your Cart
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8e8e93] hover:text-white rounded-sm hover:bg-[#222226] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Contents */}
          {isConfirmed ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#141416] border border-[#e04528] rounded-full flex items-center justify-center text-[#e04528] mb-4">
                <Check size={24} />
              </div>
              <h4 className="font-bold text-xl text-white">
                Order Confirmed
              </h4>
              <p className="text-xs text-[#8e8e93] mt-2 max-w-xs leading-relaxed">
                Thank you for your order. We are preparing your vinyl shipment.
              </p>
              <button
                onClick={handleFinish}
                className="mt-8 bg-[#e04528] hover:bg-[#c93b20] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors cursor-pointer w-full"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center">
              <Disc size={40} className="text-[#25252b] mb-3" />
              <p className="text-sm text-[#8e8e93]">Your cart is currently empty.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#222226]">
              {items.map(item => (
                <div key={item.edition.id} className="py-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <span className="text-[#e04528] text-xs font-semibold block">
                      {item.edition.catalogNumber}
                    </span>
                    <h4 className="font-semibold text-sm text-white mt-0.5">
                      {item.edition.title.split(":")[0]}
                    </h4>
                    <span className="text-[#8e8e93] text-xs block mt-0.5">
                      {item.edition.format.split(" ")[0]} · ${item.edition.priceUSD} each
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.edition.id)}
                      className="text-[#636366] hover:text-[#e04528] transition-colors p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="flex items-center border border-[#2a2a30] bg-[#0c0c0d] rounded-sm text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.edition.id, -1)}
                        className="px-2 py-1 text-[#8e8e93] hover:text-white cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-semibold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.edition.id, 1)}
                        className="px-2 py-1 text-[#8e8e93] hover:text-white cursor-pointer"
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
          <div className="border-t border-[#222226] pt-6 mt-6">
            <div className="flex flex-col gap-2 text-xs mb-6">
              <div className="flex justify-between text-[#8e8e93]">
                <span>Subtotal</span>
                <span className="text-white font-semibold">${subtotalUSD}</span>
              </div>
              <div className="flex justify-between text-[#8e8e93]">
                <span>Standard Shipping</span>
                <span className="text-white font-semibold">${shippingUSD}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-[#222226] text-white">
                <span>Total</span>
                <span className="text-[#e04528] text-base">${totalUSD} USD</span>
              </div>
            </div>

            <button
              onClick={handleConfirmReservation}
              disabled={isCheckingOut}
              className="w-full bg-[#e04528] hover:bg-[#c93b20] text-white py-3.5 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
