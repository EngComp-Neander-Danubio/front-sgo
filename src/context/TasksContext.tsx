import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import api from "../services/api";
import { useToast } from "@chakra-ui/react";
export type Task = {
  id: string;
  name_task: string;
  name: string;
  status: string;
  priority: string;
  dateBegin: string;
  dateFinish: string;
  user: { name: string; id: string };
};

export type Dados ={
  userId: string | undefined;
  name_task: string;
  name: string;
  status: string;
  dateBegin: string;
  dateFinish: string;
  priority: string;
};

export interface IContextTaskData {
  tasks: Task[];
  taskById: Task | undefined;
  isLoading: boolean;
  isLoadingById: boolean;
  loadTasks: (param?: string) => Promise<void>;
  eraseTask: () => void;
  uploadTasks: (data: Dados) => Promise<void>;
  loadTasksBySearch: (query: string) => Promise<void>;
  loadTaskById: (taskId: string) => Promise<void>;
  updateTasks: (data: Task, id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TasksContext = createContext<IContextTaskData | undefined>(
  undefined
);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskById, setTaskById] = useState<Task>();
  const [isLoadingById, setIsLoadingById] = useState<boolean>(false);
  // useEffect(() => {}, [tasks]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eraseTask = () => {
    setTaskById((null as unknown) as Task);
  };
  const loadTasks = useCallback(async (param?: string) => {
    setIsLoading(true);
    const parameters = param !== undefined ? param : "";
    try {
      const response = await api.get<{ items: Task[] }>(`tasks/${parameters}`);
      setTasks((response.data as unknown) as Task[]);
      console.log("Dados carregados:", response.data);
    } catch (error) {
      console.error("Falha ao carregar as tarefas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    loadTasks("joinUsers");
  }, [loadTasks]);

  const uploadTasks = useCallback(
    async (data: unknown) => {
      setIsLoading(true);
      try {
        const response = await api.post("/tasks", data);
        await loadTasks();
        console.log("resposta: ", response.data);
      } catch (error) {
        console.error("error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const loadTasksBySearch = useCallback(async (query: string) => {
    setIsLoading(true);
    const queryParams = `query=${query}`;

    try {
      const response = await api.get<{ items: Task[] }>(
        `tasks/search?${queryParams}`
      );
      setTasks((response.data as unknown) as Task[]);
      // console.log("Dados carregados:", response.data);
    } catch (error) {
      console.error("Falha ao carregar as tarefas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadTaskById = useCallback(async (id: string) => {
    setIsLoadingById(true);

    try {
      const response = await api.get<{ items: Task }>(`tasks/${id}`);
      setTaskById((response.data as unknown) as Task);
      // console.log("Dados carregados de uma Task:", response.data);
    } catch (error) {
      console.error("Falha ao carregar as tarefas:", error);
    } finally {
      setIsLoadingById(false);
    }
  }, []);

  const updateTasks = useCallback(
    async (data: Task, id: string) => {
      setIsLoading(true);
      try {
        await api.put(`/tasks/${id}`, data);
        // await loadTasks();
        toast({
          title: "Sucesso",
          description: "Tarefa atualizada com sucesso",
          status: "success",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
        setTaskById((null as unknown) as Task);
      } catch (error) {
        console.error("Falha ao atualizar a tarefa:", error);
        toast({
          title: "Erro",
          description: "Falha ao atualizar a tarefa",
          status: "error",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteTask = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await api.delete(`/tasks/${id}`);
        // await loadTasks();
        toast({
          title: "Sucesso",
          description: "Tarefa deletada com sucesso",
          status: "success",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Falha ao deletar a tarefa:", error);
        toast({
          title: "Erro",
          description: "Falha ao deletar a tarefa",
          status: "error",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const contextValue = useMemo(
    () => ({
      tasks,
      taskById,
      isLoading,
      isLoadingById,
      loadTasks,
      eraseTask,
      uploadTasks,
      loadTaskById,
      loadTasksBySearch,
      updateTasks,
      deleteTask,
    }),
    [
      tasks,
      taskById,
      isLoading,
      isLoadingById,
      uploadTasks,
      loadTasks,
      eraseTask,
      loadTaskById,
      loadTasksBySearch,
      updateTasks,
      deleteTask,
    ]
  );

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};
