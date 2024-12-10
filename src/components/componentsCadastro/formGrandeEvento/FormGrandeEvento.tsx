import { Flex, FlexboxProps, FormControl, FormLabel } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerEvent } from './DatePickerEvent';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { useState } from 'react';
import AsyncSelectComponent from '../formEfetivo/AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import debounce from 'debounce-promise';
import api from '../../../services/api';

interface IFormProps extends FlexboxProps {
  widthSelect?: string;
  isLoadingRequest?: boolean;
  isEditing?: boolean;
}
interface Militar {
  pes_codigo: number;
  pes_nome: string;
  gra_nome: string;
  unidade_uni_sigla: string;
}
export const FormGrandeEvento: React.FC<IFormProps> = ({
  widthSelect,
  ...props
}) => {
  const { control } = useFormContext();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const cache = new Map<string, any>();

  const load = debounce(async (pes_nome: string): Promise<
    OptionsOrGroups<
      { label: string; value: string },
      GroupBase<{ label: string; value: string }>
    >
  > => {
    if (cache.has(pes_nome)) {
      return Promise.resolve(cache.get(pes_nome));
    }
    try {
      const response = await api.get<Militar[]>(`/policiais`, {
        params: { pes_nome: pes_nome },
      });

      const filteredOptions = response.data
        .filter(option =>
          option.pes_nome.toLowerCase().includes(pes_nome.toLowerCase()),
        )
        .map(option => ({
          label: `${option.pes_nome} - Matrícula: ${option.pes_codigo}`,
          value: (option.pes_codigo as unknown) as string,
        }));
      /* .map(option => ({
          label: `${option.gra_nome} PM ${option.pes_nome} - Matrícula: ${option.pes_codigo} - Unidade: ${option.unidade_uni_sigla}`,
          value: (option.pes_codigo as unknown) as string,
        })); */

      cache.set(pes_nome, filteredOptions);
      return filteredOptions;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }, 100);
  return (
    <FormControl
      //border={'1px solid green'}
      {...props}
    >
      <Flex align="center" justify="center" gap={2}>
        <Flex
          align={'center'}
          justify="space-between"
          flexDirection={props.flexDirection}
          gap={6}
        >
          <Flex flexDirection="column" gap={1}>
            <FormLabel fontWeight="bold">Título do Evento</FormLabel>
            <Controller
              name="nomeOperacao"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputPatternController
                  type="text"
                  w={{
                    base: widthSelect || '400px',
                    xl: widthSelect || '400px',
                    lg: widthSelect || '300px',
                    md: widthSelect || '300px',
                    sm: widthSelect || '300px',
                  }}
                  placeholder="Informe o Título do Evento"
                  {...field}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex
            flexDirection="column"
            gap={0}
            w={{
              base: widthSelect || '400px',
              xl: widthSelect || '400px',
              lg: widthSelect || '400px',
              md: widthSelect || '400px',
              sm: widthSelect || '400px',
            }}
          >
            <FormLabel fontWeight="bold">Comandante</FormLabel>
            <Controller
              name="comandante"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <AsyncSelectComponent
                  placeholder="Informe o Comandante"
                  nameLabel=""
                  onChange={field.onChange}
                  error={error}
                  isOverwriting
                  loadOptions={load}
                  noOptionsMessage="Nenhum Militar encontrado"
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w={widthSelect || '12vw'}>
            <FormLabel fontWeight="bold">Data Inicial</FormLabel>
            <Controller
              name="dataInicio"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
                  portalId="root-portal"
                  selectsStart
                  onChange={date => {
                    field.onChange(date);
                    setStartDate(date as Date);
                  }}
                  selected={field.value ? new Date(field.value) : null}
                  startDate={startDate}
                  endDate={endDate}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w={widthSelect || '12vw'}>
            <FormLabel fontWeight="bold">Data Final</FormLabel>
            <Controller
              name="dataFinal"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
                  portalId="root-portal"
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
    </FormControl>
  );
};
