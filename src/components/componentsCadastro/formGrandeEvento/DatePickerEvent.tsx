import React from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
//import { Locale } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { FieldError } from 'react-hook-form';
import { RiCalendarLine } from 'react-icons/ri';
import './styles.css';

type IDatePicker = InputProps &
  DatePickerProps & {
    error?: FieldError | { message?: string };
  };
export const DatePickerEvent: React.FC<IDatePicker> = ({
  customInputRef,
  error,
  ...props
}: IDatePicker) => {
  return (
    <>
      <DatePicker
        {...props}
        ref={customInputRef}
        //portalId="root-portal"
        popperPlacement="bottom"
        locale={ptBR}
        timeCaption="Hora"
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        showPopperArrow
        dateFormat="dd/MM/yyyy HH:mm"
        customInput={
          <FormControl isInvalid={!!error}>
            <InputGroup>
              <Input
                value={
                  props.selected
                    ? props.selected.toLocaleDateString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''
                }
                placeholder="Selecione data e horário"
              />
              <InputRightElement>
                <RiCalendarLine />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        }
      />
    </>
  );
};
