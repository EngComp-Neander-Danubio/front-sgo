import { Center, Flex, Icon, Image, Text } from '@chakra-ui/react';
import Brasao from '../../../assets/img/BRASAOPMCEbranco2.png';
import { IconeCadastro } from '../../componentesGerais/iconesMenuLateral/iconeMenulateralCadastro';
import '../../border.modules.css';
import React from 'react';
import { IconeBusca } from '../../componentesGerais/iconesMenuLateral/iconeMenulateralBusca';
import { Link, useNavigate } from 'react-router-dom';
import { IconeRelatorio } from '../../componentesGerais/iconesMenuLateral/iconeMenuLateralRelatorios';
import { IconeSolicitacoes } from '../../componentesGerais/iconesMenuLateral/iconeMenuLateralSolicitacoes';
import { FooterCetic } from '../../componentsCadastro/footerImgCETIC';
import { AccordionMenuLateral } from '../../componentesGerais/accordionMenuLateral/AccordionMenuLateral';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';

export const MenuLateral: React.FC = () => {
  const navigate = useNavigate();
  const { handleOnOpen, isOpen } = useIsOpen();
  const perfil = 'cgo';
  return (
    <>
      <Flex
        flexDirection={'column'}
        justifyContent={'flex-start'}
        w={{
          base: isOpen ? '240px' : '0px',
          lg: isOpen ? '240px' : '80px',
          md: isOpen ? '240px' : '80px',
          sm: isOpen ? '240px' : '0px',
        }}
        //w={isOpen ? "12vw" : "3vw"}
        transitionDuration="1.0s"
        height={'98vh'}
        //border={"1px solid red"}
        bg={'#276749'}
        borderRadius={'15px'}
        display={{
          xl: 'flex',
          lg: 'flex',
          md: 'flex',
          sm: 'flex',
          base: 'none',
        }}
      >
        <Flex
          //border={'1px solid red'}
          className="gradient-border"
          align={'center'}
          justify={'center'}
          h={'16vh'}
        >
          {isOpen ? (
            <Link to={'/'}>
              <Image src={Brasao} w={'140px'} h={'10vh'} />
            </Link>
          ) : (
            <Flex flexDirection={'column'} h={'10vh'}>
              <Center
                //border={'1px solid red'}
                //justifyItems={'center'}
                color={'white'}
                fontSize={'20px'}
                fontWeight={800}
                textAlign={'center'}
                justifyContent={'space-between'}
              >
                SGO
              </Center>
            </Flex>
          )}
        </Flex>

        <Flex
          className={isOpen ? 'gradient-border' : 'none'}
          align={'center'}
          justify={'center'}
          //border={'1px solid red'}
          //mt={10}
          //m={2}
          //mb={10}
          h={'15vh'}
        >
          {' '}
          {isOpen ? (
            <Text
              align={'center'}
              justifyContent={'center'}
              color={'white'}
              width={'224px'}
              //height={'20vh'}
              //mb={10}
              fontSize={'20px'}
              textAlign={'center'}
              fontWeight={500}
            >
              SISTEMA DE GERENCIAMENTO
              <br />
              DE OPERAÇÕES
            </Text>
          ) : (
            <Flex flexDirection={'column'} h={'10vh'}></Flex>
          )}
        </Flex>

        <Flex
          color={'white'}
          //border={"1px solid yellow"}
          flexDirection={'column'}
          //width={"25vh"}
          //height={'168px'}
          align="center"
          mt={!isOpen ? 1 : 2}
          //pt={10}
        >
          <AccordionMenuLateral
            customIcons={[
              <Icon as={IconeCadastro} boxSize={5} />,
              <Icon as={IconeBusca} boxSize={5} />,
              <Icon as={IconeSolicitacoes} boxSize={5} />,
              <Icon as={IconeRelatorio} boxSize={5} />,
            ]}
            nameLabels={
              perfil.includes('cgo')
                ? ['Cadastro', 'Consulta', 'Solicitacões', 'Escalas']
                : ['Solicitacões']
            }
            handleClick={
              perfil.includes('cgo')
                ? [
                    () => navigate('/criar-operacao'),
                    () => navigate('/listar-operacoes'),
                    [
                      () => navigate('/listar-solicitacoes-postos'),
                      () => navigate('/listar-solicitacoes-pms'),
                    ],
                    () => navigate('/escalas'),
                  ]
                : [
                    [
                      () => navigate('/listar-solicitacoes-postos'),
                      () => navigate('/listar-solicitacoes-pms'),
                    ],
                    //() => navigate('/escalas'),
                  ]
            }
            nameLabelSecundarys={
              perfil.includes('cgo')
                ? [
                    ['Cadastrar Operação'],
                    ['Lista de Operações'],
                    ['Postos', 'PMs'],
                    ['Escalas'],
                  ]
                : [
                    ['Postos', 'PMs'],
                    //['Escalas']
                  ]
            }
            displayCustom={{
              lg: isOpen ? 'block' : 'none',
              md: isOpen ? 'block' : 'none',
              sm: isOpen ? 'block' : 'none',
            }}
            isOpen={isOpen}
            handleToggle={!isOpen ? handleOnOpen : undefined}
          />
        </Flex>

        <FooterCetic isOpen={isOpen} />
      </Flex>
    </>
  );
};
