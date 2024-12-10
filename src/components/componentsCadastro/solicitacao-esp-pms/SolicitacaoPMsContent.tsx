import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Flex,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { TitlePerfil } from '../../componentesFicha/dadosDaFicha/titlePerfil';
import { DashButtons } from '../../componentesFicha/registrosMedicos/header';
import { TitleSolicitacoes } from '../../componentesFicha/registrosMedicos/title';
import { DadosFicha } from '../../ViewLogin';
import { TableSolicitacoes } from '../table-solicitacoes';
import { columnsMapMilitar } from '../../../types/typesMilitar';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import { Pagination } from '../pagination/Pagination';
import { useSolicitacoesOPMPMs } from '../../../context/solicitacoesOPMPMsContext/useSolicitacoesOPMPMs';
import { IoIosSend } from 'react-icons/io';
import { useSolicitacoesPMs } from '../../../context/solicitacoesPMsContext/useSolicitacoesPMs';
import { Militar } from '../../../context/solicitacoesOPMPMsContext/SolicitacoesOPMPMsContext';
import api from '../../../services/api';
import { readString } from 'react-papaparse';
interface IFlexCadastrar {
  isOpen: boolean;
  handleToggle: () => void;
}
export const SolicitacaoPMsContent: React.FC<IFlexCadastrar> = ({
  isOpen,
  handleToggle,
}) => {
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
  const { solicitacaoPMIndividual } = useSolicitacoesPMs();
  const {
    isOpen: isOpenAlertSolicitacao,
    onOpen: onOpenAlertSolicitacao,
    onClose: onCloseAlertSolicitacao,
  } = useDisclosure();
  const {
    isOpen: isOpenFormAddMilitar,
    onOpen: onOpenFormAddMilitar,
    onClose: onCloseFormAddMilitar,
  } = useDisclosure();
  useEffect(() => {
    loadPMsFromSolicitacaoToBackend(Number(solicitacaoPMIndividual?.sps_id));
  }, []);
  const loadPMsFromSolicitacaoToBackend = async (id: number) => {
    try {
      const response = await api.get<Militar[]>(`/listar-postos/${id}`);
      const newPMs: Militar[] = response.data.filter(
        novoPM =>
          !pms.some(
            pmExistente =>
              novoPM.local === pmExistente.local &&
              novoPM.bairro === pmExistente.bairro &&
              novoPM.numero === pmExistente.numero &&
              novoPM.rua === pmExistente.rua &&
              novoPM.cidade === pmExistente.cidade,
          ),
      );
      setPMs(newPMs);
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Erro ao carregar lista de PPMM: ${err.message}`);
      } else {
        console.error('Erro desconhecido ao carregar PPMM:', err);
      }
    }
  };
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

  // Função para lidar com o clique no input de arquivo
  const handleClick = () => {
    document.getElementById('solicitacaoMilitarOPMInput')?.click();
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
            description: 'PM deletado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 5000,
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
            duration: 5000,
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
  const transformedMiltitares = currentData.map(militar => {
    const transformedMilitar: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
      transformedMilitar[newKey] = militar[originalKey];
    });
    return transformedMilitar;
  });

   const sendPMsFromSolicitacaoToBackend = async () => {
     try {
       const pms_servicos = {
         postos_servicos: pms.map(
           ({ ...rest }) => ({
             ...rest,
             operacao_id: solicitacaoPMIndividual?.sps_operacao_id,
             solicitacao_id: solicitacaoPMIndividual?.sps_id,
             uni_codigo: solicitacaoPMIndividual?.unidades_id,

           }),
         ),
       };

       await api.post(`/criar-pms`, pms_servicos);
       toast({
         title: 'Sucesso',
         description: 'PPMM adicionados com sucesso',
         status: 'success',
         position: 'top-right',
         duration: 5000,
         isClosable: true,
       });
     } catch (err) {
       toast({
         title: 'Erro',
         description: 'Falha ao inserir PPMM',
         status: 'error',
         position: 'top-right',
         duration: 5000,
         isClosable: true,
       });
     }
   };
  return (
    <>
      <Flex h={'100%'} flexDirection={'column'}>
        <VStack spacing={2} p={4} alignItems="flex-start">
          <TitlePerfil />
        </VStack>

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          mt={2}
          w={isOpen ? '83vw' : '91vw'}
          transitionDuration="1.0s"
          minH={'120px'}
          height={'content'}
          //align={{lg: 'center', md: 'center', sm: 'left'}}
          flexDirection={{ lg: 'row', md: 'row', sm: 'column' }}
          gap={{ lg: 2, md: 2, sm: 4 }}
        >
          <DadosFicha
            operacao={solicitacaoPMIndividual?.nome_operacao}
            solicitacao={solicitacaoPMIndividual?.sps_operacao_id}
            prazo_final={solicitacaoPMIndividual?.prazo_final}
            prazo_inicial={solicitacaoPMIndividual?.prazo_inicial}
            marginLeft={{ lg: 6, md: 6, sm: 0 }}
            align={{ lg: 'center', md: 'center', sm: 'left' }}
          />
        </Flex>

        <Flex
          /* borderBottom="1px solid rgba(0, 0, 0, 0.5)"
                    boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
                    borderRadius={'8px'} */
          bg={'white'}
          p={4}
          mt={2}
          width="100%"
        >
          <TitleSolicitacoes label="Relação de Militares" />
        </Flex>

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          //mt={4}
          //mb={4}
          w={isOpen ? '83vw' : '91vw'}
          transitionDuration="1.0s"
          flexDirection={'column'}
          overflowY={'auto'}
          //maxH={'20vh'}
        >
          <DashButtons
            openModalAdd={onOpenFormAddMilitar}
            openModalSend={onOpenAlertSolicitacao}
            handleClick={handleClick}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            loadData={sendPMsFromSolicitacaoToBackend}
          />
          <Flex mt={2} flexDirection={'column'} w={'100%'}>
            <TableSolicitacoes
              isActions
              isOpen={isOpen}
              isView={true}
              columns={[
                'Matrícula',
                'Posto/Graduação',
                'Nome Completo',
                'Unidade',
              ]}
              registers={transformedMiltitares}
              //registers={handleSortByPostoGrad(transformedMiltitares, '1')}
              label_tooltip="Militar"
              height={'32vh'}
              handleDelete={deletePMByOPM}
            />
            <Pagination
              totalPages={totalData}
              dataPerPage={dataPerPage}
              firstDataIndex={firstDataIndex}
              lastDataIndex={lastDataIndex}
              loadLess={loadLessSolicitacoesOPMPMs}
              loadMore={loadMoreSolicitacoesOPMPMs}
            />
          </Flex>
        </Flex>
        <Flex
          p={4}
          mt={4}
          flexDirection={'column'}
          align={'center'}
          justify={'center'}
        >
          <Button
            variant="ghost"
            bgColor=" #38A169"
            _hover={{
              bgColor: 'green',
              cursor: 'pointer',
              transition: '.5s',
            }}
            color="#fff"
            type="submit"
            //onClick={reset}
            rightIcon={<IoIosSend color="#fff" size="20px" />}
            w={200}
          >
            Enviar
          </Button>
        </Flex>
      </Flex>

      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitar}
        onOpen={onOpenFormAddMilitar}
        onClose={onCloseFormAddMilitar}
        uploadPM={loadPMByOPM}
      />
    </>
  );
};
