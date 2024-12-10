import {
  Flex,
  Text,
  FormLabel,
  Input,
  FormControl,
  FlexProps,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { optionsModalidade } from '../../../types/typesModalidade';
import { SelectPattern } from '../modal/SelectPattern';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
interface IForm {
  local: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  modalidade: string;
  militares_por_posto?: number | string;
}
interface IModal extends FlexProps {}
export const FormPosto: React.FC<IModal> = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<IForm>();
  const [quantity, setQuantity] = useState(2);
  setValue('militares_por_posto', quantity);
  const handleQuantityPlus = async () => {
    setQuantity(q => q + 1);
  };

  const handleQuantityMinus = () => {
    if (quantity > 2) {
      setQuantity(q => q - 1);
    }
  };
  return (
    <FormControl>
      <Flex
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
        justifyContent={'space-between'}
        gap={4}
      >
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel fontWeight={'bold'}>Militares por posto</FormLabel>
          <Controller
            name="militares_por_posto"
            control={control}
            render={({ field }) => (
              <Flex
                flexDirection={'row'}
                align={'center'}
                //justify={'center'}
                gap={2}
              >
                <FaMinusCircle
                  onClick={() => {
                    handleQuantityMinus();
                  }}
                />
                <Input
                  w={'60px'}
                  h={'30px'}
                  type="text"
                  value={`${quantity}`} // Use o valor do campo controlado
                  onChange={e => {
                    const newValue = Number(e.target.value);
                    setQuantity(newValue);
                    field.onChange(newValue);
                  }}
                />
                <FaPlusCircle
                  onClick={() => {
                    handleQuantityPlus();
                  }}
                />
              </Flex>
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Local</FormLabel>
          <Controller
            name={'local'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe o Local"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Modalidade</FormLabel>
          <Controller
            name="modalidade"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <Flex gap={2} flexDirection={'column'}>
                <SelectPattern
                  value={value}
                  options={optionsModalidade}
                  placeholderSelect="Modalidade"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={error}
                />
              </Flex>
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Rua</FormLabel>
          <Controller
            name={'rua'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe a rua"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Número</FormLabel>
          <Controller
            name={'numero'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe o número"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Bairro</FormLabel>
          <Controller
            name={'bairro'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe o bairro"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Cidade</FormLabel>
          <Controller
            name={'cidade'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe a cidade"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
      </Flex>
    </FormControl>
  );
};
