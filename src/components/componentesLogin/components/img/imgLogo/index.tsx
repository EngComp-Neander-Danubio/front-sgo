
import { Image } from '@chakra-ui/react';
import  Brasao from '../../../../../assets/img/BRANCO-1 1.png';

export const ImgBrasao = () => {
    return (
        <Image
            //borderRadius='full'
            //border={'1px solid red'}
            w={{xl:'349px', lg: '25vw', md: '250px', sm: '250px'}}
            src={Brasao}
            alt='Img Formatura'
        />
    )
}