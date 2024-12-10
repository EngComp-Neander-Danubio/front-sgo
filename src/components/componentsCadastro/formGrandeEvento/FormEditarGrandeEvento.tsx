import {
  Flex,
  FlexboxProps,
  FormControl,
  FormControlProps,
  FormLabel,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerEvent } from './DatePickerEvent';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { useState } from 'react';

interface IFormProps extends FlexboxProps {
  widthSelect?: string;
  isLoadingRequest?: boolean;
  isEditing?: boolean;
}

export const FormEditarGrandeEvento: React.FC<IFormProps> = ({
  widthSelect,
  ...props
}) => {
  const { control } = useFormContext();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <FormControl {...props}>
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
                  w={widthSelect || '400px'}
                  placeholder="Informe o Título do Evento"
                  {...field}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w={widthSelect || '500px'}>
            <FormLabel fontWeight="bold">Comandante</FormLabel>
            <Controller
              name="comandante"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputPatternController
                  type="text"
                  w={widthSelect || '500px'}
                  placeholder="Informe o Comandante"
                  {...field}
                  error={error}
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
