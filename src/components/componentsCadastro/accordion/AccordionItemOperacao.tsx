import {
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  AccordionItem,
} from '@chakra-ui/react';
import { BotaoCadastrar } from '../botaoCadastrar';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';
import { FormProvider, useForm } from 'react-hook-form';
import { FormGrandeEvento } from '../formGrandeEvento/FormGrandeEvento';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useEvents } from '../../../context/eventContext/useEvents';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import { formatDate, normalizeDate } from '../../../utils/utils';
import { usePostos } from '../../../context/postosContext/usePostos';

type IForm = {
  id?: string;
  comandante: string;
  dataFinal: Date;
  dataInicio: Date;
  nomeOperacao: string;
};
interface IAccordion {
  isEditing: boolean;
}
export const AccordionItemOperacao: React.FC<IAccordion> = ({ isEditing }) => {
  const { isOpen } = useIsOpen();
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
    defaultValues: {
      comandante: "militar"
    }

  });
  const { uploadEvent, updateEvent , eventById } = useEvents();

  const onSubmit = async (data: IForm) => {
    if(!isEditing) {
      await uploadEvent(data);
    }else{
      await updateEvent(data, eventById?.id)
    }
    //reset();
  };

  const { setValue } = methodsInput;
  useEffect(() => {
    console.log(eventById);
    if (eventById && isEditing) {
      setValue('comandante', (eventById?.comandante as unknown) as string);
      setValue('nomeOperacao', eventById?.nomeOperacao);
      setValue(
        'dataInicio',
        new Date(normalizeDate((eventById?.dataInicio as unknown) as string)),
      );
      setValue(
        'dataFinal',
        new Date(normalizeDate((eventById?.dataFinal as unknown) as string)),
      );
    }
  }, [eventById, setValue]);

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
                  Operação
                </Box>

                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              w={{
                lg: isOpen ? '82vw' : '91vw',
                md: isOpen ? '82vw' : '91vw',
                sm: isOpen ? '82vw' : '91vw',
              }}
              transitionDuration="1.0s"
              minH={'20vh'}
            >
              <FormProvider {...methodsInput}>
                <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
                  <Flex
                    flexDirection={'column'}
                    align={'center'}
                    //justify={'center'}
                    justifyContent={'space-between'}
                    gap={8}
                    h={'100%'}
                    //border={'1px solid green'}
                  >
                    <FormGrandeEvento />
                    <BotaoCadastrar
                      type="submit"
                      handleSubmit={onSubmit}
                      label={!isEditing ? 'Salvar' : 'Editar'}
                    />
                  </Flex>
                </form>
              </FormProvider>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </>
  );
};
