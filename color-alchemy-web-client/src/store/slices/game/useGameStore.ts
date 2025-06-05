import { useStore } from "@/store/useStore";
export const useGameStore = () => useStore((state) => state.game);
