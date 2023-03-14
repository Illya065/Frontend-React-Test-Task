import React from "react";

interface IMatrixHeaderRowProps {
  columns: number;
}

const MatrixHeaderRow = ({ columns }: IMatrixHeaderRowProps): JSX.Element => {
  // Generate the table header cells for each column
  const tableHeaderItems = [...Array(columns)].map((_, i: number) => {
    const tHeadValue = `Cell values N = ${i + 1}`;

    // Use template literals to create a dynamic column header for each column
    return <th key={i}>{tHeadValue}</th>;
  });

  return (
    <tr>
      <th></th>
      {tableHeaderItems}
      <th>Sum</th>
    </tr>
  );
};

export default MatrixHeaderRow;
