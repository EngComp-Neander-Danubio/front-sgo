import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FlexboxProps,
} from '@chakra-ui/react';
import { FormPosto } from '../formPosto/FormPosto';
import { FormProvider, useForm } from 'react-hook-form';
import { PostoForm } from '../../../context/postosContext/PostosContex';
import { postosSchema } from '../../../types/yupPostos/yupPostos';
import { yupResolver } from '@hookform/resolvers/yup';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  uploadPosto: (data: PostoForm) => void;
}

export const ModalFormAddPosto: React.FC<IModal> = ({
  isOpen,
  onClose,
  uploadPosto,
}) => {
  const methodsInput = useForm<PostoForm>({
    resolver: yupResolver(postosSchema),
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: PostoForm) => {
    await uploadPosto(data);
    onClose();
    reset();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <FormProvider {...methodsInput}>
            <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
              <ModalHeader>Adicionar Posto de Serviço</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormPosto />
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
                  color={'#fff'}
                  onClick={() => reset}
                  type="submit"
                >
                  Adicionar
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};
