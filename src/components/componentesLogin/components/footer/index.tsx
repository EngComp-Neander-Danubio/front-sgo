import { Flex } from "@chakra-ui/react";
import React from "react";
import { Image } from '@chakra-ui/react'
import logoCetic from '../../../../assets/img/Group-2.png';

export const FooterLogin: React.FC = () => {

    return (
        <Flex
            flexDirection={'column'}
            position={'absolute'}
            bottom={1}
            align={'center'}
            justify={'center'}
            //border={'1px solid black'}
            w={'100%'}
            gap={2}
        >
            <Image src={logoCetic} w={'80px'} h={'25px'} />
            <Flex fontSize={'12px'} fontWeight={700}>
                CÉLULA DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO DA PMCE
            </Flex>
            <Flex fontSize={'12px'} fontWeight={400}>
                Av. Aguanambi, 2280 - Fátima - Fortaleza - CE | Fone: 85 3101.3570 / 3101.3571 - E-mail: informatica@pm.ce.gov.br | Horário de funcionamento: De segunda a sexta de 8h às 12h e de 13h às 17h
            </Flex>
        </Flex>
    );
};
