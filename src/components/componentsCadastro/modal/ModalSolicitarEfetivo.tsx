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
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { FormSolicitacaoEfetivo } from './FormSolicitacaoEfetivo';
import { yupResolver } from '@hookform/resolvers/yup';
import solicitacaoEfetivoSchema from '../../../types/yupSolicitacaoEfetiv/yupSolicitacaoEfetivo';
import api from '../../../services/api';
import { formatDate } from '../../../utils/utils';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  militaresRestantes: Militares_service[];
}
interface SolicitacaoForm {
  operacao_id?: string;
  data_inicio: Date;
  data_final: Date;
  totalEfetivo?: number;
  uni_codigo: (number | undefined)[];
  efetivo: (number | undefined)[];
}

export const ModalSolicitarEfetivo: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(solicitacaoEfetivoSchema),
    defaultValues: {
      data_inicio: new Date(),
      operacao_id: '02/2024',
      uni_codigo: [],
      efetivo: [],
    },
  });
  const { reset } = methodsInput;

  const onSubmit = async (data: SolicitacaoForm) => {
    try {
      const dados = {
        operacao_id: data.operacao_id,
        prazo_inicial: formatDate(data.data_inicio),
        prazo_final: formatDate(data.data_final),
        unidades: data.uni_codigo.map((codigo, index) => ({
          uni_codigo: codigo,
          qtd_efetivo: data.efetivo[index], // Mapeia `efetivo` na mesma ordem
        })),
      };

      await api.post('/solicitacao-efetivo', dados);
      toast({
        title: 'Solicitação de Postos',
        description: 'Solicitação salva com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao criar solicitação.',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
      reset();
    }
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
                  Solicitação de Efetivo Policial
                </Center>
              </ModalHeader>
              <ModalCloseButton onClick={() => reset()} />

              <ModalBody justifyContent="center" padding={4} gap={4}>
                <FormSolicitacaoEfetivo />
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
                  Salvar
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
