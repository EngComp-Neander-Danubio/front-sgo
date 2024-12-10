import React from 'react';
import { Text } from '@chakra-ui/react';
interface ITitle {
  label: string;
}
export const TitleSolicitacoes: React.FC<ITitle> = ({ label }) => {
  return (
    <>
      <Text
        color={'rgba(0, 0, 0, 0.48)'}
        fontWeight={'700'}
        //fontSize={'1.2vw'}
        fontSize={{ base: '1rem', lg: '1.2rem', md: '1rem', sm: '1rem' }}
        //textDecoration={'underline'}
      >
        {label}
      </Text>
    </>
  );
};
