"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Heart, Ruler, Sparkles, ChevronRight, ShieldCheck } from "lucide-react";
// YAHAN PATH FIX KIYA HAI:
import VirtualFittingRoom from "../../../components/VirtualFittingRoom";

export default function ProductPage() {
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState("M");
  const [is3DOpen, setIs3DOpen] = useState(false);

  const product = {
    name: "Oversized Cotton T-Shirt",
    brand: "ESSENTIALS",
    price: "₹1,499",
    description: "Crafted from 100% heavyweight organic cotton. This oversized piece features a dropped shoulder and a relaxed drape for a modern, effortless silhouette.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    sizes: ["S", "M", "L", "XL"]
  };

  return (
    <>
      <div className="min-h-screen bg-background pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center space-x-2 text-sm text-textMuted mb-8">
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>Men</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-textMain font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold tracking-wider text-magicAccent flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span>3D TRY-ON ENABLED</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-sm font-bold tracking-widest text-textMuted uppercase mb-2">{product.brand}</h2>
              <h1 className="font-heading text-4xl font-bold text-textMain mb-4">{product.name}</h1>
              <p className="text-2xl font-medium text-textMain mb-6">{product.price}</p>
              <p className="text-textMuted leading-relaxed mb-8">{product.description}</p>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-textMain">Select Size</span>
                  <button className="text-sm text-gray-500 flex items-center space-x-1 hover:text-textMain">
                    <Ruler className="w-4 h-4" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex space-x-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium border transition-all ${
                        selectedSize === size 
                        ? 'border-textMain bg-textMain text-white' 
                        : 'border-gray-300 text-textMain hover:border-textMain'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => setIs3DOpen(true)}
                  className="w-full py-4 bg-magicAccent text-white font-semibold rounded-xl flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Try it in 3D Fitting Room</span>
                </button>
                
                <div className="flex space-x-4">
                  <button className="flex-1 py-4 bg-white border border-gray-300 text-textMain font-semibold rounded-xl hover:border-textMain transition-colors">
                    Add to Cart
                  </button>
                  <button className="p-4 bg-white border border-gray-300 text-textMain rounded-xl hover:border-red-500 hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center space-x-6 text-sm text-textMuted">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span>AI Size Guarantee</span>
                </div>
                <span>•</span>
                <span>Free returns within 14 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {is3DOpen && <VirtualFittingRoom onClose={() => setIs3DOpen(false)} />}
    </>
  );
}