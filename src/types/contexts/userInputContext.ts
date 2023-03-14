import { Dispatch, SetStateAction } from "react";
import { IUserInputs } from "./../global/userInputs";

export type TUserInputContext = {
  userInputs: IUserInputs;
  setUserInputs: Dispatch<SetStateAction<IUserInputs>>;
} | null;
