"use client";

import React from "react";
import { TileSquareProps } from "./types";
import { useGameStore } from "@/store/slices/game/useGameStore";

const TileSquare: React.FC<TileSquareProps> = ({ r, g, b, isClosest }) => {
  const colorStr = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  const { clickCount } = useGameStore();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ r, g, b }));
  };

  const cursorStyle = clickCount >= 3 ? "cursor-pointer" : "cursor-default";

  return (
    <div
      className={`w-8 h-8 rounded border ${cursorStyle} ${
        isClosest ? "border-red-500 border-2" : "border-white"
      }`}
      title={colorStr}
      style={{ backgroundColor: colorStr }}
      draggable={clickCount >= 3}
      onDragStart={clickCount >= 3 ? handleDragStart : undefined}
    ></div>
  );
};

export default TileSquare;
