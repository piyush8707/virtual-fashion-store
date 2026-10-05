"use client";
import { Search, ShoppingBag, Heart, UserCircle2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useAvatarStore } from "../store/useAvatarStore"; // Dimag import kiya

export default function Navbar() {
  // Yahan hum memory se check kar rahe hain ki avatar hai ya nahi
  const hasAvatar = useAvatarStore((state) => state.hasAvatar);

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading text-2xl font-bold tracking-wider">
              AURA<span className="text-magicAccent">.</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-10">
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-magicAccent transition-colors">MEN</Link>
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-magicAccent transition-colors">WOMEN</Link>
            <Link href="#" className="text-sm font-medium tracking-wide hover:text-magicAccent transition-colors">NEW ARRIVALS</Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-textMain hover:text-magicAccent transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-textMain hover:text-magicAccent transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-textMain hover:text-magicAccent transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-magicAccent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            
            {/* The Special 3D Avatar Identity Button */}
            <button className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all border ${
              hasAvatar 
              ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' // Agar avatar hai toh yeh design
              : 'bg-gray-50 border-gray-200 hover:border-magicAccent hover:text-magicAccent text-textMain' // Normal design
            }`}>
              {hasAvatar ? <CheckCircle2 className="w-5 h-5" /> : <UserCircle2 className="w-5 h-5" />}
              <span className="text-xs font-semibold">
                {hasAvatar ? "Avatar Ready" : "My Avatar"}
              </span>
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}