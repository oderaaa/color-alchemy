import { StateCreator } from "zustand";
import { createAuthSlice as createAuthLogic } from "./actions";
import { AuthSlice } from "./types";
import { StoreState } from "@/store/types";

export const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (
  ...args
) => createAuthLogic(...args);
