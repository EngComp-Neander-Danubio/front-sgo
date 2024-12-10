import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
} from '@chakra-ui/react';
import { FormEfetivo } from '../formEfetivo/FormEfetivo';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { militarSchema } from '../../../types/yupMilitares/yupMilitares';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
export interface IForm {
  id?: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
}
export const ModalFormEditarMilitar: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const methodsInput = useForm<IForm>({
    resolver: yupResolver(militarSchema),
  });
  //const {militarById, updateMilitar } = useMilitares();

  const { setValue, reset } = methodsInput;
  /* useEffect(() => {
    if (militarById) {
      setValue('matricula', militarById.matricula
      setValue('nome_completo', militarById?.nome_completo);
      setValue('posto_grad', new Date(militarById?.posto_grad));
      setValue('opm', new Date(militarById?.opm));
    }
  }, [militarById, setValue]); */
  const onSubmit = async (data: IForm) => {
    //await updateMilitar(data, militarById?.id);
    reset();
    onClose();
  };
  return (
    <>
      <FormControl>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <FormProvider {...methodsInput}>
              <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
                <ModalHeader>Editar Policial Militar</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormEfetivo />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button variant="ghost" bgColor={' #38A169'} color={'#fff'}>
                    Adicionar
                  </Button>
                </ModalFooter>
              </form>
            </FormProvider>
          </ModalContent>
        </Modal>
      </FormControl>
    </>
  );
};
