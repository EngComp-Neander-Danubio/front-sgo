import { Th, Flex, Text, TableProps } from "@chakra-ui/react";
import React from "react";


interface IThTable extends TableProps{
    title: string;
    customIcon: React.ReactNode;
}

export const ThTable: React.FC<IThTable> = (props) => {
    const { title, customIcon } = props;
    return (
        <Th w='fit-content'>
            <Flex

                align={'center'}
                justify={'center'}
                fontWeight={400}
                color='rgba(102, 112, 133, 1)'
                fontSize={12}
                lineHeight='18px'
                letterSpacing='0em'

                gap={1}
            >
                <Text textTransform="capitalize" >{title}</Text>
                <Flex >
                    {customIcon}
                </Flex>
            </Flex>
        </Th >
    );
};
