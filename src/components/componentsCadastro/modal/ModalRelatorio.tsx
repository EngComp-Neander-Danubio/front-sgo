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
} from '@chakra-ui/react';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalRelatorio: React.FC<IModal> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Center>Relatório da Escala</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{'Relatório'}</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
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
              onClick={isOpen ? onClose : undefined}
            >
              Distribuir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
