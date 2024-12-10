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
import { handleSortByPostoGrad } from '../../types/typesMilitar';

export type SolicitacoesOPMPM = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface Militar {
  id?: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
  qtd_efetivo?: number;
  [key: string]: any;
}

/* export interface SolicitacoesOPMPMData {
  operacao: string;
  solicitacao: string;
  dataFinal: Date;
  dataInicio: Date;
  bairro: string;
  qtd_postos: string | number;
  [key: string]: any;
} */

export interface IContextSolicitacoesOPMPMData {
  pms: Militar[];
  loadMoreSolicitacoesOPMPMs: () => void;
  loadLessSolicitacoesOPMPMs: () => void;
  loadPMByOPM: (data: Militar) => void;
  handleClick: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  deletePMByOPM: (id?: string, index?: string) => Promise<void>;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const SolicitacoesOPMPMsContext = createContext<
  IContextSolicitacoesOPMPMData | undefined
>(undefined);

export const SolicitacoesOPMPMsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [pms, setPMs] = useState<Militar[]>([]);
  const [pmsDaPlanilha, setPMsDaPlanilha] = useState<Militar[]>([]);

  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(5); // Defina o número de registros por página
  const [, setIsLoading] = useState<boolean>(false);
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = pms.length;
  const currentData = pms.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < pms.length;

  const loadPMByOPM = (data: Militar) => {
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
          a => !pms.some(m => a.matricula === m.matricula),
        );

        if (newPMs.length > 0) {
          setPMs(prevArray => [...prevArray, ...newPMs]);
          toast({
            title: 'Sucesso',
            description: 'PM(s) adicionado(s) com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Erro',
            description: 'Todos os PMs já existem, não serão adicionados:',
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
    if (pmsDaPlanilha.length > 0) {
      setPMs(prevArray => [...prevArray, ...pmsDaPlanilha]);
    }
  }, [pmsDaPlanilha]);

  // Função para carregar mais PMs (próxima página)
  const loadMoreSolicitacoesOPMPMs = () => {
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

  // Função para carregar menos PMs (página anterior)
  const loadLessSolicitacoesOPMPMs = () => {
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

  // Ao submeter o formulário, reinicie o índice e carregue o CSV
  const handleOnSubmit = (e: React.FormEvent) => {
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

  useEffect(() => {}, [pms]);

  // Função para lidar com o clique no input de arquivo
  const handleClick = () => {
    document.getElementById('militarOPMInput')?.click();
  };

  // Função para ler o arquivo CSV e processar os dados
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const deletePMByOPM = useCallback(
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
            description: 'Posto deletado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          // Exibe o toast de erro
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
          Number(currentDataIndex * (lastDataIndex - firstDataIndex)) +
          Number(index);
        console.log('index', indexDeletedOpm);
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

        const updatedOpm = pms.filter((_, i) => i !== indexDeletedOpm);

        if (updatedOpm.length !== pms.length) {
          setPMs(updatedOpm);
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
  useEffect(() => {
    handleSortByPostoGrad(pms);
  }, [
    pms,
    pmsDaPlanilha,
    firstDataIndex,
    lastDataIndex,
    currentDataIndex,
    currentData,
    totalData,
    handleOnSubmit,
    handleClick,
    handleOnChange,
  ]);
  const contextValue = useMemo(
    () => ({
      pms: currentData,
      pmsDaPlanilha,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesOPMPMs,
      loadLessSolicitacoesOPMPMs,
      loadPMByOPM,
      handleClick,
      handleOnChange,
      handleOnSubmit,
      deletePMByOPM,
    }),
    [
      pms,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesOPMPMs,
      loadLessSolicitacoesOPMPMs,
      loadPMByOPM,
      handleClick,
      handleOnChange,
      handleOnSubmit,
      deletePMByOPM,
    ],
  );

  return (
    <SolicitacoesOPMPMsContext.Provider value={contextValue}>
      {children}
    </SolicitacoesOPMPMsContext.Provider>
  );
};
