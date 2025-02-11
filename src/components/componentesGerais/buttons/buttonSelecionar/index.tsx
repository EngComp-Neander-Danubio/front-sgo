import { Button, Menu, MenuButton, MenuItem, MenuList, } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'

export const ButtonSelecionar = () => {
    return (

        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg={'none'}
                border="1px solid rgba(208, 213, 221, 1)"
                color={'rgba(160, 174, 192, 1)'}
                _hover={{ textDecoration: 'none' }}
                fontWeight={500}
                fontSize={{ lg: '14px', md: '14px', sm: '12px' }}         
                
            >
                Selecionar
            </MenuButton>
            <MenuList>
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
            </MenuList>
        </Menu>
    );

};


