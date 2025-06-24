import { RGB, Source } from "@/types/types";

export function recalculateGridFromAllSources({
  width,
  height,
  topSources,
  bottomSources,
  leftSources,
  rightSources,
  targetColor,
}: {
  width: number;
  height: number;
  topSources: Source[];
  bottomSources: Source[];
  leftSources: Source[];
  rightSources: Source[];
  targetColor: RGB;
}) {
  // 1. Start with a black grid
  const grid: RGB[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ r: 0, g: 0, b: 0 }))
  );

  // 2. Apply top sources
  topSources.forEach((source, col) => {
    for (let row = 0; row < height; row++) {
      const d = Math.abs(row);
      const falloff = (height + 1 - d) / (height + 1);
      grid[row][col].r += source.color.r * falloff;
      grid[row][col].g += source.color.g * falloff;
      grid[row][col].b += source.color.b * falloff;
    }
  });

  // 3. Apply bottom sources
  bottomSources.forEach((source, col) => {
    for (let row = 0; row < height; row++) {
      const d = Math.abs(height - 1 - row);
      const falloff = (height + 1 - d) / (height + 1);
      grid[row][col].r += source.color.r * falloff;
      grid[row][col].g += source.color.g * falloff;
      grid[row][col].b += source.color.b * falloff;
    }
  });

  // 4. Apply left sources
  leftSources.forEach((source, row) => {
    for (let col = 0; col < width; col++) {
      const d = Math.abs(col);
      const falloff = (width + 1 - d) / (width + 1);
      grid[row][col].r += source.color.r * falloff;
      grid[row][col].g += source.color.g * falloff;
      grid[row][col].b += source.color.b * falloff;
    }
  });

  // 5. Apply right sources
  rightSources.forEach((source, row) => {
    for (let col = 0; col < width; col++) {
      const d = Math.abs(width - 1 - col);
      const falloff = (width + 1 - d) / (width + 1);
      grid[row][col].r += source.color.r * falloff;
      grid[row][col].g += source.color.g * falloff;
      grid[row][col].b += source.color.b * falloff;
    }
  });

  // 6. Normalize grid
  const normalizedGrid = grid.map((row) =>
    row.map((tile) => {
      const max = Math.max(tile.r, tile.g, tile.b, 255);
      const f = 255 / max;
      return {
        r: tile.r * f,
        g: tile.g * f,
        b: tile.b * f,
      };
    })
  );

  // 7. Find closest color match
  const { closestColor, minDelta } = calculateClosestTile(
    normalizedGrid,
    targetColor
  );

  return { normalizedGrid, closestColor, minDelta };
}

export const generateEmptyGrid = (w: number, h: number): RGB[][] => {
  return Array.from({ length: h }, () =>
    Array.from({ length: w }, () => ({ r: 0, g: 0, b: 0 }))
  );
};

export const calculateColorDifference = (c1: RGB, c2: RGB): number => {
  const delta = Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
  );
  return (1 / 255 / Math.sqrt(3)) * delta;
};

export const calculateClosestTile = (
  grid: RGB[][],
  target: RGB
): { closestColor: RGB; minDelta: number } => {
  let minDelta = Infinity;
  let closestColor = { r: 0, g: 0, b: 0 };

  for (const row of grid) {
    for (const tile of row) {
      const d = calculateColorDifference(tile, target);
      if (d < minDelta) {
        minDelta = d;
        closestColor = tile;
      }
    }
  }
  return { closestColor, minDelta };
};

export const colorToString = (color: { r: number; g: number; b: number }) =>
  `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
