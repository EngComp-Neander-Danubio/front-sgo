import React from 'react';
import {
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
} from '@chakra-ui/react';
import { SelectPattern } from './SelectPattern';
import { IconeLogin } from '../../componentesGerais/iconeDashHeader/iconeLogin';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider/useAuth';

type OptionType = { label: string; value: string | number }[];
const optionsPerfil: OptionType = [
  { label: 'Usuário Padrão', value: '1' },
  { label: 'Perfil CGO', value: '2' },
  { label: 'Perfil CETIC', value: '3' },
  { label: 'Perfil QCG', value: '4' },
];

const Body: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <Flex flexDirection={'column'} w={'100%'} gap={2}>
      <Flex
        w={'100%'}
        color={'#fff'}
        align={'center'}
        justify={'space-between'}
        flexDirection={'column'}
      >
        <Text>Nome Militar</Text>
      </Flex>
      <Flex flexDirection={'column'} gap={2} align={'flex-start'}>
        <Text fontWeight={700}>Perfil de Acesso:</Text>
        <SelectPattern options={optionsPerfil} />
      </Flex>
      <Flex mr={'auto'} flexDirection={'column'}>
        <Button
          colorScheme="red"
          mr={3}
          onClick={() => {
            logout;
            navigate('/login-sgo');
          }}
        >
          Sair
        </Button>
      </Flex>
    </Flex>
  );
};

export const PopoverLogout: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          boxSize={'fit-content'}
          bg={'transparent'}
          border={'none'}
          _hover={{ bg: 'none' }}
          _active={{ bg: 'none' }}
          size={'fit-content'}
        >
          <IconeLogin />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton color={'#fff'} />
        <PopoverHeader
          h={'15vh'}
          bgColor={'#276749'}
          borderTopRadius={'8px'}
          color={'#fff'}
          fontSize={'1.3rem'}
        >
          Nome Do Militar
        </PopoverHeader>
        <PopoverBody>
          <Body />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
