import { Accordion, AccordionProps } from '@chakra-ui/react';

import React, { useState } from 'react';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import { AccordionItemEfetivo } from './AccordionItemEfetivo';
import { AccordionItemEscala } from './AccordionItemEscala';
import { AccordionItemOperacao } from './AccordionItemOperacao';
import { AccordionItemPostos } from './AccordionItemPostos';

interface IAccordion extends AccordionProps {
  handleSubmit?: () => void;
  isOpen: boolean;
  handleToggle: () => void;
}


export const AccordinEditarCadastro: React.FC<IAccordion> = ({ isOpen }) => {
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
        w={'100%'}
        transitionDuration="1.0s"
        h={'full'}
        //border={'1px solid black'}
      >

       <AccordionItemOperacao isEditing handleIsLoadingPostos={handleIsLoadingPostos}/>
                  {OperacaoById?.id && (
                  <AccordionItemPostos
                    isEditing
                    handleIsLoadingEfetivo={handleIsLoadingEfetivo}
                  />
                )}
                {IsLoadingEfetivo && (
                  <AccordionItemEfetivo
                    isEditing
                    handleIsLoadingEscala={handleIsLoadingEscala}
                  />
                )}
               {IsLoadingEscala && <AccordionItemEscala isEditing />}
      </Accordion>
    </>
  );
};
