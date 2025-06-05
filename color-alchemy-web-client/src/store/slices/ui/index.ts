import { StateCreator } from "zustand";
import { StoreState } from "@/store/types";
import { UISlice } from "./types";
import { createUISlice as createUILogic } from "./actions";

export const createUISlice: StateCreator<StoreState, [], [], UISlice> = (
  ...args
) => createUILogic(...args);
