import { Flex } from '@chakra-ui/react';
import React from 'react';
import { TitleCadastro } from '../tilteCadastro';
import { useForm } from 'react-hook-form';
import { AccordinCadastro } from '../accordion/AccordionCadastro';
import { BreadCrumb } from '../flexMenor/BreadCrumb';

interface IFlexCadastrar {
  isOpen: boolean;
  handleToggle: () => void;
}

export const FlexConteudo: React.FC<IFlexCadastrar> = ({
  isOpen,
  handleToggle,
}) => {
  return (
    <Flex
      //h={'80vh'}
      h={'99.5%'}
      flexDirection={'column'}
      gap={2}
      //border={'1px solid black'}
    >
      <BreadCrumb />
      <Flex
        pl={2}
        pr={2}
        //border={'1px solid black'}
        borderRadius={'8px'}
        borderTopLeftRadius={0}
        w={{
          lg: isOpen ? '86vw' : '94vw',
          md: isOpen ? '86vw' : '94vw',
          sm: isOpen ? '86vw' : '94vw',
        }}
        transitionDuration="1.0s"
        //h={'80vh'}
        h={'100%'}
        position="relative"
        borderBottom="1px solid rgba(0, 0, 0, 0.5)"
        boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
        bg={'white'}
        //overflowY={'auto'}
      >
        <Flex
          position="absolute"
          top={'32px'}
          pl={4}
          //left={'32px'}
          //border={'1px solid black'}
          fontWeight={'700'}
        >
          <TitleCadastro />
        </Flex>
        <Flex
          position="absolute"
          flexDirection={'column'}
          alignItems={'center'}
          justify={'center'}
          top={'72px'}
          pt={4}
          gap={2}
          align={{ base: 'flex-start' }}
        >
          <Flex
            display={{ base: 'flex', lg: 'flex', md: 'flex', sm: 'block' }}
            gap={4}
            align={'center'}
            justify={'center'}
          ></Flex>

          <Flex
            borderBottom="1px solid rgba(0, 0, 0, 0.5)"
            boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
            borderRadius={'8px'}
            bg={'white'}
            //w={isOpen ? '86vw' : '93vw'} //don't change
            /* w={{
              lg: isOpen ? '85vw' : '92vw',
              md: isOpen ? '85vw' : '92vw',
              sm: isOpen ? '85vw' : '92vw',
            }} */
            transitionDuration="1.0s"
            align={'center'}
            justifyContent={'center'}
            //pl={8}
            pb={8}
            pl={4}
            //maxH={'60vh'}
            //border={'1px solid black'}
          >
            <AccordinCadastro
              isOpen={isOpen}
              handleToggle={handleToggle}
              handleSubmit={function(): void {
                throw new Error('Function not implemented.');
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
