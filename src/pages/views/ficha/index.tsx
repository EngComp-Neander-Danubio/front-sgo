import React, { useState } from "react";
import { DashHeader } from "../../../components/layout/dashHeader";
import { MenuLateral } from "../../../components/layout/menulateral";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { FooterCetic } from "../../../components/componentsCadastro/footerImgCETIC";
import { FlexFicha } from "../../../components/componentesFicha/flexFicha";

export const Ficha: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
      <>
        <Flex
          bg="rgba(248, 249, 250, 1)"
          //bg='green.100'
          //w={'content'}
          //h={'content'}
        >
          <Grid
            templateAreas={`"nav header"
                                    "nav main"
                                    "nav footer"`}
            gridTemplateRows={'80px 1fr 35px'}
            gridTemplateColumns={'240px 1fr'}
            h={'content'}
            gap={{ lg: 8, md: 8, sm: 2 }}
            mt={4}
            ml={{ lg: 4, md: 4, sm: 0 }}
            mr={{ lg: 4, md: 4, sm: 0 }}
          >
            <GridItem area={'header'}>
              <DashHeader isOpen={isOpen} handleToggle={handleToggle} />
            </GridItem>
            <GridItem area={'nav'}>
              <MenuLateral isOpen={isOpen} handleToggle={handleToggle} />
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
            <GridItem area={'footer'} alignContent={'center'}>
              <Flex justify={'center'}>
                <FooterCetic />
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
      </>
    );
}
