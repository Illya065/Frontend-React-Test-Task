import { useState } from "react";
import { TCellsContext } from "../../types/contexts/cellsContext";
import { TSubmitedMatrixSizeContext } from "../../types/contexts/submitedMatrixSizeContext";
import { TUserInputContext } from "../../types/contexts/userInputContext";
import { Cell } from "../../types/global/cells";

interface IUseTableProps {
  userInputsContext: TUserInputContext;
  cellsContext: TCellsContext;
  submitedMatrixSizeContext: TSubmitedMatrixSizeContext;
}

// Custom hook for handling the logic of the table component
export const useTable = ({
  userInputsContext,
  cellsContext,
  submitedMatrixSizeContext,
}: IUseTableProps) => {
  const [highlightedCells, setHighlightedCells] = useState<Cell[] | null>([]);
  const [hoveredRow, setHoveredRow] = useState(-1);

  // Check if the required context props are provided
  if (!userInputsContext || !cellsContext || !submitedMatrixSizeContext) {
    return {
      error: "Error",
    };
  }

  // Destructuring the required context props
  const { cells, setCells } = cellsContext;
  const { userInputs } = userInputsContext;
  const { submitedMatrixSize, setSubmitedMatrixSize } =
    submitedMatrixSizeContext;

  const { X: highlightedCellsQty } = userInputs;
  const { rows, columns } = submitedMatrixSize;

  // This function handles click events on the table element
  const handleTableClick = (event: React.MouseEvent<HTMLTableElement>) => {
    // Get the clicked element and its type
    const target = event.target as HTMLElement;
    const targetType = target.getAttribute("data-type");

    // If the clicked element is a cell, get its row and column and call the handleCellUpdate function
    if (targetType?.includes("cell")) {
      const row = parseInt(target.getAttribute("data-row") || "0");
      const column = parseInt(target.getAttribute("data-column") || "0");
      handleCellUpdate(row, column);
      return;
    }

    // If the clicked element is a delete button, get its row and call the handleRemoveRow function
    if (targetType?.includes("delete")) {
      const row = parseInt(target.getAttribute("data-row") || "0");
      handleRemoveRow(row);
    }
  };

  // This function updates the amount of a clicked cell and updates the state of cells
  const handleCellUpdate = (row: number, column: number) => {
    if (!cells) {
      return;
    }

    // Create a deep copy of cells to avoid modifying the state directly
    const cellsCopy = [...cells];

    // Get the clicked cell and increment its amount property
    const clickedCell = cells[row][column];
    cellsCopy[row][column] = {
      id: clickedCell.id,
      amount: clickedCell.amount + 1,
    };

    // Update the state of cells with the updated copy
    setCells(cellsCopy);
  };

  // This function handles mouse over events on the table
  const handleTableMouseOver = (event: React.MouseEvent<HTMLTableElement>) => {
    const target = event.target as HTMLElement;
    const targetType = target.getAttribute("data-type");

    if (!cells) {
      return;
    }

    if (targetType?.includes("cell")) {
      // If the target element is a cell
      const row = parseInt(target.getAttribute("data-row") || "0");
      const column = parseInt(target.getAttribute("data-column") || "0");

      // Find the nearest cells to the hovered cell and update the state with them
      setHighlightedCells(
        findNearestCells(cells[row][column], cells, Number(highlightedCellsQty))
      );

      // Set the hovered row state to -1 to indicate that no row is currently hovered over
      setHoveredRow(-1);
      return;
    }

    if (targetType?.includes("sum")) {
      // If the target element is a row sum
      const row = parseInt(target.getAttribute("data-row") || "0");

      // Set the hovered row state to the row that was hovered over
      setHoveredRow(row);

      // Clear the highlighted cells state
      setHighlightedCells(null);
      return;
    }
  };

  // Handles the mouseout event on the table

  const handleTableMouseOut = () => {
    setHighlightedCells(null);
    setHoveredRow(-1);
  };

  // Finds the nearest cells to a target cell based on their amount

  const findNearestCells = (
    targetCell: Cell,
    cells: Cell[][],
    count: number
  ): Cell[] | null => {
    if (!count) {
      return null;
    }
    const cellsCopy = cells.flat();
    cellsCopy.sort(
      (a, b) =>
        Math.abs(targetCell.amount - a.amount) -
        Math.abs(targetCell.amount - b.amount)
    );
    return cellsCopy.slice(0, count + 1);
  };

  //Removes a row from the matrix and updates the submitedMatrixSize state
  const handleRemoveRow = (row: number) => {
    if (!cells) {
      return;
    }

    const newCells = [...cells];
    newCells.splice(row, 1);
    setCells(newCells);
    setSubmitedMatrixSize((prevValue) => ({
      ...prevValue,
      rows: prevValue.rows - 1,
    }));
  };

  return {
    rows,
    columns,
    highlightedCells,
    hoveredRow,
    handleTableClick,
    handleTableMouseOut,
    handleTableMouseOver,
    cells,
  };
};
