import { GameState } from "./types";

export const initialGameState: GameState = {
  grid: [],
  topSources: [],
  leftSources: [],
  rightSources: [],
  bottomSources: [],
  targetColor: { r: 0, g: 0, b: 0 },
  closestColor: { r: 0, g: 0, b: 0 },
  movesLeft: 0,
  userId: null,
  clickCount: 0,
  gameOver: false,
  gameResult: null,
  minDelta: Infinity,
};
