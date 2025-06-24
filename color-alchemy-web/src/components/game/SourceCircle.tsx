"use client";

import React from "react";
import { SourceCircleProps } from "./types";
import { SourceType } from "@/types/types";
import { useGameStore } from "@/store/slices/game/useGameStore";

const SourceCircle: React.FC<SourceCircleProps> = ({
  color,
  onClick,
  position,
  onDropColor,
}) => {
  const { clickCount } = useGameStore();

  const rgbString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  const isBlack = color.r === 0 && color.g === 0 && color.b === 0;

  const baseClasses =
    "w-8 h-8 rounded-full border border-white transition-transform";

  const interactionClass =
    isBlack && onClick && clickCount < 3
      ? "cursor-pointer hover:scale-105"
      : "cursor-default";

  const marginMap: Record<SourceType, string> = {
    top: "mb-1",
    left: "mr-1",
    right: "ml-1",
    bottom: "mt-1",
  };
  const marginClass = marginMap[position];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;
    const draggedColor = JSON.parse(data);
    if (onDropColor) onDropColor(draggedColor);
  };

  return (
    <div
      className={`${baseClasses} ${interactionClass} ${marginClass}`}
      title={rgbString}
      style={{ backgroundColor: rgbString }}
      onClick={isBlack && onClick ? onClick : undefined}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
};

export default SourceCircle;
