import { StateCreator } from "zustand";
import { StoreState } from "@/store/types";
import { GameSlice } from "./types";
import { createGameSlice as createGameLogic } from "./actions";

export const createGameSlice: StateCreator<StoreState, [], [], GameSlice> = (
  ...args
) => createGameLogic(...args);
