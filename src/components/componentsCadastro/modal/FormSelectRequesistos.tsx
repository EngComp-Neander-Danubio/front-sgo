import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { DatePickerRequisitos } from './DatePickerRequisitos';
import { DatePickerTime } from './DatePickerTime';
import { SelectPattern } from './SelectPattern';
import { optionsModalidade } from '../../../types/typesModalidade';
import { optionsMilitares } from '../../../types/typesMilitar';
export type IForm = {
  quantity_militars: number;
  quantity_services: number;
  quantity_folgas: number;
  quantity_turnos: number;
  aleatoriedade: boolean;
  efetivo_tipo: boolean;
  antiguidade: string[];
  modalidade?: string;
  dateFirst: Date;
  dateFinish: Date;
  turnos: {
    initial: Date;
    finished: Date;
  }[];
};
interface ISwicht {
  isOpen: boolean;
}
export const FormSelectRequesitos: React.FC<ISwicht> = ({ isOpen }) => {
  const {
    control,
    setValue,
    trigger,
    watch,
    reset,
    getValues,
  } = useFormContext<IForm>();
  const [quantity, setQuantity] = useState(2);
  const [quantityTurnos, setQuantityTurnos] = useState(1);
  const [quantityServices, setQuantityServices] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const isAleatorio = watch('aleatoriedade');
  const [switchGrad, setSwitchGrad] = useState(true);
  const [swicth, setSwicth] = useState(true);
  const dateFirst = new Date(watch('dateFirst'));
  const dateFinish = new Date(watch('dateFinish'));
  const [quantityFolga, setQuantityFolga] = useState(0);

  const handleSwicth = (e: any) => {
    //if (!isAleatorio) trigger('antiguidade');
    setSwicth(!swicth);
  };
  const handleSwicthGrad = (e: any) => {
    if (!isAleatorio) trigger('antiguidade');

    setSwicth(!switchGrad);
  };
  const handleQuantityPlus = async () => {
    if (!isAleatorio) await trigger('antiguidade');
    setQuantity(q => q + 1);
  };

  const handleQuantityMinus = () => {
    if (quantity > 2) {
      setQuantity(q => q - 1);
    }
  };

  const handleQuantityTurnosPlus = () => {
    setQuantityTurnos(q => q + 1);
  };

  const handleQuantityTurnosMinus = () => {
    if (quantityTurnos > 1) {
      setQuantityTurnos(q => q - 1);
      reset();
    }
  };
  const handleQuantityServicesPlus = () => {
    if (quantityServices <= dateFinish.getDate() - dateFirst.getDate()) {
      setQuantityServices(q => q + 1);
      setQuantityFolga(q => q - 1);
    }
  };

  const handleQuantityServiceMinus = () => {
    if (quantityServices > 1) {
      setQuantityServices(q => q - 1);
      setQuantityFolga(q => q + 1);
    }
  };
  const handleQuantityFolgaPlus = () => {
    if (quantityFolga <= dateFinish.getDate() - dateFirst.getDate()) {
      setQuantityFolga(q => q + 1);
      setQuantityServices(q => q - 1);
    }
  };

  const handleQuantityfolgaMinus = () => {
    if (quantityFolga > 0) {
      setQuantityFolga(q => q - 1);
      setQuantityServices(q => q + 1);
    }
  };
  setValue('quantity_militars', quantity);
  setValue('quantity_turnos', quantityTurnos);
  setValue('quantity_services', quantityServices);
  setValue('quantity_folgas', quantityFolga);
  //setValue('aleatoriedade', isAleatorio);

  useEffect(() => {
    const differenceDates = dateFinish.getDate() - dateFirst.getDate();
    /* console.log(
      'differenceDates',
      differenceDates,
      'qtd folgas',
      quantityFolga,
    ); */
    setValue('quantity_folgas', differenceDates);
  }, [dateFirst, dateFinish, setValue]);

  return (
    <FormControl>
      <Flex
        display="flex"
        flexDirection={'column'}
        gap={2}
        overflowY={'auto'}
        maxH={'60vh'}
        p={4}
        //border={'1px solid red'}
      >
        <Flex flexDirection={'column'} justify={'center'}>
          <FormLabel fontWeight={'bold'}>
            Quantidade militares por posto?
          </FormLabel>
          <Controller
            name="quantity_militars"
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

        <Flex flexDirection={'column'} justify={'center'}>
          <FormLabel fontWeight={'bold'}>Distribuição aleatória?</FormLabel>
          <Controller
            name="aleatoriedade"
            control={control}
            render={({ field }) => (
              <Switch
                id="aleatoriedade"
                //colorScheme={'#38A169'}
                //color={'#38A169'}
                colorScheme={'green'}
                onChange={async e => {
                  field.onChange(e.target.checked);
                  await trigger('antiguidade');
                  handleSwicth(!field.value);
                }}
                isChecked={field.value ?? true}
              />
            )}
          />
        </Flex>
        {!swicth && (
          <Flex flexDirection={'column'} justify={'center'}>
            {/* <FormLabel fontWeight={'bold'}>Somente Praças?</FormLabel>
            <Controller
              name="efetivo_tipo"
              control={control}
              render={({ field }) => (
                <Switch
                  id="efetivo_tipo"
                  //colorScheme={'#38A169'}
                  color={'#38A169'}
                  onChange={e => {
                    field.onChange(e.target.checked);
                    handleSwicthGrad(!field.value);
                  }}
                  isChecked={field.value ?? true}
                />
              )}
            /> */}
            <Flex flexDirection={'column'} justify={'center'}>
              <FormLabel fontWeight={'bold'}>Efetivo</FormLabel>
              {Array.from({ length: quantity }, (_, index) => (
                <Flex
                  gap={2}
                  flexDirection={'column'}
                  key={index} // `key` aplicada no nível correto
                >
                  <Text>{index + 1}° Policial Militar</Text>
                  <Controller
                    name={`antiguidade.${index}` as const}
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { error },
                    }) => {
                      /* const options = switchGrad
                      ? optionsMilitares.filter(m => Number(m.militarRank) >= 7)
                      : optionsMilitares; */
                      const options = optionsMilitares;

                      return (
                        <SelectPattern
                          options={options} // `options` calculado uma vez
                          placeholderSelect="Militares"
                          onChange={async e => {
                            onChange(e.currentTarget.value);
                            await trigger(`aleatoriedade`);
                          }}
                          onBlur={onBlur}
                          error={error}
                          value={value}
                        />
                      );
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
        )}
        <Flex flexDirection="column">
          <FormLabel fontWeight="bold">Data Inicial</FormLabel>
          <Controller
            name="dateFirst"
            control={control}
            rules={{
              required: 'Campo é obrigatório!',
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <DatePickerRequisitos
                onBlur={onBlur}
                showDateSelect
                selectsStart
                onChange={date => {
                  onChange(date);
                  setStartDate((date as unknown) as Date);
                }}
                selected={value ? new Date(value) : null}
                startDate={startDate}
                endDate={endDate}
                error={error}
              />
            )}
          />
          <Flex flexDirection={'column'} justify={'center'}>
            <FormLabel fontWeight="bold">Data Final</FormLabel>
            <Controller
              name="dateFinish"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <DatePickerRequisitos
                  onBlur={onBlur}
                  showDateSelect
                  selectsEnd
                  onChange={date => {
                    onChange(date);
                    setEndDate((date as unknown) as Date);
                  }}
                  selected={value ? new Date(value) : null}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  error={error}
                />
              )}
            />
          </Flex>
        </Flex>
        <Flex flexDirection={'column'} justify={'center'}>
          <FormLabel fontWeight={'bold'}>Quantidade turnos por dia?</FormLabel>
          <Controller
            name="quantity_turnos"
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Flex
                flexDirection={'row'}
                align={'center'}
                //justify={'left'}
                gap={2}
              >
                <FaMinusCircle onClick={() => handleQuantityTurnosMinus()} />
                <Input
                  w={'60px'}
                  h={'30px'}
                  type="text"
                  value={`${quantityTurnos}`}
                  onChange={e => {
                    const newValue = Number(e.target.value);
                    setQuantityTurnos(newValue);
                    onChange(newValue);
                  }}
                  onBlur={onBlur}
                />
                <FaPlusCircle onClick={() => handleQuantityTurnosPlus()} />
              </Flex>
            )}
          />
        </Flex>
        <Flex>
          <Flex gap={2} flexDirection={'column'}>
            <Text>1° Turno</Text>
            <Flex
              flexDirection={'row'}
              align={'center'}
              justify={'center'}
              justifyContent={'space-between'}
              gap={2}
            >
              <Controller
                name={`turnos.${0}.initial` as const}
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Flex flexDirection={'column'}>
                      <FormLabel>Horário Inicial</FormLabel>
                      <DatePickerTime
                        onBlur={onBlur}
                        showTimeSelect
                        showTimeSelectOnly
                        onChange={date => {
                          onChange(date);
                        }}
                        selected={value}
                        error={error}
                      />
                    </Flex>
                  </>
                )}
              />
              <Controller
                name={`turnos.${0}.finished` as const}
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Flex flexDirection={'column'}>
                      <FormLabel>Horário Final</FormLabel>
                      <DatePickerTime
                        onBlur={onBlur}
                        showTimeSelect
                        showTimeSelectOnly
                        onChange={date => {
                          onChange(date);
                        }}
                        selected={value}
                        error={error}
                      />
                    </Flex>
                  </>
                )}
              />
            </Flex>
          </Flex>
        </Flex>
        {quantityTurnos > 1 && (
          <Flex flexDirection="column" justify="center">
            {Array.from({ length: quantityTurnos - 1 }, (_, index) => (
              <Flex gap={2} flexDirection="column">
                <Text>{index + 2}° Turno</Text>
                <Flex
                  flexDirection="row"
                  align="center"
                  justify="space-between"
                  gap={2}
                >
                  <Controller
                    name={`turnos.${index + 1}.initial` as const}
                    control={control}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Flex flexDirection={'column'}>
                          <FormLabel>Horário Inicial</FormLabel>
                          <DatePickerTime
                            onBlur={onBlur}
                            showTimeSelect
                            showTimeSelectOnly
                            onChange={date => {
                              onChange(date);
                            }}
                            selected={value as Date}
                            error={error}
                          />
                        </Flex>
                      </>
                    )}
                  />
                  <Controller
                    name={`turnos.${index + 1}.finished` as const}
                    control={control}
                    rules={{
                      required: 'Campo é obrigatório!',
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <Flex flexDirection={'column'}>
                          <FormLabel>Horário Final</FormLabel>
                          <DatePickerTime
                            onBlur={onBlur}
                            showTimeSelect
                            showTimeSelectOnly
                            onChange={date => {
                              onChange(date);
                            }}
                            selected={value as Date}
                            error={error}
                          />
                        </Flex>
                      </>
                    )}
                  />
                </Flex>
              </Flex>
            ))}
          </Flex>
        )}
        {/* {dateFinish.getTime() - dateFirst.getTime() > 1 && (
          <>
            <FormLabel fontWeight={'bold'}>Folga entre serviços</FormLabel>
            <Flex
              flexDirection={'row'}
              justify={'center'}
              align={'center'}
              justifyContent={'space-between'}
            >
              <Flex
                flexDirection={'row'}
                align={'center'}
                justify={'center'}
                gap={2}
              >
                <FormLabel>Serviços</FormLabel>
                <Controller
                  name="quantity_services"
                  control={control}
                  render={({ field }) => (
                    <Flex
                      flexDirection={'row'}
                      align={'center'}
                      justify={'center'}
                      gap={2}
                    >
                      <FaMinusCircle
                        onClick={() => {
                          handleQuantityServiceMinus();
                        }}
                      />
                      <Input
                        w={'60px'}
                        h={'30px'}
                        type="text"
                        value={`${quantityServices}`} // Use o valor do campo controlado
                        onChange={e => {
                          const newValue = Number(e.target.value);
                          setQuantityServices(newValue);
                          field.onChange(newValue);
                        }}
                      />
                      <FaPlusCircle
                        onClick={() => {
                          handleQuantityServicesPlus();
                        }}
                      />
                    </Flex>
                  )}
                />
              </Flex>
              <Flex
                flexDirection={'row'}
                align={'center'}
                justify={'center'}
                gap={2}
              >
                <FormLabel>Folgas</FormLabel>
                <Controller
                  name="quantity_folgas"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FaMinusCircle
                        onClick={() => {
                          handleQuantityfolgaMinus();
                        }}
                      />
                      <Input
                        w={'60px'}
                        h={'30px'}
                        type="text"
                        value={`${quantityFolga}`} // Use o valor do campo controlado
                        onChange={e => {
                          const newValue = Number(e.target.value);
                          setQuantityFolga(newValue);
                          field.onChange(newValue);
                        }}
                      />
                      <FaPlusCircle
                        onClick={() => {
                          handleQuantityFolgaPlus();
                        }}
                      />
                    </>
                  )}
                />
              </Flex>
            </Flex>
          </>
        )} */}
      </Flex>
    </FormControl>
  );
};
