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
import { HiPencil } from 'react-icons/hi';
import { BotaoCadastrar } from '../botaoCadastrar';
import { InputCSVpapparse } from '../inputCSVpapaparse/InputCSVpapaparse';
import { Pagination } from '../pagination/Pagination';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import { usePostos } from '../../../context/postosContext/usePostos';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';
import { DataPostos } from '../../../types/typesPostos';
import { IconeDeletar, IconeEditar } from '../../ViewLogin';
import { ModalSolicitacarPostos } from '../modal/ModalSolicitarPostos';
import { ModalFormAddPosto } from '../modal/ModalFormAddPosto';
import { optionsModalidade } from '../../../types/typesModalidade';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { useCallback, useEffect, useState } from 'react';
import { PostoForm } from '../../../context/postosContext/PostosContex';
import { readString } from 'react-papaparse';
import api from '../../../services/api';
interface IAccordion {
  isEditing: boolean;
}
export const AccordionItemPostos: React.FC<IAccordion> = ({ isEditing }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen } = useIsOpen();
  const {
    sendPostoToBackendEmLote,
    loadingOnePostoToEditInTable,
    postoById
  } = usePostos();

  const {
    isOpen: isOpenFormAddPosto,
    onOpen: onOpenFormAddPosto,
    onClose: onCloseFormAddPosto,
  } = useDisclosure();
  const {
    isOpen: isOpenFormAddPostoEditing,
    onOpen: onOpenFormAddPostoEditing,
    onClose: onCloseFormAddPostoEdting,
  } = useDisclosure();
  const {
    isOpen: isOpenModalSolicitarPostos,
    onOpen: onOpenModalSolicitarPostos,
    onClose: onCloseModalSolicitarPostos,
  } = useDisclosure();

  const { OperacaoById } = useOperacao();

  const handlePostos = async (): Promise<void> => {
    await sendPostoToBackendEmLote(postosLocal, OperacaoById?.id ? OperacaoById?.id : '');
  };
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [postosLocal, setPostosLocal] = useState<PostoForm[]>([]);
  //const [postoById, setPostoById] = useState<PostoForm >();
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(5); // Defina o número de registros por página
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = postosLocal.length;
  const currentData = postosLocal.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < postosLocal.length;

  const loadPostosFromToBackend = async (id: string) => {
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
  useEffect(()=>{
    if(OperacaoById?.id)
    loadPostosFromToBackend(OperacaoById?.id)
  },[])

  const deletePostoFromTable = useCallback(
    async (id?: string, index?: string) => {

      if (id !== undefined && index !== undefined) {
        try {
          console.log('delete com id');
          await api.delete(`/deletar-posto/${id}`);
          setPostosLocal(prev => prev.filter(op => op.id !== id));
          toast({
            title: 'Sucesso',
            description: 'Posto deletado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 2000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Falha ao deletar o posto:', error);
          toast({
            title: 'Erro',
            description: 'Falha ao deletar o posto',
            status: 'error',
            position: 'top-right',
            duration: 2000,
            isClosable: true,
          });
        } finally {

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
            duration: 2000,
            isClosable: true,
            position: 'top-right',
          });

          return;
        }
        const updatedOpm = postosLocal.filter((_, i) => i !== Number(indexDeletedOpm));

        if (updatedOpm.length !== postosLocal.length) {
          setPostosLocal(updatedOpm);
          toast({
            title: 'Exclusão de Posto.',
            description: 'Posto excluído com sucesso.',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top-right',
          });
        }

      }
    },
    [postosLocal, currentDataIndex, currentData.length],
  );

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

    // OK
    const handleClick = () => {
      document.getElementById('postoInput')?.click();
    };

    // OK
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
  const loadMore = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais postos para carregar.',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  // OK
  const loadLess = () => {
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
  const loadingOnePostoToTable = (data: PostoForm) => {
    console.log(data)
    try {
      const postoExists = postosLocal.some(
        m =>
          data.local === m.local &&
          data.bairro === m.bairro &&
          data.numero === m.numero &&
          data.endereco === m.endereco &&
          data.cidade === m.cidade &&
          data.militares_por_posto === m.militares_por_posto
          && data.modalidade === m.modalidade
          && data.id === m.id,
      );

      if (!postoExists) {
        setPostosLocal(prevArray => [...prevArray, data]);
        toast({
          title: 'Sucesso',
          description: 'Posto adicionado com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Atenção',
          description: 'Posto já foi adicionado',
          status: 'warning',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao inserir Posto',
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const editingOnePostoInTable = async (data: PostoForm, operacao_id: string, id?: number ) => {
    //console.log('edit dados', data)
    try {
      if(id){
        const editPostoServico = {
          editPostoServico: {
            militares_por_posto: (data.militares_por_posto),
            local: data.local,
            modalidade: optionsModalidade.find(m => m.value === data.modalidade)?.label || null,
            cidade: data.cidade,
            endereco: data.endereco,
            numero: Number(data.numero),
            bairro: data.bairro,
            uni_codigo: null,
            operacao_id: operacao_id,
            solicitacao_id: null,
            id: data.id,
          }

        };
        await api.put<PostoForm[]>(`/editar-posto/${id}`, editPostoServico);
        toast({
          title: 'Sucesso',
          description: 'Posto editado com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
      }
      const postoIndex = postoById
        ? postosLocal.findIndex(posto =>
            posto === postoById
          )
        : -1;
        console.log(postoIndex)
      if (postoIndex !== -1) {
        // Atualizar o posto no array usando o índice encontrado
        setPostosLocal(prevArray =>
          prevArray.map((posto, i) =>
            i === postoIndex ? { ...posto, ...data } : posto
          )
        );

      } else {
        // Caso o posto não seja encontrado, adicione um novo posto
        setPostosLocal(prevArray => [...prevArray, data]);
        toast({
          title: 'Sucesso',
          description: 'Posto adicionado com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao editar posto',
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  };


  // Função para carregar o CSV completo
  // OK
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
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Nenhum posto novo encontrado',
            description: 'Todos os postos do CSV já existem.',
            status: 'warning',
            position: 'top-right',
            duration: 2000,
            isClosable: true,
          });
        }
      },
    });
  };

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
      key: 'numero',
      title: 'Número',
    },
    {
      key: 'bairro',
      title: 'Bairro',
    },
    {
      key: 'cidade',
      title: 'Cidade',
    },
    {
      key: 'militares_por_posto',
      title: 'Qtd Efetivo',
      render: (_, record) => {

        return <>{Number(record.militares_por_posto)}
        </>;
      },
    },
    {
      key: 'modalidade',
      title: 'Modalidade',
      render: (_, record) => {
        const modalidadeData =
          optionsModalidade.find(m => m.value === record.modalidade)?.label ||
          null;
        return <>{(modalidadeData) ?? (record.modalidade)}
        </>;
      },
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
                label_tooltip={record.local}
                handleDelete={async () => {
                  if (index !== undefined && index !== -1) {
                    await deletePostoFromTable(record.id, index.toString()); // Passe o índice diretamente
                    setIsLoading(!isLoading)
                  } else {
                    console.error(
                      'Índice não encontrado para o registro',
                      record,
                    );
                  }
                }}
              />
            </span>
            <span>
              <IconeEditar label_tooltip={record.local}
                onOpen={
                  () => {
                    onOpenFormAddPostoEditing();
                    loadingOnePostoToEditInTable(record);
                }}
              />
            </span>

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
                  Postos de Serviço
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
              minH={postosLocal.length > 0 ? '20vh' : '20vh'}
              overflowY={'auto'}
            >
              <Flex
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
                    <Flex flexDirection={'column'}>

                          <InputCSVpapparse
                            nameInput="postoInput"
                            handleClick={handleClick}
                            handleOnChange={handleOnChange}
                            handleOnSubmit={handleOnSubmit}
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
                      onClick={onOpenModalSolicitarPostos}
                      isDisabled
                    >
                      Solicitar Postos
                    </Button>
                    <Button
                      color={'white'}
                      rightIcon={<HiPencil size={'16px'} />}
                      bgColor=" #38A169"
                      _hover={{
                        bgColor: 'green',
                        cursor: 'pointer',
                        transition: '.5s',
                      }}
                      variant="ghost"
                      onClick={onOpenFormAddPosto}
                    >
                      Adicionar Individual
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
                  <TableMain data={currentData} columns={columns} />

                  {/* Componente de paginação */}
                  <Pagination
                    totalPages={totalData}
                    dataPerPage={dataPerPage}
                    firstDataIndex={firstDataIndex}
                    lastDataIndex={lastDataIndex}
                    loadLess={loadLess}
                    loadMore={loadMore}
                  />
                </Flex>

                <Divider />
                <BotaoCadastrar
                  handleSubmit={handlePostos}
                  label={!isEditing ? 'Salvar' : 'Editar'}
                  type="submit"
                />
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <ModalSolicitacarPostos
        isOpen={isOpenModalSolicitarPostos}
        onOpen={onOpenModalSolicitarPostos}
        onClose={onCloseModalSolicitarPostos}
      />

              <ModalFormAddPosto
                isOpen={isOpenFormAddPosto}
                onOpen={onOpenFormAddPosto}
                onClose={onCloseFormAddPosto}
                uploadPosto={loadingOnePostoToTable}
                isEditing ={ false}
                />
                 <ModalFormAddPosto
                isOpen={isOpenFormAddPostoEditing}
                onOpen={onOpenFormAddPostoEditing}
                onClose={onCloseFormAddPostoEdting}
                uploadPosto={editingOnePostoInTable}
                isEditing
                />

    </>
  );
};
