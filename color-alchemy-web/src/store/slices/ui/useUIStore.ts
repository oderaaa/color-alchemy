import { useStore } from "@/store/useStore";
export const useUIStore = () => useStore((state) => state.ui);
