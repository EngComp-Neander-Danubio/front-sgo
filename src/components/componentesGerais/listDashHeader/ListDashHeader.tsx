import { Flex, FlexProps } from '@chakra-ui/react';
import { List } from 'phosphor-react';
import React from 'react';

interface IListDashHeader extends FlexProps {
  handleToggle: () => void;
}

export const ListDashHeader: React.FC<IListDashHeader> = ({ ...props }) => {
  return (
    <>
      <Flex pl={4} ml={4} {...props} minW={'18px'} minH={'15px'}>
        <List
          weight="bold"
          color="#A0AEC0"
          size={'24px'}
          onClick={props.handleToggle}
        />
      </Flex>
    </>
  );
};
