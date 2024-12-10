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
import { usePostos } from '../../../context/postosContext/usePostos';
import { PostoForm } from '../../../context/postosContext/PostosContex';
import { postosSchema } from '../../../types/yupPostos/yupPostos';
import { yupResolver } from '@hookform/resolvers/yup';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalAlertSolicitacaoPMs: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const methodsInput = useForm<PostoForm>();
  const { reset } = methodsInput;
  const { uploadPosto } = usePostos();
  const onSubmit = async (data: PostoForm) => {
    await uploadPosto(data);
    reset();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <FormProvider {...methodsInput}>
            <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
              <ModalHeader>Enviar Solicitação de PMs</ModalHeader>
              <ModalCloseButton />
              <ModalBody></ModalBody>

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
                  bgColor={' #38A169'}
                  color={'#fff'}
                  //onClick={onClose}
                  type="submit"
                >
                  Enviar
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};
