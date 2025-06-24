export interface UIState {
  isLightMode: boolean;
  showRGBValues: boolean;
}

export interface UIActions {
  toggleLightMode: () => void;
  toggleShowRGBValues: () => void;
}

export type UISlice = UIState & UIActions;
