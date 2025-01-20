import {
  Card,
  CardBody,
  Heading,
  Text,
  CardProps,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  Checkbox,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Center,
  Portal,
  Divider,
  Grid,
} from '@chakra-ui/react';
import { Service } from '../../../context/requisitosContext/RequisitosContext';
import React, { useEffect, useState } from 'react';
import { TdTable } from '../../componentesFicha/table/td';
import { IconeDeletar } from '../../ViewLogin';
import { IconeMore } from '../../componentesFicha/registrosMedicos/icones/iconeMais/IconeMore';
import { handleSortByPostoGrad } from '../../../types/typesMilitar';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import { GiRank3 } from 'react-icons/gi';

interface ICard extends CardProps {
  isOpen: boolean;
}

export const CardServiceCopy: React.FC<ICard> = () => {
  const { searchServices, dateFirst, dateFinished, searchServices: services, militaresRestantes, addQtdMilitaresRestantes, removeQtdMilitaresRestantes } = useRequisitos();
  const [groupedServices, setGroupedServices] = useState<Record<string, Service[]>>({});

  const agruparDatas = (services: Service[]) => {
    const groupedDates: Record<string, Service[]> = {};
    if (services.length > 0) {
      const startDate = new Date(dateFirst);
      const endDate = new Date(dateFinished);
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateKey = currentDate.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        // Inicializa o array para a data se não existir
        if (!groupedDates[dateKey]) {
          groupedDates[dateKey] = [];
        }
        // Adiciona serviços que correspondem à data atual ao array
        services.forEach(service => {
          const serviceDateKey = new Date(service.dia).toLocaleDateString(
            'pt-BR',
            {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            },
          );

          if (serviceDateKey === dateKey) {
            groupedDates[dateKey].push(service);
          }
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    return groupedDates;
  };

  useEffect(() => {
    const grouped = agruparDatas(services);
    setGroupedServices(grouped);
  }, [dateFirst, dateFinished, services]);


  //OK
  const handleDeletarMilitar = async (mat: string) => {
    await addQtdMilitaresRestantes(mat)
    const updatedGroupedServices: Record<string, Service[]> = {};
    Object.entries(groupedServices).forEach(([date, services]) => {
      updatedGroupedServices[date] = services.map(service => {
        const updatedMilitares = service.militares.filter(militar => militar.matricula !== mat);
        return {
          ...service,
          militares: updatedMilitares,
        };
      }).filter(service => service.militares.length > 0); // Remove services with no militares left
    });
    setGroupedServices(updatedGroupedServices);
  };

  return (
    <Flex
      gap={4} // Aumentei o gap entre os cards
      w="100%"
      align="center"
      justify="center"
      flexWrap="wrap"
      justifyContent="space-between"
      overflowY="auto"
      h={services?.length > 0 || searchServices.length > 0 ? '100vh' : '60vh'}
    >
      {Object.entries(groupedServices).map(([date, services]) => (
        <Flex
          key={date}
          flexDirection="column"
          w="100%"
          //border={'1px solid red'}
        >
          <Heading size="lg" mb={2} w="100%" pl={2}>
            {`${date}`}
          </Heading>
          <Grid
            templateColumns={{ base: '1fr', sm: '1fr', md: 'repeat(2, 1fr)' }} // Responsivo: 1 card por linha em telas pequenas, 2 cards por linha em telas médias e grandes
            gap={4} // Espaço entre os cards
            w="100%"

          >
            {services.map((service, index) => (
              <Card
                key={index}
                direction={{
                  base: 'column',
                  sm: 'row',
                }}
                overflow="hidden"
                variant="outline"
                w="full" // Alterado para "full" para garantir que o card ocupe 100% do espaço disponível
              >
                <CardBody>
                  <Heading
                    size="md"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Flex align="center" justify="space-between">
                      <Menu
                        closeOnBlur={true}
                        closeOnSelect={false}
                        placement="auto"
                        matchWidth={true}
                        flip
                        isLazy
                        preventOverflow={true}
                      >
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<IconeMore _hover={{ cursor: 'pointer' }} />}
                          variant="outline"
                          color="#A0AEC0"
                          border="none"
                          _hover={{ bgColor: 'none' }}
                        />
                        <Portal>
                          <MenuList
                            gap={2}
                            zIndex={9999}
                            boxSize={'max-content'}
                            boxShadow="4px 4px 4px 0px rgba(0, 0, 0, 0.5)"
                          >
                            <Center fontWeight={'bold'} h={'3vh'}>
                              Militares Disponíveis
                            </Center>
                            <Divider className="gradient-border" />
                            {militaresRestantes.length > 0 ? (
                              militaresRestantes.map((m) => (
                                <MenuItem key={m.matricula}>
                                  <Checkbox
                                    size="md"
                                    key={m.matricula}
                                    icon={<GiRank3 />}
                                    colorScheme="green"
                                    onChange={async (e) => {
                                      if (e.target.checked) {
                                        service.militares.push(m);
                                        await removeQtdMilitaresRestantes(m.matricula);
                                      }
                                    }}
                                  >
                                    {m.posto_grad + ' ' + m.matricula + ' ' + m.nome_completo + ' ' + m.opm_sigla}
                                  </Checkbox>
                                </MenuItem>
                              ))
                            ) : (
                              <Text size="sm" textAlign={'center'} fontFamily={'Roboto'}>
                                Nenhum Militar disponível
                              </Text>
                            )}
                          </MenuList>
                        </Portal>
                      </Menu>
                    </Flex>
                  </Heading>
                  <Flex flexDirection="row" gap={1}>
                    <Text fontWeight="bold">Posto de Serviço: </Text>
                    <Text>{service.posto}</Text>
                  </Flex>
                  <Flex flexDirection="row" mr="4" gap={2} align="center">
                    <Text fontWeight="bold">Turno:</Text>
                    <Text>
                      Início:{' '}
                      {service.turno[0].toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    <Text>
                      Fim:{' '}
                      {service.turno[1].toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </Flex>
                  <Flex flexDirection="row" mr="4" gap={2} align="center">
                    <Text fontWeight="bold">Modalidade:</Text>
                    <Text>{service.modalidade}</Text>
                  </Flex>
                  <TableContainer w={'100%'} fontSize={'12px'}>
                    <Table
                      variant="simple"
                      size="sm"
                      overflowX={'auto'}
                      overflowY={'auto'}
                      h={'100%'}
                    >
                      <Thead>
                        <Tr>
                          <Th>Posto/Grad</Th>
                          <Th>Nome Completo</Th>
                          <Th>Matrícula</Th>
                          <Th>Lotação</Th>
                          <Th>Ações</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {handleSortByPostoGrad(service.militares, '2').map(
                          (militar) => (
                            <Tr key={militar.matricula}>
                              <Td>{militar.posto_grad}</Td>
                              <Td>{militar.nome_completo}</Td>
                              <Td>{militar.matricula}</Td>
                              <Td>{militar.opm_sigla}</Td>
                              <TdTable
                                customIcons={[
                                  <IconeDeletar
                                    key="deletar"
                                    _hover={{
                                      cursor: 'pointer',
                                    }}
                                    label_tooltip="militar"
                                    handleDelete={async () =>
                                      handleDeletarMilitar(militar.matricula)
                                    }
                                  />,
                                ]}
                              />
                            </Tr>
                          )
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Flex>
      ))}
    </Flex>
  );

};
