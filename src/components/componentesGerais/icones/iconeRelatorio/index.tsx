import { IconProps, Tooltip } from '@chakra-ui/react';
import { IoDocumentTextOutline } from 'react-icons/io5';
interface IIcone extends IconProps {
  label_tooltip?: string;
}

export const IconeRelatorio: React.FC<IIcone> = ({ label_tooltip }) => {
  return (
    <>
      <Tooltip
        label={`Mostrar ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span>
          <IoDocumentTextOutline color="#A0AEC0" size={'20px'} />
        </span>
      </Tooltip>
    </>
  );
};
