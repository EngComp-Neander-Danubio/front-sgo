import { Flex, Button, Link, useToast, Spinner } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider/useAuth';
import { Input } from '../../componentesLogin/components/form-login/input';

export function LoginForm() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await auth.authenticate(matricula, senha);
      navigate('/criar-operacao');
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Verifique suas credenciais e tente novamente.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Flex
      w={280}
      minH={300}
      h="fit-content"
      as="form"
      direction={'column'}
      gap={4}
      m="4"
      justify="center"
      onSubmit={e => {
        handleLogin(e);
      }}
    >
      <Input
        name={'matricula'}
        label="Matrícula"
        type={'text'}
        isRequired
        placeholder={'Digite sua matrícula'}
        onChange={setMatricula}
      />
      <Input
        name={'senha'}
        label="Senha"
        type={'password'}
        isRequired
        placeholder={'Digite sua senha'}
        onChange={setSenha}
      />
      <Button
        mt={4}
        w="100%"
        type="submit"
        bg="green.700"
        color="white"
        fontSize="2xl"
        lineHeight="32px"
        fontWeight="bold"
        _hover={{
          bgColor: 'green.600',
        }}
        _active={{
          bgColor: 'green.800',
        }}
        isDisabled={isLoading}
      >
        {isLoading ? <Spinner /> : 'Entrar'}
      </Button>
      <Link
        /* href={
          env.VITE_NODE_ENV === 'prod'
            ? 'https://sga.pm.ce.gov.br/esqueci'
            : 'https://teste-sga.pm.ce.gov.br/esqueci'
        } */
        color="blue.500"
        fontSize="sm"
        textAlign={'center'}
      >
        Recuperar senha
      </Link>
    </Flex>
  );
}
