import {
  Button,
  Flex,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { DashButtons } from '../../componentesFicha/registrosMedicos/header';
import { TitlePerfil } from '../../componentesFicha/dadosDaFicha/titlePerfil';
import { TitleSolicitacoes } from '../../componentesFicha/registrosMedicos/title';
import {
  BotaoAlert,
  DadosFicha,
  IconeDeletar,
  IconeEditar,
} from '../../ViewLogin';
import { ModalFormAddPosto } from '../modal/ModalFormAddPosto';
import { TableSolicitacoes } from '../table-solicitacoes';
import { columnsMapPostos } from '../../../types/yupPostos/yupPostos';
import { Pagination } from '../pagination/Pagination';
import { IoIosSend } from 'react-icons/io';
import { useSolicitacoesPostos } from '../../../context/solicitacoesPostosContext/useSolicitacoesPostos';
import api from '../../../services/api';
import { optionsModalidade } from '../../../types/typesModalidade';
import { useCallback, useEffect, useState } from 'react';
import { PostoForm } from '../../../context/solicitacoesOPMPostosContext/SolicitacoesOPMPostosContext';
import { readString } from 'react-papaparse';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import { IconeRedistribuir } from '../../componentesFicha/registrosMedicos/icones/iconeRedistribuir';
import { IconeVisualizar } from '../../componentesFicha/registrosMedicos/icones/iconeVisualizarSolicitacao';
import { useNavigate } from 'react-router-dom';
import { DataPostos } from '../../../types/typesPostos';
interface ISolicitacaoPostosContent {
  isOpen: boolean;
  handleToggle: () => void;
}
type Data = {
  id?: string;
  sps_id: number;
  sps_operacao_id: string;
  solicitacao: string;
  sps_status: string;
  prazo_final: Date;
  prazo_inicial: Date;
  unidades_id: number;
  nome_operacao: string;
};
export const SolicitacaoPostosContent: React.FC<ISolicitacaoPostosContent> = props => {
  const {
    isOpen: isOpenAlertSolicitacao,
    onOpen: onOpenAlertSolicitacao,
    onClose: onCloseAlertSolicitacao,
  } = useDisclosure();
  const {
    isOpen: isOpenFormAddPosto,
    onOpen: onOpenFormAddPosto,
    onClose: onCloseFormAddPosto,
  } = useDisclosure();

  const { solicitacaoPostoIndividual } = useSolicitacoesPostos();
  const toast = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [postosLocal, setPostosLocal] = useState<DataPostos[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(5); // Defina o número de registros por página
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = postosLocal.length;
  const currentData = postosLocal.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < postosLocal.length;
  useEffect(() => {
    loadPostosFromSolicitacaoToBackend(
      Number(solicitacaoPostoIndividual?.sps_id),
    );
  }, []);
  const loadPostosFromSolicitacaoToBackend = async (id: number) => {
    try {
      const response = await api.get<DataPostos[]>(`/listar-postos/${id}`);
      const newPostos: DataPostos[] = response.data.filter(
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

        const parsedArray = result.data as DataPostos[];

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
  const loadPostoByOPM = (data: DataPostos) => {
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

  const handleClick = () => {
    document.getElementById('solicitacaoPostoInput')?.click();
  };
  //deletePostoByOPM
  const deletePostoByOPM = useCallback(
    async (id?: string, index?: string | number) => {
      if (id !== undefined && index !== undefined) {
        try {
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
          //setIsLoading(false);
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
          //setIsLoading(false);
          return;
        }
        const updatedOpm = postosLocal.filter((_, i) => i !== Number(index));

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
        //setIsLoading(false);
      }
    },
    [postosLocal, currentDataIndex, currentData.length],
  );

  const columns: Array<ColumnProps<DataPostos>> = [
    {
      key: 'local',
      title: 'Local',
    },
    {
      key: 'endereco',
      title: 'Endereço',
    },
    {
      key: 'bairro',
      title: 'Bairro',
    },
    {
      key: 'numero',
      title: 'Número',
    },
    {
      key: 'cidade',
      title: 'Cidade',
    },
    {
      key: 'modalidade',
      title: 'Modalidade',
      render: (_, record) => {
        const modalidadeData =
          optionsModalidade.find(m => m.value === record.modalidade)?.label ||
          null;
        return (
          <>
            {modalidadeData?.toLowerCase() ?? record.modalidade.toLowerCase()}
          </>
        );
      },
    },
    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        // Encontrar o índice do registro diretamente no array de dados
        const index = postosLocal?.findIndex(item => item === record);

        return (
          <Flex flexDirection="row" gap={2}>
            <span key={`delete-${record.id ?? index}`}>
              <IconeDeletar
                label_tooltip={record.local}
                handleDelete={async () => {
                  //console.log(index);
                  if (index !== undefined && index !== -1) {
                    await deletePostoByOPM(record.id, index.toString()); // Passe o índice diretamente
                  } else {
                    console.error(
                      'Índice não encontrado para o registro',
                      record,
                    );
                  }
                }}
              />
            </span>
            <span key={`edit-${record.id ?? index}`}>
              <IconeEditar label_tooltip={record.local} />
            </span>
          </Flex>
        );
      },
    },
  ];
  const sendPostosFromSolicitacaoToBackend = async () => {
    try {
      const postos_servicos = {
        postos_servicos: postosLocal.map(
          ({ militares_por_posto, numero, modalidade, ...rest }) => ({
            ...rest,
            operacao_id: solicitacaoPostoIndividual?.sps_operacao_id,
            solicitacao_id: solicitacaoPostoIndividual?.sps_id,
            uni_codigo: solicitacaoPostoIndividual?.unidades_id,
            militares_por_posto: Number(militares_por_posto),
            numero: Number(numero),
            modalidade:
              optionsModalidade.find(m => m.value === modalidade)?.label ||
              null,
          }),
        ),
      };

      await api.post(`/criar-postos`, postos_servicos);
      toast({
        title: 'Sucesso',
        description: 'Postos adicionados com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao inserir Postos',
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
          w={props.isOpen ? '83vw' : '91vw'}
          transitionDuration="1.0s"
          minH={'120px'}
          height={'content'}
          //align={{lg: 'center', md: 'center', sm: 'left'}}
          flexDirection={{
            lg: 'row',
            md: 'row',
            sm: 'column',
          }}
          gap={{
            lg: 2,
            md: 2,
            sm: 4,
          }}
        >
          <DadosFicha
            operacao={solicitacaoPostoIndividual?.nome_operacao}
            solicitacao={solicitacaoPostoIndividual?.sps_operacao_id}
            prazo_final={solicitacaoPostoIndividual?.prazo_final}
            prazo_inicial={solicitacaoPostoIndividual?.prazo_inicial}
            marginLeft={{
              lg: 6,
              md: 6,
              sm: 0,
            }}
            align={{
              lg: 'center',
              md: 'center',
              sm: 'left',
            }}
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
          <TitleSolicitacoes label="Relação de Postos de Serviço" />
        </Flex>
        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          w={props.isOpen ? '83vw' : '91vw'}
          transitionDuration="1.0s"
          flexDirection={'column'}
          overflowY={'auto'}
        >
          <DashButtons
            openModalAdd={onOpenFormAddPosto}
            openModalSend={onOpenAlertSolicitacao}
            handleClick={handleClick}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            loadData={sendPostosFromSolicitacaoToBackend}
          />
          <Flex mt={2} flexDirection={'column'} w={'100%'}>
            <TableMain data={currentData} columns={columns} />

            {/* Componente de paginação */}
            <Pagination
              totalPages={totalData}
              dataPerPage={dataPerPage}
              firstDataIndex={firstDataIndex}
              lastDataIndex={lastDataIndex}
              loadLess={loadLessSolicitacoesOPMPostos}
              loadMore={loadMoreSolicitacoesOPMPostos}
            />
          </Flex>
        </Flex>
        <Flex
          p={4}
          //mt={1}
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

      <ModalFormAddPosto
        isOpen={isOpenFormAddPosto}
        onOpen={onOpenFormAddPosto}
        onClose={onCloseFormAddPosto}
        uploadPosto={loadPostoByOPM}
      />
    </>
  );
};
