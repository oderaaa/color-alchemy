import { create } from "zustand";
import { createGameSlice } from "./slices/game";
import { createAuthSlice } from "./slices/auth";
import { createUISlice } from "./slices/ui";
import { StoreState } from "./types";

export const useStore = create<StoreState>()((...args) => ({
  game: createGameSlice(...args),
  ui: createUISlice(...args),
  auth: createAuthSlice(...args),
}));
