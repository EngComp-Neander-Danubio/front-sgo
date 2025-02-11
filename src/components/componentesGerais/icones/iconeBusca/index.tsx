import { Tooltip } from '@chakra-ui/react';
import { IconProps } from 'phosphor-react';
import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
interface IIcone extends IconProps {
  label_tooltip?: string;
}
export const IconeBusca: React.FC<IIcone> = ({ label_tooltip }) => {
  return (
    <>
      <Tooltip
        label={`Buscar ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span>
          <IoSearchOutline color="#A0AEC0" size={'20px'} />
        </span>
      </Tooltip>
    </>
  );
};
