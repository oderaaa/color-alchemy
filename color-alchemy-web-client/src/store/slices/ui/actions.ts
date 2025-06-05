import { StateCreator } from "zustand";
import { UISlice } from "./types";
import { StoreState } from "@/store/types";
import { initialUIState } from "./state";

export const createUISlice: StateCreator<StoreState, [], [], UISlice> = (
  set,
  get
) => ({
  ...initialUIState,

  toggleLightMode: () => {
    set((state) => ({
      ...state,
      ui: {
        ...state.ui,
        isLightMode: !state.ui.isLightMode,
      },
    }));
  },

  toggleShowRGBValues: () => {
    set((state) => ({
      ...state,
      ui: {
        ...state.ui,
        showRGBValues: !state.ui.showRGBValues,
      },
    }));
  },
});
