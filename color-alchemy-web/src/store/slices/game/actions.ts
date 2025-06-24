import { StateCreator } from "zustand";
import { GameSlice } from "./types";
import {
  recalculateGridFromAllSources,
  generateEmptyGrid,
  calculateColorDifference,
} from "@/utils/colorUtils";
import { fetchInitGameGql, recordGame } from "@/app/api/game/game";
import { StoreState } from "@/store/types";
import { initialGameState } from "./state";

export const createGameSlice: StateCreator<StoreState, [], [], GameSlice> = (
  set,
  get
) => ({
  ...initialGameState,

  initGame: async () => {
    try {
      const data = await fetchInitGameGql();

      const targetColor = {
        r: data.target[0],
        g: data.target[1],
        b: data.target[2],
      };

      const grid = generateEmptyGrid(data.width, data.height);
      const black = { r: 0, g: 0, b: 0 };
      const makeSources = (count: number) =>
        Array.from({ length: count }, () => ({ color: { ...black } }));

      const minDelta = calculateColorDifference(targetColor, black);

      set((state) => ({
        ...state,
        game: {
          ...state.game,
          grid,
          targetColor,
          closestColor: black,
          movesLeft: data.maxMoves,
          clickCount: 0,
          gameOver: false,
          gameResult: null,
          minDelta,
          topSources: makeSources(data.width),
          leftSources: makeSources(data.height),
          rightSources: makeSources(data.height),
          bottomSources: makeSources(data.width),
        },
      }));
    } catch (err) {
      console.error("initGame failed:", err);
    }
  },

  clickSource: (type, index) => {
    const {
      topSources,
      leftSources,
      rightSources,
      bottomSources,
      clickCount,
      movesLeft,
      grid,
      targetColor,
    } = get().game;

    if (clickCount >= 3 || movesLeft <= 0) return;

    const colors = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
    ];
    const selectedColor = colors[clickCount];

    if (type === "top") topSources[index].color = { ...selectedColor };
    if (type === "left") leftSources[index].color = { ...selectedColor };
    if (type === "bottom") bottomSources[index].color = { ...selectedColor };
    if (type === "right") rightSources[index].color = { ...selectedColor };

    const { normalizedGrid, closestColor, minDelta } =
      recalculateGridFromAllSources({
        width: grid[0].length,
        height: grid.length,
        topSources,
        leftSources,
        rightSources,
        bottomSources,
        targetColor,
      });

    set((state) => ({
      ...state,
      game: {
        ...state.game,
        grid: normalizedGrid,
        closestColor,
        minDelta,
        topSources: [...topSources],
        leftSources: [...leftSources],
        rightSources: [...rightSources],
        bottomSources: [...bottomSources],
        clickCount: clickCount + 1,
        movesLeft: movesLeft - 1,
      },
    }));

    get().game.checkGameEnd(minDelta);
  },

  replaceSourceColor: (type, index, newColor) => {
    const game = get().game;
    const sources = game[`${type}Sources`];
    if (!sources[index]) return;

    sources[index].color = { ...newColor };

    const {
      grid,
      topSources,
      leftSources,
      rightSources,
      bottomSources,
      targetColor,
      movesLeft,
    } = game;

    const { normalizedGrid, closestColor, minDelta } =
      recalculateGridFromAllSources({
        width: grid[0].length,
        height: grid.length,
        topSources,
        leftSources,
        rightSources,
        bottomSources,
        targetColor,
      });

    set((state) => ({
      ...state,
      game: {
        ...state.game,
        grid: normalizedGrid,
        closestColor,
        minDelta,
        movesLeft: movesLeft - 1,
        topSources: [...topSources],
        leftSources: [...leftSources],
        rightSources: [...rightSources],
        bottomSources: [...bottomSources],
      },
    }));

    get().game.checkGameEnd(minDelta);
  },

  checkGameEnd: async (minDelta) => {
    const { movesLeft } = get().game;
    const { user } = get().auth;

    let result: "win" | "loss" | null = null;

    if (minDelta < 0.1) {
      result = "win";
    } else if (movesLeft <= 0) {
      result = "loss";
    }

    if (!result) return; // game not over yet

    // Always update game result
    set((state) => ({
      ...state,
      game: {
        ...state.game,
        gameOver: true,
        gameResult: result,
      },
    }));

    // Only call mutation if user is logged in
    if (!user) return;

    try {
      const stats = await recordGame(result === "win");

      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          user: {
            ...state.auth.user!,
            stats,
          },
        },
      }));
    } catch (err) {
      console.error("Failed to record game result:", err);
    }
  },
});
