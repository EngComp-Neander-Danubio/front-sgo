import { Flex, FormLabel, FormControl, FlexboxProps } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import AsyncSelectComponent from './AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import api from '../../../services/api';
import debounce from 'debounce-promise';

interface IForm {
  busca: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
}
interface Militar {
  pes_codigo: number;
  pes_nome: string;
  gra_nome: string;
  unidade_uni_sigla: string;
}
interface IFormProps extends FlexboxProps {
  widthSelect?: string;
  isLoadingRequest?: boolean;
  isEditing?: boolean;
}

export const FormEfetivoBySearch: React.FC<IFormProps> = ({
  widthSelect,
  ...props
}) => {
  const { control, setValue, watch, getValues } = useFormContext<IForm>();
  const [dadosPM, setDadosPM] = useState<{ label: string; value: string }[]>(
    [],
  );
  const data = watch('busca');
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
          label: `${option.gra_nome} PM ${option.pes_nome} - Matrícula: ${option.pes_codigo} - Unidade: ${option.unidade_uni_sigla}`,
          value: (option.pes_codigo as unknown) as string,
        }));

      cache.set(pes_nome, filteredOptions);

      setDadosPM(filteredOptions);

      return filteredOptions;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }, 300);

  const separateNounsByMilitar = useCallback(() => {
    const selectedOption = dadosPM.find(p => p.value === data);
    //console.log(selectedOption, dadosPM, data);
    if (selectedOption) {
      const [gradAndName, rest] = selectedOption.label.split(' - ');
      const [mat, unitPart] = selectedOption.label.split(' - Unidade: ');

      const matricula = mat.match(/\d+/)?.[0];
      setValue('matricula', matricula || '');

      const [grad, ...nameParts] = gradAndName.split(' PM ');
      const name = nameParts.join(' ');
      setValue('nome_completo', name);
      setValue('posto_grad', grad.trim() + ' PM');
      setValue('opm', unitPart?.trim() || '');
    }
  }, [dadosPM, data, setValue]);

  useEffect(() => {
    separateNounsByMilitar();
  }, [data, dadosPM, getValues, separateNounsByMilitar]);

  return (
    <FormControl {...props}>
      <Flex
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
        gap={4}
      >
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <Controller
            name="busca"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <AsyncSelectComponent
                {...field}
                nameLabel="Busca"
                placeholder="Busque por um Militar"
                onChange={field.onChange}
                loadOptions={load}
                //value={field.value}
                error={error}
                isOverwriting={false}
                noOptionsMessage="Nenhum Militar encontrado"
              />
            )}
          />
        </Flex>
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
                isDisabled
              >
                {''}
              </InputPatternController>
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
                isDisabled
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
                isDisabled
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
                isDisabled
              />
            )}
          />
        </Flex>
      </Flex>
    </FormControl>
  );
};
