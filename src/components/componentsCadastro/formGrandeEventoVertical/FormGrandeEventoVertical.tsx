import { Flex, FormLabel, Input, useToast, Text } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { BotaoCadastrar } from '../botaoCadastrar';
interface IForm {
  name: string;
  cmt: string;
  dateOfBegin: Date;
}
export const FormGrandeEventoVertical: React.FC<IForm> = () => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      name: '',
      dateOfBegin: new Date(),
      cmt: '',
    },
  });
  const onSubmit = async (data: IForm) => {
    try {
      toast({
        title: 'Sucesso!',
        description: 'Login realizado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      reset(); // Reset the form after successful submission
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      // console.error("error:", error);
      toast({
        title: 'Erro ao fazer login.',
        description: error.response
          ? error.response.data.message
          : 'Verifique suas credenciais e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      //setIsLoading(false);
    }
  };
  return (
    <Flex
      align={'center'}
      justify={'center'}
      //justifyContent={'space-between'}
      w={'500px'}
      h={'600px'}
      bgColor={'#fff'}
      borderRadius={'25px'}
      flexDirection={'column'}
      //border={'1px solid red'}
      gap={4}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          align={'center'}
          justify={'center'}
          //justifyContent={'space-between'}
          flexDirection={'column'}
          h={'500px'}
          gap={2}
          //border={'1px solid red'}
          // w={'60vw'}
        >
          {' '}
          <Text fontWeight={'bold'} fontSize={'20px'}>
            Novo Evento/Operação
          </Text>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Título do Evento</FormLabel>
            <Controller
              name={'name'}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  w={'450px'}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  placeholder="Informe título do evento"
                />
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Comandante Responsável</FormLabel>
            <Controller
              name={'cmt'}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  w={'450px'}
                  aria-invalid={errors.cmt ? 'true' : 'false'}
                  placeholder="Informe o comandante do evento"
                />
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Data Inicial</FormLabel>
            <Controller
              name={'dateOfBegin'}
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
                <Input
                  placeholder="Selecione uma data e horário para o início"
                  w={'450px'}
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
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Data Final</FormLabel>
            <Controller
              name={'dateOfBegin'}
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
                <Input
                  placeholder="Selecione uma data e horário para o início"
                  w={'450px'}
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
              )}
            />
            <Flex align={'center'} justify={'center'} mt={4}>
              <BotaoCadastrar
                type="submit"
                handleSubmit={function(): void {
                  throw new Error('Function not implemented.');
                }}
                label="Cadastrar"
              />
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
