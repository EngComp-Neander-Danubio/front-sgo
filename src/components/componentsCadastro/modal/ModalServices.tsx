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
} from '@chakra-ui/react';
import { CardService } from '../cardServices/CardService';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { BiSearch } from 'react-icons/bi';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalServices: React.FC<IModal> = ({ isOpen, onClose }) => {
  const { searchServices: services, searchServicesById } = useRequisitos();
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
      <Modal isOpen={isOpen} onClose={onClose}>
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
                  />
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
              <CardService services={services} isOpen={isOpen} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
