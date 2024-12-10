import React, { useState } from 'react';
import { DashHeader } from '../../../components/layout/dashHeader';
import { MenuLateral } from '../../../components/layout/menulateral';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { FooterCetic } from '../../../components/componentsCadastro/footerImgCETIC';
import { FormGrandeEventoVertical } from '../../../components/componentsCadastro/formGrandeEventoVertical/FormGrandeEventoVertical';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';

export const PageAddGrandeEvento: React.FC = () => {
  
  return (
    <>
      <Flex
        bg="rgba(248, 249, 250, 1)"
        w={'content'}
        //h={'content'}
        // border={'1px solid red'}
        maxH={'100vh'}
      >
        <Grid
          templateAreas={`"nav header"
                                    "nav main"
                                    "nav footer"`}
          gap={{ lg: 2, md: 2, sm: 2 }}
          mt={{ lg: 2, md: 2, sm: 2 }}
          ml={{ lg: 2, md: 2, sm: 0 }}
          mr={{ lg: 2, md: 2, sm: 0 }}
          gridTemplateRows={'80px 1fr 35px'}
          //gridTemplateColumns={'240px 1fr'}
          h={'content'}
        >
          <GridItem area={'header'} h={'fit-content'}>
            <DashHeader  />
          </GridItem>
          <GridItem area={'nav'}>
            <MenuLateral />
          </GridItem>
          <GridItem
            area={'main'}
            //border={'1px solid red'}
            alignContent={'center'}
            justifySelf={'center'}
          >
            <Flex boxSize={'fit-content'}>
              <FormGrandeEventoVertical
                name={''}
                cmt={''}
                dateOfBegin={(undefined as unknown) as Date}
              />
            </Flex>
          </GridItem>
          <GridItem area={'footer'} alignContent={'center'}>
            <Flex justify={'center'}>
              <FooterCetic />
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};
