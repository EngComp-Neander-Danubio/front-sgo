import { Button, Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { InputBuscaFicha } from '../inputs/inputBusca';
import { InputCSVpapparse } from '../../../componentsCadastro/inputCSVpapaparse/InputCSVpapaparse';
import { BiPencil } from 'react-icons/bi';
import { HiPencil } from 'react-icons/hi';
import { FiSave } from 'react-icons/fi';
interface IFunction {
  openModalAdd?: () => void;
  openModalSend?: () => void;
  handleClick: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: React.FormEvent) => void;
  loadData?: (data: any) => Promise<void>;
}
export const DashButtons: React.FC<IFunction> = ({
  openModalAdd,
  handleClick,
  handleOnChange,
  handleOnSubmit,
  loadData,
}) => {
  return (
    <>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        align={'center'}
        //w={'83vw'}
        w={'100%'}
        //border={'1px solid red'}
        justify={'center'}
      >
        <InputBuscaFicha />
        <Flex gap={2} align={'center'} justify={'center'}>
          {/* <IconeCadastrarSol onOpen={openModalAdd} /> */}
          <Flex flexDirection={'column'}>
            <Tooltip
              //label={`Campos essencias: Local, Rua, Número, Bairro, Cidade, Modalidade`}
              aria-label="A tooltip"
              placement="top"
              borderRadius={'5px'}
            >
              <span>
                <InputCSVpapparse
                  nameInput="postoInput"
                  handleClick={handleClick}
                  handleOnChange={handleOnChange}
                  handleOnSubmit={handleOnSubmit}
                />
              </span>
            </Tooltip>
          </Flex>
          <Button
            color={'white'}
            rightIcon={<HiPencil size={'16px'} />}
            bgColor="#50a1f8"
            //bgColor="#3182CE"
            _hover={{
              bgColor: '#1071cc',
              cursor: 'pointer',
              transition: '.5s',
            }}
            variant="ghost"
            onClick={openModalAdd}
          >
            Adicionar Individual
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
            onClick={loadData}
            rightIcon={<FiSave color="#fff" size="20px" />}
            w={200}
          >
            Salvar
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
