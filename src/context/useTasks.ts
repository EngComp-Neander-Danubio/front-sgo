import { useContext } from "react";
import { IContextTaskData, TasksContext } from "./TasksContext";


export const useTasks = (): IContextTaskData => {
    const context = useContext(TasksContext);
    if (context === undefined) {
        throw new Error("useTasks must be used within a TasksProvider");
    }
    return context;
};