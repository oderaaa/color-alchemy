import { useStore } from "@/store/useStore";
export const useAuthStore = () => useStore((state) => state.auth);
