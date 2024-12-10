import {
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Tooltip,
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
import api from '../../../services/api';
import { useCallback, useEffect } from 'react';
import { PostoForm } from '../../../context/postosContext/PostosContex';
import { optionsModalidade } from '../../../types/typesModalidade';
import { useEvents } from '../../../context/eventContext/useEvents';
interface IAccordion {
  isEditing: boolean;
}
export const AccordionItemPostos: React.FC<IAccordion> = ({ isEditing }) => {
  const { isOpen } = useIsOpen();
  const {
    loadMore,
    loadLess,
    firstDataIndex,
    lastDataIndex,
    handleClick,
    handleOnChange,
    handleOnSubmitP,
    postosLocal,
    loadPostoForAccordion,
    totalData: totalDataPostosLocal,
    dataPerPage: dataPerPagePostosLocal,
    deletePostoByOPM,
    uploadPostoEmLote,
  } = usePostos();
  const {
    isOpen: isOpenFormAddPosto,
    onOpen: onOpenFormAddPosto,
    onClose: onCloseFormAddPosto,
  } = useDisclosure();
  const {
    isOpen: isOpenModalSolicitarPostos,
    onOpen: onOpenModalSolicitarPostos,
    onClose: onCloseModalSolicitarPostos,
  } = useDisclosure();
  const toast = useToast();
  const handlePostos = async (): Promise<void> => {
    uploadPostoEmLote(postosLocal);
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
        return <>{modalidadeData?.toLowerCase() ?? record.modalidade.toLowerCase()}</>;
      },
    },
    {
      key: 'acoes',
      title: 'Ações',
      render: (column, record) => {
        // Encontrar o índice do registro diretamente no array de dados
        const index = postosLocal?.findIndex(item => item === record);

        return (
          <Flex flexDirection="row" gap={2}>
            <span key={`delete-${record.id ?? index}`}>
              <IconeDeletar
                label_tooltip={record.local}
                handleDelete={async () => {
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
                lg: isOpen ? '84vw' : '91vw',
                md: isOpen ? '84vw' : '91vw',
                sm: isOpen ? '84vw' : '91vw',
              }}
              transitionDuration="1.0s"
              minH={postosLocal.length > 0 ? '50vh' : '20vh'}
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
                      <Tooltip
                        label={`Campos essencias: Local, Rua, Número, Bairro, Cidade, Modalidade`}
                        aria-label="A tooltip"
                        placement="top"
                        borderRadius={'5px'}
                      >
                        <span>
                          <InputCSVpapparse
                            nameInput="postoInput"
                            handleClick={handleClick}
                            handleOnChange={handleOnChange}
                            handleOnSubmit={handleOnSubmitP}
                          />
                        </span>
                      </Tooltip>
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
                  <TableMain data={postosLocal} columns={columns} />

                  {/* Componente de paginação */}
                  <Pagination
                    totalPages={totalDataPostosLocal}
                    dataPerPage={dataPerPagePostosLocal}
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
        uploadPosto={loadPostoForAccordion}
      />
    </>
  );
};
