import React, { useMemo } from "react";
import { Cell } from "../../../types/global/cells";
import classes from "./MatrixCell.module.css";

interface IMatrixCellProps {
  rowIndex: number;
  rowPercentages: string[];
  cellIndex: number;
  hoveredRow: number;
  highlightedCells: Cell[] | null;
  cell: Cell;
}

const MatrixCell = ({
  rowIndex,
  rowPercentages,
  cellIndex,
  hoveredRow,
  cell,
  highlightedCells,
}: IMatrixCellProps): JSX.Element => {
  const bgStyle = useMemo(
    () =>
      `linear-gradient(360deg, rgba(219, 0, 0, 0.3) ${rowPercentages[cellIndex]}, #fff ${rowPercentages[cellIndex]})`,
    [rowPercentages, cellIndex]
  );

  const isHighlighted = useMemo(() => {
    if (!highlightedCells) return false;
    return highlightedCells.some((c) => c.id === cell.id);
  }, [highlightedCells, cell.id]);

  const style = useMemo(
    () => ({
      background: hoveredRow === rowIndex ? bgStyle : undefined,
    }),
    [hoveredRow, rowIndex, bgStyle]
  );

  const cellTextContent = useMemo(
    () => (hoveredRow === rowIndex ? rowPercentages[cellIndex] : cell.amount),
    [hoveredRow, rowIndex, rowPercentages, cellIndex, cell.amount]
  );

  return (
    <td
      className={`cell ${isHighlighted ? classes.highlighted : ""}`}
      data-row={rowIndex}
      data-column={cellIndex}
      style={style}
    >
      {cellTextContent}
    </td>
  );
};

export default React.memo(MatrixCell);
