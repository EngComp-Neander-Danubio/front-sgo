import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Button,
  Checkbox,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { options } from '../../../types/typesMilitar';
import { DatePickerEvent } from '../formGrandeEvento/DatePickerEvent';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import AsyncSelectComponent from '../formEfetivo/AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import api from '../../../services/api';
import { AccordionCheckbox } from '../acordion-checkbox/AccordionCheckbox';
type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  opm_filha: opmSaPM[];
};
interface SolicitacaoForm {
  data_inicio: Date;
  data_final: Date;
  uni_codigo: number[];
  efetivo: number[];
  select_opm?: opmSaPM;
  input: string[];
}
export const FormSolicitacaoEfetivo: React.FC = () => {
  const toast = useToast();
  const { control, setValue, watch } = useFormContext<SolicitacaoForm>();
  const [dataGraCmd, setDataGraCmd] = useState<opmSaPM[]>([]);
  const [datasOpmFilhas, setDatasOpmFilhas] = useState<opmSaPM[]>([]);
  const methodsInput = useFormContext();
  const { getValues } = methodsInput;
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [checkboxStates, setCheckboxStates] = useState<number[]>([]);

  const handleDeleteAllOpmCancel = async () => {
    setDatasOpmFilhas([]);
    methodsInput.setValue('efetivo', []);
  };
  const rec_opm_to_input_values = async (opm: opmSaPM) => {
    if (!opm) return;
    if (opm.uni_codigo) {
      return opm;
    }
    if (opm.opm_filha && Array.isArray(opm.opm_filha)) {
      await Promise.all(
        opm.opm_filha.map(opm_filha => rec_opm_to_input_values(opm_filha)),
      );
    }
    return opm.uni_codigo;
  };

  /* useEffect(() => {
    const loadDefaultValues = async () => {
      const values = await Promise.all(
        datasOpmFilhas.map(item => rec_opm_to_default_values(item)),
      );
      console.log('values', values);
      const currentValues = methodsInput.watch('uni_codigo') || [];
      const uniqueValues = [
        ...new Set([...currentValues, ...values.filter(Boolean)]),
      ];
      methodsInput.setValue('uni_codigo', uniqueValues);
    };

    loadDefaultValues();
  }, []);
  const rec_opm_to_default_values = async (opm: opmSaPM) => {
    if (!opm) return;
    if (opm.uni_codigo) return opm.uni_codigo;
    if (opm.opm_filha && Array.isArray(opm.opm_filha)) {
      await Promise.all(
        opm.opm_filha.map(opm_filha => rec_opm_to_default_values(opm_filha)),
      );
    }
    return opm.uni_codigo;
  }; */
  /* useEffect(() => {
    datasOpmFilhas.map((item, index) => {
      const inputTotalValue = getValues('totalEfetivo');
      const currentValue = getValues(`efetivo.${index}`) ?? '';

      if (currentValue === undefined || currentValue === null) {
        methodsInput.setValue(`efetivo.${index}`, '');
        //console.log(`input.${index}`);
        //methodsInput.setValue(`checkbox.${index}`, true);
      } else if (currentValue === '') {
        //console.log(`input.${index}`);
        methodsInput.setValue(`efetivo.${index}`, inputTotalValue || '');
        //methodsInput.setValue(`checkbox.${index}`, true);
      }
      rec_opm_to_input_values(item);
    });
  }, [datasOpmFilhas, getValues, methodsInput.setValue]); */

  const handleLoadGrandeComandos = useCallback(async () => {
    try {
      const response = await api.get<opmSaPM[]>('/unidades');
      const dados = response.data.map(item => ({
        ...item,
        opm_filha: [],
      }));
      setDataGraCmd(dados);
    } catch (error) {
      console.error('Erro ao carregar as unidades principais:', error);
    }
  }, []);
  useEffect(() => {
    handleLoadGrandeComandos();
    handleDeleteAllOpmCancel();
  }, []);

  const handleLoadOpmFilhas = async (param: number) => {
    try {
      // funcionando ok
      const gra_cmd = datasOpmFilhas.find(o => o.uni_codigo === param);
      if (!gra_cmd) {
        const uni = dataGraCmd.find(o => o.uni_codigo === param);
        setDatasOpmFilhas(prev => [...prev, uni as opmSaPM]);
      }
    } catch (error) {
      console.error('Erro ao carregar as unidades:', error);
    }
  };

  const handleCheckboxChangeGrandeOPM = async (option: string) => {
    const dados = dataGraCmd.find(o => o.uni_sigla.includes(option));
    if (!dados) {
      throw new Error('Grande Comando não encontrado');
    }
    handleLoadOpmFilhas(dados.uni_codigo);
  };
  const handleCheckboxChange = async (checked: boolean, data: opmSaPM) => {
    const { uni_codigo, uni_sigla } = data;

    setCheckboxStates(prevStates =>
      checked
        ? [...prevStates, uni_codigo]
        : prevStates.filter(codigo => codigo !== uni_codigo),
    );

    if (checked) {
      await handleCheckboxChangeGrandeOPM(uni_sigla);
      setValue('uni_codigo', [...watch('uni_codigo'), uni_codigo]);
    } else {
      setDatasOpmFilhas(
        datasOpmFilhas.filter(o => o.uni_codigo !== uni_codigo),
      );
    }
  };
  const handleSelectOpm = async (data: opmSaPM) => {
    const dataExists = datasOpmFilhas.some(
      dataValue => dataValue.uni_codigo === data.uni_codigo,
    );
    if (dataExists) {
      toast({
        title: 'OPM já inclusa.',
        description: 'OPM já incluída.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    } else {
      toast({
        title: 'Sucesso!',
        description: 'OPM incluída.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  const loadOptions = async (
    inputValue: string,
  ): Promise<OptionsOrGroups<
    { label: string; value: string },
    GroupBase<{ label: string; value: string }>
  >> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredOptions = options.filter(option =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()),
        );

        resolve(filteredOptions);
        //setDataValue(filteredOptions);
      }, 1000);
    });
  };

  return (
    <FormControl
      //border={'1px solid green'}
      mb={4}
    >
      <Flex
        align="center"
        //justify="center"
        gap={2}
      >
        <Flex
          align={'center'}
          justify="center"
          flexDirection={'row'}
          gap={6}
          pb={2}
        >
          <Flex flexDirection="column" gap={1} w={'12vw'}>
            <FormLabel>Prazo Inicial</FormLabel>
            <Controller
              name="data_inicio"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
                  showPopperArrow={true}
                  selectsStart
                  onChange={date => {
                    field.onChange(date);
                    setStartDate(date as Date);
                  }}
                  selected={field.value ? new Date(field.value) : new Date()}
                  startDate={startDate}
                  endDate={endDate}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w={'12vw'}>
            <FormLabel>Prazo Final</FormLabel>
            <Controller
              name="data_final"
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
      <Divider />
      <Flex gap={4} h="50px">
        <Checkbox
          colorScheme="green"
          onChange={async e => {
            if (e.target.checked) {
              dataGraCmd.forEach(
                async data => await handleCheckboxChange(true, data),
              );
            } else {
              setDatasOpmFilhas([]);
              setCheckboxStates([]);
            }
          }}
        >
          Todos
        </Checkbox>
        {dataGraCmd.map(data => (
          <Checkbox
            key={data.uni_codigo}
            isChecked={checkboxStates.includes(data.uni_codigo)}
            onChange={async e =>
              await handleCheckboxChange(e.target.checked, data)
            }
            colorScheme="green"
          >
            {data.uni_sigla.includes('CMTE-GERAL') ? 'ADM' : data.uni_sigla}
          </Checkbox>
        ))}
      </Flex>
      <Divider />
      <Flex
        flexDirection="row"
        w="100%"
        h="50px"
        //mt={2}
        align="center"
        justify={'center'}
        justifyContent="space-between"
        gap={1}
      >
        <Flex
        //border={'1px solid red'}
        >
          <Text w={'7vw'}>Busca por OPM:</Text>
        </Flex>
        <Flex
          //border={'1px solid red'}
          w={'25vw'}
        >
          <Controller
            name="select_opm"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <AsyncSelectComponent
                  placeholder="Buscar por OPM"
                  nameLabel=""
                  onChange={field.onChange}
                  error={error}
                  //isOverwriting
                  loadOptions={loadOptions}
                  noOptionsMessage={'Nenhuma OPM encontrada'}
                />
              </>
            )}
          />
        </Flex>
        <Flex gap={1} align={'center'} justify={'center'}>
          <Flex
          //border={'1px solid red'}
          >
            <Button
              onClick={() => {
                handleDeleteAllOpmCancel();
                setCheckboxStates(Array(dataGraCmd.length).fill(false));
              }}
              colorScheme="blue"
              variant="outline"
            >
              Limpar
            </Button>
          </Flex>
          <Flex
          //border={'1px solid red'}
          >
            <Button
              onClick={async () => {
                const v = getValues('select_opm');
                if (v) await handleSelectOpm(v);
              }}
              bgColor="#38A169"
              _hover={{
                bgColor: 'green',
                cursor: 'pointer',
                transition: '.5s',
              }}
              color="#fff"
              variant="ghost"
            >
              Incluir
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Flex
        //border="1px solid rgba(0, 0, 0, 0.16)"
        borderRadius="5px"
        minH="60px"
        w={'full'}
        overflowX={'auto'}
        justifyContent={'space-between'}
      >
        <Flex justify={'center'} align={'center'}>
          <Flex flexDirection={'row'} align={'center'} justify={'center'}>
            <FormLabel w={'12vw'} flexWrap={'nowrap'} fontWeight={400}>
              Total Efetivo por OPM:
            </FormLabel>
            <Controller
              name={'totalEfetivo'}
              control={methodsInput.control}
              //defaultValue={methodsInput.formState.defaultValues}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <InputPatternController
                  type="text"
                  w={'400px'}
                  placeholder="Informe total efetivo"
                  onChange={e => {
                    onChange(e);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={error}
                />
              )}
            />
          </Flex>
        </Flex>
        <Flex
          //border={'1px solid red'}
          justify={'center'}
          align={'center'}
        >
          <Button
            onClick={async () => {
              methodsInput.setValue(
                'efetivo',
                datasOpmFilhas.map(() => {
                  //console.log('clicou em inserir');
                  methodsInput.watch('totalEfetivo');
                }),
              );
            }}
            bgColor=" #38A169"
            _hover={{
              bgColor: 'green',
              cursor: 'pointer',
              transition: '.5s',
            }}
            color="#fff"
            variant="ghost"
          >
            Inserir
          </Button>
        </Flex>
      </Flex>
      <Divider mt={2} />
      <Flex
        border="1px solid rgba(0, 0, 0, 0.16)"
        borderRadius="5px"
        //minH="60px"
        maxH={'30vh'}
        h={'60vh'}
        w={'full'}
        overflowX={'auto'}
        flexDirection={'column'}
        mt={4}
        p={2}
        gap={4}
      >
        <AccordionCheckbox
          opm={datasOpmFilhas}
          setDatasOpmFilhas={setDatasOpmFilhas}
          setCheckboxStates={setCheckboxStates}
          parentIndex={0}
          isInput
        />
      </Flex>
    </FormControl>
  );
};
