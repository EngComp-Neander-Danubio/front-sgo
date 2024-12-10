import {
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
  ButtonProps,
} from '@chakra-ui/react';
import React from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { BotaoCadastrar } from '../botaoCadastrar';

interface IButton extends ButtonProps {
  handleSubmit: () => void;
}
export const InputInlcuir: React.FC<IButton> = ({ handleSubmit }: IButton) => {
  return (
    <Flex flexDirection={'row'}>
      <InputGroup>
        <Input
          type="search"
          placeholder="Informe uma rua, logradouro, bairro ou cidade"
          w={{ base: '449px', lg: '449px', md: '300px', sm: '300px' }}
        />
        <InputLeftElement pointerEvents="none">
          <BsPersonFill color="#A0AEC0" />
        </InputLeftElement>
      </InputGroup>
      <BotaoCadastrar type="submit" handleSubmit={handleSubmit}>
        Incluir
      </BotaoCadastrar>
    </Flex>
  );
};
