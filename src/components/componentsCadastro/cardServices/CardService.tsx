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
} from '@chakra-ui/react';
import { Service } from '../../../context/requisitosContext/RequisitosContext';
import React from 'react';
import { optionsModalidade } from '../../../types/typesModalidade';
import { TdTable } from '../../componentesFicha/table/td';
import { IconeDeletar, IconeEditar } from '../../ViewLogin';
import { IconePermutar } from '../../componentesFicha/registrosMedicos/icones/iconePermuta/IconePermuta';
import { IconeMore } from '../../componentesFicha/registrosMedicos/icones/iconeMais/IconeMore';
import { DataEfetivo, handleSortByPostoGrad } from '../../../types/typesMilitar';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import { useOperacao } from '../../../context/eventContext/useOperacao';
import TableMain, { ColumnProps } from '../TableMain/TableMain';

interface ICard extends CardProps {
  services: Service[];
  isOpen: boolean;
}

export const CardService: React.FC<ICard> = ({ services, isOpen }) => {
  const { dateFirst, dateFinished } = useRequisitos();
  const { searchServices, searchServiceLoading } = useRequisitos();

  const columns: Array<ColumnProps<DataEfetivo>> = [

    {
      key: 'ps_matricula' ,
      title: 'Matrícula',
    },
    {
      key: 'vpa_posto_grad',
      title: 'Posto/Graduação',
    },
    {
      key: 'vpa_nome_completo',
      title: 'Nome',
    },
    {
      key: 'vpa_opm_sigla',
      title: 'OPM',
    },
    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        // Encontrar o índice do registro diretamente no array de dados
        //const index = currentData?.findIndex(item => item === record);

        return (
          <Flex flexDirection="row" gap={2}>
            {/* <span>
              <IconeDeletar
                label_tooltip={record.nome_completo}
                handleDelete={async () => {
                  if (index !== undefined && index !== -1) {
                    await deletePMFromTable(record.id, index.toString());
                  } else {
                    console.error(
                      'Índice não encontrado para o registro',
                      record,
                    );
                  }
                }}
              />
            </span> */}

          </Flex>
        );
      },
    },
  ];
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

  const groupedServices = agruparDatas(
    !searchServiceLoading ? services : searchServices,
  );

  // Debugging: Verificar agrupamento correto
  console.log('Grouped Services:', groupedServices);

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
      h={services.length > 0 || searchServices.length > 0 ? '100vh' : '60vh'}
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
              key={`${date}`} // Ajuste aqui para evitar conflitos de chave
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
                        <IconeEditar
                          _hover={{
                            cursor: 'pointer',
                          }}
                          label_tooltip="Posto de Serviço"
                        />
                        <IconeDeletar
                          _hover={{
                            cursor: 'pointer',
                          }}
                          label_tooltip="Posto de Serviço"
                        />
                        <IconeMore
                          _hover={{
                            cursor: 'pointer',
                          }}
                        />
                      </Flex>
                    </Flex>
                  </Heading>
                  <Flex flexDirection="row" gap={1}>
                    <Text fontWeight="bold">Posto de Serviço: </Text>
                    <Text>{service.posto}</Text>
                  </Flex>
                  <Flex flexDirection="row" mr="4" gap={2} align="center">
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
                    w={{
                      lg: isOpen ? '43vw' : '90vw',
                      md: isOpen ? '80vw' : '90vw',
                      sm: isOpen ? '80vw' : '90vw',
                    }}
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
                          (militar, idx) => (
                            <Tr key={idx}>
                              <Td>{militar.vpa_posto_grad}</Td>
                              <Td>{militar.vpa_nome_completo}</Td>
                              <Td>{militar.ps_matricula}</Td>
                              <Td>{militar.vpa_opm_sigla}</Td>
                              <TdTable
                                customIcons={[
                                  <IconePermutar
                                    key="permutar"
                                    _hover={{
                                      cursor: 'pointer',
                                    }}
                                  />,
                                  <IconeDeletar
                                    key="deletar"
                                    _hover={{
                                      cursor: 'pointer',
                                    }}
                                    label_tooltip="militar"
                                  />,
                                ]}
                              />
                            </Tr>
                          ),
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
