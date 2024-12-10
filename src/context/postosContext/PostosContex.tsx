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
import api from '../../services/api';
import { optionsModalidade } from '../../types/typesModalidade';
export type Posto = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};
export interface PostoForm {
  local: string;
  endereco: string;
  numero: number;
  bairro: string;
  cidade: string;
  modalidade: string;
  qtd_efetivo?: number;
  militares_por_posto: number;
  [key: string]: any;
}

export interface IContextPostoData {
  postos: PostoForm[];
  postosLocal: PostoForm[];
  postoById: PostoForm;
  postosByAPI: PostoForm[];
  handleClick: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmitP: (e: React.FormEvent) => void;
  loadMore: () => void;
  loadLess: () => void;
  loadPostoForAccordion: (data: PostoForm) => Promise<void>;
  uploadPosto: (data: PostoForm) => Promise<void>;
  uploadPostoEmLote: (dados: PostoForm[]) => Promise<void>;
  loadPostosByAPI: () => Promise<void>;
  updatePosto: (data: PostoForm, id: string) => Promise<void>;
  deletePostoByOPM: (id?: string, index?: string) => Promise<void>;
  loadPostosFromToBackend: (id?: string) => Promise<void>;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const PostosContext = createContext<IContextPostoData | undefined>(
  undefined,
);

export const PostosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [postos, setPostos] = useState<PostoForm[]>([]);
  const [postosByAPI, setPostosByAPI] = useState<PostoForm[]>([]);
  const [postoById, setPostoById] = useState<PostoForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [postosLocal, setPostosLocal] = useState<PostoForm[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(5); // Defina o número de registros por página

  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = postosLocal.length;
  const currentData = postosLocal.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < postosLocal.length;

  const loadPostosFromToBackend = async (id?: string) => {
    try {
      const response = await api.get<PostoForm[]>(`/listar-postos`, {
        params: {
          id: id,
        },
      });
      const newPostos: PostoForm[] = response.data.filter(
        novoPosto =>
          !postosLocal.some(
            postoExistente =>
              novoPosto.local === postoExistente.local &&
              novoPosto.bairro === postoExistente.bairro &&
              novoPosto.numero === postoExistente.numero &&
              novoPosto.endereco === postoExistente.endereco &&
              novoPosto.cidade === postoExistente.cidade,
          ),
      );
      setPostosLocal(newPostos);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Erro ao carregar postos: ${err.message}`);
      } else {
        console.error('Erro desconhecido ao carregar postos:', err);
      }
    }
  };
  const loadPostoForAccordion = (data: PostoForm) => {
    try {
      const postoExists = postosLocal.some(
        m =>
          data.local === m.local &&
          data.bairro === m.bairro &&
          data.numero === m.numero &&
          data.endereco === m.endereco &&
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
  };

  // Função para carregar o CSV completo
  const loadCompleteCSV = async (text: string) => {
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

        // Filtrar apenas os novos postos que ainda não existem no estado
        const newPostos = parsedArray.filter(
          a =>
            !postosLocal.some(
              m =>
                a.local?.trim() === m.local?.trim() &&
                a.bairro?.trim() === m.bairro?.trim() &&
                a.numero?.toString() === m.numero?.toString() &&
                a.endereco?.trim() === m.endereco?.trim() &&
                a.cidade?.trim() === m.cidade?.trim(),
            ),
        );

        if (newPostos.length > 0) {
          // Adicionar os novos postos ao estado
          setPostosLocal(prevArray => [...prevArray, ...newPostos]);
          toast({
            title: 'Sucesso',
            description: `${newPostos.length} posto(s) carregado(s) com sucesso.`,
            status: 'success',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Nenhum posto novo encontrado',
            description: 'Todos os postos do CSV já existem.',
            status: 'warning',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        }
      },
    });
  };

  const loadMore = () => {
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

  const loadLess = () => {
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

  const handleOnSubmitP = (e: React.FormEvent) => {
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

  const handleClick = () => {
    document.getElementById('postoInput')?.click();
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

  const loadPostosByAPI = useCallback(async (id: string) => {
    setIsLoading(true);
    //const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: PostoForm[] }>(
        `/operacao/${id}/postos`,
      );
      setPostosByAPI((response.data as unknown) as PostoForm[]);
      console.log(postosByAPI);
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
  const uploadPosto = useCallback(async (data: PostoForm) => {
    const { rua, bairro, cidade, numero } = data;
    setIsLoading(true);
    const dataPosto = {
      rua,
      numero,
      cidade,
      bairro,
      operacaoId: 202401,
      //operacaoId: (eventById?.id as unknown) as number,
    };

    try {
      await api.post(`/posto`, dataPosto);
      //setPosto((response.data as unknown) as Posto[]);
      toast({
        title: 'Sucesso',
        description: 'Posto salvo com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Falha ao salvar posto:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao salvar o posto',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  const uploadPostoEmLote = useCallback(async (dados: PostoForm[]) => {
    const postos_servicos = {
      postos_servicos: dados.map(
        ({ militares_por_posto, numero, modalidade, ...rest }) => ({
          ...rest,
          operacao_id: '06/2024',
          militares_por_posto: Number(militares_por_posto),
          numero: Number(numero),
          modalidade:
            optionsModalidade.find(m => m.value === modalidade)?.label || null,
        }),
      ),
    };
    try {
      await api.post('/criar-postos', postos_servicos);
      toast({
        title: 'Sucesso',
        description: 'Postos salvos com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Falha ao salvar postos:', error);

      // Exibe uma notificação de erro
      toast({
        title: 'Erro',
        description: 'Falha ao salvar os postos',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    } finally {
    }
  }, []);

  const updatePosto = useCallback(
    async (data: PostoForm, id: string) => {
      setIsLoading(true);
      try {
        await api.put(`/posto/${id}`, data);
        // await loadTasks();
        toast({
          title: 'Sucesso',
          description: 'Posto atualizada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
        setPostoById((null as unknown) as PostoForm);
      } catch (error) {
        console.error('Falha ao atualizar a Posto:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao atualizar a Posto',
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

  const deletePosto = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await api.delete(`/posto/${id}`);
        // await loadTasks();
        toast({
          title: 'Sucesso',
          description: 'Posto deletada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Falha ao deletar a posto:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao deletar a posto',
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
  const deletePostoByOPM = useCallback(
    async (id?: string, index?: number) => {
      setIsLoading(true);
      if (id !== undefined && index !== undefined) {
        try {
          console.log('delete com id');
          await api.delete(`/delete-postos/${id}`);
          toast({
            title: 'Sucesso',
            description: 'Posto deletado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Falha ao deletar o posto:', error);
          toast({
            title: 'Erro',
            description: 'Falha ao deletar o posto',
            status: 'error',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      } else if (index) {
        console.log('delete com index');
        const indexDeletedOpm =
          currentDataIndex * (lastDataIndex - firstDataIndex) + Number(index);

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

        setPostosLocal(updatedOpm);
        if (updatedOpm.length !== postosLocal.length) {
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

  const contextValue = useMemo(
    () => ({
      postosLocal: currentData,
      postos,
      postosByAPI,
      postoById,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      handleClick,
      loadMore,
      loadLess,
      handleOnChange,
      handleOnSubmitP,
      uploadPosto,
      uploadPostoEmLote,
      deletePosto,
      updatePosto,
      loadPostosByAPI,
      loadPostoForAccordion,
      deletePostoByOPM,
      loadPostosFromToBackend,
    }),
    [
      postosLocal,
      postos,
      postosByAPI,
      postoById,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      handleClick,
      loadMore,
      loadLess,
      handleOnChange,
      handleOnSubmitP,
      uploadPosto,
      uploadPostoEmLote,
      deletePosto,
      updatePosto,
      loadPostosByAPI,
      loadPostoForAccordion,
      deletePostoByOPM,
      loadPostosFromToBackend,
    ],
  );

  return (
    <PostosContext.Provider value={contextValue}>
      {children}
    </PostosContext.Provider>
  );
};
