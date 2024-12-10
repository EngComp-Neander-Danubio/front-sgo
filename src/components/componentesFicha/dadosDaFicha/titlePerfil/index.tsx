import React from 'react';
import { Text } from '@chakra-ui/react';

export const TitlePerfil: React.FC = () => {
  return (
    <>
      <Text
        color={'rgba(0, 0, 0, 0.48)'}
        fontWeight={'700'}
        //fontSize={'1.2vw'}
        fontSize={{ base: '1.2rem', lg: '1.2rem', md: '1.2rem', sm: '1.2rem' }}
        //textDecoration={'underline'}
      >
        Dados da Operação
      </Text>
    </>
  );
};
