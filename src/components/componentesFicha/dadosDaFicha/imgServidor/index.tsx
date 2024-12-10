import { Image } from "@chakra-ui/react";
import perfil from '../../../../assets/img/militar.jpg'; 

export const ImgFicha = (props) => {
    return (
        <Image src={perfil} w={'138px'} h={'186px'} {...props}/>
    );
};

