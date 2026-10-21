"use client";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeFromCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]" 
        onClick={toggleCart}
      />
      
      {/* Side Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-surface z-[120] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-textMain" />
            <h2 className="font-heading text-xl font-bold text-textMain">Your Cart ({items.length})</h2>
          </div>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-textMuted space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex space-x-4">
                  <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-textMain">{item.name}</h3>
                      <p className="text-xs text-textMuted mt-1">Size: {item.size}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-sm font-bold text-textMain">{item.price}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <button className="w-full py-4 bg-textMain text-white font-semibold rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors shadow-lg">
              <span>Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}