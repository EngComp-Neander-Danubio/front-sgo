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
  const handleSortByPostoGrad = () => {
    // Define a ordem hierárquica das graduações (do menor para o maior)
    const hierarchy = [
      'Cel PM',
      'Ten-Cel PM',
      'Maj PM',
      'Cap PM',
      '1º Ten PM',
      '2º Ten PM',
      'St PM',
      '1º Sgt PM',
      '2º Sgt PM',
      '3º Sgt PM',
      'Cb PM',
      'Sd PM',
      'Al Sd PM',
    ];

    // Função de comparação
    return militaresRestantes.sort((a, b) => {
      const indexA = hierarchy.indexOf(a.posto_grad);
      const indexB = hierarchy.indexOf(b.posto_grad);

      // Compara os índices da hierarquia
      return indexA - indexB;
    });
  };
  const headerKeysMilitar =
    militaresRestantes.length > 0
      ? Object.keys(militaresRestantes[0]).filter(key =>
          ['matricula', 'posto_grad', 'nome_completo', 'opm'].includes(key),
        )
      : [];
      const {
        dataPerPage,
        totalData,
        pms,
        firstDataIndexMilitar,
        lastDataIndexMilitar,
        loadLessMilitar,
        loadMoreMilitar,
      } = useMilitares();
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
              <TableSolicitacoes
                isOpen={isOpen}
                isActions
                isView={true}
                columns={[
                  'Matrícula',
                  'Posto/Graduação',
                  'Nome Completo',
                  'Unidade',
                ]}
                registers={headerKeysMilitar}
                label_tooltip="Militar"
                height={'32vh'}
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
