import { Button } from "@chakra-ui/react";
import React from "react";
import { GoDotFill } from "react-icons/go";


export const BotaoPendente = () => {
    return (
        <Button 
        fontWeight={500} 
        bg={'rgba(254, 178, 178, 1)'} 
        leftIcon={<GoDotFill size={"8px"} />}
        variant='outline'
        borderRadius={'16px'}
        w={'83px'}
        h={'22px'}
        fontSize={'12px'}
        color={'rgba(197, 48, 48, 1)'}
        >
            Pendente
        </Button>
    );
}; 