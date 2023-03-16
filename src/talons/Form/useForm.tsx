import { TCellsContext } from "../../types/contexts/cellsContext";
import { TSubmitedMatrixSizeContext } from "../../types/contexts/submitedMatrixSizeContext";
import { TUserInputContext } from "../../types/contexts/userInputContext";
import { Cell } from "../../types/global/cells";

// Define constants for min and max values
const MIN_VALUE = 0;
const MAX_VALUE = 100;

// Define the props for the useForm hook
interface IUseFormProps {
  userInputsContext: TUserInputContext;
  cellsContext: TCellsContext;
  submitedMatrixSizeContext: TSubmitedMatrixSizeContext;
}

// Export the useForm hook
export const useForm = ({
  userInputsContext,
  cellsContext,
  submitedMatrixSizeContext,
}: IUseFormProps) => {
  // Check if the required context props are provided
  if (!userInputsContext || !cellsContext || !submitedMatrixSizeContext) {
    return {
      error: "Error",
    };
  }

  // Destructure the context values and setters
  const { userInputs, setUserInputs } = userInputsContext;
  const { cells, setCells } = cellsContext;
  const { setSubmitedMatrixSize } = submitedMatrixSizeContext;

  // Extract the rows and columns values from the userInputs
  const { M: rows, N: columns } = userInputs;

  // Calculate the minimum and maximum accessible cells
  const maxAccessibleCells = Number(rows) * Number(columns) - 1;
  const minAccessibleCells = 0;

  // Handle the change event of the input fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = null;

    // If the input field is X, limit its value to the accessible cell range
    if (event.target.name === "X") {
      value = Math.max(
        minAccessibleCells,
        Math.min(maxAccessibleCells, Number(event.target.value))
      );
      setUserInputs({ ...userInputs, [event.target.name]: value });
    } else {
      // If the input field is M or N, limit its value to the range 0 to 100,
      // and set the value of X to null
      value = Math.max(
        MIN_VALUE,
        Math.min(MAX_VALUE, Number(event.target.value))
      );
      setUserInputs({ ...userInputs, [event.target.name]: value, X: null });
    }
  };

  // Generate a matrix of random cells
  const generateCells = (rows: number, columns: number): Cell[][] => {
    const cells: Cell[][] = [];
    for (let i = 0; i < rows; i++) {
      cells.push([]);
      for (let j = 0; j < columns; j++) {
        const id = i * columns + j;
        const amount = Math.floor(Math.random() * 900) + 100;
        cells[i].push({ id, amount });
      }
    }
    return cells;
  };

  // Handle the form submission event
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if rows and columns values are defined
    if (rows && columns) {
      const matrix = generateCells(rows, columns);
      setCells(matrix);
      setSubmitedMatrixSize({ rows, columns });
    } else {
      throw new Error("New Error");
    }
  };

  // Extract the keys of the userInputs object
  const userInputsKeys = Object.keys(userInputs) as Array<
    keyof typeof userInputs
  >;

  // Handle the addition of row into the table
  const handleAddRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!cells) {
      return;
    }
    const newCells = [...cells];

    newCells.push(
      [...Array(columns)].map((_, index) => ({
        id: index,
        amount: Math.floor(Math.random() * 900) + 100,
      }))
    );
    setCells(newCells);
    setSubmitedMatrixSize((prevValue) => ({
      ...prevValue,
      rows: prevValue.rows + 1,
    }));
  };

  return {
    handleAddRow,
    userInputsKeys,
    handleChange,
    handleFormSubmit,
    cells,
    userInputs,
  };
};
