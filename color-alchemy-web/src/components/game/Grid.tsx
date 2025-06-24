"use client";

import React from "react";
import { useGameStore } from "@/store/slices/game/useGameStore";
import SourceCircle from "./SourceCircle";
import TileSquare from "./TileSquare";

const Grid = () => {
  const {
    grid,
    targetColor,
    closestColor,
    topSources,
    leftSources,
    rightSources,
    bottomSources,
    clickSource,
    replaceSourceColor,
  } = useGameStore();

  let hasHighlighted = false;

  if (!grid.length || !topSources.length || !leftSources.length) return null;

  const width = grid[0].length;
  const height = grid.length;

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden">
      <div
        className="grid gap-1 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${width + 2}, minmax(1.75rem, 2rem))`,
          width: "fit-content",
        }}
      >
        {/* Empty top-left cell */}
        <div className="w-8 h-8" />

        {/* Top source circles */}
        {topSources.map((source, colIndex) => (
          <SourceCircle
            key={`top-${colIndex}`}
            color={source.color}
            position="top"
            onClick={() => clickSource("top", colIndex)}
            onDropColor={(newColor) =>
              replaceSourceColor("top", colIndex, newColor)
            }
          />
        ))}

        {/* Empty top-right cell */}
        <div className="w-8 h-8" />

        {/* Left sources + tile rows + right sources */}
        {grid.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {/* Left source */}
            <SourceCircle
              color={leftSources[rowIndex].color}
              position="left"
              onClick={() => clickSource("left", rowIndex)}
              onDropColor={(newColor) =>
                replaceSourceColor("left", rowIndex, newColor)
              }
            />

            {/* Tile row */}
            {row.map((tile, colIndex) => {
              const isClosestMatch =
                tile.r === closestColor.r &&
                tile.g === closestColor.g &&
                tile.b === closestColor.b;

              let isClosest = false;
              if (isClosestMatch && !hasHighlighted) {
                isClosest = true;
                hasHighlighted = true;
              }

              return (
                <TileSquare
                  key={`${rowIndex}-${colIndex}`}
                  r={tile.r}
                  g={tile.g}
                  b={tile.b}
                  isClosest={isClosest}
                />
              );
            })}

            {/* Right source */}
            <SourceCircle
              color={rightSources[rowIndex].color}
              position="right"
              onClick={() => clickSource("right", rowIndex)}
              onDropColor={(newColor) =>
                replaceSourceColor("right", rowIndex, newColor)
              }
            />
          </React.Fragment>
        ))}

        {/* Empty bottom-left cell */}
        <div className="w-8 h-8" />

        {/* Bottom source circles */}
        {bottomSources.map((source, colIndex) => (
          <SourceCircle
            key={`bottom-${colIndex}`}
            color={source.color}
            position="bottom"
            onClick={() => clickSource("bottom", colIndex)}
            onDropColor={(newColor) =>
              replaceSourceColor("bottom", colIndex, newColor)
            }
          />
        ))}

        {/* Empty bottom-right cell */}
        <div className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Grid;
