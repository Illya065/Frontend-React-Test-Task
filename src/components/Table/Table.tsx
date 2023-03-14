import React, { useContext, useState } from "react";
import {
  CellsContext,
  SubmitedMatrixSizeContext,
  UserInputContext,
} from "../../provider";
import { Cell } from "../../types/global/cells";
import MatrixColumnAverage from "./MatrixColumnAverage";
import MatrixHeaderRow from "./MatrixHeaderRow";
import MaxtrixCellItems from "./MaxtrixCellItems";
import classes from "./Table.module.css";

const Table = (): JSX.Element => {
  const { cells, setCells } = useContext(CellsContext) || {};
  const { userInputs } = useContext(UserInputContext) || {};
  const { submitedMatrixSize, setSubmitedMatrixSize } =
    useContext(SubmitedMatrixSizeContext) || {};

  const [highlightedCells, setHighlightedCells] = useState<Cell[] | null>([]);
  const [hoveredRow, setHoveredRow] = useState(-1);

  if (
    !cells ||
    !submitedMatrixSize ||
    !setCells ||
    !userInputs ||
    !setSubmitedMatrixSize
  ) {
    return <h2>Please Generate Matrix</h2>;
  }

  const { X: highlightedCellsQty } = userInputs;
  const { rows, columns } = submitedMatrixSize;

  const handleTableClick = (event: React.MouseEvent<HTMLTableElement>) => {
    const target = event.target as HTMLElement;
    if (target.className.includes("cell")) {
      const row = parseInt(target.getAttribute("data-row") || "0");
      const column = parseInt(target.getAttribute("data-column") || "0");

      handleCellUpdate(row, column);
      return;
    }

    if (target.className.includes("delete")) {
      const row = parseInt(target.getAttribute("data-row") || "0");
      handleRemoveRow(row);
    }
  };

  const handleCellUpdate = (row: number, column: number) => {
    const cellsCopy = structuredClone(cells);
    const clickedCell = cells[row][column];
    cellsCopy[row][column] = {
      id: clickedCell.id,
      amount: clickedCell.amount + 1,
    };
    setCells(cellsCopy);
  };

  const handleTableMouseOver = (event: React.MouseEvent<HTMLTableElement>) => {
    const target = event.target as HTMLElement;
    if (target.className.includes("cell")) {
      const row = parseInt(target.getAttribute("data-row") || "0");
      const column = parseInt(target.getAttribute("data-column") || "0");

      setHighlightedCells(
        findNearestCells(cells[row][column], cells, Number(highlightedCellsQty))
      );
      setHoveredRow(-1);
      return;
    }

    if (target.className.includes("sum")) {
      const row = parseInt(target.getAttribute("data-row") || "0");
      setHoveredRow(row);
      setHighlightedCells(null);
      return;
    }
  };

  const handleTableMouseOut = () => {
    setHighlightedCells(null);
    setHoveredRow(-1);
  };

  const findNearestCells = (
    targetCell: Cell,
    cells: Cell[][],
    count: number
  ) => {
    if (!count) {
      return null;
    }
    const cellsCopy = cells.flat();
    cellsCopy.sort(
      (a, b) =>
        Math.abs(targetCell.amount - a.amount) -
        Math.abs(targetCell.amount - b.amount)
    );
    return cellsCopy.slice(0, count);
  };

  const handleRemoveRow = (rowIndex: number) => {
    const newCells = structuredClone(cells);
    newCells.splice(rowIndex, 1);
    setCells(newCells);
    setSubmitedMatrixSize((prevValue) => ({
      ...prevValue,
      rows: prevValue.rows - 1,
    }));
  };

  return (
    <div className={classes.tableWrapper}>
      <table
        onMouseLeave={handleTableMouseOut}
        onMouseOver={handleTableMouseOver}
        onClick={handleTableClick}
        id="matrix-table"
        className={classes.matrixTable}
      >
        <tbody>
          <MatrixHeaderRow columns={columns} />

          <MaxtrixCellItems
            cells={cells}
            hoveredRow={hoveredRow}
            highlightedCells={highlightedCells}
          />

          <MatrixColumnAverage columns={columns} rows={rows} cells={cells} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
