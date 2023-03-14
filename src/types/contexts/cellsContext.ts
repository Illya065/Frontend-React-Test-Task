import { Dispatch, SetStateAction } from "react";
import { TCells } from "./../global/cells";

export type TCellsContext = {
  cells: TCells;
  setCells: Dispatch<SetStateAction<TCells>>;
} | null;
