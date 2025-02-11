import { IconProps, Tooltip } from '@chakra-ui/react';
import { MdOutlineCached } from 'react-icons/md';
interface IIcone extends IconProps {
  label_tooltip?: string;
}
export const IconePermutar: React.FC<IIcone> = ({label_tooltip}) => {
  return (
    <>
      <Tooltip
        label={`Permutar ${label_tooltip} entre postos de serviço`}
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
