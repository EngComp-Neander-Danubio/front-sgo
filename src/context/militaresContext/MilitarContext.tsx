import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { readString } from 'react-papaparse';
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

export interface IContextMilitaresData {
  pms: Militar[];
  militares: Militares_service[];
  militarById: Militar;
  militaresByAPI: Militar[];
  militaresBySAPM: Militar[];
  handleClickMilitar: () => void;
  handleOnChangeMilitar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmitMilitar: (e: React.FormEvent) => void;
  loadMoreMilitar: () => void;
  loadLessMilitar: () => void;
  loadPMToPlanilha: (data: Militar) => void;
  loadMilitarBySAPM: (param?: string) => void;
  loadMilitarById: (id: string) => Promise<void>;
  loadMilitaresByAPI: (id: string) => Promise<void>;
  uploadMilitar: (data: Militares_service) => void;
  uploadMilitaresEmLote: (data: Militares_service[]) => void;
  updateMilitar: (data: Militar, id: string) => Promise<void>;
  loadPMForAccordion: (data: Militar) => Promise<void>;
  deletePMByCGO: (id?: string, index?: string) => Promise<void>;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndexMilitar: number;
  firstDataIndexMilitar: number;
  totalData: number;
}

export const MilitaresContext = createContext<
  IContextMilitaresData | undefined
>(undefined);

export const MilitaresProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [militares, setMilitares] = useState<Militares_service[]>([]);
  const [militaresByAPI, setMilitaresByAPI] = useState<Militar[]>([]);
  const [militarById, setMilitarById] = useState<Militar>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pms, setPMs] = useState<Militar[]>([]);
  const [pmsDaPlanilha, setPMsDaPlanilha] = useState<Militar[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(5); // Defina o número de registros por página
  const lastDataIndexMilitar = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndexMilitar = lastDataIndexMilitar - dataPerPage;
  const totalData = pms.length;
  const currentData = pms.slice(firstDataIndexMilitar, lastDataIndexMilitar);
  const hasMore = lastDataIndexMilitar < pms.length;

  useEffect(() => {
    handleSortByPostoGrad(pms, '1');
  }, [pms, pmsDaPlanilha]);
  const loadPMForAccordion = (data: Militar) => {
    console.log(data);
    setPMs(prevArray => [...prevArray, data]);
  };
  const loadPMToPlanilha = (data: Militar) => {
    try {
      const pmExists = pms.some(m => m.matricula === data.matricula);

      if (!pmExists) {
        setPMs(prevArray => [...prevArray, data]);
        toast({
          title: 'Sucesso',
          description: 'PM adicionado com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Atenção',
          description: 'PM já foi adicionado',
          status: 'warning',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao inserir PM',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Função para carregar o CSV completo
  const loadCompleteCSV = (text: string) => {
    readString(text, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      complete: result => {
        if (result.errors.length > 0) {
          console.error('Erro ao processar CSV:', result.errors);
          return;
        }
        const parsedArray = result.data as Militar[];
        // Verifica quais PMs são novos e não estão em pms
        const newPMs = parsedArray.filter(
          a => !pms.some(m => a.matricula.trim() === m.matricula.trim()),
        );

        if (newPMs.length > 0) {
          setPMs(prevArray => [...prevArray, ...newPMs]);
         toast({
           title: 'Sucesso',
           description: `${newPMs.length} PPMM carregado(s) com sucesso.`,
           status: 'success',
           position: 'top-right',
           duration: 5000,
           isClosable: true,
         });
        } else {
          toast({
            title: 'Nenhum PM novo encontrado',
            description: 'Todos os PPMM do CSV já existem.',
            status: 'warning',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        }
      },
    });
  };

  // Efeito para atualizar PMs ao carregar planilha
  useEffect(() => {
    if (pmsDaPlanilha.length > 0) {
      setPMs(pmsDaPlanilha); // Apenas redefina com os dados atuais
    }
  }, [pmsDaPlanilha]);

  const loadMoreMilitar = () => {
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

  const loadLessMilitar = () => {
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

  // Ao submeter o formulário, reinicie o índice e carregue o CSV
  const handleOnSubmitMilitar = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = pm => {
        const text = pm.target?.result;
        if (typeof text === 'string') {
          loadCompleteCSV(text); // Carregar o arquivo CSV completo
          setCurrentDataIndex(0); // Reiniciar o índice para o início
        }
      };
      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };

  // Verifique as mudanças no estado `pms`
  useEffect(() => {}, [pms]);

  // Função para lidar com o clique no input de arquivo
  const handleClickMilitar = () => {
    document.getElementById('militarInput')?.click();
  };

  // Função para ler o arquivo CSV e processar os dados
  const handleOnChangeMilitar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      const fileReader = new FileReader();
      fileReader.onload = pm => {
        const text = pm.target?.result;
        if (typeof text === 'string') {
          loadCompleteCSV(text); // Carregar o arquivo CSV completo
          setCurrentDataIndex(0); // Reiniciar a página para 0
        }
      };
      fileReader.readAsText(e.target.files[0], 'ISO-8859-1');
    }
  };

  const loadMilitarById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setMilitarById(militares.find(e => e.id === id));
    },
    [militares],
  );
  const loadMilitaresByAPI = useCallback(async (id: string) => {
    setIsLoading(true);
    //const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: Militar[] }>(
        `/operacao/${id}/militares`,
      );
      setMilitaresByAPI((response.data as unknown) as Militar[]);
      toast({
        title: 'Sucesso',
        description: 'Postos carregados com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
      console.log('Dados carregados:', response.data);
    } catch (error) {
      console.error('Falha ao carregar os Postos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const loadMilitarBySAPM = useCallback(async (param?: string) => {
    setIsLoading(true);
    const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: Militares_service[] }>(
        `militares/${parameters}`,
      );
      setMilitares((response.data as unknown) as Militares_service[]);
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
  const uploadMilitar = useCallback(
    async (data: Militares_service) => {
      setIsLoading(true);

      try {
        const response = await api.post('/militares', data);
        console.log('resposta: ', response.data);
        toast({
          title: 'Sucesso',
          description: 'Militar salvo com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error('error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const updateMilitar = useCallback(
    async (data: Militar, id: string) => {
      setIsLoading(true);
      try {
        await api.put(`/operacao/${id}`, data);
        // await loadTasks();
        toast({
          title: 'Sucesso',
          description: 'Tarefa atualizada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
        setMilitarById((null as unknown) as Militar);
      } catch (error) {
        console.error('Falha ao atualizar a tarefa:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao atualizar a tarefa',
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const uploadMilitaresEmLote = useCallback(
    async (data: Militares_service[]) => {
      setIsLoading(true);
      //console.log('Chamou o post de evento', data);
      try {
        const response = await api.post('/militares', data);
        console.log('resposta: ', response.data);
        toast({
          title: 'Sucesso',
          description: 'Militar salvo em lote com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error('error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
      militares,
      militaresByAPI,
      militarById,
      currentData,
      pms: currentData,
      totalData,
      firstDataIndexMilitar,
      lastDataIndexMilitar,
      currentDataIndex,
      dataPerPage,
      handleClickMilitar,
      loadMoreMilitar,
      loadLessMilitar,
      handleOnChangeMilitar,
      handleOnSubmitMilitar,
      loadMilitarBySAPM,
      loadMilitaresByAPI,
      uploadMilitar,
      uploadMilitaresEmLote,
      loadMilitarById,
      updateMilitar,
      loadPMForAccordion,
      deletePMByCGO,
      loadPMToPlanilha,
    }),
    [
      militares,
      militaresByAPI,
      militarById,
      currentData,
      pms,
      totalData,
      firstDataIndexMilitar,
      lastDataIndexMilitar,
      currentDataIndex,
      dataPerPage,
      handleClickMilitar,
      loadMoreMilitar,
      loadLessMilitar,
      handleOnChangeMilitar,
      handleOnSubmitMilitar,
      loadMilitarBySAPM,
      loadMilitaresByAPI,
      uploadMilitar,
      uploadMilitaresEmLote,
      loadMilitarById,
      updateMilitar,
      loadPMForAccordion,
      deletePMByCGO,
      loadPMToPlanilha,
    ],
  );

  return (
    <MilitaresContext.Provider value={contextValue}>
      {children}
    </MilitaresContext.Provider>
  );
};
