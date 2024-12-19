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
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import moment from 'moment'; // Para manipulação de fuso horário

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
interface Militar {
  pes_codigo: number;
  pes_nome: string;
  gra_nome: string;
  unidade_uni_sigla: string;
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
  const { updateOperacao, uploadOperacao, OperacaoById } = useOperacao();
  const methodsInput = useForm<IForm>({
    resolver: yupResolver(eventoSchema),
  });

  const onSubmit = async (data: IForm) => {
    if(!isEditing) {
      await uploadOperacao(data);
    }else{
      if(OperacaoById?.id)
      await updateOperacao(data, OperacaoById?.id)
    }
  };
  const { setValue } = methodsInput;
  useEffect(() => {
    if (OperacaoById && isEditing) {
        setValue('nomeOperacao', OperacaoById?.nomeOperacao);
        setValue('comandante', OperacaoById?.comandante);
        if (OperacaoById?.dataInicio) {
          setValue('dataInicio', new Date(moment(OperacaoById.dataInicio).utc().format('DD-MMM-YYYY HH:mm:ss')));
        }
        if (OperacaoById?.dataFinal) {
          setValue('dataFinal', new Date(moment(OperacaoById.dataFinal).utc().format('DD-MMM-YYYY HH:mm:ss')));
        }
      }
    }
  , [isEditing, setValue]);

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
