import { Accordion, AccordionProps } from '@chakra-ui/react';

import React from 'react';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { AccordionItemEfetivo } from './AccordionItemEfetivo';
import { AccordionItemEscala } from './AccordionItemEscala';
import { AccordionItemOperacao } from './AccordionItemOperacao';
import { AccordionItemPostos } from './AccordionItemPostos';
import { usePostos } from '../../../context/postosContext/usePostos';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
interface IAccordion extends AccordionProps {
  handleSubmit?: () => void;
  isOpen: boolean;
  handleToggle: () => void;
}


export const AccordinEditarCadastro: React.FC<IAccordion> = ({ isOpen }) => {
  const { OperacaoById } = useOperacao();
  const { postosLocal} = usePostos();
  const { pms} = useMilitares();

  return (
    <>
      <Accordion
        alignItems={'center'}
        w={{
          xl: isOpen ? '82vw' : '92vw',
          lg: isOpen ? '82vw' : '92vw',
          md: isOpen ? '82vw' : '92vw',
          sm: isOpen ? '82vw' : '92vw',
        }}
        //w={'100%'}
        transitionDuration="1.0s"
        h={'full'}
        //border={'1px solid black'}
      >
        <AccordionItemOperacao isEditing />
        {OperacaoById?.id && (
          <>
          <AccordionItemPostos isEditing />
          </>
        )}
        {postosLocal && (
          <AccordionItemEfetivo isEditing />
        )}
        {pms && (
            <AccordionItemEscala isEditing />
        )}
      </Accordion>
    </>
  );
};
