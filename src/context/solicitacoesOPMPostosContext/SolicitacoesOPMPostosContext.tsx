import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { readString } from 'react-papaparse';
import api from '../../services/api';

export type SolicitacoesOPMPosto = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface PostoForm {
  id?: string;
  local: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  modalidade: string;
  qtd_efetivo?: number;
  militares_por_posto?: number;
  [key: string]: any;
}

export interface IContextSolicitacoesOPMPostoData {
  //postos: PostoForm[];
  postosLocal: PostoForm[];
  loadMoreSolicitacoesOPMPostos: () => void;
  loadLessSolicitacoesOPMPostos: () => void;
  loadPostoByOPM: (data: PostoForm) => void;
  setPostosLocal: React.Dispatch<React.SetStateAction<PostoForm[]>>;
  handleClick: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  deletePostoByOPM: (id?: string, index?: string) => Promise<void>;
  loadPostosByApi: (param?: string) => Promise<void>;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const SolicitacoesOPMPostosContext = createContext<
  IContextSolicitacoesOPMPostoData | undefined
>(undefined);

export const SolicitacoesOPMPostosProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [postosLocal, setPostosLocal] = useState<PostoForm[]>([]);
  const [postosDaPlanilha, setPostosDaPlanilha] = useState<PostoForm[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(8); // Defina o número de registros por página
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = postosLocal.length;
  const currentData = postosLocal.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < postosLocal.length;
  const [isLoading, setIsLoading] = useState<boolean>(false);



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

        const parsedArray = result.data as PostoForm[];
        const newPostos = parsedArray.filter(
          a =>
            !postosLocal.some(
              m =>
                a.local === m.local &&
                a.bairro === m.bairro &&
                a.numero === m.numero &&
                a.rua === m.rua &&
                a.cidade === m.cidade,
            ),
        );

        if (newPostos.length > 0) {
          setPostosDaPlanilha(prevArray => [...prevArray, ...newPostos]);
          setPostosLocal(prevArray => [...prevArray, ...postosDaPlanilha]);
          toast({
            title: 'Sucesso',
            description: 'Posto(s) adicionado(s) com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Erro',
            description: 'Todos os Postos já existem, não serão adicionados:',
            status: 'warning',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        }
      },
    });
  };
  useEffect(() => {
    if (postosDaPlanilha.length > 0) {
      setPostosLocal(prevArray => [...prevArray, ...postosDaPlanilha]); // Usar spread operator
    }
  }, [postosDaPlanilha]);

  const loadMoreSolicitacoesOPMPostos = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais postos para carregar.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  const loadPostoByOPM = (data: PostoForm) => {
    try {
      const postoExists = postosLocal.some(
        m =>
          data.local === m.local &&
          data.bairro === m.bairro &&
          data.numero === m.numero &&
          data.cidade === m.cidade,
      );

      if (!postoExists) {
        setPostosLocal(prevArray => [...prevArray, data]);
        toast({
          title: 'Sucesso',
          description: 'Posto adicionado com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Atenção',
          description: 'Posto já foi adicionado',
          status: 'warning',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao inserir Posto',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }

    //console.log('postos de serviço do perfil de OPM', postosLocal);
  };

  const loadLessSolicitacoesOPMPostos = () => {
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      const fileReader = new FileReader();
      fileReader.onload = posto => {
        const text = posto.target?.result;
        if (typeof text === 'string') {
          loadCompleteCSV(text);
          setCurrentDataIndex(0);
        }
      };
      fileReader.readAsText(e.target.files[0], 'ISO-8859-1');
    }
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = posto => {
        const text = posto.target?.result;
        if (typeof text === 'string') {
          loadCompleteCSV(text);
          setCurrentDataIndex(dataPerPage);
        }
      };
      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };

  // Verifique as mudanças no estado `pms`
  useEffect(() => {}, [postosLocal]);
  const handleClick = () => {
    document.getElementById('postoInput')?.click();
  };
  //deletePostoByOPM
  const deletePostoByOPM = useCallback(
    async (id?: string, index?: string | number) => {
      setIsLoading(true);

      if (id) {
        try {
          console.log('delete com id');
          await api.delete(`/postos-opm/${id}`);
          toast({
            title: 'Sucesso',
            description: 'Posto deletado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Falha ao deletar o posto:', error);
          toast({
            title: 'Erro',
            description: 'Falha ao deletar o posto',
            status: 'error',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      } else if (index) {
        //console.log('delete com index');
        const indexDeletedOpm =
          currentDataIndex * (lastDataIndex - firstDataIndex) + Number(index);

        console.log('index', indexDeletedOpm);

        if (indexDeletedOpm < 0 || indexDeletedOpm >= postosLocal.length) {
          toast({
            title: 'Erro!',
            description: 'Posto não encontrado na lista.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          setIsLoading(false);
          return;
        }
        const updatedOpm = postosLocal.filter((_, i) => i !== indexDeletedOpm);

        if (updatedOpm.length !== postosLocal.length) {
          setPostosLocal(updatedOpm);
          toast({
            title: 'Exclusão de Posto.',
            description: 'Posto excluído com sucesso.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        }
        setIsLoading(false);
      }
    },
    [postosLocal, currentDataIndex, currentData.length],
  );
  //loadPostosByApi
  const loadPostosByApi = useCallback(async (param?: string) => {
    setIsLoading(true);
    const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: PostoForm[] }>(
        `postos-opm/${parameters}`,
      );
      setPostosLocal((response.data as unknown) as PostoForm[]);
      console.log('Dados carregados:', response.data);
    } catch (error) {
      console.error('Falha ao carregar as tarefas:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      postosLocal: currentData,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesOPMPostos,
      loadLessSolicitacoesOPMPostos,
      loadPostoByOPM,
      handleClick,
      handleOnChange,
      handleOnSubmit,
      deletePostoByOPM,
      loadPostosByApi,
      setPostosLocal,
    }),
    [
      currentData,
      postosLocal,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesOPMPostos,
      loadLessSolicitacoesOPMPostos,
      loadPostoByOPM,
      handleClick,
      handleOnChange,
      handleOnSubmit,
      deletePostoByOPM,
      loadPostosByApi,
      setPostosLocal,
    ],
  );

  return (
    <SolicitacoesOPMPostosContext.Provider value={contextValue}>
      {children}
    </SolicitacoesOPMPostosContext.Provider>
  );
};
