import { useContext } from "react";
import { IContextMilitaresData, MilitaresContext } from "./MilitarContext";

export const useMilitares = (): IContextMilitaresData => {
  const context = useContext(MilitaresContext);
  if (context === undefined) {
    throw new Error("useMilitares must be used within a MilitaresProvider");
  }
  return context;
};
