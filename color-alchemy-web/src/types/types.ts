export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Source {
  color: RGB;
}

export type SourceType = "top" | "left" | "bottom" | "right";
