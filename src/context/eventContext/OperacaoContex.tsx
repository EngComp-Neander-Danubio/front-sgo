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
import { formatDate, normalizeDate } from '../../utils/utils';

export interface Operacao {
  id: string;
  nomeOperacao: string;
  comandante: number;
  dataInicio: Date;
  dataFinal: Date;
}
interface Militar {
  pes_codigo: number;
  pes_nome: string;
  gra_nome: string;
  unidade_uni_sigla: string;
}

export interface IContextOperacaosData {
  Operacaos: Operacao[];
  OperacaoById: Operacao | undefined;
  uploadOperacao: (data: Operacao) => Promise<void>;
  loadOperacaos: (param?: string) => Promise<void>;
  loadOperacaosById: (id: string) => Promise<void>;
  updateOperacao: (data: Operacao, id: string) => Promise<void>;
  deleteOperacao: (id: string) => Promise<void>;
  loadMoreOperacaos: () => void;
  loadLessOperacaos: () => void;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const OperacaosContext = createContext<IContextOperacaosData | undefined>(
  undefined,
);

export const OperacaosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [Operacaos, setOperacaos] = useState<Operacao[]>([]);
  const [OperacaoById, setOperacaoById] = useState<Operacao | undefined>(undefined);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(8);
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = Operacaos.length;
  const currentData = Operacaos.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < Operacaos.length;
  useEffect(() => {
    loadOperacaos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreOperacaos = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais Operações para carregar.',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const loadLessOperacaos = () => {
    if (firstDataIndex > 0) {
      setCurrentDataIndex(prevIndex => prevIndex - 1);
    } else {
      toast({
        title: 'Início dos dados',
        description: 'Você está na primeira página.',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const uploadOperacao = useCallback(
    async (data: Operacao) => {
      try {
        const response = await api.post('/operacao', data);
        toast({
          title: 'Sucesso',
          description: 'Operação criada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
        setOperacaoById((response.data as unknown) as Operacao);
      } catch (error) {
        //console.error('error:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao Criar Operação',
          status: 'error',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
      } finally {
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const cache = new Map<string | number, any>();

  const load = async (
    pes_nome: string | number,
  ): Promise<Militar[] | undefined> => {
    if (cache.has(pes_nome)) {
      return Promise.resolve(cache.get(pes_nome));
    }
    try {
      const response = await api.get<Militar[]>(`/policiais`, {
        params: { pes_nome },
      });
      return [...response.data];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const loadOperacaos = useCallback(async (param?: string) => {
    const parameters = param || '';
    try {
      const response = await api.get<Operacao[]>(`operacoes/${parameters}`);
      const datasFormatted = await Promise.all(
        response.data.map(async item => {
          const v = await load(item.comandante);
          //console.log('consulta de policiais', v);

          return {
            ...item,
            comandante: v ? v[0]?.pes_nome : '',
            // dataFinal: new Date(item.dataFinal).toLocaleDateString('pt-BR', {
            //   day: '2-digit',
            //   month: '2-digit',
            //   year: 'numeric',
            // }),
            // dataInicio: new Date(item.dataInicio).toLocaleDateString('pt-BR', {
            //   day: '2-digit',
            //   month: '2-digit',
            //   year: 'numeric',
            // }),
          };
        }),
      );
      setOperacaos((datasFormatted as unknown) as Operacao[]);
    } catch (error) {
      console.error('Falha ao carregar as Operações:', error);
    }
  }, []);

  const loadOperacaosById = useCallback(
    async (id: string) => {
      setOperacaoById(Operacaos.find(e => e.id === id));
    },
    [Operacaos],
  );
  const updateOperacao = useCallback(
    async (data: Operacao, id: string) => {
      try {
        const editOperacao = {
          editOperacao: {
                  nomeOperacao: data.nomeOperacao,
                    comandante: data.comandante,
                    dataInicio: formatDate(data.dataInicio),
                    dataFinal: formatDate(data.dataFinal),
                  }
                }
        const response =  await api.put(`/edit-operacao?=${id}`, editOperacao
          );
        toast({
          title: 'Sucesso',
          description: 'Operação atualizada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
        setOperacaoById((response.data as unknown) as Operacao);
      } catch (error) {
        toast({
          title: 'Erro',
          description: `${error}, 'Falha ao atualizar Operação`,
          status: 'error',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
      } finally {
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const deleteOperacao = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/delete-operacao`, {
          params: {
            id: id,
          },
        });
        toast({
          title: 'Sucesso',
          description: 'Operação deletada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Falha ao deletar a operação:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao deletar a operação',
          status: 'error',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
      } finally {

      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const contextValue = useMemo(
    () => ({
      uploadOperacao,
      loadOperacaos,
      updateOperacao,
      deleteOperacao,
      loadOperacaosById,
      loadLessOperacaos,
      loadMoreOperacaos,
      Operacaos: currentData,
      OperacaoById,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
    }),
    [
      uploadOperacao,
      loadOperacaos,
      updateOperacao,
      deleteOperacao,
      loadOperacaosById,
      loadLessOperacaos,
      loadMoreOperacaos,
      Operacaos,
      OperacaoById,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
    ],
  );

  return (
    <OperacaosContext.Provider value={contextValue}>
      {children}
    </OperacaosContext.Provider>
  );
};
