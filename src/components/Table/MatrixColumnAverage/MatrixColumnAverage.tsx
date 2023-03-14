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
  const sumColumn = (columnIndex: number) => {
    return cells.reduce((acc, row) => acc + row[columnIndex].amount, 0);
  };

  const averageColumn = (columnIndex: number) => {
    const columnSum = sumColumn(columnIndex);
    return (columnSum / rows).toFixed(2);
  };
  const tableAverageValuesItems = [...Array(columns)].map((_, i) => {
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
