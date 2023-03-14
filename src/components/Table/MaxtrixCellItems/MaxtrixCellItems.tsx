import React from "react";
import { Cell } from "../../../types/global/cells";
import MatrixCell from "../MatrixCell";

interface IMaxtrixCellItemsProps {
  cells: Cell[][];
  hoveredRow: number;
  highlightedCells: Cell[] | null;
}

const MaxtrixCellItems = ({
  cells,
  highlightedCells,
  hoveredRow,
}: IMaxtrixCellItemsProps): JSX.Element => {
  const sumRow = (row: Cell[]) => {
    return row.reduce((acc, cell) => acc + cell.amount, 0);
  };

  const tableCellItems = cells.map((row, i) => {
    const rowSum = sumRow(row);
    const rowPercentages = row.map((cell) => {
      const cellPercentage = ((cell.amount / rowSum) * 100).toFixed(2);
      return `${cellPercentage}%`;
    });

    return (
      <tr key={i}>
        <td>
          {`Cell Value M = ${i + 1}`}{" "}
          <span data-row={i} className="delete">
            (-)
          </span>
        </td>
        {row.map((cell, j) => (
          <MatrixCell
            key={cell.id}
            cell={cell}
            cellIndex={j}
            rowIndex={i}
            rowPercentages={rowPercentages}
            highlightedCells={highlightedCells}
            hoveredRow={hoveredRow}
          />
        ))}
        <td className="sum" data-row={i}>
          {sumRow(row)}
        </td>
      </tr>
    );
  });

  return <>{tableCellItems}</>;
};

export default MaxtrixCellItems;
