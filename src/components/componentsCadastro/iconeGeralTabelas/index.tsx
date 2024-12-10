import { Box, IconProps, Tag, Tooltip, TooltipProps } from '@chakra-ui/react';
import React from 'react';

interface IIcone extends TooltipProps {
  label_tooltip?: string;
  handleDelete?: () => Promise<void>;
  handleEditar?: () => Promise<void>;
  icon?: React.ReactNode;
  children: React.ReactNode;
}
export const IconeGeralTabelas: React.FC<IIcone> = ({
  label_tooltip,
  children,
}) => {
  return (
    <Tooltip
      label={label_tooltip || ''}
      aria-label="A tooltip"
      placement="auto"
    >
      {children || <span>{label_tooltip}</span>}
    </Tooltip>
  );
};
