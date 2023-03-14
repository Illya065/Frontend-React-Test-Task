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
  // Calculate the sum of values in a row
  const sumRow = (row: Cell[]): number => {
    return row.reduce((acc, cell) => acc + cell.amount, 0);
  };

  // Generate the table cells for each row
  const tableCellItems = cells.map((row: Cell[], i: number) => {
    // Calculate the sum and percentages of each cell in the row
    const rowSum = sumRow(row);
    const rowPercentages = row.map((cell) => {
      const cellPercentage = ((cell.amount / rowSum) * 100).toFixed(2);
      return `${cellPercentage}%`;
    });

    const firstColumnsValue = `Cell Value M = ${i + 1}`;

    // Return a table row with cells for each column
    return (
      <tr key={i}>
        <td>
          {firstColumnsValue}
          <span data-row={i} data-type="delete">
            (-)
          </span>
        </td>
        {row.map((cell: Cell, j: number) => (
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
        <td data-type="sum" data-row={i}>
          {sumRow(row)}
        </td>
      </tr>
    );
  });

  return <>{tableCellItems}</>;
};

export default MaxtrixCellItems;
