import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { FiDownloadCloud } from "react-icons/fi";


export const ButtonExportar = () => {
    return (
        <Button
            fontWeight={500}
            color={'rgba(160, 174, 192, 1)'}
            leftIcon={<FiDownloadCloud w={{lg:"20px", md:"20px", sm:'16px'}} />}
            variant='outline'
            //width={'118px'}
            height={'40px'}
            fontSize={{ lg: '14px', md: '14px', sm: '12px' }}
        >
            Exportar

        </Button>
    );

};

