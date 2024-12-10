import { InputGroup, Input, InputLeftElement, VStack } from "@chakra-ui/react";
import React from "react";

interface IinputLogin {
    placeholder: string;
    icon?: React.ReactNode;
}

export const InputLogin: React.FC<IinputLogin> = (props) => {
    return (
        <VStack>
            <InputGroup>
                <Input
                    {...props}
                    placeholder={props.placeholder}
                    w={{ base: "383px", lg: "383px", md: "383px", sm: "300px" }}

                />
                {props.icon &&
                    <InputLeftElement pointerEvents="none" color='#A0AEC0'>
                        {props.icon} {/* Remova as crases */}
                    </InputLeftElement>
                }
            </InputGroup>
        </VStack>
    );
};
