import { create } from 'zustand';

// Hum define kar rahe hain ki hamari memory mein kya-kya save hoga
interface AvatarState {
  hasAvatar: boolean;          // Kya user ne photo upload kar di hai? (True/False)
  setAvatarReady: () => void;  // Is function se hum True set karenge
}

export const useAvatarStore = create<AvatarState>((set) => ({
  hasAvatar: false, // Shuru mein kisi ka avatar nahi hota
  setAvatarReady: () => set({ hasAvatar: true }), // Avatar banne par isko call karenge
}));