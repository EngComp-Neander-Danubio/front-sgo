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
  Flex,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { Controller, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { CardServiceCopy } from '../cardServices copy/CardServiceCopy';
import { Service } from '../../../context/requisitosContext/RequisitosContext';
import api from '../../../services/api';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalServices: React.FC<IModal> = ({ isOpen, onClose }) => {
  const { searchServicesById, services } = useRequisitos();
  const { control, watch } = useForm();
  const inputUser = watch('searchService');
  const toast = useToast();
  const [servicesToConfirm, setServicesToConfirm] = useState<Service[]>([]);
  useEffect(() => {
    const handler = setTimeout(() => {
      searchServicesById(inputUser);
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [inputUser]);

  const sendServicesToBackend = useCallback(async () => {
    try {
      await api.post('/escala', services);
      toast({
        title: 'Sucesso',
        description: 'Escala salva com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao salvar Escala',
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW="100vw" minW="30vw" maxH="80vh" minH="40vh">
          <ModalHeader flexDirection={'row'}>
            <Flex
              align={'center'}
              justify={'center'}
              justifyContent={'space-around'}
              //maxW="100vw"
              //border={'1px solid red'}
            >
              <Center
                flexWrap={'nowrap'}
                w={'100%'}
                color={'rgba(0, 0, 0, 0.48)'}
                fontWeight={'700'}
              >
                Escala de Serviço
              </Center>
              <Controller
                name="searchService"
                control={control}
                render={({
                  field: { onChange, onBlur, value, ref },
                  fieldState: { error },
                }) => (
                  <InputPatternController
                    w={'500px'}
                    placeholder="Pesquisar um posto de serviço"
                    onChange={e => {
                      onChange(e.currentTarget.value);
                    }}
                    onBlur={onBlur}
                    value={value}
                    error={error}
                  >
                    <Icon as={SearchIcon} />
                  </InputPatternController>
                )}
              />
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              maxH="60vh"
              minH="40vh"
              bgColor="rgba(248, 249, 250, 1)"
              justify={'center'}
              w={'100%'}
              flexDirection={'column'}
              //border={'1px solid red'}
            >
              <CardServiceCopy handleServicesToConfirm={setServicesToConfirm} isOpen={isOpen} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="green" mr={3} onClick={sendServicesToBackend}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
