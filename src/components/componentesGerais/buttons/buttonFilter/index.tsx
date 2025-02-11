import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { FiFilter } from "react-icons/fi";

export const ButtonFilter = () => {
    return (
        <Button
            fontWeight={500}
            color={'rgba(160, 174, 192, 1)'} leftIcon={<FiFilter w={{lg:"20px", md:"20px", sm:'16px'}} />}
            variant='outline'
            //width={{lg:"222px", sm: "120px", md: "80px"}} 
            height={'40px'}
        >
            <Text fontSize={{ lg: '14px', md: '14px', sm: '12px' }}>
                Filtros
            </Text>
        </Button>
    );
};
