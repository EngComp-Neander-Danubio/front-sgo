import {
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Button,
  Divider,
  AccordionItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaFileUpload } from 'react-icons/fa';
import { BotaoCadastrar } from '../botaoCadastrar';
import { InputCSVpapparse } from '../inputCSVpapaparse/InputCSVpapaparse';
import { Pagination } from '../pagination/Pagination';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';
import { IconeDeletar } from '../../ViewLogin';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
import { ModalSolicitarEfetivo } from '../modal/ModalSolicitarEfetivo';
import { ModalSAPM } from '../modal/ModalSAPM';
import {
  DataEfetivo,
} from '../../../types/typesMilitar';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import React, { useCallback, useEffect, useState } from 'react';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { Militar } from '../../../context/militaresContext/MilitarContext';
import api from '../../../services/api';
import { readString } from 'react-papaparse';
interface IAccordion {
  isEditing: boolean;
}
export const AccordionItemEfetivo: React.FC<IAccordion> = ({ isEditing }) => {
  const { isOpen } = useIsOpen();

  const {
    isOpen: isOpenModalSolicitarMilitares,
    onOpen: onOpenModalSolicitarMilitares,
    onClose: onCloseModalSolicitarMilitares,
  } = useDisclosure();
  const {
    isOpen: isOpenModalSAPM,
    onOpen: onOpenModalSAPM,
    onClose: onCloseModalSAPM,
  } = useDisclosure();
  const {
    isOpen: isOpenFormAddMilitar,
    onOpen: onOpenFormAddMilitar,
    onClose: onCloseFormAddMilitar,
  } = useDisclosure();
  const {
    isOpen: isOpenFormAddMilitarEditing,
    onOpen: onOpenFormAddMilitarEditing,
    onClose: onCloseFormAddMilitarEditing,
  } = useDisclosure();
  const { OperacaoById } = useOperacao();
  const handlePM = async () : Promise<void> => {
    sendPMToBackendEmLote(pms, OperacaoById?.id ? OperacaoById?.id : '')
  }
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  //const [militarById, setMilitarById] = useState<Militar | undefined>(undefined);
  const [pms, setPMs] = useState<Militar[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(5); // Defina o número de registros por página
  const lastDataIndexMilitar = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndexMilitar = lastDataIndexMilitar - dataPerPage;
  const totalData = pms.length;
  const currentData = pms.slice(firstDataIndexMilitar, lastDataIndexMilitar);
  const hasMore = lastDataIndexMilitar < pms.length;

  // OK
  const loadPMsFromToBackend = async (id: string) => {
    try {
      const response = await api.get<Militar[]>(`/listar-efetivo`, {
        params: {
          operacao_id: id,
        },
      });
      const newPMs: Militar[] = response.data.filter(
        novoPM =>
          !pms.some(
            pms =>
              novoPM.matricula === pms.matricula &&
              novoPM.nome_completo === pms.nome_completo &&
              novoPM.opm === pms.opm &&
              novoPM.posto_grad === pms.posto_grad
          ),
      );
      setPMs(newPMs);

    } catch (err) {
      if (err instanceof Error) {
        console.error(`Erro ao carregar PPMM: ${err.message}`);
      } else {
        console.error('Erro desconhecido ao carregar PPMM:', err);
      }
    }
  };

  useEffect(() => {
    if(OperacaoById?.id)
    loadPMsFromToBackend(OperacaoById?.id)
  },[])
  const loadPMForAccordion = (data: Militar) => {
    setPMs(prevArray => [...prevArray, data]);
  };

  const sendPMToBackendEmLote = useCallback(async (dados: Militar[], id: string) => {
    const data = {
      operacao_id: id,
      matriculas: dados.map((d) => d.matricula)
    }
    try {
      await api.post('/efetivo-selecionado', data);
      toast({
        title: 'Sucesso',
        description: 'PPMM salvos com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Falha ao salvar PPMM:', error);

      toast({
        title: 'Erro',
        description: 'Falha ao salvar os PPMM',
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  }, []);

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
           duration: 2000,
           isClosable: true,
         });
        } else {
          toast({
            title: 'Nenhum PM novo encontrado',
            description: 'Todos os PPMM do CSV já existem.',
            status: 'warning',
            position: 'top-right',
            duration: 2000,
            isClosable: true,
          });
        }
      },
    });
  };

  const loadMoreMilitar = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais PPMM para carregar.',
        status: 'info',
        duration: 2000,
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
        duration: 2000,
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

  const deletePMFromTable = useCallback(
    async (id?: string, index?: string) => {

      // Caso o posto venha do backend (tem id)
      if (id !== undefined && index !== undefined) {
        try {
          console.log('delete com id');
          await api.delete(`/deletar-pm/${id}`);

          // Exibe o toast de sucesso
          toast({
            title: 'Sucesso',
            description: 'PM deletado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 2000,
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
            duration: 2000,
            isClosable: true,
          });
        }
      }
      // Caso o posto esteja apenas no estado local (não tem id)
      else if (index) {
        console.log('delete com index');
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
            duration: 2000,
            isClosable: true,
            position: 'top-right',
          });
          return;
        }
        // Remove o posto do estado local
        const updatedOpm = pms.filter((_, i) => i !== Number(indexDeletedOpm));
        // Atualiza o estado e exibe o toast de sucesso

        if (updatedOpm.length !== pms.length) {
          setPMs(updatedOpm);
          toast({
            title: 'Exclusão de PM.',
            description: 'PM excluído com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top-right',
          });
        }
      }
    },
    [pms, currentDataIndex, currentData.length],
  );
  const columns: Array<ColumnProps<DataEfetivo>> = [
    // {
    //   key: 'matricula' ,
    //   title: 'Matrícula',
    // },
    // {
    //   key: 'posto_grad',
    //   title: 'Posto/Graduação',
    // },
    // {
    //   key: 'nome_completo',
    //   title: 'Nome',
    // },
    // {
    //   key: 'opm',
    //   title: 'OPM',
    // },
    {
      key: 'ps_matricula' ,
      title: 'Matrícula',
    },
    {
      key: 'vpa_posto_grad',
      title: 'Posto/Graduação',
    },
    {
      key: 'vpa_nome_completo',
      title: 'Nome',
    },
    {
      key: 'vpa_opm_sigla',
      title: 'OPM',
    },
    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        // Encontrar o índice do registro diretamente no array de dados
        const index = currentData?.findIndex(item => item === record);

        return (
          <Flex flexDirection="row" gap={2}>
            <span>
              <IconeDeletar
                label_tooltip={record.nome_completo}
                handleDelete={async () => {
                  if (index !== undefined && index !== -1) {
                    await deletePMFromTable(record.id, index.toString());
                  } else {
                    console.error(
                      'Índice não encontrado para o registro',
                      record,
                    );
                  }
                }}
              />
            </span>
            {/* <span key={`edit-${column.key}`}>
              <IconeEditar label_tooltip={record.nome_completo}
              onOpen={
                () => {
                  onOpenFormAddMilitarEditing();
                  loadingOnePMToEditInTable(record)

              }}
              />
            </span> */}
          </Flex>
        );
      },
    },
  ];
  return (
    <>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                _expanded={{
                  bgColor: isExpanded ? '#EAECF0' : 'transparent',
                }}
              >
                <Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
                  Efetivo Policial
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              w={{
                lg: isOpen ? '82vw' : '91vw',
                md: isOpen ? '82vw' : '91vw',
                sm: isOpen ? '82vw' : '91vw',
              }}
              transitionDuration="1.0s"
              //maxH={'48vh'}
              minH={pms.length > 0 ? '20vh' : '20vh'}
              //overflowY={'auto'}
            >
              <Flex
                //gap={4}
                flexDirection={'row'}
                justifyContent={'space-between'}
                align={'center'}
                justify={'center'}
              >
                <Flex
                  flexDirection={'row'}
                  w={{
                    lg: isOpen ? '85vw' : '90vw',
                    md: isOpen ? '85vw' : '90vw',
                    sm: isOpen ? '85vw' : '90vw',
                  }}
                  transitionDuration="1.0s"
                  gap={2}
                  //border={'1px solid red'}
                  justifyContent={'space-between'}
                >
                  {' '}
                  <Flex></Flex>
                  <Flex gap={2}>
                    <Flex
                      flexDirection={'column'}
                      align={'center'}
                      justifyContent={'space-between'}
                    >
                          <InputCSVpapparse
                            nameInput="militarInput"
                            handleClick={handleClickMilitar}
                            handleOnChange={handleOnChangeMilitar}
                            handleOnSubmit={handleOnSubmitMilitar}
                          />
                    </Flex>
                    <Button
                      //color={'white'}
                      rightIcon={<FaFileUpload size={'16px'} />}
                      bgColor="#50a1f8"
                      //bgColor="#3182CE"
                      _hover={{
                        bgColor: '#1071cc',
                        cursor: 'pointer',
                        transition: '.5s',
                      }}
                      variant="ghost"
                      color={'#fff'}
                      onClick={onOpenModalSolicitarMilitares}
                      //isDisabled

                    >
                      Solicitar Militares
                    </Button>
                    <Button
                      //color={'white'}
                      rightIcon={<FaFileUpload size={'16px'} />}
                      bgColor=" #38A169"
                      _hover={{
                        bgColor: 'green',
                        cursor: 'pointer',
                        transition: '.5s',
                      }}
                      variant="ghost"
                      color={'#fff'}
                      onClick={onOpenModalSAPM}
                    >
                      Importar SAPM
                    </Button>
                  </Flex>
                </Flex>
              </Flex>

              <Flex
                pt={2}
                gap={4}
                flexDirection={'column'}
                align={'center'}
                /* w={{
              lg: isOpen ? '78vw' : '98vw',
              md: isOpen ? '78vw' : '98vw',
              sm: isOpen ? '78vw' : '98vw',
            }} */
                //overflowX={'auto'}
                // border={'1px solid red'}
              >
                <Flex mt={2} flexDirection={'column'} w={'100%'}>
                  <TableMain
                    data={currentData}
                    columns={columns}
                  />
                  <Pagination
                    totalPages={totalData}
                    dataPerPage={dataPerPage}
                    firstDataIndex={firstDataIndexMilitar}
                    lastDataIndex={lastDataIndexMilitar}
                    loadLess={loadLessMilitar}
                    loadMore={loadMoreMilitar}
                  />
                </Flex>

                <Divider />
                <BotaoCadastrar
                  handleSubmit={handlePM}
                  label={!isEditing ? 'Salvar' : 'Editar'}
                  type="submit"
                />
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <ModalSolicitarEfetivo
        isOpen={isOpenModalSolicitarMilitares}
        onOpen={onOpenModalSolicitarMilitares}
        onClose={onCloseModalSolicitarMilitares}
        militaresRestantes={[]}
      />
      <ModalSAPM
        isOpen={isOpenModalSAPM}
        onOpen={onOpenModalSAPM}
        onClose={onCloseModalSAPM}
      />
      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitar}
        onOpen={onOpenFormAddMilitar}
        onClose={onCloseFormAddMilitar}
        uploadPM={loadPMForAccordion}
        isEditing ={ false}
      />
      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitarEditing}
        onOpen={onOpenFormAddMilitarEditing}
        onClose={onCloseFormAddMilitarEditing}
        uploadPM={loadPMForAccordion}
        isEditing
      />
    </>
  );
};
