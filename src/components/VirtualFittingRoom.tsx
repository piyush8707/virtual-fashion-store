"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { X, Loader2, Info } from "lucide-react";
import { Suspense } from "react";
import { useAvatarStore } from "../store/useAvatarStore";

// Humne mannequin ko dynamic color lene ke liye ready kiya hai
function DummyAvatar({ clothColor }: { clothColor: string }) {
  return (
    <mesh position={[0, 1, 0]}>
      <capsuleGeometry args={[0.5, 1.5, 4, 16]} />
      {/* Ab yeh color kapde ke hisaab se change hoga */}
      <meshStandardMaterial 
        color={clothColor} 
        wireframe={true} 
        emissive={clothColor}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// Yahan humne bataya ki 3D room ko ab product ki details chahiye
export default function VirtualFittingRoom({ 
  onClose, 
  product 
}: { 
  onClose: () => void, 
  product: { name: string, brand: string, price: string } 
}) {
  const hasAvatar = useAvatarStore((state) => state.hasAvatar);

  // Agar avatar ban chuka hai, toh dummy ko green/teal color denge (realistic feel ke liye)
  const avatarColor = hasAvatar ? "#10B981" : "#4F46E5";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-studioDark/95 backdrop-blur-xl">
      
      {/* Top Navigation */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-start z-10 text-white">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-wider">AURA<span className="text-magicAccent">.</span> STUDIO</h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            {hasAvatar ? "CUSTOM MESH ACTIVE" : "STANDARD MESH ACTIVE"} // DRAG TO ROTATE
          </p>
        </div>
        
        <button onClick={onClose} className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Floating Product Info Panel inside 3D Room */}
      <div className="absolute top-24 left-6 z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-xs text-white">
        <div className="flex items-center space-x-2 text-magicAccent mb-2">
          <Info className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest uppercase">Currently Fitting</span>
        </div>
        <p className="text-xs text-gray-300 font-bold tracking-widest uppercase">{product.brand}</p>
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm font-semibold text-gray-400 mt-1">{product.price}</p>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
        <Suspense fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Loader2 className="w-10 h-10 animate-spin text-magicAccent mb-4" />
            <p className="font-mono text-sm tracking-widest text-gray-400">INITIALIZING ENGINE...</p>
          </div>
        }>
          <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} />
            
            <DummyAvatar clothColor={avatarColor} />

            <Environment preset="city" />
            <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
          </Canvas>
        </Suspense>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
          <button className="px-6 py-2 bg-magicAccent text-white text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:bg-indigo-500 transition-colors">
            Fit Check
          </button>
          <button className="px-6 py-2 text-white text-sm font-medium hover:text-magicAccent transition-colors">
            X-Ray View
          </button>
        </div>
      </div>
    </div>
  );
}