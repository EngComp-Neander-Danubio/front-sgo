import { ReactElement } from 'react';
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
  useToast,
  Center,
} from '@chakra-ui/react';
import TableMain from '../TableMain/TableMain';
import { DataEfetivo } from '../../../types/typesMilitar';
import { useOperacao } from '../../../context/eventContext/useOperacao';
export interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  render?: (content: ColumnProps<T>, item: T, index?: number) => ReactElement;
}

type Props<T> = {
  content: Array<ColumnProps<T>>;
  data?: T[];
};
const columns: Array<ColumnProps<DataEfetivo>> = [

    {
      key: 'matricula' ,
      title: 'Matrícula',
    },
    {
      key: 'posto_grad',
      title: 'Posto/Graduação',
    },
    {
      key: 'nome_completo',
      title: 'Nome',
    },
    {
      key: 'opm_sigla',
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
const CardGeneric = <T,>({ data, content }: Props<T>) => {
  const {OperacaoById} = useOperacao();
  const listOfIcons = !data?.length ? (
    <Tr>{null}</Tr>
  ) : (
    data?.map((row, index) => {
      return (
        <Flex key={`row-${index}`}>
          {content.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string);

            return (
              <Flex key={`icon-${index2}`}>
                <Center
                  fontWeight={400}
                  color="rgba(102, 112, 133, 1)"
                  fontSize={'1rem'}
                  lineHeight="18px"
                  letterSpacing="0em"
                  h={'10px'}
                >
                  {value}
                </Center>
              </Flex>
            );
          })}
        </Flex>
      );
    })
  );
  const agruparDatas = (services: T[]) => {
      const groupedDates: Record<string, T[]> = {};

      if (services.length > 0) {
        const startDate = new Date(OperacaoById?.dataInicio);
        const endDate = new Date(OperacaoById?.dataFinal);
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

    const groupedServices = agruparDatas(data);
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
        h={content.length > 0 ? '100vh' : '60vh'}
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
            {content.map((service, index) => (
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
                          {listOfIcons}
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
                    <TableMain columns={columns} data={service}/>
                  </CardBody>
                </Card>
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>
    );
}

export default CardGeneric;
