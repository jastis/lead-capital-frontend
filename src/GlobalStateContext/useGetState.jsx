import { useContext } from "react";
import { GlobalStateContext } from "./GlobalState";

export const useGetState = () => {
  const { state, setState } = useContext(GlobalStateContext);

  return { state, setState };
};
