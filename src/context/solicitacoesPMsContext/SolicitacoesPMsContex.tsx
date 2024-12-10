import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { useToast } from '@chakra-ui/react';
import soli_data from '../../assets/solicitacoes_pms.json';
import api from '../../services/api';

export type SolicitacoesPM = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface SolicitacoesPMData {
  id: string;
  sps_id: number;
  sps_operacao_id: string;
  solicitacao: string;
  sps_status: string;
  prazo_final: Date;
  prazo_inicial: Date;
  unidades_id: number;
  nome_operacao: string;
  qtd_efetivo: string | number;
  qtd_parcial_efetivo: string | number;
  status: string;
  [key: string]: any;
}

export interface IContextSolicitacoesPMData {
  solicitacoesPMs: SolicitacoesPMData[];
  solicitacaoPMIndividual: SolicitacoesPMData | undefined;
  loadMoreSolicitacoesPMs: () => void;
  loadLessSolicitacoesPMs: () => void;
  loadSolicitacaoPMById: (id: number) => Promise<void>;
  loadSolicitacaoPMByApi: (param: number) => Promise<void>;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const SolicitacoesPMContext = createContext<
  IContextSolicitacoesPMData | undefined
>(undefined);

export const SolicitacoesPMsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [solicitacoesPM, setSolicitacoesPM] = useState<SolicitacoesPMData[]>(
    [],
  );
  const [solicitacaoPMIndividual, setSolicitacaoPMIndividual] = useState<
    SolicitacoesPMData | undefined
  >(undefined);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(15);
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = solicitacoesPM.length;
  const currentData = solicitacoesPM.slice(firstDataIndex, lastDataIndex);
  useEffect(() => {
    loadSolicitacaoPMByApi(1904);
  }, []);
  const loadSolicitacaoPMById = useCallback(
    async (id: number) => {
      const itemEncontrado = solicitacoesPM.find(item => item.sps_id === id);
      if (itemEncontrado) {
        setSolicitacaoPMIndividual(itemEncontrado);
      } else {
        console.error('Solicitação não encontrada.');
      }
    },
    [solicitacoesPM],
  );
  const loadSolicitacaoPMByApi = useCallback(async (param: number) => {
    try {
      const response = await api.get<SolicitacoesPMData[]>(
        `solicitacao-pms/${param}`,
      );
      setSolicitacoesPM(response.data);
    } catch (error) {
      console.error('Falha ao carregar as Operações:', error);
    }
  }, []);

  const loadMoreSolicitacoesPMs = () => {
    if (lastDataIndex < soli_data.length) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais solicitações para carregar.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const loadLessSolicitacoesPMs = () => {
    if (firstDataIndex > 0) {
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

  const contextValue = useMemo(
    () => ({
      solicitacoesPMs: currentData,
      solicitacaoPMIndividual,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPMs,
      loadLessSolicitacoesPMs,
      loadSolicitacaoPMByApi,
      loadSolicitacaoPMById,
    }),
    [
      currentData,
      solicitacaoPMIndividual,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPMs,
      loadLessSolicitacoesPMs,
      loadSolicitacaoPMByApi,
      loadSolicitacaoPMById,
    ],
  );

  return (
    <SolicitacoesPMContext.Provider value={contextValue}>
      {children}
    </SolicitacoesPMContext.Provider>
  );
};
