import React from 'react';
import { DashHeader } from '../../../components/layout/dashHeader';
import { MenuLateral } from '../../../components/layout/menulateral';
import {
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';

type Data = {
  matricula: string;
  ofic_prac: string;
  posto_grad: string;
  nome_completo: string;
  opm: string;
};

export const HomePrincipal: React.FC = () => {
  return (
    <>
      <Flex
        bg="rgba(248, 249, 250, 1)"
        w={'100%'}
        //h={'100vh'}
        maxH={'100vh'}
        overflow="hidden"
        // border={'1px solid red'}
      >
        <Grid
          templateAreas={`"nav header"
                                    "nav main"
                                    "nav main"`}
          gap={{
            lg: 2,
            md: 2,
            sm: 2,
          }}
          mt={{
            lg: 2,
            md: 2,
            sm: 2,
          }}
          mb={{
            lg: 2,
            md: 2,
            sm: 2,
          }}
          ml={{
            lg: 2,
            md: 2,
            sm: 0,
          }}
          mr={{
            lg: 2,
            md: 2,
            sm: 0,
          }}
          gridTemplateRows={'80px 1fr'}
          //maxH={'100vh'}
        >
          <GridItem area={'header'}>
            <DashHeader />
          </GridItem>
          <GridItem area={'nav'}>
            <MenuLateral />
          </GridItem>
          <GridItem area={'main'}>
            <></>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};
