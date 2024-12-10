import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useToast } from '@chakra-ui/react';
import api from '../../services/api';

export type SolicitacoesPosto = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface SolicitacoesPostoData {
  sps_id: number;
  sps_operacao_id: string;
  solicitacao: string;
  sps_status: string;
  prazo_final: Date;
  prazo_inicial: Date;
  unidades_id: number;
  nome_operacao: string;
  //bairro: string;
  //qtd_postos: string | number;
  [key: string]: any;
}

export interface IContextSolicitacoesPostoData {
  solicitacoesPostos: SolicitacoesPostoData[];
  solicitacaoPostoIndividual: SolicitacoesPostoData | null;
  loadSolicitacaoPostosByApi: (param: number) => Promise<void>;
  loadSolicitacaoPostosById: (id: number) => Promise<void>;
  loadMoreSolicitacoesPostos: () => void;
  loadLessSolicitacoesPostos: () => void;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const SolicitacoesPostosContext = createContext<
  IContextSolicitacoesPostoData | undefined
>(undefined);

export const SolicitacoesPostosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [solicitacoesPostos, setSolicitacoesPostos] = useState<
    SolicitacoesPostoData[]
  >([]);
  const [solicitacaoPostoIndividual, setSolicitacaoPostoIndividual] = useState<
    SolicitacoesPostoData | null
  >(null);

  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(15); // Defina o número de registros por página
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = solicitacoesPostos.length;

  const currentData = solicitacoesPostos.slice(firstDataIndex, lastDataIndex);

  useEffect(() => {
    loadSolicitacaoPostosByApi(2009);
  }, [solicitacoesPostos.length]);

  const loadSolicitacaoPostosById = useCallback(
    async (id: number) => {
      const itemEncontrado = solicitacoesPostos.find(
        item => item.sps_id === id,
      );
      if (itemEncontrado) {
        setSolicitacaoPostoIndividual(itemEncontrado);
      } else {
        console.error('Solicitação não encontrada.');
      }
    },
    [solicitacoesPostos],
  );

  const loadSolicitacaoPostosByApi = useCallback(async (param: number) => {
    try {
      const response = await api.get<SolicitacoesPostoData[]>(
        `solicitacao-postos/${param}`,
      );
      setSolicitacoesPostos(response.data);
    } catch (error) {
      console.error('Falha ao carregar as Operações:', error);
    }
  }, []);
  const loadMoreSolicitacoesPostos = () => {
    if (lastDataIndex < solicitacoesPostos.length) {
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

  const loadLessSolicitacoesPostos = () => {
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
      solicitacoesPostos: currentData,
      solicitacaoPostoIndividual,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPostos,
      loadLessSolicitacoesPostos,
      loadSolicitacaoPostosByApi,
      loadSolicitacaoPostosById,
    }),
    [
      currentData,
      solicitacaoPostoIndividual,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPostos,
      loadLessSolicitacoesPostos,
      loadSolicitacaoPostosByApi,
      loadSolicitacaoPostosById,
    ],
  );

  return (
    <SolicitacoesPostosContext.Provider value={contextValue}>
      {children}
    </SolicitacoesPostosContext.Provider>
  );
};
