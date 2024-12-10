import { useContext } from "react";
import { IContextIsOpenData, IsOpenContext } from "./UseIsOpenContext";




export const useIsOpen = (): IContextIsOpenData => {
    const context = useContext(IsOpenContext);
    if (context === undefined) {
        throw new Error("useTasks must be used within a IsOpenProvider");
    }
    return context;
};
