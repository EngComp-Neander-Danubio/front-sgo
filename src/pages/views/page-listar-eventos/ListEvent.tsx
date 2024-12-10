import React from 'react';
import { DashHeader } from '../../../components/layout/dashHeader';
import { MenuLateral } from '../../../components/layout/menulateral';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { ToListEvents } from '../../../components/componentsCadastro/listar-eventos/ToListEvents';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';

export const ListEvent: React.FC = () => {
  const { handleOnOpen, isOpen } = useIsOpen();

  return (
    <>
      <Flex
        bgColor="rgba(248, 249, 250, 1)"
        // border={'1px solid red'}
        maxH={'100vh'}
        overflow="hidden"
      >
        <Grid
          templateAreas={`"nav header"
                                    "nav main"
                                    "nav main"`}
          gap={{ lg: 2, md: 2, sm: 2 }}
          mt={{ lg: 2, md: 2, sm: 2 }}
          mb={{ lg: 2, md: 2, sm: 2 }}
          ml={{ lg: 2, md: 2, sm: 0 }}
          mr={{ lg: 2, md: 2, sm: 0 }}
          gridTemplateRows={'80px 1fr 1px'}
        >
          <GridItem area={'header'} h={'fit-content'}>
            <DashHeader />
          </GridItem>
          <GridItem area={'nav'}>
            <MenuLateral />
          </GridItem>
          <GridItem area={'main'}>
            <ToListEvents isOpen={isOpen} handleToggle={handleOnOpen} />
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};
