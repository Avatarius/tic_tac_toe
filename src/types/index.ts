type CellType = "" | "x" | "o";

interface ICell {
  value: CellType;
  isActive: boolean;
  isWinner: boolean;
  x: number;
  y: number;
}

export type {CellType, ICell};
