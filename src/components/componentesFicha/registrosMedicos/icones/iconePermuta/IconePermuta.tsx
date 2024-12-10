import { IconProps, Tooltip } from '@chakra-ui/react';
import { MdOutlineCached } from 'react-icons/md';
interface IIcone extends IconProps {}
export const IconePermutar: React.FC<IIcone> = () => {
  return (
    <>
      <Tooltip
        label="Permutar militares entre postos de serviço"
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
