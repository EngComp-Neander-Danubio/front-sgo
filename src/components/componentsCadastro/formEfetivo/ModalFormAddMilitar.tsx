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
import { militarSchema } from '../../../types/yupMilitares/yupMilitares';
import { Militar } from '../../../context/solicitacoesOPMPMsContext/SolicitacoesOPMPMsContext';
import { FormEfetivoBySearch } from './FormEfetivoBySearch';
import { useEffect } from 'react';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  uploadPM: (data: Militar) => void;
  isEditing: boolean;
}

export const ModalFormAddMilitar: React.FC<IModal> = ({
  uploadPM,
  isOpen,
  onClose,
  isEditing,
}) => {
  const methodsInput = useForm<Militar>({
    resolver: yupResolver(militarSchema),
  });
  const { reset, setValue } = methodsInput;
  const {militarById} = useMilitares();
  const onSubmit = async (data: Militar) => {
    uploadPM(data);
    console.log(data);
    onClose();
    reset();
  };
  useEffect(()=>{
    if(militarById && isEditing){
      setValue('matricula', militarById?.matricula);
      setValue('nome_completo', militarById?.nome_completo);
      setValue('opm', militarById?.opm);
      setValue('posto_grad', militarById?.posto_grad);
    }
  })
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <FormProvider {...methodsInput}>
            <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
              <ModalHeader color={'rgba(0, 0, 0, 0.48)'}
            fontWeight={'700'}>{isEditing ? `Editar` : `Adicionar`} Policial Militar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormEfetivoBySearch />
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
                  {!isEditing ? `Salvar` : `Editar`}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};
