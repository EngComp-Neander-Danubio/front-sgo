import { useContext } from "react";
import { IContextRequisitoData, RequisitosContext } from "./RequisitosContext";


export const useRequisitos = (): IContextRequisitoData => {
  const context = useContext(RequisitosContext);
  if (context === undefined) {
    throw new Error("useRequisitos must be used within a RequisitosProvider");
  }
  return context;
};
