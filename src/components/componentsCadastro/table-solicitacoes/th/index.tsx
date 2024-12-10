import { Th, Flex, Text, TableProps } from '@chakra-ui/react';
import React from 'react';

interface IThTable extends TableProps {
  title: string;
  customIcon: React.ReactNode;
}

export const ThTable: React.FC<IThTable> = props => {
  const { title, customIcon } = props;
  return (
    <Th>
      <Flex
        align={'center'}
        justify={'center'}
        fontWeight={700}
        color="rgba(102, 112, 133, 1)"
        //color="rgb(102, 112, 133)"
        fontSize={'0.8rem'}
        lineHeight="18px"
        letterSpacing="0.6px"
        gap={1}
      >
        <Text textTransform="uppercase">{title}</Text>
        <Flex>{customIcon}</Flex>
      </Flex>
    </Th>
  );
};
