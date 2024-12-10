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
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSolicitacaoPostosRed } from './FormSolicitacaoPostosRed';
import { solicitacaoPostosSchemaRed } from '../../../../types/yupSolicitacaoPostosRed/yupSolicitacaoPostosRed';
import { useSolicitacoesPostos } from '../../../../context/solicitacoesPostosContext/useSolicitacoesPostos';
import { formatDate, normalizeDate } from '../../../../utils/utils';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

type SolicitacaoForm = {
  dataInicio: Date;
  dataFinal: Date;
  uni_codigo: number[];
};
export const ModalSolicitacarPostosRed: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(solicitacaoPostosSchemaRed),
  });

  const { reset } = methodsInput;
  const onSubmit = async (data: SolicitacaoForm) => {
    try {
      console.log('data', data);
      //console.log(' dados', dados);
      //await api.post('/solicitacao-postos', dados);
      toast({
        title: 'Solicitações de Postos.',
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
                Redistribuição de Solicitação de Postos
              </Center>
            </ModalHeader>
            <ModalCloseButton onClick={() => reset()} />
            <ModalBody justifyContent="center" padding={4} gap={4}>
              <FormSolicitacaoPostosRed />
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
                type="submit"
                variant="ghost"
                bgColor=" #38A169"
                _hover={{
                  bgColor: 'green',
                  cursor: 'pointer',
                  transition: '.5s',
                }}
                color="#fff"
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
