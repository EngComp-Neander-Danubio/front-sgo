import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Checkbox,
  Flex,
  Text,
  Divider,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useToast,
} from '@chakra-ui/react';
import { OptionType, SelectPattern } from './SelectPattern';
import React, { useEffect, useState } from 'react';
import {
  OPMs,
  options1CRPM,
  options2CRPM,
  options3CRPM,
  options4CRPM,
  optionsCPCHOQUE,
  optionsCPE,
  optionsCPRAIO,
  optionsDPGI,
  optionsEsp,
  optionsOPMs,
} from '../../../types/typesOPM';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { ModalFormAddMilitar } from './ModalFormAddMilitar';
import { FormEfetivo } from '../formEfetivo/FormEfetivo';
import { printValue } from 'yup';
import { FormEditarEfetivo } from '../formEfetivo/FormEditarEfetivo';
import { militarSchema } from '../../../types/yupMilitares/yupMilitares';
import { yupResolver } from '@hookform/resolvers/yup';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  opms: OPMs[];
  select_opm: OPMs;
}

export interface IForm {
  id?: string;
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}

export const ModalEditarSAPM: React.FC<IModal> = ({
  isOpen,
  onClose,
  select_opm,
}) => {
  const methodsInput = useForm<IForm>({
    resolver: yupResolver(militarSchema),
  });
  //const {militarById, updateMilitar } = useMilitares();

  const { setValue } = methodsInput;
  /* useEffect(() => {
    if (militarById) {
      setValue('matricula', militarById.matricula
      setValue('nome_completo', militarById?.nome_completo);
      setValue('posto_grad', new Date(militarById?.posto_grad));
      setValue('opm', new Date(militarById?.opm));
    }
  }, [militarById, setValue]); */
  const onSubmit = async (data: IForm) => {
    //await updateMilitar(data, militarById?.id);
    onClose();
  };
  const { control, reset, getValues } = useForm();
  const [selectedCheckbox, setSelectedCheckbox] = useState<
    'Todos' | 'especializadas' | 'POG' | 'Setores Administrativos' | null
  >(null);
  const [selectedCheckboxGrandeOPMs, setSelectedCheckboxGrandeOPMs] = useState<
    OPMOption
  >(null);
  const [opm, setOPM] = useState<OPMs[]>([]);
  const toast = useToast();
  const handleCheckboxChange = (
    option: 'Todos' | 'especializadas' | 'POG' | 'Setores Administrativos',
  ) => {
    setSelectedCheckbox(option);
  };
  type OPMOption =
    | 'cgo'
    | '1crpm'
    | '2crpm'
    | '3crpm'
    | '4crpm'
    | 'cpe'
    | 'bpre'
    | 'bptur'
    | 'bpma'
    | 'rpmont'
    | 'bpgep'
    | 'cpchoque'
    | 'cotam'
    | 'bope'
    | 'bepi'
    | 'bpchoque'
    | 'copac'
    | 'cpraio'
    | '1bpm'
    | '2bpm'
    | '3bpm'
    | '4bpm'
    | '5bpm'
    | '6bpm'
    | '7bpm'
    | '8bpm'
    | '9bpm'
    | '10bpm'
    | '11bpm'
    | '12bpm'
    | '13bpm'
    | '14bpm'
    | '15bpm'
    | '16bpm'
    | '17bpm'
    | '18bpm'
    | '19bpm'
    | '20bpm'
    | '21bpm'
    | '22bpm'
    | '23bpm'
    | '24bpm'
    | '25bpm'
    | 'bsp'
    | '1cpg'
    | '2cpg'
    | '3cpg'
    | 'dpgi'
    | 'cetic'
    | 'codip'
    | 'colog'
    | 'coafi'
    | 'cgp'
    | 'cpmce'
    | 'csas'
    | 'cogepro'
    | 'cogei'
    | 'cpraio'
    | '1bpraio'
    | '2bpraio'
    | '3bpraio'
    | '4bpraio'
    | '5bpraio'
    | 'qcg'
    | '1cpg'
    | '2cpg'
    | '3cpg'
    | 'ccs'
    | 'cbmpm'
    | 'bsp'
    | 'cpjm'
    | null;

  const handleCheckboxChangeGrandeOPM = (
    option:
      | '1crpm'
      | '2crpm'
      | '3crpm'
      | '4crpm'
      | 'cpchoque'
      | 'cpe'
      | 'cpraio',
  ) => {
    setSelectedCheckboxGrandeOPMs(option);
  };
  const handleCheckbox = (e: any, value: OptionType) => {
    if (e === true) {
      setOPM(prev => [
        ...prev,
        ...value.map(option => {
          return option.value;
        }),
      ]);
    } else {
      setOPM(prev =>
        prev.filter(option => !value.some(o => o.value === option)),
      );
    }
  };

  const handleSelectOpm = (option: OPMs) => {
    if (opm.find(o => o.valueOf() === option.valueOf())) {
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
      setOPM(prev => [...prev, option]);
    }

    console.log(opm);
  };

  const handleDeleteSelectAllOpm = () => {
    try {
      if (opm.length > 0) {
        setOPM([]);
        //reset();
        toast({
          title: 'Exclusão de OPMs.',
          description: 'OPMs excluída com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (err) {
      toast({
        title: 'Erro!',
        description: 'OPM não encontrada na lista.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  const handleDeleteOpm = (option: OPMs) => {
    if (opm.some(o => o === option)) {
      // Remove a OPM da lista
      const updatedOpm = opm.filter(o => o !== option);

      setOPM(updatedOpm);
      //reset();
      toast({
        title: 'Exclusão de OPMs.',
        description: 'OPM excluída com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Erro!',
        description: 'OPM não encontrada na lista.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="80vw" minW="30vw" maxH="80vh" minH="40vh">
          <ModalHeader>
            <Center>Editar OPM</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent="center" padding={4} gap={4}>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Adicionar em grupo</Tab>
                <Tab>Adicionar individual</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex gap={4} flexDirection="row" h="50px">
                    <Checkbox
                      size="md"
                      //isChecked={selectedCheckbox === 'Todos'}
                      onChange={() => handleCheckboxChange('Todos')}
                    >
                      Todos
                    </Checkbox>
                    <Controller
                      name="checkboxespecializadas"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          //isChecked={selectedCheckbox === 'especializadas'}
                          onChange={e => {
                            handleCheckboxChange('especializadas');

                            handleCheckbox(e.currentTarget.checked, optionsEsp);
                            //console.log('', opm);
                          }}
                        >
                          Especializadas
                        </Checkbox>
                      )}
                    />
                    <Checkbox
                      size="md"
                      //isChecked={selectedCheckbox === 'POG'}
                      onChange={() => handleCheckboxChange('POG')}
                    >
                      POG
                    </Checkbox>
                    <Controller
                      name="checkboxdgpi"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          /* isChecked={
                            selectedCheckbox === 'Setores Administrativos'
                          } */
                          onChange={e => {
                            handleCheckboxChange('Setores Administrativos');
                            handleCheckbox(
                              e.currentTarget.checked,
                              optionsDPGI,
                            );
                            //console.log('', opm);
                          }}
                        >
                          Setores Administrativos
                        </Checkbox>
                      )}
                    />
                  </Flex>

                  <Divider />
                  <Flex gap={4} h="50px">
                    <Controller
                      name="checkbox1crpm"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          //isChecked={selectedCheckboxGrandeOPMs === '1crpm'}
                          onChange={e => {
                            handleCheckboxChangeGrandeOPM('1crpm');
                            handleCheckbox(
                              e.currentTarget.checked,
                              options1CRPM,
                            );
                            //console.log('', opm);
                          }}
                        >
                          1° CRPM
                        </Checkbox>
                      )}
                    />
                    <Controller
                      name="checkbox2crpm"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          //isChecked={selectedCheckboxGrandeOPMs === '2crpm'}
                          onChange={e => {
                            handleCheckboxChangeGrandeOPM('2crpm');
                            handleCheckbox(
                              e.currentTarget.checked,
                              options2CRPM,
                            );
                          }}
                        >
                          2° CRPM
                        </Checkbox>
                      )}
                    />
                    <Controller
                      name="checkbox3crpm"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          //isChecked={selectedCheckboxGrandeOPMs === '3crpm'}
                          onChange={e => {
                            handleCheckboxChangeGrandeOPM('3crpm');
                            handleCheckbox(
                              e.currentTarget.checked,
                              options3CRPM,
                            );
                          }}
                        >
                          3° CRPM
                        </Checkbox>
                      )}
                    />
                    <Controller
                      name="checkbox4crpm"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          //isChecked={selectedCheckboxGrandeOPMs === '4crpm'}
                          onChange={e => {
                            handleCheckboxChangeGrandeOPM('4crpm');
                            handleCheckbox(
                              e.currentTarget.checked,
                              options4CRPM,
                            );
                          }}
                        >
                          4° CRPM
                        </Checkbox>
                      )}
                    />
                    <Controller
                      name="checkboxcpchoque"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          onChange={e => {
                            handleCheckboxChangeGrandeOPM('4crpm');
                            handleCheckbox(
                              e.currentTarget.checked,
                              optionsCPCHOQUE,
                            );
                          }}
                        >
                          CPCHOQUE
                        </Checkbox>
                      )}
                    />
                    <Controller
                      name="checkboxcpraio"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          onChange={e => {
                            handleCheckboxChangeGrandeOPM('cpraio');
                            handleCheckbox(
                              e.currentTarget.checked,
                              optionsCPRAIO,
                            );
                          }}
                        >
                          CPRAIO
                        </Checkbox>
                      )}
                    />
                    <Controller
                      name="checkboxcpe"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Checkbox
                          size="md"
                          onChange={e => {
                            handleCheckboxChangeGrandeOPM('cpe');
                            handleCheckbox(e.currentTarget.checked, optionsCPE);
                          }}
                        >
                          CPE
                        </Checkbox>
                      )}
                    />
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
                          render={({ field: { onChange, onBlur } }) => (
                            <SelectPattern
                              onChange={value => {
                                onChange(value);
                                //handleSelectOpm((value as unknown) as OPMs);
                              }}
                              onBlur={onBlur}
                              w="30vw"
                              options={optionsOPMs}
                            />
                          )}
                        />
                      </Flex>
                      <Flex
                      //border={'1px solid red'}
                      >
                        <Controller
                          name="button_apagar"
                          control={control}
                          render={({ field: { onChange, onBlur } }) => (
                            <Button
                              onClick={value => {
                                const v = getValues('select_opm');
                                onChange(value);
                                handleDeleteSelectAllOpm();
                              }}
                              colorScheme="blue"
                              variant="outline"
                              //color={'#fff'}
                              onBlur={onBlur}
                            >
                              Limpar
                            </Button>
                          )}
                        />
                      </Flex>
                      <Flex
                      //border={'1px solid red'}
                      >
                        <Controller
                          name="button"
                          control={control}
                          render={({ field: { onChange, onBlur } }) => (
                            <Button
                              onClick={value => {
                                const v = getValues('select_opm');
                                onChange(value);
                                if (v !== undefined || v !== null || v !== '')
                                  handleSelectOpm((v as unknown) as OPMs);
                              }}
                              bgColor=" #38A169"
                              color={'#fff'}
                              onBlur={onBlur}
                              variant="ghost"
                            >
                              Incluir
                            </Button>
                          )}
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                  <Divider />

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
                    {opm.length > 0 &&
                      opm.map((item, index) => {
                        // Encontrar o rótulo correspondente usando o valor do item
                        const option = optionsOPMs.find(
                          op => op.value === item.valueOf(),
                        );

                        return (
                          <Flex key={index}>
                            <Controller
                              name={`checkbox-${index}`}
                              control={control}
                              render={({ field: { onBlur } }) => (
                                <>
                                  <Checkbox
                                    size="md"
                                    isChecked
                                    onBlur={onBlur}
                                    onChange={() => handleDeleteOpm(item)}
                                  >
                                    {option?.label || 'Item não encontrado'}
                                  </Checkbox>
                                </>
                              )}
                            />
                          </Flex>
                        );
                      })}
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <FormProvider {...methodsInput}>
                    <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
                      <FormEditarEfetivo />
                    </form>
                  </FormProvider>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="ghost"
              bgColor=" #38A169"
              _hover={{
                bgColor: 'green',
                cursor: 'pointer',
                transition: '.5s',
              }}
              color="#fff"
              type="submit"
              onClick={reset}
            >
              Importar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
