import { Flex, HStack, Text } from '@chakra-ui/react';
import { IconeConfig } from '../../componentesGerais/iconeDashHeader/iconeEnginner';
import '../../border.modules.css';
import { IconeSino } from '../../componentesGerais/iconeDashHeader/iconeSino';
import React from 'react';
import { PopoverLogout } from '../../componentsCadastro/modal/PopoverLogout';
import { ListDashHeader } from '../../componentesGerais/listDashHeader/ListDashHeader';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';

export const DashHeader: React.FC = () => {
  const { handleOnOpen, isOpen } = useIsOpen();
  return (
    <>
      <Flex
        alignItems="center"
        textAlign="center"
        justify="center"
        flexDirection="row"
        //w={isOpen ? "1200px" : "1400px"}
        w={{
          lg: isOpen ? '86vw' : '94vw',
          md: isOpen ? '86vw' : '94vw',
          sm: isOpen ? '86vw' : '94vw',
        }}
        transitionDuration="1.0s"
        height={'80px'}
        borderRadius={'8px'}
        borderBottom="1px solid rgba(0, 0, 0, 0.5)"
        boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
        bg={'white'}
      >
        <HStack justifyContent="space-between" w="100%">
          <ListDashHeader
            handleToggle={handleOnOpen}
            pr={4}
            //border={'1px solid green'}
            //className="gradient-border-vertical"
          />
          <Flex
            //spacing={2}
            height={'80px'}
            //border={'1px solid yellow'}
            //w={'15%'}
            className="gradient-border-vertical"
          ></Flex>
          <Flex
            flexShrink={0} // Impede que este item encolha excessivamente
            w={'180px'}
            //w={'1vw'}
            height={'80px'}
            textAlign="center"
            align={'center'}
            justify={'center'}
            borderColor="rgba(229, 229, 229, 1)"
            display={{ base: 'none', lg: 'flex', md: 'flex', sm: 'none' }}
            //border={'1px solid green'}
            //className="gradient-border-vertical"
          >
            <Text fontWeight={700} fontSize={'18px'}>
              PMCE
            </Text>
          </Flex>
          <Flex
            //spacing={2}
            height={'80px'}
            //border={'1px solid yellow'}
            //w={'15%'}
            className="gradient-border-vertical"
          ></Flex>

          <HStack
            spacing={2}
            height={'80px'}
            //border={"1px solid yellow"}
            w={'70%'}
            ml={'auto'}
            pr={2}
          >
            {/* <InputDashHeader width={'85%'} /> */}
            <Flex ml={'auto'} pr={2} gap={2}>
              <PopoverLogout />
              <IconeConfig />
              <IconeSino />
            </Flex>
          </HStack>
        </HStack>
      </Flex>
    </>
  );
};
