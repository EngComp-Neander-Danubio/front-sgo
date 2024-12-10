import { Button, ButtonProps } from '@chakra-ui/react';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
interface IButton extends ButtonProps {
  onOpen?: () => void;
}
export const BotaoAddMilitarLote: React.FC<IButton> = ({
  onOpen,
}: IButton) => {
  return (
    <Button
      type="submit"
      // h={'44px'}
      // bg={'rgba(39, 103, 73, 1)'}
      // color={'rgba(255, 255, 255, 1)'}
      // fontSize={'24px'}
      colorScheme="blue"
      rightIcon={<GiPerspectiveDiceSixFacesRandom />}
      onClick={onOpen}
    >
      Adicionar em Lote
    </Button>
  );
};
