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
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormGrandeEvento } from '../formGrandeEvento/FormGrandeEvento';
import { useEvents } from '../../../context/eventContext/useEvents';
import { useEffect } from 'react';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export interface IForm {
  id?: string;
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}

export const ModalFormAddEvent: React.FC<IModal> = ({ isOpen, onClose }) => {
  const methodsInput = useForm<IForm>({
    resolver: yupResolver(eventoSchema),
  });
  const { eventById, updateEvent } = useEvents();

  const { setValue, reset } = methodsInput;
  useEffect(() => {
    if (eventById) {
      setValue('comandante', eventById?.comandante);
      setValue('nomeOperacao', eventById?.nomeOperacao);
      setValue('dataInicio', new Date(eventById?.dataInicio));
      setValue('dataFinal', new Date(eventById?.dataFinal));
    }
  }, [eventById, setValue]);
  const onSubmit = async (data: IForm) => {
    await updateEvent(data, eventById?.id);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...methodsInput}>
          <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
            <ModalHeader>Editar Evento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormGrandeEvento flexDirection="column" widthSelect="18vw" />
            </ModalBody>
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
                color="white"
                type="submit"
              >
                Atualizar
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};
