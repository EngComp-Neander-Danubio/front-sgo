import { Box, Image } from '@chakra-ui/react';
import imgCETIC from '../../../assets/img/Group-2.png';
import React from 'react';
interface IFooter {
  isOpen?: boolean;
}
export const FooterCetic: React.FC<IFooter> = ({ isOpen }) => {
  return (
    <Box
      as="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="60px"
      //borderTop="1px solid rgba(0, 0, 0, 0.1)"
    >
      <Image
        src={imgCETIC}
        w={{
          lg: isOpen ? '80px' : '50px',
          md: isOpen ? '80px' : '50px',
          sm: isOpen ? '80px' : '50px',
        }}
        h={{
          lg: isOpen ? '25px' : '30px',
          md: isOpen ? '25px' : '30px',
          sm: isOpen ? '25px' : '30px',
        }}
        //boxSize={isOpen ? '0px' : '20px'}
        position="absolute"
        bottom={5}
        alignSelf="center"
        //border="1px solid red" // Para visualização, remova se não necessário
      />
    </Box>
  );
};
