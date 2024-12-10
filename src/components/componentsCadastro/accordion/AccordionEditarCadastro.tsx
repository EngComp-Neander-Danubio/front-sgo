import { Accordion, AccordionProps, FlexboxProps } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import React, { useEffect } from 'react';
import { useEvents } from '../../../context/eventContext/useEvents';
import { AccordionItemEfetivo } from './AccordionItemEfetivo';
import { AccordionItemEscala } from './AccordionItemEscala';
import { AccordionItemOperacao } from './AccordionItemOperacao';
import { AccordionItemPostos } from './AccordionItemPostos';
import { usePostos } from '../../../context/postosContext/usePostos';
interface IAccordion extends AccordionProps {
  handleSubmit?: () => void;
  isOpen: boolean;
  handleToggle: () => void;
}

interface IForm extends FlexboxProps {
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}
export const AccordinEditarCadastro: React.FC<IAccordion> = ({ isOpen }) => {
  const { eventById } = useEvents();
  const { loadPostosFromToBackend } = usePostos();
  useEffect(() => {
    //loadPostosFromToBackend();
    loadPostosFromToBackend(`${eventById?.id}`);
  }, [eventById]);

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
        <AccordionItemOperacao isEditing />
        {eventById?.id && (
          <>
            <AccordionItemPostos isEditing />
            <AccordionItemEfetivo isEditing />
            <AccordionItemEscala isEditing />
          </>
        )}
      </Accordion>
    </>
  );
};
