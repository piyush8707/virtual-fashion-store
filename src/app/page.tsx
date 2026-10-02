"use client";
import { motion } from "framer-motion";
import { Sparkles, UserCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden relative">
      
      {/* Background Subtle Gradient Effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magicAccent/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-magicAccent/10 text-magicAccent text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              {/* Yahan maine text change kar diya hai */}
              <span>Next-Gen 3D Virtual Fitting</span> 
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Don't just browse. <br />
              <span className="italic font-light text-gray-500">Try it on.</span>
            </h1>
            
            <p className="text-lg text-textMuted max-w-md">
              Upload a single photo and let our AI create your exact 3D twin. Mix, match, and see how clothes actually fit your body before you buy.
            </p>
            
            <button className="group relative px-8 py-4 bg-textMain text-white font-medium rounded-full overflow-hidden shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_0px_rgba(79,70,229,0.6)] transition-all duration-300">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-magicAccent to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>Create Your 3D Twin</span>
              </span>
            </button>
          </motion.div>

          {/* Right Content - Visual Placeholder for 3D Canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale"></div>
            
            <div className="relative text-center z-10 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full border border-dashed border-gray-400 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                <UserCircle2 className="w-10 h-10 text-gray-400" />
              </div>
              <p className="font-heading text-xl text-gray-500 italic">3D Canvas Area</p>
              <p className="text-sm text-gray-400 mt-2">Your interactive avatar will render here</p>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}