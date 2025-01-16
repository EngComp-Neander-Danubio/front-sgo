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
  useToast,
} from '@chakra-ui/react';
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { Pagination } from '../pagination/Pagination';
import { DataEfetivo } from '../../../types/typesMilitar';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import { useState } from 'react';
import { IconeInserirMilitar } from '../../componentesFicha/registrosMedicos/icones/iconeInserirMilitar/IconeInserirMilitar';

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


  const toast = useToast();
      const [currentDataIndex, setCurrentDataIndex] = useState(0);
      const [datePerpage, setDatePerpage] = useState<number>(1);

      const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          setDatePerpage(parseInt(e.target.value));
      };
      const lastDataIndexMilitar = (currentDataIndex + 1) * datePerpage;
      const firstDataIndexMilitar = lastDataIndexMilitar - datePerpage;
      const totalData = militaresRestantes.length;
      const currentData = militaresRestantes.slice(firstDataIndexMilitar, lastDataIndexMilitar);
      const hasMore = lastDataIndexMilitar < militaresRestantes.length;

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
          key: 'opm_sigla',
          title: 'OPM',
        },

        {
          key: 'acoes',
          title: 'Ações',
          render: (column, record) => {
            // Encontrar o índice do registro diretamente no array de dados
            const index = militaresRestantes?.findIndex(item => item.matricula === record.matricula);

            return (
              <Flex flexDirection="row" gap={2}>
                <span key={`edit-${column.key}`}>
                  <IconeInserirMilitar label_tooltip={record.posto_grad + ' ' + record.nome_completo} />
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
          maxW="fit-content"
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
                    data={currentData}
                    columns={columns}
                  />
              {/* Componente de paginação */}
              <Pagination
                totalPages={totalData}
                dataPerPage={datePerpage}
                firstDataIndex={firstDataIndexMilitar}
                lastDataIndex={lastDataIndexMilitar}
                loadLess={loadLessMilitar}
                loadMore={loadMoreMilitar}
                handlePerPageChange={handlePerPageChange}
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
