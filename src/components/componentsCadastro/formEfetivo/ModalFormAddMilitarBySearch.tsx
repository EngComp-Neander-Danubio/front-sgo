import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { FormEfetivo } from '../formEfetivo/FormEfetivo';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { militarSchema } from '../../../types/yupMilitares/yupMilitares';
import { Militar } from '../../../context/solicitacoesOPMPMsContext/SolicitacoesOPMPMsContext';
interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  uploadPM: (data: Militar) => Promise<void>;
}

export const ModalFormAddMilitarBySearch: React.FC<IModal> = ({
  uploadPM,
  isOpen,
  onClose,
}) => {
  const methodsInput = useForm<Militar>({
    resolver: yupResolver(militarSchema),
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: Militar) => {
    await uploadPM(data);
    console.log(data);
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
              <ModalHeader>Adicionar Policial Militar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormEfetivo />
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
                  bgColor={' #38A169'}
                  color={'#fff'}
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
