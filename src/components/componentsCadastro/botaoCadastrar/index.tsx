import { Button, ButtonProps, Text } from '@chakra-ui/react';
import React from 'react';
import { FiSave } from 'react-icons/fi';
interface IButton extends ButtonProps {
  handleSubmit?: () => Promise<void>;
  label?: string;
}
export const BotaoCadastrar: React.FC<IButton> = ({
  label,
  handleSubmit,
}: IButton) => {
  return (
    <Button
      type="submit"
      color={'white'}
      rightIcon={<FiSave size={'16px'} />}
      //colorScheme="green"
      backgroundColor={'#38A169'}
      //backgroundColor={'green'}
      variant="ghost"
      w={{ base: '152px', lg: '152px', md: '152px', sm: '100px' }}
      fontSize={{ base: '18px', lg: '18px', md: '16px', sm: '12px' }}
      onClick={handleSubmit}
      alignSelf={'center'}
      justifySelf={'center'}
      _hover={{
        //bgColor: '#266a47',
        bgColor: 'green',
        cursor: 'pointer',
        transition: '.5s',
        //borderRadius: '10px',
      }}
    >
      {label}
    </Button>
  );
};
