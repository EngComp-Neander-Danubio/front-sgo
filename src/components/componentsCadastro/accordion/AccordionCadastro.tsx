import { Accordion, AccordionProps, FlexboxProps } from '@chakra-ui/react';
import React from 'react';
import { AccordionItemPostos } from './AccordionItemPostos';
import { AccordionItemEfetivo } from './AccordionItemEfetivo';
import { AccordionItemEscala } from './AccordionItemEscala';
import { AccordionItemOperacao } from './AccordionItemOperacao';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
import { usePostos } from '../../../context/postosContext/usePostos';
interface IAccordion extends AccordionProps {
  handleSubmit: () => void;
  isOpen: boolean;
  handleToggle: () => void;
}

interface IForm extends FlexboxProps {
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}
export const AccordinCadastro: React.FC<IAccordion> = ({ isOpen }) => {
  const { OperacaoById } = useOperacao();
  const {postosLocal} = usePostos();
  const {pms} = useMilitares();
  return (
    <>
      <Accordion
        alignItems={'center'}
        w={{
          xl: isOpen ? '84vw' : '92vw',
          lg: isOpen ? '84vw' : '92vw',
          md: isOpen ? '84vw' : '92vw',
          sm: isOpen ? '84vw' : '92vw',
        }}
        transitionDuration="1.0s"
        //border={'1px solid black'}
      >
        <AccordionItemOperacao isEditing={false} />

        {OperacaoById?.id && (
          <AccordionItemPostos isEditing={false} />
        )}

        {postosLocal.length > 0 && (
          <AccordionItemEfetivo isEditing={false} />
        )}

        {pms.length > 0 && (
          <AccordionItemEscala isEditing={false} />
        )}

      </Accordion>
    </>
  );

};
