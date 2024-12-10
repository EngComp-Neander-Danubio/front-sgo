import { AbsoluteCenter, Flex } from '@chakra-ui/react';

import { LoginForm } from './login-form';
import { Footer } from '../footer';
import { MainHeader } from '../main-header';

export function Login() {
  return (
    <Flex
      direction="column"
      align="center"
      justifyContent="space-between"
      minHeight="100vh"
      background="gray.50"
    >
      <MainHeader />
      <Flex
        mx="auto"
        w={{ base: '90%', xs: '312px' }}
        minH="324px"
        h="fit-content"
        background="white"
        top="28vh"
        position="absolute"
        borderRadius="20px"
        boxShadow="0px 4px 4px 0 rgba(0, 0, 0, 0.25)"
        zIndex={20}
      >
        <LoginForm />
      </Flex>
      <AbsoluteCenter mt="44vh">
        <Footer />
      </AbsoluteCenter>
    </Flex>
  );
}
