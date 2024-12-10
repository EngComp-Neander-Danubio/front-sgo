import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { SolicitacaoPostosContent } from './SolicitacaoPostosContent';
import { BreadCrumb } from '../flexMenor/BreadCrumb';
import { useSolicitacoesPostos } from '../../../context/solicitacoesPostosContext/useSolicitacoesPostos';

interface ISolicitacaoPostos {
  isOpen: boolean;
  handleToggle: () => void;
}
export const SolicitacaoPostos: React.FC<ISolicitacaoPostos> = ({
  isOpen,
  handleToggle,
}) => {
  const { solicitacaoPostoIndividual } = useSolicitacoesPostos();
  return (
    <Flex h={'96%'} flexDirection={'column'} gap={2}>
      <BreadCrumb />
      <Flex
        pl={2}
        pr={2}
        //border={'1px solid black'}
        borderRadius={'8px'}
        borderTopLeftRadius={0}
        w={isOpen ? '86vw' : '94vw'}
        transitionDuration="1.0s"
        h={'100%'}
        minH={'full'}
        position="relative"
        borderBottom="1px solid rgba(0, 0, 0, 0.5)"
        boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
        bg={'white'}
        overflowY={'auto'}
      >
        <Flex
          position="absolute"
          top={'32px'}
          ml={12}
          fontWeight={'700'}
          //border={'1px solid red'}
        >
          <Text
            color={'rgba(0, 0, 0, 0.48)'}
            fontWeight={'700'}
            //fontSize={'1.2vw'}
            fontSize={{
              base: '25px',
              lg: '20px',
              md: '20px',
              sm: '20px',
            }}
            //textDecoration={'underline'}
          >
            Solicitação de Postos n° {solicitacaoPostoIndividual?.sps_id}
          </Text>
        </Flex>
        <Flex
          position="absolute"
          flexDirection={'column'}
          alignItems={'center'}
          justify={'center'}
          top={'72px'}
          //pt={4}
          gap={2}
          align={{ base: 'flex-start' }}
        >
          <Flex p={8} w={isOpen ? '86vw' : '93vw'}>
            <SolicitacaoPostosContent
              isOpen={isOpen}
              handleToggle={handleToggle}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
