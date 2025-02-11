import { Accordion, AccordionProps, FlexboxProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AccordionItemPostos } from './AccordionItemPostos';
import { AccordionItemEfetivo } from './AccordionItemEfetivo';
import { AccordionItemEscala } from './AccordionItemEscala';
import { AccordionItemOperacao } from './AccordionItemOperacao';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { is } from 'date-fns/locale';

interface IAccordion extends AccordionProps {
  handleSubmit: () => void;
  isOpen: boolean;
  handleToggle: () => void;
}

export const AccordinCadastro: React.FC<IAccordion> = ({ isOpen }) => {
  const { OperacaoById } = useOperacao();
  const [IsLoadingPostos, setIsLoadingPostos] = useState<boolean>(false);
  const [IsLoadingEfetivo, setIsLoadingEfetivo] = useState<boolean>(false);
  const [IsLoadingEscala, setIsLoadingEscala] = useState<boolean>(false);
   const handleIsLoadingPostos = async () => {
    setIsLoadingPostos(true);
  };

  const handleIsLoadingEfetivo = async () => {
    setIsLoadingEfetivo(true);
  };
  const handleIsLoadingEscala = async () => {
    setIsLoadingEscala(true);
  };

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
      >
        {/* Sempre renderiza o AccordionItemOperacao */}
        <AccordionItemOperacao isEditing={false} handleIsLoadingPostos={handleIsLoadingPostos}/>

        {/* Renderiza o AccordionItemPostos apenas se não houver uma operação e se "IsLoadingPostos" estiver ativo */}
        {IsLoadingPostos && (
          <AccordionItemPostos
            isEditing={false}
            handleIsLoadingEfetivo={handleIsLoadingEfetivo}
          />
        )}

        {/* Renderiza o AccordionItemEfetivo se "IsLoadingPostos" estiver ativo */}
        {IsLoadingEfetivo && (
          <AccordionItemEfetivo
            isEditing={false}
            handleIsLoadingEscala={handleIsLoadingEscala}
          />
        )}

        {/* Renderiza o AccordionItemEscala se "IsLoadingEfetivo" estiver ativo */}
        {IsLoadingEscala && <AccordionItemEscala isEditing={false} />}
      </Accordion>
    </>
  );
};
