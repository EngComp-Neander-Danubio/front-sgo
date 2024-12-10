import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { RiShareCircleLine } from 'react-icons/ri';
interface IIcone extends IconProps {
  label_tooltip?: string;
  isOpen?: boolean;
  onOpen?: () => void;
}

export const IconeRedistribuir: React.FC<IIcone> = ({
  label_tooltip,
  onOpen,
}) => {
  return (
    <>
      <Tooltip
        label={`Redistribuir ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span
          style={{
            cursor: 'pointer',
            //transition: '.5s',
          }}
        >
          <RiShareCircleLine color="#A0AEC0" size="20px" onClick={onOpen} />
        </span>
      </Tooltip>
    </>
  );
};
