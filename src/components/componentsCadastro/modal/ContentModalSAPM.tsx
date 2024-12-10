import {
  Flex,
  Text,
  FormControl,
  Button,
  Checkbox,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { optionsOPMs } from '../../../types/typesOPM';
import { SelectPattern } from './SelectPattern';
import { AccordionCheckbox } from '../acordion-checkbox/AccordionCheckbox';
import { columnsMapMilitar } from '../../../types/typesMilitar';
import { useSolicitacoesOPMPMs } from '../../../context/solicitacoesOPMPMsContext/useSolicitacoesOPMPMs';
import { TableSolicitacoes } from '../table-solicitacoes';
import { Pagination } from '../pagination/Pagination';
import { useCallback, useEffect, useState } from 'react';
import api from '../../../services/api';
import { FormEfetivoBySearch } from '../formEfetivo/FormEfetivoBySearch';

interface SolicitacaoForm {
  dataInicio: Date;
  dataFinal: Date;
  uni_codigo: number[];
  select_opm?: opmSaPM;
  operacao_id?: string;
}
type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  opm_filha: opmSaPM[];
};
export const ContentModalSAPM: React.FC = () => {
  const { control, getValues, setValue, watch } = useFormContext<
    SolicitacaoForm
  >();
  const [dataGraCmd, setDataGraCmd] = useState<opmSaPM[]>([]);
  const [datasOpmFilhas, setDatasOpmFilhas] = useState<opmSaPM[]>([]);
  const [checkboxStates, setCheckboxStates] = useState<number[]>([]);
  const handleDeleteAllOpmCancel = async () => {
    setDatasOpmFilhas([]);
  };
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
  const {
    pms,
    firstDataIndex,
    lastDataIndex,
    loadLessSolicitacoesOPMPMs,
    loadMoreSolicitacoesOPMPMs,
    totalData,
    dataPerPage,
    deletePMByOPM,
  } = useSolicitacoesOPMPMs();

  const transformedMiltitares = pms.map(militar => {
    const transformedMilitar: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
      transformedMilitar[newKey] = militar[originalKey];
    });
    return transformedMilitar;
  });
  return (
    <FormControl>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Adicionar em grupo</Tab>
          <Tab>Adicionar individual</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
                  {data.uni_sigla.includes('CMTE-GERAL')
                    ? 'ADM'
                    : data.uni_sigla}
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
            >
              <Flex
              //border={'1px solid red'}
              >
                <Text w={'7vw'}>Busca por OPM:</Text>
              </Flex>
              <Flex gap={1}>
                <Flex
                //border={'1px solid red'}
                >
                  <Controller
                    name="select_opm"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, ref },
                      fieldState: { error },
                    }) => {
                      return (
                        <SelectPattern
                          onChange={value => {
                            onChange(value);
                            // handleSelectOpm(value as OPMs);
                          }}
                          onBlur={onBlur}
                          w="30vw"
                          options={optionsOPMs}
                          error={error}
                        />
                      );
                    }}
                  />
                </Flex>
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
                    onClick={() => {
                      const v = getValues('select_opm');
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
              border="1px solid rgba(0, 0, 0, 0.16)"
              borderRadius="5px"
              minH="60px"
              maxH={'20vh'}
              w={'full'}
              overflowX={'auto'}
              //h={'60vh'}
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
                isInput={false}
              />
            </Flex>
            <Flex
              border="1px solid rgba(0, 0, 0, 0.16)"
              borderRadius="5px"
              minH="200px"
              w={'full'}
              overflowX={'auto'}
              mt={4}
              p={2}
              gap={4}
            >
              {/* tabela */}
              <Flex mt={2} flexDirection={'column'} w={'100%'}>
                <TableSolicitacoes
                  isActions
                  isOpen={true}
                  isView={true}
                  columns={[
                    'Matrícula',
                    'Posto/Graduação',
                    'Nome Completo',
                    'Unidade',
                  ]}
                  registers={transformedMiltitares}
                  //registers={handleSortByPostoGrad(transformedMiltitares, '1')}
                  label_tooltip="Militar"
                  height={'32vh'}
                  handleDelete={deletePMByOPM}
                />
                <Pagination
                  totalPages={totalData}
                  dataPerPage={dataPerPage}
                  firstDataIndex={firstDataIndex}
                  lastDataIndex={lastDataIndex}
                  loadLess={loadLessSolicitacoesOPMPMs}
                  loadMore={loadMoreSolicitacoesOPMPMs}
                />
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            {/* <FormEditarEfetivo /> */}

            <FormEfetivoBySearch />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormControl>
  );
};
