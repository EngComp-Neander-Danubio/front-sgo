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
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { militarSchema } from '../../../types/yupMilitares/yupMilitares';
import { ContentModalSAPM } from './ContentModalSAPM';
type Militar = {
  pessoa_pes_codigo: number;
  pessoa_pes_nome: string;
  gra_nome: string;
  unidade_uni_sigla: string;
  uni_codigo: number[];
};
type SolicitacaoForm = {
  busca: string;
  pessoa_pes_codigo: number;
  pessoa_pes_nome: string;
  gra_nome: string;
  unidade_uni_sigla: string;
  uni_codigo: number[];
};
interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalSAPM: React.FC<IModal> = ({ isOpen, onClose }) => {
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(militarSchema),
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: Militar) => {
    onClose();
    reset();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormProvider {...methodsInput}>
          <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
            <ModalContent
              w={'fit-content'}
              //h={'fit-content'}
              //h={'90vh'}
              maxW="80vw"
              minW="30vw"
              maxH="90vh"
              minH="fit-content"
            >
              <ModalHeader>
                <Center color={'rgba(0, 0, 0, 0.48)'}>
                  Adicionar Militares
                </Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody justifyContent="center" padding={4} gap={4}>
                <ContentModalSAPM />
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
                  //onClick={reset}
                >
                  Importar
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
