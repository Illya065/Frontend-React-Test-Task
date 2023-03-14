import React from "react";

interface IMatrixHeaderRowProps {
  columns: number;
}

const MatrixHeaderRow = ({ columns }: IMatrixHeaderRowProps): JSX.Element => {
  const tableHeaderItems = [...Array(columns)].map((_, i) => {
    return <th key={i}>{`Cell values N = ${i + 1}`}</th>;
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
