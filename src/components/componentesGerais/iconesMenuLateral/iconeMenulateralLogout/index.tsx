import { Icon, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export const IconeLogOut = (props: { isOpen: any }) => {
  //const navigate = useNavigate();
  return (
    <Flex gap={6}>
      <Icon
        as={LuLogOut}
        //boxSize={"1.3vw"}
        boxSize={'24px'}
        // onClick={() => navigate('/')}
        //_hover={{ cursor: 'pointer' }}
      ></Icon>
      <Text
        display={{
          lg: props.isOpen ? 'block' : 'none',
          md: props.isOpen ? 'block' : 'none',
          sm: props.isOpen ? 'block' : 'none',
        }}
      >
        Sair
      </Text>
    </Flex>
  );
};
