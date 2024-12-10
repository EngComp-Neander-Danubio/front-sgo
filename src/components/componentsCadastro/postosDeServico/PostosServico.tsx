import {
  Flex,
  Text,
  FormLabel,
  Input,
  Divider,
  Select,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
interface IForm {
  id: number;
  rua: string;
  bairro: string;
  numero: number;
  cidade: string;
  estado: string;
  latlong: string;
  comando: string;
  modalidade: string;
  other: string;
  date: Date;
  isOpen: boolean;
}
export const PostosServico: React.FC<IForm> = ({ id, isOpen }) => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useForm<IForm>({
    defaultValues: {
      rua: '',
      cidade: '',
      numero: (null as unknown) as number,
      estado: '',
      bairro: '',
      comando: '',
      modalidade: '',
      date: (null as unknown) as Date,
    },
  });
  const flagModalidade = getValues('modalidade');
  return (
    <form>
      <Divider mt={4} size={'2px'} />
      <Divider orientation="vertical" />
      <Text mt={4}>Posto de Serviço {id}</Text>
      <Flex
        flexDirection={'column'}
        //border={'1px solid red'}
        w={{
          lg: isOpen ? '78vw' : '88vw',
          md: isOpen ? '78vw' : '88vw',
          sm: isOpen ? '78vw' : '88vw',
        }}
      >
        <Flex flexDirection={'row'} justifyContent={'space-between'} gap={4}>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Rua/Av</FormLabel>
            <Controller
              name={'rua'}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  w={'450px'}
                  aria-invalid={errors.rua ? 'true' : 'false'}
                  placeholder="Rua/Av"
                />
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Número</FormLabel>
            <Controller
              name={'numero'}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  w={'100px'}
                  aria-invalid={errors.numero ? 'true' : 'false'}
                  placeholder="Número"
                />
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Bairro</FormLabel>
            <Controller
              name={'bairro'}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  w={'450px'}
                  aria-invalid={errors.bairro ? 'true' : 'false'}
                  placeholder="Bairro"
                />
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Latitude/Longitude</FormLabel>
            <Controller
              name={'latlong'}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  w={'200px'}
                  aria-invalid={errors.latlong ? 'true' : 'false'}
                  placeholder="Latitude/Longitude"
                />
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Cidade/UF</FormLabel>
            <Controller
              name={'cidade'}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  w={'400px'}
                  aria-invalid={errors.cidade ? 'true' : 'false'}
                  placeholder="Cidade/Estado"
                />
              )}
            />
          </Flex>
        </Flex>
        <Flex
          flexDirection={'row'}
          align={'center'}
          //justify={'center'}
          justifyContent={'space-between'}
          gap={2}
        >
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Comandante</FormLabel>
            <Controller
              name={'comando'}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  w={'700px'}
                  aria-invalid={errors.comando ? 'true' : 'false'}
                  placeholder="Comandante do posto"
                />
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Data</FormLabel>
            <Controller
              name={'date'}
              control={control}
              rules={{
                required: 'Data Obrigatória!',
                min: {
                  value: new Date().toISOString().slice(0, 16),
                  message: 'A data não pode ser no passado!',
                },
                validate: value => {
                  const selectedDate = new Date(value);
                  const nowDate = new Date();
                  return (
                    selectedDate >= nowDate || 'A data não pode ser no passado!'
                  );
                },
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Flex
                  flexDirection={'row'}
                  align={'center'}
                  justify={'center'}
                  justifyContent={'space-between'}
                  gap={2}
                >
                  <Input
                    placeholder="Selecione uma data e horário para o início"
                    //size="lg"
                    type="datetime-local"
                    onChange={onChange}
                    onBlur={onBlur}
                    /* value={
                    isLoadingById
                    ? new Date(taskById?.dateBegin).toISOString().slice(0, 16)
                    : value
                    } */
                    ref={ref}
                  />
                </Flex>
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Modalidade</FormLabel>
            <Controller
              name={'modalidade'}
              control={control}
              render={({ field }) => (
                <Select placeholder="Selecione a Modalidade" {...field}>
                  <option value="viatura">Viatura</option>
                  <option value="moto">Moto</option>
                  <option value="ape">A Pé</option>
                  <option value="montada">Montada</option>
                  <option value="outro">Outro</option>
                </Select>
              )}
            />
          </Flex>
          {flagModalidade === 'outro' && (
            <Flex flexDirection={'column'} gap={1}>
              <FormLabel fontWeight={'bold'}>Outros</FormLabel>
              <Controller
                name={'other'}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    w={'300px'}
                    aria-invalid={errors.other ? 'true' : 'false'}
                    placeholder="Outra modalidade"
                  />
                )}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </form>
  );
};
