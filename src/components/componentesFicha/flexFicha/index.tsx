import React from 'react';
import { Flex, Box, VStack } from '@chakra-ui/react';
import { ImgFicha } from '../dadosDaFicha/imgServidor';
import { TitlePerfil } from '../dadosDaFicha/titlePerfil';
import { TableFicha } from '../table';
import { TabFicha } from '../tabFicha';
import { DadosFicha } from '../dadosDaFicha/dados';
import { BreadCrumb } from '../../componentsCadastro/flexMenor/BreadCrumb';

interface IFlexFicha {
  isOpen: boolean;
}

export const FlexFicha: React.FC<IFlexFicha> = props => {
  return (
    <>
      <BreadCrumb />
      <Flex
        pl={2}
        pr={2}
        mt={6}
        borderRadius={'8px'}
        borderTopLeftRadius={0}
        //border={"1px solid red"}
        w={props.isOpen ? '83vw' : '93vw'}
        transitionDuration="1.0s"
        minHeight="645px"
        height={'content'}
        position="relative"
        borderBottom="1px solid  rgba(0, 0, 0, 0.5)"
        boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
        bg={'white'}
        flexDir="column"
      >
        {/* <Flex
                width="100%"
                height="32px"
                bg={"#D9D9D9"}
                borderBottom="1px solid rgba(0, 0, 0, 0.5)"
                /> */}

        <VStack spacing={6} mt={4} p={4} alignItems="flex-start">
          <TitlePerfil />
        </VStack>

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          mt={4}
          w={props.isOpen ? '81vw' : '91vw'}
          transitionDuration="1.0s"
          minH={'275px'}
          height={'content'}
          //align={{lg: 'center', md: 'center', sm: 'left'}}
          flexDirection={{ lg: 'row', md: 'row', sm: 'column' }}
          gap={{ lg: 2, md: 2, sm: 4 }}
        >
          <ImgFicha
            width={{ lg: '138px', md: '138px', sm: '120px' }}
            height={{ lg: '186px', md: '186px', sm: '100px' }}
          />
          <DadosFicha
            ml={{ lg: '', md: '', sm: '2' }}
            marginLeft={{ lg: 6, md: 6, sm: 0 }}
            align={{ lg: 'center', md: 'center', sm: 'left' }}
          />
        </Flex>

        <Flex
          /* borderBottom="1px solid rgba(0, 0, 0, 0.5)"
                    boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
                    borderRadius={'8px'} */
          bg={'white'}
          p={4}
          mt={4}
          width="100%"
        >
          {/* <TitleRegistrosMedicos /> */}
        </Flex>

        <TabFicha />

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          mt={4}
          w={props.isOpen ? '81vw' : '91vw'} //don't change
          transitionDuration="1.0s"
        >
          {/* Seu conteúdo aqui */}

          <VStack>
            {/* <HeaderRegistrosMedicos /> */}
            <TableFicha
              isOpen={props.isOpen}
              columns={[]}
              registers={[]}
              currentPosition={0}
              rowsPerLoad={0}
            />
          </VStack>
        </Flex>

        <Flex mt={4} align={'center'} justify={'center'}></Flex>
      </Flex>
    </>
  );
};
