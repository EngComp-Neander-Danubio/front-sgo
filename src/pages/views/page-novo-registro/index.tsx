import React, { useState } from "react";
import { DashHeader } from "../../../components/layout/dashHeader";
import { MenuLateral } from "../../../components/layout/menulateral";
import { Center, Flex, Grid, GridItem } from "@chakra-ui/react";
import { FooterCetic } from "../../../components/componentsCadastro/footerImgCETIC";
import { FlexFicha } from "../../../components/componentesFicha/flexFicha";
import { useIsOpen } from "../../../context/isOpenContext/useIsOpen";

interface IFicha {
    onOpen: () => void;
    onClose: () => void;
}
export const Ficha: React.FC<IFicha> = () => {
    const { isOpen } = useIsOpen();

    return (
      <>
        <Flex
          bg="rgba(248, 249, 250, 1)"
          w={'100%'}
          //h={'917px'}
        >
          <Grid
            templateAreas={`"nav header"
                                    "nav main"
                                    "nav footer"`}
            gridTemplateRows={'50px 1fr 30px'}
            //gridTemplateColumns={'240px 1fr'}  // O primeiro valor foi ajustado para a largura do MenuLateral
            gridTemplateColumns={`1fr ${isOpen ? '1200px' : `${'100%'}`} `} // Use a expressão aqui
            //h='100vh'
            gap="8"
            mt={'25px'}
            ml={'25px'}
          >
            <GridItem area={'header'}>
              <DashHeader />
            </GridItem>
            <GridItem area={'nav'}>
              <MenuLateral />
            </GridItem>
            <GridItem
              mt={8}
              area={'main'}
              //shadow={'lg'}
              //border={"1px solid yellow"}
            >
              {/* <FlexConteudo isOpen={isOpen} /> */}
              <FlexFicha isOpen={isOpen} />
            </GridItem>
            <GridItem area={'footer'}>
              <Center>
                <FooterCetic />
              </Center>
            </GridItem>
          </Grid>
        </Flex>
      </>
    );
}
