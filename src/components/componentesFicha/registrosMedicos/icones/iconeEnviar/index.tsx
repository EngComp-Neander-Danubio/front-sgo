import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { IoIosSend } from 'react-icons/io';

interface IIcone extends IconProps {
  label_tooltip?: string;
  isOpen?: boolean;
  onOpen?: () => void;
}
export const IconeEnviar: React.FC<IIcone> = ({ label_tooltip, onOpen }) => {
  return (
    <>
      <Tooltip
        label={`Enviar ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span
          style={{
            cursor: 'pointer',
            transition: '.5s',
          }}
        >
          <IoIosSend color="#A0AEC0" size="20px" onClick={onOpen} />
        </span>
      </Tooltip>
    </>
  );
};
