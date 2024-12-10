import { Flex, Text } from '@chakra-ui/react';

export const TitleLogin = () => {
  return (
    <Flex
      position={'relative'}
      flexDirection="column"
      w={'100%'}
      h={'113px'}
      align={'center'}
      justify={'center'}
      //border={'1px solid red'}
      mt={40}
    >
      <Text
        color={'rgba(255, 255, 255, 1)'}
        fontWeight={'700'}
        fontSize={{ base: '25px', lg: '60px', md: '60px', sm: '60px' }}
        display={{
          base: 'none',
          xl: 'flex',
          lg: 'flex',
          md: 'none',
          sm: 'none',
        }}
      >
        SISTEMA DE GERENCIAMENTO
      </Text>
      <Text
        color={'rgba(255, 255, 255, 1)'}
        fontWeight={'bold'}
        fontSize={{ base: '36px', lg: '36px', md: '36px', sm: '36px' }}
        display={{ xl: 'flex', lg: 'flex', md: 'flex', sm: 'none' }}
        w={'max-content'}
      >
        DE OPERAÇÕES
      </Text>
      <Flex
        flexDirection={{ xl: 'row', lg: 'row', md: 'row', sm: 'column' }}
        color={'rgba(255, 255, 255, 1)'}
        fontWeight={'bold'}
        fontSize={{ base: '36px', lg: '36px', md: '36px', sm: '36px' }}
        display={{ xl: 'none', lg: 'none', md: 'none', sm: 'flex' }}
        align={'center'}
        justify={'center'}
        w={'max-content'}
      ></Flex>
    </Flex>
  );
};
