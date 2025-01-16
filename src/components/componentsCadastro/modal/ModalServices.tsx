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
} from '@chakra-ui/react';
import { CardService } from '../cardServices/CardService';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { CardServiceCopy } from '../cardServices copy/CardServiceCopy';


interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalServices: React.FC<IModal> = ({ isOpen, onClose }) => {
  const { searchServicesById } = useRequisitos();
  const { control, watch } = useForm();
  const inputUser = watch('searchService');

  useEffect(() => {
    const handler = setTimeout(() => {
      searchServicesById(inputUser);
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [inputUser]);

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
              w={'100%'}
              flexDirection={'row'}
              align={'center'}
              justify={'center'}
            >
              <Flex></Flex>
            </Flex>
            <Flex
              overflowY={'auto'}
              maxH="60vh"
              minH="40vh"
              bgColor="rgba(248, 249, 250, 1)"
            >
              <CardServiceCopy isOpen={isOpen} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme="green" mr={3}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
