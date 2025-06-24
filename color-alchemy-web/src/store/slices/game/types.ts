import { RGB, Source, SourceType } from "@/types/types";

export interface GameActions {
  initGame: () => void;
  clickSource: (type: SourceType, index: number) => void;
  replaceSourceColor: (type: SourceType, index: number, newColor: RGB) => void;
  checkGameEnd: (minDelta: number) => void;
}

export interface GameState {
  grid: RGB[][];
  topSources: Source[];
  leftSources: Source[];
  bottomSources: Source[];
  rightSources: Source[];
  targetColor: RGB;
  closestColor: RGB;
  movesLeft: number;
  userId: string | null;
  clickCount: number;
  gameOver: boolean;
  minDelta: number;
  gameResult: "win" | "loss" | null;
}

export type GameSlice = GameState & GameActions;
