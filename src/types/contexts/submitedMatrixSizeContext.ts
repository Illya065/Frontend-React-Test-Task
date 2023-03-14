import { Dispatch, SetStateAction } from "react";
import { ISubmitedMatrixSize } from "./../global/submitedMatrixSize";

export type TSubmitedMatrixSizeContext = {
  submitedMatrixSize: ISubmitedMatrixSize;
  setSubmitedMatrixSize: Dispatch<SetStateAction<ISubmitedMatrixSize>>;
} | null;
