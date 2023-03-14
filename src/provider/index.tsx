import React, { useState } from "react";
import { TCellsContext } from "../types/contexts/cellsContext";
import { TSubmitedMatrixSizeContext } from "../types/contexts/submitedMatrixSizeContext";
import { TUserInputContext } from "../types/contexts/userInputContext";
import { TCells } from "../types/global/cells";
import { ISubmitedMatrixSize } from "../types/global/submitedMatrixSize";
import { IUserInputs } from "../types/global/userInputs";

interface ICustomContextProviderProps {
  children: React.ReactNode;
}

// Create contexts for user inputs, cells, and submitted matrix size
export const UserInputContext = React.createContext<TUserInputContext>(null);

export const CellsContext = React.createContext<TCellsContext>(null);

export const SubmitedMatrixSizeContext =
  React.createContext<TSubmitedMatrixSizeContext>(null);

const CustomContextProvider = ({
  children,
}: ICustomContextProviderProps): JSX.Element => {
  // Set initial state for user inputs, cells, and submitted matrix size
  const [userInputs, setUserInputs] = useState<IUserInputs>({
    M: null,
    N: null,
    X: null,
  });
  const [cells, setCells] = useState<TCells>(null);
  const [submitedMatrixSize, setSubmitedMatrixSize] =
    useState<ISubmitedMatrixSize>({
      rows: 0,
      columns: 0,
    });

  // Provide state values to child components via context
  return (
    <UserInputContext.Provider value={{ userInputs, setUserInputs }}>
      <CellsContext.Provider value={{ cells, setCells }}>
        <SubmitedMatrixSizeContext.Provider
          value={{ submitedMatrixSize, setSubmitedMatrixSize }}
        >
          {children}
        </SubmitedMatrixSizeContext.Provider>
      </CellsContext.Provider>
    </UserInputContext.Provider>
  );
};

export default CustomContextProvider;
