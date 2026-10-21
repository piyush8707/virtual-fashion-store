"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { X, Loader2, Info, Palette } from "lucide-react";
import { Suspense, useRef, useState } from "react";
import { useAvatarStore } from "../store/useAvatarStore";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Hologram mein ab 'garmentColor' bhi pass ho raha hai
function HologramAvatar({ color, isFitting, garmentColor }: { color: string, isFitting: boolean, garmentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05 - 1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.8} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.3, 16]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Torso (Chest & Stomach) - Color update dynamically */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.6, 0.5, 1.5, 32]} />
        <meshStandardMaterial 
          color={isFitting ? garmentColor : color} 
          wireframe={!isFitting} 
          emissive={isFitting ? garmentColor : color} 
          emissiveIntensity={isFitting ? 0.2 : 0.4} 
        />
      </mesh>

      {/* Shoulders / Sleeves */}
      <mesh position={[0, 1.9, 0]}>
        <capsuleGeometry args={[0.15, 1.4, 16, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={isFitting ? garmentColor : color} 
          wireframe={!isFitting} 
          emissive={isFitting ? garmentColor : color} 
          emissiveIntensity={isFitting ? 0.2 : 0.6} 
        />
      </mesh>
    </group>
  );
}

export default function VirtualFittingRoom({ 
  onClose, 
  product 
}: { 
  onClose: () => void, 
  product: { name: string, brand: string, price: string } 
}) {
  const hasAvatar = useAvatarStore((state) => state.hasAvatar);
  const [isFitting, setIsFitting] = useState(false);
  const [xRayMode, setXRayMode] = useState(false);
  
  // Naya state color change karne ke liye
  const [garmentColor, setGarmentColor] = useState("#F3F4F6"); // Default White/Grey

  const avatarColor = hasAvatar ? "#10B981" : "#4F46E5";

  // Available colors array
  const colors = [
    { name: "Arctic White", hex: "#F3F4F6" },
    { name: "Obsidian Black", hex: "#1F2937" },
    { name: "Crimson Red", hex: "#DC2626" },
    { name: "Ocean Blue", hex: "#2563EB" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-studioDark/95 backdrop-blur-xl">
      
      <div className="absolute top-0 w-full p-6 flex justify-between items-start z-10 text-white">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-wider">AURA<span className="text-magicAccent">.</span> STUDIO</h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            {hasAvatar ? "CUSTOM AI HOLOGRAM ACTIVE" : "STANDARD HOLOGRAM ACTIVE"} // DRAG TO ROTATE
          </p>
        </div>
        
        <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute top-24 left-6 z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-xs text-white transition-all duration-300">
        <div className="flex items-center space-x-2 text-magicAccent mb-2">
          <Info className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">Currently Fitting</span>
        </div>
        <p className="text-xs text-gray-300 font-bold tracking-widest uppercase">{product.brand}</p>
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm font-semibold text-gray-400 mt-1">{product.price}</p>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-gray-400">STATUS:</span>
            <span className={isFitting ? "text-green-400" : "text-magicAccent"}>
              {isFitting ? "GARMENT APPLIED" : "AWAITING FIT"}
            </span>
          </div>
        </div>

        {/* NAYA FEATURE: Real-time Color Picker (Sirf tab dikhega jab Fit Check on ho) */}
        {isFitting && (
          <div className="mt-6 pt-4 border-t border-white/10 animate-in fade-in duration-300">
            <div className="flex items-center space-x-2 text-gray-300 mb-3">
              <Palette className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Select Color</span>
            </div>
            <div className="flex space-x-3">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setGarmentColor(c.hex)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    garmentColor === c.hex ? "border-magicAccent scale-110 shadow-[0_0_10px_rgba(79,70,229,0.8)]" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Suspense fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Loader2 className="w-10 h-10 animate-spin text-magicAccent mb-4" />
            <p className="font-mono text-sm tracking-widest text-gray-400">INITIALIZING 3D HOLOGRAM...</p>
          </div>
        }>
          <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
            <ambientLight intensity={1} />
            <spotLight position={[5, 5, 5]} angle={0.2} penumbra={1} intensity={2} />
            
            <HologramAvatar 
              color={xRayMode ? "#EF4444" : avatarColor} 
              isFitting={isFitting} 
              garmentColor={garmentColor}
            />

            <Environment preset="city" />
            <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={10} blur={2} far={4} />
            
            <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
          </Canvas>
        </Suspense>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
          <button 
            onClick={() => setIsFitting(!isFitting)}
            className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              isFitting 
              ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.5)]' 
              : 'bg-magicAccent text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:bg-indigo-500'
            }`}
          >
            {isFitting ? 'Remove Garment' : 'Fit Check'}
          </button>
          
          <button 
            onClick={() => setXRayMode(!xRayMode)}
            className={`px-6 py-2 text-sm font-medium transition-colors rounded-full ${
              xRayMode ? 'text-red-400 bg-red-400/10' : 'text-white hover:text-magicAccent'
            }`}
          >
            X-Ray View
          </button>
        </div>
      </div>
    </div>
  );
}