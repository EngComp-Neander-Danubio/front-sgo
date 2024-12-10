import React from "react";
import { Text } from "@chakra-ui/react";

interface ILabel {
    label: string;
}

export const LabelLogin: React.FC<ILabel> = (props) => {
    return (
        <Text color='rgba(45, 55, 72, 1)' fontWeight={600} fontSize={'14px'} pl={4} {...props}>
            {props.label}
        </Text>
    )
}