import { Flex, HStack } from '@chakra-ui/react';
import { TitleLogin } from '../../../components/componentesLogin/components/titleLogin';
import { ImgLogoEstado } from '../../../components/componentesLogin/components/img/logoEstado';
import { ImgBrasao } from '../../../components/componentesLogin/components/img/imgLogo';
import Formatura from '../../../assets/img/formatura.jpg';
import { NomeLogoEstado } from '../../../components/componentesLogin/components/img/nomeEstado';
import { FooterLogin } from '../../../components/componentesLogin/components/footer';
import { ViewLogin } from '../../../components/componentesLogin';

export const Login = () => {
  return (
    <Flex
      flexDirection={'column'}
      bg={'rgba(226, 232, 240, 1)'}
      h={'100vh'}
      w={'100vw'}
      maxWidth={'100vw'}
      // minHeight={'850px'}
      // border={'1px solid red'}
    >
      <Flex
        flexDirection={'column'}
        backgroundImage={`url(${Formatura})`}
        backgroundSize="100% 463px"
        borderRadius={'20px'}
        margin={4}
        pt={40}
        align={'center'}
        justifyContent={{
          xl: 'space-evenly',
          lg: 'space-evenly',
          md: 'space-evenly',
          sm: 'space-evenly',
        }}
        h={{ xl: '463px', lg: '463px', md: '350px', sm: '350px' }}
        w={'auto'}
        gap={20}
      >
        <TitleLogin />
        <HStack
          //border={'1px solid red'}
          position={'absolute'}
          //margin={4}
          top={60}
          w={'100%'}
          maxHeight={'fit-content'}
          justifyContent={{
            xl: 'space-evenly',
            lg: 'space-between',
            md: 'space-between',
            sm: 'space-between',
          }}
          align={'center'}
          justify={'center'}
          gap={{ xl: 40, lg: 40, md: 40, sm: 40 }}
        >
          <Flex
            align={'center'}
            mr={'auto'}
            ml={8}
            display={{ xl: 'flex', lg: 'flex', md: 'none', sm: 'none' }}
          >
            <ImgBrasao />
          </Flex>
          <Flex
            align={'center'}
            ml={'auto'}
            mr={8}
            display={{ xl: 'flex', lg: 'flex', md: 'none', sm: 'none' }}
          >
            <ImgLogoEstado />
            <NomeLogoEstado />
          </Flex>
        </HStack>

        <Flex align={'center'} justify={'center'}>
          <ViewLogin />
        </Flex>

        <FooterLogin />
      </Flex>
    </Flex>
  );
};
