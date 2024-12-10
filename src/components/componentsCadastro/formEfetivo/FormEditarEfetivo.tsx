import { Flex, Text, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
interface IForm {
  name: string;
  grad: string;
  opm: string;
  matricula: string;
}
export const FormEditarEfetivo: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      name: '',
      grad: '',
      matricula: '',
      opm: '',
    },
  });
  return (
    <form>
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
            name={'name'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                aria-invalid={errors.name ? 'true' : 'false'}
                placeholder="Nome Completo"
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Matrícula</FormLabel>
          <Controller
            name={'matricula'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                aria-invalid={errors.matricula ? 'true' : 'false'}
                placeholder="Matrícula"
                disabled
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Posto/Graduação</FormLabel>
          <Controller
            name={'grad'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                aria-invalid={errors.grad ? 'true' : 'false'}
                placeholder="Posto/Graduação"
                disabled
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>OPM</FormLabel>
          <Controller
            name={'opm'}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                aria-invalid={errors.opm ? 'true' : 'false'}
                placeholder="OPM"
                disabled
              />
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};
