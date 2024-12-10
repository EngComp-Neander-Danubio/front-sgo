import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Checkbox,
  Divider,
  Spinner,
  Center,
  Grid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import api from '../../../../services/api';
import { DatePickerEvent } from '../../formGrandeEvento/DatePickerEvent';

interface SolicitacaoForm {
  dataInicio: Date;
  dataFinal: Date;
  uni_codigo: number[];
  select_opm?: opmSaPM;
}

type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  opm_filha: opmSaPM[];
};
export const FormSolicitacaoEfetivoRed: React.FC = () => {
  const methodsInput = useFormContext<SolicitacaoForm>();
  const { control } = methodsInput;
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [datasOpmFilhas, setDatasOpmFilhas] = useState<opmSaPM[]>([]);
  const handleLoadOpmFilhas = async (param: number) => {
    try {
      const response = await api.get<opmSaPM[]>(`/unidadesfilhas/${param}`);
      setDatasOpmFilhas(response.data);
    } catch (error) {
      console.error('Erro ao carregar as unidades:', error);
    }
  };
  useEffect(() => {
    handleLoadOpmFilhas(1800);
  }, []);
  return (
    <FormControl mb={4}>
      <Divider />
      <Flex
        flexDirection="row"
        w="100%"
        h="50px"
        //mt={2}
        align="center"
        justify={'center'}
        justifyContent="space-between"
        gap={1}
        //color={'rgba(0, 0, 0, 0.48)'}
      >
        <Flex
        //border={'1px solid red'}
        >
          <Flex flexDirection={'row'} gap={4}>
            <Flex
              gap={2}
              flex={1}
              //border={'1px solid red'}
              w={'10vw'}
            >
              <Text fontWeight={700}>OPM:</Text>
              <Text flexWrap={'nowrap'}>CETIC</Text>
            </Flex>
          </Flex>
          {/* Segunda linha de dados */}
          <Flex flexDirection={'row'} gap={4}>
            <Flex
              gap={2}
              flex={1}
              //border={'1px solid red'}
              w={'10vw'}
            >
              <Text fontWeight={700}>Operação:</Text>
              <Text>Evangelizar</Text>
            </Flex>
            <Flex
              gap={2}
              flex={1}
              //border={'1px solid red'}
              w={'10vw'}
            >
              <Text fontWeight={700}>Solicitante:</Text>
              <Text>CGO</Text>
            </Flex>
            <Flex
              gap={2}
              flex={1}
              //border={'1px solid red'}
              w={'10vw'}
            >
              <Text fontWeight={700}>Solicitação:</Text>
              <Text>N° XX</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Flex align="center" gap={2} mt={2}>
        <Flex
          align={'center'}
          justify="center"
          flexDirection={'row'}
          gap={6}
          pb={2}
        >
          <Flex flexDirection="column" gap={1} w={'12vw'}>
            <FormLabel>Prazo Inicial</FormLabel>
            <Controller
              name="dataInicio"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
                  selectsStart
                  onChange={date => {
                    field.onChange(date);
                    setStartDate(date as Date);
                  }}
                  selected={field.value ? new Date(field.value) : new Date()}
                  startDate={startDate}
                  endDate={endDate}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w={'12vw'} zIndex={1}>
            <FormLabel>Prazo Final</FormLabel>
            <Controller
              name="dataFinal"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
                  selectsEnd
                  onChange={date => {
                    field.onChange(date);
                    setEndDate(date as Date);
                  }}
                  selected={field.value ? new Date(field.value) : null}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  error={error}
                />
              )}
            />
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Flex
        border="1px solid rgba(0, 0, 0, 0.16)"
        borderRadius="5px"
        maxH="30vh"
        h="20vh"
        w="full"
        overflowX="auto"
        mt={4}
        p={2}
      >
        {datasOpmFilhas.length > 0 ? (
          <Grid templateColumns="repeat(2, 1fr)" gap={2} w="full">
            {datasOpmFilhas.map((item, index) => (
              <Controller
                key={item?.uni_codigo || index}
                name={`uni_codigo`}
                control={control}
                defaultValue={datasOpmFilhas.map(item => item.uni_codigo)}
                render={({ field }) => (
                  <Checkbox
                    size="md"
                    w={'fit-content'}
                    colorScheme="green"
                    isChecked={field.value?.includes(item?.uni_codigo)}
                    onChange={e => {
                      const isChecked = e.target.checked;
                      const currentValue = field.value || [];

                      field.onChange(
                        isChecked
                          ? [...currentValue, item.uni_codigo]
                          : currentValue.filter(
                              (codigo: number) => codigo !== item.uni_codigo,
                            ),
                      );
                    }}
                  >
                    {item?.uni_sigla}
                  </Checkbox>
                )}
              />
            ))}
          </Grid>
        ) : (
          <Center w="full" h="full">
            <Spinner size="lg" />
          </Center>
        )}
      </Flex>
    </FormControl>
  );
};
