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
import { FormSelectRequesitos, IForm } from './FormSelectRequesistos';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requisitosSchema } from '../../../types/yupRequisitos/yupRequisitos';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalRequesitos: React.FC<IModal> = ({ isOpen, onClose }) => {
  const methodsRequisitos = useForm<IForm>({
    resolver: yupResolver(requisitosSchema) as any,
    defaultValues: {
      aleatoriedade: true,
    },
  });
  const { reset } = methodsRequisitos;
  const { handleSubmitRequisitos } = useRequisitos();
  const handle = (e: any) => {
    handleSubmitRequisitos(e);
    reset();
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormProvider {...methodsRequisitos}>
          <form onSubmit={methodsRequisitos.handleSubmit(handle)}>
            <ModalContent>
              <ModalHeader>
                <Center>Requisistos de Distribuição</Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormSelectRequesitos isOpen={isOpen} />
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                >
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
                  //onClick={!methodsRequisitos.formState.defaultValues ? onClose : undefined}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
