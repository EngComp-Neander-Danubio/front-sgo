import { IconProps, Tooltip } from '@chakra-ui/react';
import { MdOutlineCached } from 'react-icons/md';
interface IIcone extends IconProps {
  label_tooltip?: string;
}
export const IconeInserirMilitar: React.FC<IIcone> = ({label_tooltip}) => {
  return (
    <>
      <Tooltip
        label={`Inserir ${label_tooltip} em um posto de serviço`}
        aria-label="A tooltip"
        placement="top"
      >
        <span>
          <MdOutlineCached color="#A0AEC0" size="20px" />
        </span>
      </Tooltip>
    </>
  );
};
