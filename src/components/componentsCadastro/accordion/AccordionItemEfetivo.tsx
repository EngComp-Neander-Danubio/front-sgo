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
import { useMilitares } from '../../../context/militaresContext/useMilitares';
import { ModalSolicitarEfetivo } from '../modal/ModalSolicitarEfetivo';
import { ModalSAPM } from '../modal/ModalSAPM';
import {
  DataEfetivo,
  handleSortByPostoGrad,
} from '../../../types/typesMilitar';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import React from 'react';
interface IAccordion {
  isEditing: boolean;
}
export const AccordionItemEfetivo: React.FC<IAccordion> = ({ isEditing }) => {
  const { isOpen } = useIsOpen();
  const {
    dataPerPage,
    totalData,
    pms,
    firstDataIndexMilitar,
    lastDataIndexMilitar,
    loadLessMilitar,
    loadMoreMilitar,
    handleClickMilitar,
    handleOnChangeMilitar,
    handleOnSubmitMilitar,
    deletePMByCGO,
    loadPMForAccordion,
  } = useMilitares();

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
  const columns: Array<ColumnProps<DataEfetivo>> = [
    {
      key: 'matricula',
      title: 'Matrícula',
    },
    {
      key: 'posto_grad',
      title: 'Posto/Graduação',
    },
    {
      key: 'nome_completo',
      title: 'Nome',
    },
    {
      key: 'opm',
      title: 'OPM',
    },

    {
      key: 'acoes',
      title: 'Ações',
      render: (column, record) => {
        // Encontrar o índice do registro diretamente no array de dados
        const index = pms?.findIndex(item => item === record);

        return (
          <Flex flexDirection="row" gap={2}>
            <span key={`delete-${record.id}`}>
              <IconeDeletar
                label_tooltip={record.nome_completo}
                handleDelete={async () => {
                  if (index !== undefined && index !== -1) {
                    await deletePMByCGO(record.id, index.toString());
                  } else {
                    console.error(
                      'Índice não encontrado para o registro',
                      record,
                    );
                  }
                }}
              />
            </span>
            <span key={`edit-${column.key}`}>
              <IconeEditar label_tooltip={record.nome_completo} />
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
                  Efetivo Policial
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
              //maxH={'48vh'}
              minH={pms.length > 0 ? '50vh' : '20vh'}
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
                      <Tooltip
                        label={`Campos essencias: Posto/Graduação, Matrícula, OPM, Nome Completo`}
                        aria-label="A tooltip"
                        placement="top"
                        borderRadius={'5px'}
                      >
                        <span>
                          <InputCSVpapparse
                            nameInput="militarInput"
                            handleClick={handleClickMilitar}
                            handleOnChange={handleOnChangeMilitar}
                            handleOnSubmit={handleOnSubmitMilitar}
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
                      onClick={onOpenModalSolicitarMilitares}
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
                    data={pms}
                    columns={handleSortByPostoGrad(columns, '1')}
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
                  handleSubmit={function(): void {
                    throw new Error('Function not implemented.');
                  }}
                  label={!isEditing ? 'Salvar' : 'Editar'}
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
      />
    </>
  );
};
