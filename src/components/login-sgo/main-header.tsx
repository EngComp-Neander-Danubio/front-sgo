import { Flex, HStack, Image, Text, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { SignOut } from '@phosphor-icons/react';
import policiais from '../../assets/img/policiais.png';
import policiaMilitar from '../../assets/img/policia-militar.png';
import logoGoverno from '../../assets/img/logo-estado-do-ceara.png';
export function MainHeader({ ...props }) {
  const [isLoged, setIsLoged] = useState(false);
  const height = window.innerHeight;

  const auth = useAuth();

  function handleLogout() {
    auth.logout();
    setIsLoged(false);
  }

  useEffect(() => {
    const userData = localStorage.getItem('u');
    if (userData !== 'null') {
      setIsLoged(true);
    } else {
      setIsLoged(false);
    }
  }, []);

  return (
    <Flex
      w="full"
      h={height * 0.32}
      background="green.700"
      direction="column"
      align="center"
      justifyContent="space-evenly"
      bg={`url(${policiais})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="0 0 20px 20px"
      shadow="0 4px 4px 0 rgba(0,0,0,0.25)"
      zIndex={10}
      position="fixed"
      transition="all .3s"
      {...props}
    >
      {isLoged && (
        <Button
          position="absolute"
          top="1rem"
          right="1rem"
          colorScheme="whiteAlpha"
          variant="ghost"
          borderRadius="full"
          onClick={handleLogout}
        >
          <SignOut size={30} />
        </Button>
      )}

      <Text
        as="header"
        color={'white'}
        fontSize={['2xl', '3xl', '4xl', '5xl']}
        fontWeight="semibold"
        textAlign="center"
      >
        SGO
      </Text>
      <HStack w="312px" h="76px" align="center" py="21px" px="2rem">
        <Flex w="50%" justify={{ xs: 'start', md: 'center' }}>
          <Image
            src={policiaMilitar}
            alt="Policia Militar"
            w={{ base: '100px', md: '200px' }}
          />
        </Flex>
        <Flex w="50%" justify={{ xs: 'flex-end', md: 'center' }}>
          <Image
            src={logoGoverno}
            alt="logo governo do estado do ceara"
            w={{ base: '120px', md: '220px' }}
          />
        </Flex>
      </HStack>
    </Flex>
  );
}
