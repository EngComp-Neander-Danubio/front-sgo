import React from 'react';
import {
  Flex,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import './table.modules.css';
import { ThTable } from './th';
import { TdTable } from './td';
import { IconeEditar, IconeDeletar } from '../../ViewLogin';
import { ModalFormAddEvent } from '../../componentsCadastro/modal/ModalFormAddEvent';
import { useEvents } from '../../../context/eventContext/useEvents';
import { useNavigate } from 'react-router-dom';

interface ITable {
  isOpen?: boolean;
  isActions?: boolean;
  columns: string[]; // Array de strings que representa os nomes das colunas
  registers: { [key: string]: any }[]; // Array de objetos, onde cada objeto representa uma linha e as chaves são os nomes das colunas
  moreLoad?: () => void;
  lessLoad?: () => void;
  currentPosition: number;
  rowsPerLoad: number;
  label_tooltip?: string;
  handleDelete?: () => {};
  handleUpdate?: (data: any, id: string) => Promise<void>;
  isCheckBox?: boolean;
  //customIcons?: React.ReactNode[];
}

export const TableEvent: React.FC<ITable> = ({
  isActions,
  isCheckBox,
  columns,
  registers,
  moreLoad,
  lessLoad,
  currentPosition,
  rowsPerLoad,
  label_tooltip,
  handleDelete,
}) => {
  const start = currentPosition > 0 ? currentPosition - rowsPerLoad + 1 : 0;
  const end = currentPosition;
  const {
    isOpen: isOpenFormEditarEvent,
    onOpen: onOpenFormEditarEvent,
    onClose: onCloseFormEditarEvent,
  } = useDisclosure();
  const { loadEventsById, deleteEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <>
      <Flex overflowY={'auto'} w="100%">
        <TableContainer
          pt={4}
          w="100%"
          transitionDuration="1.0s"
          //h={'60vh'}
          h={registers.length > 0 ? '60vh' : 'fit-content'}
          overflowY={'auto'}
        >
          <Table variant="simple">
            <TableCaption textAlign="left" p={0}>
              <Flex justify="space-between">
                {start}-{end} de {currentPosition} itens
                <Flex p={0} color="rgba(52, 64, 84, 1)">
                  <Button
                    mr={2}
                    fontSize="12px"
                    fontWeight="none"
                    bg="none"
                    border="1px solid"
                    borderColor="rgba(208, 213, 221, 1)"
                    borderRadius="8px"
                    color="rgba(52, 64, 84, 1)"
                    onClick={lessLoad}
                    disabled={currentPosition <= rowsPerLoad} // Desabilita se estiver na primeira página
                  >
                    Anterior
                  </Button>
                  <Button
                    ml={2}
                    fontSize="12px"
                    fontWeight="none"
                    bg="none"
                    border="1px solid"
                    borderColor="rgba(208, 213, 221, 1)"
                    color="rgba(52, 64, 84, 1)"
                    borderRadius="8px"
                    onClick={moreLoad}
                  >
                    Próximo
                  </Button>
                </Flex>
              </Flex>
            </TableCaption>

            <Thead>
              {/* {registers && registers.length > 0 && isCheckBox && (
                <ThTable title="CheckBox" customIcon={undefined} />
              )} */}
              <Tr
                borderTop="1px solid rgba(234, 236, 240, 1)"
                borderBottom="1px solid rgba(234, 236, 240, 1)"
                bg="rgba(252, 252, 253, 1)"
              >
                {columns?.map(column => (
                  <ThTable
                    key={column}
                    title={column}
                    customIcon={<AiOutlineArrowDown />}
                  />
                ))}
                {registers && registers.length > 0 && isActions && (
                  <ThTable title="Ações" customIcon={undefined} />
                )}
              </Tr>
            </Thead>
            <Tbody>
              {registers?.map((register, index) => (
                <Tr key={index}>
                  {columns?.map(column => (
                    <TdTable
                      key={column}
                      text={
                        typeof register[column] === 'string' ||
                        typeof register[column] === 'number'
                          ? register[column]
                          : JSON.stringify(register[column])
                      }
                    />
                  ))}
                  <TdTable
                    customIcons={
                      isActions
                        ? [
                            <IconeEditar
                              key="editar"
                              label_tooltip={`${label_tooltip}`}
                              onOpen={() => {
                                loadEventsById(register.Ord);
                                //onOpenFormEditarEvent();
                                navigate(`/servico/${register.Ord}`);
                              }}
                            />,
                            <IconeDeletar
                              key="deletar"
                              label_tooltip={`${label_tooltip}`}
                              handleDelete={async () => {
                                console.log('clicou no delete')
                                await deleteEvent(register.Ord);
                              }}
                            />,
                          ]
                        : undefined
                    }
                  />
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <ModalFormAddEvent
        isOpen={isOpenFormEditarEvent}
        onOpen={onOpenFormEditarEvent}
        onClose={onCloseFormEditarEvent}
      />
    </>
  );
};
{
  /* <IconeBusca
                              key="busca"
                              label_tooltip={`${label_tooltip}`}
                            />,
                            <IconeRelatorio
                              key="relatorio"
                              label_tooltip={`${label_tooltip}`}
                            />, */
}
