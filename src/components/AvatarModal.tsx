"use client";
import { useState } from "react";
import { X, UploadCloud, Camera, Sparkles, CheckCircle2 } from "lucide-react";
import { useAvatarStore } from "../store/useAvatarStore";

// Backend URL configuration - Professional way to handle API URLs in frontend code
const BACKEND_API_URL = "http://localhost:8000";

export default function AvatarModal({ onClose }: { onClose: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Initializing Engine...");
  const [progress, setProgress] = useState(0);
  
  const setAvatarReady = useAvatarStore((state) => state.setAvatarReady);

  const handleUpload = () => {
    setIsUploading(true);
    setProgress(5); // Initial progress

    // Yahan hum FastAPI ke SSE stream se connect kar rahe hain
    const eventSource = new EventSource(`${BACKEND_API_URL}/api/stream-avatar`);

    // Jaise hi naya data (tukda) aayega, yeh function chalega
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLoadingMessage(data.message);
      setProgress(data.progress);

      if (data.progress === 100) {
        eventSource.close(); // Stream band kar do
        setIsUploading(false);
        setIsSuccess(true);
        setAvatarReady();
        
        setTimeout(() => onClose(), 2000);
      }
    };

    // Agar connection tut jaye
    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
      setLoadingMessage("Connection failed. Try again.");
    };
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-surface w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl transform transition-all">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="font-heading text-2xl font-bold text-textMain">Create 3D Twin</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center">
          
          {isSuccess ? (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-textMain mb-2">Avatar Generated!</h3>
              <p className="text-textMuted text-sm">Your 3D twin is ready for the virtual fitting room.</p>
            </div>
          ) : isUploading ? (
            <div className="flex flex-col items-center text-center w-full">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-magicAccent rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-magicAccent animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-textMain mb-2">{loadingMessage}</h3>
              <p className="text-textMuted text-sm">{progress}% Complete</p>
              
              {/* Dynamic Progress Bar */}
              <div className="w-full bg-gray-100 h-2 rounded-full mt-6 overflow-hidden">
                <div 
                  className="bg-magicAccent h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-24 h-24 bg-magicAccent/10 text-magicAccent rounded-full flex items-center justify-center mb-6">
                <Camera className="w-10 h-10" />
              </div>
              <p className="text-center text-textMuted text-sm mb-8">
                Upload a full-body, front-facing photo with good lighting for the most accurate 3D measurements.
              </p>

              <div 
                onClick={handleUpload}
                className="w-full border-2 border-dashed border-gray-300 hover:border-magicAccent bg-gray-50 hover:bg-magicAccent/5 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors group"
              >
                <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-magicAccent mb-3 transition-colors" />
                <span className="text-sm font-semibold text-textMain">Click to upload photo</span>
                <span className="text-xs text-gray-400 mt-1">JPEG, PNG up to 10MB</span>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}