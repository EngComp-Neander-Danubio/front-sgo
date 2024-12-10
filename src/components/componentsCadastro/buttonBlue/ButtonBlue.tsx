import { Button, ButtonProps } from '@chakra-ui/react';
import { ReactElement, JSXElementConstructor } from 'react';
interface IButtonBlue extends ButtonProps {
  handleClick: () => void;
  nameButton: string;
  nameIcon: ReactElement<any, string | JSXElementConstructor<any>>;
}
export const ButtonBlue: React.FC<IButtonBlue> = ({
  handleClick,
  nameButton,
  nameIcon,
}: IButtonBlue) => {
  return (
    <Button
      color={'white'}
      
      rightIcon={nameIcon}
      // variant="outline"
      onClick={handleClick}
    >
      {nameButton}
    </Button>
  );
};
