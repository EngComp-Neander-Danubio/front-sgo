import React from 'react';
import { Flex, FlexProps, HStack, Text, VStack } from '@chakra-ui/react';
interface IDados extends FlexProps {
  operacao?: string;
  solicitacao?: string;
  prazo_inicial?: Date;
  prazo_final?: Date;
}
export const DadosFicha: React.FC<IDados> = ({
  operacao,
  solicitacao,
  prazo_final,
  prazo_inicial,
}) => {
  return (
    <>
      <Flex
        gap={2}
        align={'flex-start'}
        fontSize={{ base: '16px', lg: '16px', md: '16px', sm: '12px' }}
        flexDirection={'column'}
        h={'fit-content'}
      >
        {/* Primeira linha de dados */}
        <Flex flexDirection={'row'} gap={4} w={'100%'}>
          {/* <Flex
            gap={2}
            flex={1}
            //border={'1px solid red'}
            w={'20vw'}
          >
            <Text fontWeight={700}>OPM:</Text>
            <Text flexWrap={'nowrap'}>CETIC</Text>
          </Flex>
          <Flex
            gap={2}
            flex={1}
            //border={'1px solid red'}
            w={'20vw'}
          >
            <Text fontWeight={700}>Comandante:</Text>
            <Text flexWrap={'nowrap'}>Ten-Cel PM Issac Newton</Text>
          </Flex>
          <Flex
            gap={2}
            flex={1}
            //border={'1px solid red'}
            w={'20vw'}
          >
            <Text fontWeight={700}>Sub Comandante:</Text>
            <Text flexWrap={'nowrap'}>Major PM Leibniz</Text>
          </Flex>
          <Flex
            gap={2}
            flex={1}
            //border={'1px solid red'}
            w={'20vw'}
          >
            <Text fontWeight={700}></Text>
            <Text flexWrap={'nowrap'}></Text>
          </Flex> */}
        </Flex>

        {/* Segunda linha de dados */}
        <Flex flexDirection={'row'} gap={4} w={'100%'}>
          <Flex
            gap={2}
            flex={1}
            //border={'1px solid red'}
            w={'20vw'}
          >
            <Text fontWeight={700}>Operação:</Text>
            <Text>{operacao ? operacao : 'Evangelizar'}</Text>
          </Flex>
          <Flex
            gap={2}
            flex={1}
            //border={'1px solid red'}
            w={'20vw'}
          >
            <Text fontWeight={700}>Solicitante:</Text>
            <Text>CGO</Text>
          </Flex>
          <Flex
            gap={2}
            flex={1}
            //border={'1px solid red'}
            w={'20vw'}
          >
            <Text fontWeight={700}>Prazo Inicial:</Text>
            <Text>{prazo_inicial as React.ReactNode}</Text>
          </Flex>
          <Flex
            gap={2}
            flex={1}
            //border={'1px solid red'}
            w={'20vw'}
          >
            <Text fontWeight={700}>Prazo Final:</Text>
            <Text>{prazo_final as React.ReactNode}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
