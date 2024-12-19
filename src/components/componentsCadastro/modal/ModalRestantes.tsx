import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Flex,
} from '@chakra-ui/react';
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { Pagination } from '../pagination/Pagination';
import { TableSolicitacoes } from '../table-solicitacoes';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
import { IconeDeletar, IconeEditar } from '../../ViewLogin';
import { DataEfetivo } from '../../../types/typesMilitar';


import TableMain, { ColumnProps } from '../TableMain/TableMain';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  militaresRestantes: Militares_service[];
}

export const ModalRestantes: React.FC<IModal> = ({
  isOpen,
  onClose,
  militaresRestantes,
}) => {


      const {
        dataPerPage,
        totalData,
        pms,
        firstDataIndexMilitar,
        lastDataIndexMilitar,
        loadLessMilitar,
        loadMoreMilitar,

      } = useMilitares();
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
            const index = militaresRestantes?.findIndex(item => item === record);

            return (
              <Flex flexDirection="row" gap={2}>
                <span key={`delete-${record.id}`}>
                  <IconeDeletar
                    label_tooltip={record.nome_completo}
                    handleDelete={async () => {
                      if (index !== undefined && index !== -1) {
                        //await deletePMByCGO(record.id, index.toString());
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW="50vw"
          minW="30vw"
          maxH="100vh"
          minH="40vh"
          overflowY={'auto'}
        >
          <ModalHeader>
            <Center color={'rgba(0, 0, 0, 0.48)'} fontWeight={'700'}>
              Militares Restantes
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex mt={2} flexDirection={'column'} w={'100%'}>


              <TableMain
                    data={militaresRestantes}
                    columns={columns}
                  />
              {/* Componente de paginação */}
              <Pagination
                totalPages={totalData}
                dataPerPage={dataPerPage}
                firstDataIndex={firstDataIndexMilitar}
                lastDataIndex={lastDataIndexMilitar}
                loadLess={loadLessMilitar}
                loadMore={loadMoreMilitar}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
