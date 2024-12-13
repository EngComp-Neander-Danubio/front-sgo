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
import { useMilitares } from '../../../context/militaresContext/useMilitares';
interface IAccordion extends AccordionProps {
  handleSubmit?: () => void;
  isOpen: boolean;
  handleToggle: () => void;
}


export const AccordinEditarCadastro: React.FC<IAccordion> = ({ isOpen }) => {
  const { eventById } = useEvents();
  const {postosLocal} = usePostos();
  const {pms,loadPMsFromToBackend} = useMilitares();
  const { loadPostosFromToBackend} = usePostos();
  useEffect(() => {
    //loadPostosFromToBackend();
    loadPostosFromToBackend(`${eventById?.id}`);
    loadPMsFromToBackend(`${eventById?.id}`);
  }, [eventById]);

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
        transitionDuration="1.0s"
        h={'full'}
        //border={'1px solid black'}
      >
        <AccordionItemOperacao isEditing />
        {eventById?.id && (
          <>
          <AccordionItemPostos isEditing />
          </>
        )}
        {postosLocal.length > 0 && (
          <AccordionItemEfetivo isEditing />
        )}
        {pms.length > 0 && (
            <AccordionItemEscala isEditing />
        )}
      </Accordion>
    </>
  );
};
