import {
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  AccordionItem,
} from '@chakra-ui/react';
import { BotaoCadastrar } from '../botaoCadastrar';
import { FormProvider, useForm } from 'react-hook-form';
import { FormGrandeEvento } from '../formGrandeEvento/FormGrandeEvento';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import moment from 'moment'; // Para manipulação de fuso horário

type IForm = {
  id?: string;
  nomeOperacao: string;
  comandante: number;
  dataInicio: Date;
  dataFinal: Date;
};
interface IAccordion {
  isEditing: boolean;
  handleIsLoadingPostos?: () => Promise<void>
}

export const AccordionItemOperacao: React.FC<IAccordion> = ({ isEditing, handleIsLoadingPostos }) => {
    const { updateOperacao, uploadOperacao, OperacaoById } = useOperacao();
  const methodsInput = useForm<IForm>({
    resolver: yupResolver(eventoSchema),
  });

  const onSubmit = async (data: IForm) => {
    try {
      if (!isEditing) {
        await uploadOperacao(data);
        if(handleIsLoadingPostos) handleIsLoadingPostos()
      } else {
        if (OperacaoById?.id) {
          await updateOperacao(data, OperacaoById?.id);
        }
      }
    } catch (error) {
      console.error('Erro ao salvar ou editar operação:', error);
         }
  };

  const { setValue } = methodsInput;
  useEffect(() => {
    if (OperacaoById && isEditing) {
      if (OperacaoById?.nomeOperacao) {
        setValue('nomeOperacao', OperacaoById.nomeOperacao);
      }
      if (OperacaoById?.comandante) {
        setValue('comandante', OperacaoById.comandante);
      }
      if (OperacaoById?.dataInicio) {
        setValue('dataInicio', new Date(moment(OperacaoById.dataInicio).utc().format('DD-MMM-YYYY HH:mm:ss')));
      }
      if (OperacaoById?.dataFinal) {
        setValue('dataFinal', new Date(moment(OperacaoById.dataFinal).utc().format('DD-MMM-YYYY HH:mm:ss')));
      }
    }
  }, [isEditing, setValue, OperacaoById]);


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
              w={'100%'}
              //transitionDuration="1.0s"
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
                    <FormGrandeEvento name_militar={isEditing ? OperacaoById?.comandante as unknown as string : ""} isEditing/>
                    <BotaoCadastrar
                      type="submit"
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
