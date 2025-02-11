import { useContext } from "react";
import { IContextIsLoadingData, IsLoadingContext } from "./UseIsLoadingContext";

export const useIsLoading = (): IContextIsLoadingData => {
    const context = useContext(IsLoadingContext);
    if (context === undefined) {
        throw new Error("useTasks must be used within a IsLoadindProvider");
    }
    return context;
};
