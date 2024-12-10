import { Image } from '@chakra-ui/react';
import NomeEstado from '../../../../../assets/img/img_governoCeara_horizontalBranco_redimensionada.png';

export const NomeLogoEstado = () => {
    return (

        <Image
            //borderRadius='full'
            w={{xl: '300px', lg: '15vw', md: '200px', sm: '200px'}}
            h={{xl: '95.45px', lg: '7vh', md: '7vh', sm: '70px'}}
            src={NomeEstado}
            alt='Nome Estado'
        />

    )
}