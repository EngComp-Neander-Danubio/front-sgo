
import { Image } from '@chakra-ui/react';
import  logoEstado from '../../../../../assets/img/governoceara_logo 1.png';

export const ImgLogoEstado = () => {
    return (
        <Image
            
            //border={'1px solid red'}
            w={{xl: '6vw', lg: '6vw', md: '5vw', sm: '5vw'}}
            h={{xl:'12vh', lg: '12vh', md: '8vh', sm: '8vh'}}
            src={logoEstado}
            alt='logoEstado'
        />
    )
}