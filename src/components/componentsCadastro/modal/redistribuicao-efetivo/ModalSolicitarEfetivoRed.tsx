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
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSolicitacaoEfetivoRed } from './FormSolicitacaoEfetivoRed';
import { solicitacaoPostosSchema } from '../../../../types/yupSolicitacaoPostos/yupSolicitacaoPostos';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  opm_filha: opmSaPM[];
};

interface SolicitacaoForm {
  dataInicio: Date;
  dataFinal: Date;
  uni_codigo: number[];
  operacao_id?: string;
  select_opm?: string;
}
export const ModalSolicitacarEfetivoRed: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(solicitacaoPostosSchema),
    defaultValues: {
      dataInicio: new Date(),
      operacao_id: '02/2024',
    },
  });
  const { reset } = methodsInput;
  const handleReset = async () => {
    reset();
  };
  const onSubmit = async (data: SolicitacaoForm) => {
    try {
      console.log(' dados', data);
      //await api.post('/solicitacao-postos', dados);

      toast({
        title: 'Solicitações de Efetivo.',
        description: 'Solicitação Salva.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao criar solicitação',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <FormProvider {...methodsInput}>
        <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
          <ModalContent
            maxW="80vw"
            minW="40vw"
            w={'fit-content'}
            //h={'90vh'}
            maxH="100vh"
            //minH="65vh"
          >
            <ModalHeader>
              <Center color={'rgba(0, 0, 0, 0.48)'}>
                Redistribuição de Solicitação de Efetivo
              </Center>
            </ModalHeader>
            <ModalCloseButton onClick={async () => await handleReset()} />
            <ModalBody justifyContent="center" padding={4} gap={4}>
              <FormSolicitacaoEfetivoRed />
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
              >
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};
