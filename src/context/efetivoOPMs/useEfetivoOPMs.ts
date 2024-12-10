import { useContext } from "react";
import { IContextEfetivoOPMsData, TotalEfetivoOPMsContext } from "./EfetivoOPMsContext";

export const useEfetivoOPMs = (): IContextEfetivoOPMsData => {
  const context = useContext(TotalEfetivoOPMsContext);
    if (context === undefined) {
        throw new Error("useEfetivoOPMs must be used within a EfetivoOPMsProvider");
    }
    return context;
};
