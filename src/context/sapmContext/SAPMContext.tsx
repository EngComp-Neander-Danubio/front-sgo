import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { Militares_service } from '../requisitosContext/RequisitosContext';
import api from '../../services/api';
import { handleSortByPostoGrad } from '../../types/typesMilitar';

export type Militares = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};
export interface Militar {
  id?: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
  [key: string]: any;
}

export interface IContextSAPMData {
  pms: Militar[];
  loadMoreMilitarBySAPM: () => void;
  loadLessMilitarBySAPM: () => void;
  loadMilitarBySAPM: (param?: string) => void;
  deletePMByCGO: (id?: string, index?: string) => Promise<void>;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndexMilitar: number;
  firstDataIndexMilitar: number;
  totalData: number;
}

export const SAPMContext = createContext<IContextSAPMData | undefined>(
  undefined,
);

export const SAPMProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pms, setPMs] = useState<Militar[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(8);
  const lastDataIndexMilitar = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndexMilitar = lastDataIndexMilitar - dataPerPage;
  const totalData = pms.length;
  const currentData = pms.slice(firstDataIndexMilitar, lastDataIndexMilitar);
  const hasMore = lastDataIndexMilitar < pms.length;

  useEffect(() => {
    handleSortByPostoGrad(pms, '1');
  }, [pms]);

  const loadMoreMilitarBySAPM = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais PPMM para carregar.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const loadLessMilitarBySAPM = () => {
    if (firstDataIndexMilitar > 0) {
      setCurrentDataIndex(prevIndex => prevIndex - 1);
    } else {
      toast({
        title: 'Início dos dados',
        description: 'Você está na primeira página.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const loadMilitarBySAPM = useCallback(async (param?: string) => {
    setIsLoading(true);
    const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: Militares_service[] }>(
        `militares/${parameters}`,
      );
      setPMs((response.data as unknown) as Militares_service[]);
      toast({
        title: 'Sucesso',
        description: 'Militares carregados com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
      console.log('Dados carregados:', response.data);
    } catch (error) {
      console.error('Falha ao carregar os eventos/operações:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePMByCGO = useCallback(
    async (id?: string, index?: string) => {
      setIsLoading(true);

      // Caso o posto venha do backend (tem id)
      if (id) {
        try {
          console.log('delete com id');
          await api.delete(`/pms-opm/${id}`);

          // Exibe o toast de sucesso
          toast({
            title: 'Sucesso',
            description: 'PM deletado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          // Exibe o toast de erro
          console.error('Falha ao deletar o PM:', error);
          toast({
            title: 'Erro',
            description: 'Falha ao deletar o PM',
            status: 'error',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      }
      // Caso o posto esteja apenas no estado local (não tem id)
      else if (index) {
        //console.log('delete com index');
        // Cálculo correto do índice considerando a página atual
        const indexDeletedOpm =
          currentDataIndex * (lastDataIndexMilitar - firstDataIndexMilitar) +
          Number(index);

        //console.log('index', indexDeletedOpm);
        if (indexDeletedOpm < 0 || indexDeletedOpm >= pms.length) {
          toast({
            title: 'Erro!',
            description: 'PM não encontrado na lista.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          setIsLoading(false);
          return;
        }
        // Remove o posto do estado local
        const updatedOpm = pms.filter((_, i) => i !== indexDeletedOpm);
        // Atualiza o estado e exibe o toast de sucesso
        setPMs(updatedOpm);
        if (updatedOpm.length !== pms.length) {
          toast({
            title: 'Exclusão de PM.',
            description: 'PM excluído com sucesso.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        }

        setIsLoading(false);
      }
    },
    [pms, currentDataIndex, currentData.length],
  );

  const contextValue = useMemo(
    () => ({
      pms: currentData,
      totalData,
      firstDataIndexMilitar,
      lastDataIndexMilitar,
      currentDataIndex,
      dataPerPage,
      loadMoreMilitarBySAPM,
      loadLessMilitarBySAPM,
      loadMilitarBySAPM,
      deletePMByCGO,
    }),
    [
      pms,
      totalData,
      firstDataIndexMilitar,
      lastDataIndexMilitar,
      currentDataIndex,
      dataPerPage,
      loadMoreMilitarBySAPM,
      loadLessMilitarBySAPM,
      loadMilitarBySAPM,
      deletePMByCGO,
    ],
  );

  return (
    <SAPMContext.Provider value={contextValue}>{children}</SAPMContext.Provider>
  );
};
