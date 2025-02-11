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
} from '@chakra-ui/react';
import { Service } from '../../../context/requisitosContext/RequisitosContext';
import React, { useEffect, useState } from 'react';
import { TdTable } from '../../componentesGerais/table/td';
import { IconeDeletar } from '../../ViewLogin';
import { IconeMore } from '../../componentesGerais/icones/iconeMais/IconeMore';
import { handleSortByPostoGrad } from '../../../types/typesMilitar';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';

interface ICard extends CardProps {
  isOpen: boolean;
}

export const CardService: React.FC<ICard> = () => {
  const [checkboxData, setCheckboxData] = useState<string[]>([]);
  const { searchServices, dateFirst, dateFinished, searchServices: services, militaresRestantes, addQtdMilitaresRestantes, removeQtdMilitaresRestantes } = useRequisitos();
  const [groupedServices, setGroupedServices] = useState<Record<string, Service[]>>({});

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, label: string) => {
    if (e.target.checked) {
      setCheckboxData((prev) => [...prev, label]); // Adiciona ao array se marcado
      handleAddMilitar()
    } else {
      setCheckboxData((prev) => prev.filter(item => item !== label)); // Remove do array se desmarcado
    }
  };

  console.log(checkboxData);

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

  const handleDeletarMilitar = (mat: string) => {
    addQtdMilitaresRestantes(mat)
    const updatedGroupedServices: Record<string, Service[]> = {};
    Object.entries(groupedServices).forEach(([date, services]) => {
      // Filter out the 'militar' from the list of services
      updatedGroupedServices[date] = services.map(service => {
        const updatedMilitares = service.militares.filter(militar => militar.matricula !== mat);
        return {
          ...service,
          militares: updatedMilitares,
        };
      }).filter(service => service.militares.length > 0); // Remove services with no militares left
    });
    // Atualiza o estado com os novos serviços
    setGroupedServices(updatedGroupedServices);

  };
  const handleAddMilitar = () => {
    const updatedGroupedServices: Record<string, Service[]> = {};

    // Para cada matrícula selecionada
    checkboxData.forEach(mat => {
      // Encontre o militar que você deseja adicionar a partir de 'militaresRestantes'
      const militarToAdd = militaresRestantes.find(militar => militar.matricula === mat);

      // Verifica se o militar foi encontrado
      if (militarToAdd) {
        Object.entries(groupedServices).forEach(([date, services]) => {
          updatedGroupedServices[date] = services.map(service => {
            // Verifica se o militar já está no serviço
            const existingMilitar = service.militares.find(m => m.matricula === mat);

            // Se o militar não existir no serviço, adiciona
            if (!existingMilitar) {
              const updatedMilitares = [...service.militares, militarToAdd];  // Adiciona o militar completo
              return {
                ...service,
                militares: updatedMilitares,
              };
            }
            // Caso o militar já esteja, retorna o serviço sem alterações
            return service;
          }).filter(service => service.militares.length > 0);  // Remove serviços sem militares, se necessário
        });
      }
    });

    // Atualiza o estado com os serviços atualizados
    setGroupedServices(updatedGroupedServices);
  };


  return (
    <Flex
      gap={1}
      w={'100%'}
      mb={4}
      align="center"
      justify="center"
      flexWrap="wrap"
      justifyContent="space-between"
      overflowY="auto"
      overflowX="auto"
      h={services?.length > 0 || searchServices.length > 0 ? '100vh' : '60vh'}
      ml={4}
      mt={4}
    >
      {Object.entries(groupedServices).map(([date, services]) => (
        <Flex
          key={date}
          flexDirection="row"
          flexWrap={'wrap'}
          w="100%"
          overflowY={'auto'}
        >
          <Heading size="lg" mb={4} w="100%">
            {`${date}`}
          </Heading>
          {services.map((service, index) => (
            <Flex
              key={index} // Ajuste aqui para garantir que cada item tenha uma chave única
              flexDirection="row"
              gap={2}
              w={'49%'}
              mb={4}
              align="center"
              justify="center"
            >
              <Card
                direction={{
                  base: 'column',
                  sm: 'row',
                }}
                overflow="hidden"
                variant="outline"
                w="full"
              >
                <CardBody>
                  <Heading
                    size="md"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Flex align="center" justify="space-between">
                      <Flex gap={2}>
                      <Menu closeOnBlur={true} closeOnSelect={false}>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<IconeMore _hover={{ cursor: 'pointer' }} />}
                            variant="outline"
                            color="#A0AEC0"
                            border={'none'}
                            _hover={{ bgColor: 'none' }}
                          />
                          <MenuList overflowY={'auto'} h={'40vh'} border={'1px solid red'}>
                            {militaresRestantes.map((m, index) => (
                              <MenuItem key={m.matricula} >
                                <Checkbox
                                key={index}
                                  colorScheme="green"
                                  isChecked={checkboxData.includes(`${m.matricula}`)}
                                  onChange={(e) => {handleCheckboxChange(e, `${m.matricula}`);
                                  }} // Gerencia a seleção
                                >
                                  {m.posto_grad + ' ' + m.matricula + ' ' + m.nome_completo + ' ' + m.opm_sigla}
                                </Checkbox>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </Flex>
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
                  <TableContainer
                    w={'100%'}
                    fontSize={'12px'}
                  >
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
                            <Tr key={militar.matricula}> {/* Use a chave única do militar */}
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
                                    handleDelete={async () => handleDeletarMilitar(militar.matricula)}
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
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
