import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
interface IIcone extends IconProps {
  label_tooltip?: string;
  handleDelete?: (id?: string, index?: string | number) => Promise<void>;
}
export const IconeDeletar: React.FC<IIcone> = ({
  label_tooltip,
  handleDelete,
}) => {
  return (
    <>
      <Tooltip
        label={`Deletar ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span
          style={{
            cursor: 'pointer',
            //transition: '.5s',
          }}
          tabIndex={0}
        >
          <BiTrash color="#A0AEC0" size={'20px'} onClick={handleDelete} />
        </span>
      </Tooltip>
    </>
  );
};
