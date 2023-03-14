import React from "react";
import { Cell } from "../../../types/global/cells";

interface IMatrixColumnAverageProps {
  columns: number;
  rows: number;
  cells: Cell[][];
}

const MatrixColumnAverage = ({
  columns,
  rows,
  cells,
}: IMatrixColumnAverageProps): JSX.Element => {
  // Calculate the sum of values for a given column
  const sumColumn = (columnIndex: number): number => {
    // Use reduce() to sum the values of a given column
    return cells.reduce(
      (acc: number, row: Cell[]) => acc + row[columnIndex].amount,
      0
    );
  };

  // Calculate the average value for a given column
  const averageColumn = (columnIndex: number): string => {
    const columnSum = sumColumn(columnIndex);
    // Use toFixed() to round the result to 2 decimal places and return as a string
    return (columnSum / rows).toFixed(2);
  };

  // Generate the average value table cells for each column
  const tableAverageValuesItems = [...Array(columns)].map((_, i: number) => {
    // Use the averageColumn() function to calculate the average for each column
    return <td key={i}>{averageColumn(i)}</td>;
  });

  return (
    <tr>
      <td>Average values</td>
      {tableAverageValuesItems}
    </tr>
  );
};

export default MatrixColumnAverage;
