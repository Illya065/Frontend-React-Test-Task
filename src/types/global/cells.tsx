type CellId = number;
type CellValue = number;

export interface Cell {
  id: CellId;
  amount: CellValue;
}

export type TCells = Cell[][] | null;
