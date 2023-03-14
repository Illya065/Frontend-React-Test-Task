import React, { useContext } from "react";
import {
  CellsContext,
  SubmitedMatrixSizeContext,
  UserInputContext,
} from "../../provider";
import { useTable } from "../../talons/Table/useTable";
import MatrixColumnAverage from "./MatrixColumnAverage";
import MatrixHeaderRow from "./MatrixHeaderRow";
import MaxtrixCellItems from "./MaxtrixCellItems";
import classes from "./Table.module.css";

const Table = (): JSX.Element => {
  // Use Context API to retrieve data from the provider
  const cellsContext = useContext(CellsContext);
  const userInputsContext = useContext(UserInputContext);
  const submitedMatrixSizeContext = useContext(SubmitedMatrixSizeContext);

  // Call the custom hook to get the data for the table
  const talonProps = useTable({
    cellsContext,
    userInputsContext,
    submitedMatrixSizeContext,
  });

  // Check if there is an error with the custom hook data
  const { error } = talonProps;

  // Return an error message if there is an error
  if (error) {
    return <h1>Please provide contexts</h1>;
  }

  // Get the table data from the custom hook
  const {
    cells,
    handleTableClick,
    handleTableMouseOut,
    handleTableMouseOver,
    columns,
    rows,
    hoveredRow,
    highlightedCells,
  } = talonProps;

  // Check if there are no cells in the table yet
  if (!cells) {
    return <h2>Please Generate Matrix</h2>;
  }

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
          {/* Render the table header row */}
          <MatrixHeaderRow columns={columns} />

          {/* Render the table cells */}
          <MaxtrixCellItems
            cells={cells}
            hoveredRow={hoveredRow}
            highlightedCells={highlightedCells}
          />

          {/* Render the average of each column */}
          <MatrixColumnAverage columns={columns} rows={rows} cells={cells} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
