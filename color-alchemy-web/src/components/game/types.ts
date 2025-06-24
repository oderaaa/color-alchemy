import { RGB, SourceType } from "@/types/types";

export interface SourceCircleProps {
  color: RGB;
  onClick?: () => void;
  position: SourceType;
  onDropColor?: (color: RGB) => void;
}

export interface TileSquareProps {
  r: number;
  g: number;
  b: number;
  isClosest: boolean;
}
