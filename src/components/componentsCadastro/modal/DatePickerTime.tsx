import React from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa os estilos padrões do react-datepicker
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { IoTimeOutline } from 'react-icons/io5';

type IDatePicker = InputProps &
  DatePickerProps & {
    error?: FieldError | { message?: string };
  };

export const DatePickerTime: React.FC<IDatePicker> = ({
  customInputRef,
  error,
  ...props
}: IDatePicker) => {
  return (
    <>
      <DatePicker
        ref={customInputRef}
        showTimeSelect
        showTimeSelectOnly
        timeFormat="HH:mm"
        timeCaption="Hora"
        timeIntervals={15}
        {...props}
        customInput={
          <FormControl isInvalid={!!error}>
            <InputGroup>
              <Input
                value={
                  props.selected
                    ? props.selected.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''
                }
                placeholder="Selecione horário"
                readOnly
              />
              <InputRightElement>
                <IoTimeOutline />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        }
      />
    </>
  );
};
