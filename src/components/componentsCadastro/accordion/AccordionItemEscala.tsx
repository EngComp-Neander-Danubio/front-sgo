import {
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Button,
  AccordionItem,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { BotaoCadastrar } from '../botaoCadastrar';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useEvents } from '../../../context/eventContext/useEvents';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import { IForm } from '../modal/FormSelectRequesistos';
import { BiPencil } from 'react-icons/bi';
import { CiCircleList } from 'react-icons/ci';
import { ModalRelatorio } from '../modal/ModalRelatorio';
import { ModalRequesitos } from '../modal/ModalRequesitos';
import { ModalRestantes } from '../modal/ModalRestantes';
import { ModalServices } from '../modal/ModalServices';
interface IAccordion {
  isEditing: boolean;
}
export const AccordionItemEscala: React.FC<IAccordion> = ({ isEditing }) => {
  const { isOpen } = useIsOpen();
  const {
    isOpen: isOpenRequesitos,
    onOpen: onOpenRequesitos,
    onClose: onCloseRequesitos,
  } = useDisclosure();
  const {
    isOpen: isOpenModalRelatorio,
    onOpen: onOpenModalRelatorio,
    onClose: onCloseModalRelatorio,
  } = useDisclosure();
  const {
    isOpen: isOpenModalRestantes,
    onOpen: onOpenModalRestantes,
    onClose: onCloseModalRestantes,
  } = useDisclosure();

  const {
    handleRandomServices,
    handleRandomServicesNewTable,
    services,
    totalMilitar,
    totalMilitarEscalados,
    militaresRestantes,
  } = useRequisitos();
  const {
    isOpen: isOpenModalServices,
    onOpen: onOpenModalServices,
    onClose: onCloseModalServices,
  } = useDisclosure();

  const { searchServices, searchServicesById } = useRequisitos();
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

  const methodsInput = useForm<IForm>({
    resolver: yupResolver(eventoSchema),
  });
  const { uploadEvent } = useEvents();

  const { reset } = methodsInput;

  const onSubmit = async (data: IForm) => {
    await uploadEvent(data);
    //reset();
  };
  return (
    <>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                _expanded={{
                  bgColor: isExpanded ? '#EAECF0' : 'transparent',
                }}
              >
                <Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
                  Escala
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              w={{
                xl: isOpen ? '84vw' : '91vw',
                lg: isOpen ? '84vw' : '91vw',
                md: isOpen ? '84vw' : '91vw',
                sm: isOpen ? '84vw' : '91vw',
              }}
              transitionDuration="1.0s"
              //border={'1px solid black'}
            >
              <Flex
                flexDirection={'column'}
                justifyContent={'space-around'}
                align={'center'}
                justify={'center'}
                //border={'1px solid black'}
              >
                <Flex
                  flexDirection={'row'}
                  //border={'1px solid black'}
                  justifyContent={'space-between'}
                  w={{
                    lg: isOpen ? '85vw' : '88vw',
                    md: isOpen ? '85vw' : '88vw',
                    sm: isOpen ? '85vw' : '88vw',
                  }}
                  transitionDuration="1.0s"
                  gap={2}
                  h={'fit-content'}
                >
                  <Flex
                    //gap={2}
                    //border={'1px solid red'}
                    //w={'100%'}
                    align={'center'}
                    justifyContent={'space-between'}
                    w={{
                      xl: isOpen ? '83vw' : '88vw',
                      lg: isOpen ? '83vw' : '88vw',
                      md: isOpen ? '83vw' : '88vw',
                      sm: isOpen ? '83vw' : '88vw',
                    }}
                    transitionDuration="1.0s"
                    //pr={7}
                    ml={4}
                  >
                    <Flex gap={2} pl={!isOpen ? 0 : 2}>
                      <Text fontWeight={'bold'}>Total:</Text>
                      {totalMilitar}
                      <Text fontWeight={'bold'}>Escalados: </Text>
                      {totalMilitarEscalados}
                      <Text
                        _hover={{
                          cursor: 'pointer',
                          //backgroundColor: '#ebf8ff',
                          //borderColor: '#2b6cb0',
                          //border: '1px solid #4299e1',
                          //borderRadius: '5px',
                          //borderWidth: '',
                          //padding: 1,
                        }}
                        onClick={onOpenModalRestantes}
                        fontWeight={'bold'}
                      >
                        Restantes
                      </Text>
                      <Text>{militaresRestantes.length}</Text>
                    </Flex>
                    <Flex gap={2}>
                      <Button
                        //color={'white'}
                        rightIcon={<CiCircleList size={'16px'} />}
                        colorScheme="blue"
                        variant="outline"
                        onClick={onOpenRequesitos}
                      >
                        Requisitos
                      </Button>

                      <Button
                        color={'white'}
                        rightIcon={<BiPencil size={'16px'} />}
                        bgColor=" #38A169"
                        _hover={{
                          bgColor: 'green',
                          cursor: 'pointer',
                          transition: '.5s',
                        }}
                        variant="ghost"
                        onClick={() => {
                          handleRandomServices(), onOpenModalServices();
                        }}
                      >
                        Gerar Escala
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex>
                  <BotaoCadastrar
                    handleSubmit={function(): void {
                      throw new Error('Function not implemented.');
                    }}
                    label={!isEditing ? 'Salvar' : 'Editar'}
                  />
                </Flex>
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <ModalRequesitos
        isOpen={isOpenRequesitos}
        onOpen={onOpenRequesitos}
        onClose={onCloseRequesitos}
      />

      <ModalRelatorio
        isOpen={isOpenModalRelatorio}
        onOpen={onOpenModalRelatorio}
        onClose={onCloseModalRelatorio}
      />
      <ModalRestantes
        isOpen={isOpenModalRestantes}
        onOpen={onOpenModalRestantes}
        onClose={onCloseModalRestantes}
        militaresRestantes={militaresRestantes}
      />
      <ModalServices
        isOpen={isOpenModalServices}
        onOpen={onOpenModalServices}
        onClose={onCloseModalServices}
      />
    </>
  );
};
