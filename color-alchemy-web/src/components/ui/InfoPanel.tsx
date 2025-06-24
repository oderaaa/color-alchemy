"use client";

import React from "react";
import { colorToString } from "@/utils/colorUtils";
import { useUIStore } from "@/store/slices/ui/useUIStore";
import { useGameStore } from "@/store/slices/game/useGameStore";

const InfoPanel = () => {
  const { isLightMode, showRGBValues, toggleLightMode, toggleShowRGBValues } =
    useUIStore();
  const descriptionLabel = isLightMode ? "text-black" : "text-white";
  const { targetColor, closestColor, movesLeft, minDelta } = useGameStore();

  return (
    <div
      className={`p-4 rounded-lg mb-6 w-[90%] max-w-2xl shadow-2xl opacity-70 transition-colors duration-300 ${
        isLightMode ? "bg-gray-300 text-black" : "bg-gray-800 text-white"
      }`}
    >
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isLightMode}
            onChange={toggleLightMode}
          />
          Light Theme
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showRGBValues}
            onChange={toggleShowRGBValues}
          />
          Show RGB Values
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className={`${descriptionLabel}`}>Moves Left:</p>
          <p className="font-bold">{movesLeft}</p>
        </div>

        <div>
          <p className={`${descriptionLabel}`}>Target Color:</p>
          <div
            className="w-10 h-6 rounded border"
            title={colorToString(targetColor)}
            style={{ backgroundColor: colorToString(targetColor) }}
          ></div>
          {showRGBValues && (
            <p className="text-xs mt-1">{colorToString(targetColor)}</p>
          )}
        </div>

        <div>
          <p className={`${descriptionLabel}`}>Closest Color:</p>
          <div
            className="w-10 h-6 rounded border"
            title={colorToString(closestColor)}
            style={{ backgroundColor: colorToString(closestColor) }}
          ></div>
          {showRGBValues && (
            <p className="text-xs mt-1">{colorToString(closestColor)}</p>
          )}
        </div>

        <div>
          <p className={`${descriptionLabel}`}>Color Δ:</p>
          <p className="font-bold">{(minDelta * 100).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
