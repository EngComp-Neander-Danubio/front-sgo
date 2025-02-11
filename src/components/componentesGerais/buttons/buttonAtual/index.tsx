import { Button } from "@chakra-ui/react";
import React from "react";
import { GoDotFill } from "react-icons/go";


export const BotaoAtual = () => {
    return (
        <Button 
        fontWeight={500} 
        bg={'rgba(144, 205, 244, 1)'} 
        leftIcon={<GoDotFill size={"8px"} />}
        variant='outline'
        borderRadius={'16px'}
        w={'83px'}
        h={'22px'}
        fontSize={'12px'}
        color={'rgba(49, 130, 206, 1)'}
        >
           Atual
        </Button>
    );
}; 