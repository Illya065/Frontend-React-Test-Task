import React, { useContext } from "react";
import {
  CellsContext,
  SubmitedMatrixSizeContext,
  UserInputContext,
} from "../../provider";
import { useForm } from "../../talons/Form/useForm";
import classes from "./Form.module.css";

// object to define labels for the inputs
const labels = {
  M: "Number of Rows",
  N: "Number of Columns",
  X: "Highlight X number of cells",
};

const Form = (): JSX.Element => {
  // get context values from the provider
  const userInputsContext = useContext(UserInputContext);
  const cellsContext = useContext(CellsContext);
  const submitedMatrixSizeContext = useContext(SubmitedMatrixSizeContext);

  // get form related functions from the custom hook
  const talonProps = useForm({
    userInputsContext,
    cellsContext,
    submitedMatrixSizeContext,
  });

  // if there is an error with the form, display the error message
  if (talonProps.error) {
    return <h1>Error</h1>;
  }

  // extract required values from the talon props
  const {
    handleAddRow,
    handleChange,
    handleFormSubmit,
    userInputsKeys,
    cells,
    userInputs,
  } = talonProps;

  // generate input elements based on user input keys
  const inputs = userInputsKeys
    ? userInputsKeys.map((key) => {
        return (
          <p key={key} className={classes.inputWrapper}>
            <label htmlFor={key}>{labels[key]}</label>
            <input
              onChange={handleChange}
              value={userInputs[key] || ""}
              type="number"
              id={key}
              name={key}
              required={key === "M" || key === "N"}
            />
          </p>
        );
      })
    : null;

  // render the form with required inputs and add row button
  return (
    <form className={classes.form} onSubmit={handleFormSubmit}>
      <fieldset className={classes.matrixFieldset}>
        <legend>Create Matrix</legend>
        {inputs}
        <p>
          <button type="submit">Generate Matrix</button>
        </p>
      </fieldset>
      <fieldset>
        <legend>Add Row</legend>
        <p>
          <button disabled={!cells} type="button" onPointerDown={handleAddRow}>
            Add Row
          </button>
        </p>
      </fieldset>
    </form>
  );
};

export default Form;
