import {
  Flex,
  Text,
  FormLabel,
  Input,
  FormControl,
  FlexboxProps,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { InputPatternController } from '../inputPatternController/InputPatternController';
interface IForm {
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
}
interface IFormProps extends FlexboxProps {
  widthSelect?: string;
  isLoadingRequest?: boolean;
  isEditing?: boolean;
}
export const FormEfetivo: React.FC<IFormProps> = ({
  widthSelect,
  isLoadingRequest,
  isEditing,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IForm>();
  return (
    <FormControl {...props}>
      <Flex
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
        justifyContent={'space-between'}
        gap={4}
      >
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Nome Completo</FormLabel>
          <Controller
            name={'nome_completo'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe o Nome Completo"
                {...field}
                error={error}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Matrícula</FormLabel>
          <Controller
            name={'matricula'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe a Matrícula"
                {...field}
                error={error}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Posto/Graduação</FormLabel>
          <Controller
            name={'posto_grad'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe o Posto/Graduação"
                {...field}
                error={error}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>OPM</FormLabel>
          <Controller
            name={'opm'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe a unidade"
                {...field}
                error={error}
              />
            )}
          />
        </Flex>
      </Flex>
    </FormControl>
  );
};
