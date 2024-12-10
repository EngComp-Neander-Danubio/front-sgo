import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

interface IIcone extends IconProps {
  label_tooltip?: string;
  isOpen?: boolean;
  onOpen?: () => void;
}
export const IconeVisualizar: React.FC<IIcone> = ({
  label_tooltip,
  onOpen,
}) => {
  return (
    <>
      <Tooltip
        label={`Visualizar ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span
          style={{
            cursor: 'pointer',
            transition: '.5s',
          }}
        >
          <HiOutlineSearch color="#A0AEC0" size="20px" onClick={onOpen} />
        </span>
      </Tooltip>
    </>
  );
};
