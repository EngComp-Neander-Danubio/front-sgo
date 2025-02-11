import { Button } from "@chakra-ui/react";
import React from "react";
import { GoDotFill } from "react-icons/go";


export const BotaoCompletas = () => {
    return (
        <Button 
        fontWeight={500} 
        bg={'rgba(154, 230, 180, 1)'} 
        leftIcon={<GoDotFill size={"8px"} />}
        variant='outline'
        borderRadius={'16px'}
        w={'83px'}
        h={'22px'}
        //boxSize={'auto'}
        color={'rgba(56, 161, 105, 1)'}
        fontSize={'12px'}
        >
            Completas
        </Button>
    );
}; 