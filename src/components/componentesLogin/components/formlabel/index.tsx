import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";
import React from "react";

interface IFormLogin {
    label: string;
    typeInput: string;
    textHelp: string | null;
    placeHolder: string; 
    value?: string,
    password?: string,
    name?: string
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FormLabelLogin: React.FC<IFormLogin> = (props) => {
    return (
        <FormControl
        alignContent={'center'}
        justifyContent={'center'}
        padding={4}
        >
            <FormLabel fontWeight={'bold'}>{props.label}</FormLabel>
            <Input 
            required
            type={props.typeInput} 
            placeholder={props.placeHolder} 
            value={props.value} 
            name={props.name} 
            onChange={props.onChange} />
            {props.textHelp &&
                <FormHelperText>{props.textHelp}</FormHelperText>
            }
            
        </FormControl>
    )
};
