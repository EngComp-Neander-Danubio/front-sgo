import { IconProps, Tooltip } from '@chakra-ui/react';
import { GoPlusCircle } from 'react-icons/go';
interface IIcone extends IconProps {}
export const IconeMore: React.FC<IIcone> = () => {
  return (
    <>
      <Tooltip
        label="Adicionar um militar ao posto de serviço"
        aria-label="A tooltip"
        placement="top"
      >
        <span>
          <GoPlusCircle color="#A0AEC0" size="20px" />
        </span>
      </Tooltip>
    </>
  );
};
