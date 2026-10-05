"use client";
import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import Image from "next/image";

// Dummy data for our premium clothing line
const products = [
  {
    id: 1,
    name: "Oversized Cotton T-Shirt",
    brand: "ESSENTIALS",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    brand: "LEVI'S VINTAGE",
    price: "₹4,299",
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1770&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Tailored Linen Trousers",
    brand: "ZARA LUXE",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1897&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Minimalist Knit Sweater",
    brand: "H&M PREMIUM",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?q=80&w=1941&auto=format&fit=crop",
  }
];

export default function ProductGrid() {
  const [viewOnMe, setViewOnMe] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with our special Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-textMain mb-2">New Arrivals</h2>
            <p className="text-textMuted">Explore the latest styles, ready for virtual try-on.</p>
          </div>
          
          {/* The "View on Me" Toggle */}
          <div className="mt-6 md:mt-0 flex items-center space-x-3 bg-background border border-gray-200 rounded-full px-4 py-2">
            <Sparkles className={`w-5 h-5 ${viewOnMe ? 'text-magicAccent' : 'text-gray-400'}`} />
            <span className="text-sm font-semibold text-textMain">View on My Avatar</span>
            <button 
              onClick={() => setViewOnMe(!viewOnMe)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${viewOnMe ? 'bg-magicAccent' : 'bg-gray-300'}`}
            >
              <span className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${viewOnMe ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                {/* Product Image */}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* 3D Badge (Only shows if toggle is off, otherwise shows avatar preview logic) */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold tracking-wider text-magicAccent flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>3D READY</span>
                </div>
                
                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>

                {/* Simulated 3D Avatar Overlay (when toggle is ON) */}
                {viewOnMe && (
                  <div className="absolute inset-0 bg-magicAccent/10 backdrop-blur-[2px] flex items-center justify-center">
                    <p className="bg-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg text-magicAccent">
                      Rendering on Avatar...
                    </p>
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-widest text-textMuted mb-1">{product.brand}</span>
                <h3 className="text-sm font-medium text-textMain truncate">{product.name}</h3>
                <p className="mt-1 text-sm font-semibold text-textMain">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}