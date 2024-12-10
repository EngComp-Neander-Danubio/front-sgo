import React, { ChangeEvent, FormEvent, useRef } from 'react';
import { Button, Flex, Input, InputProps } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

interface IInput extends InputProps {
  nameInput: string;
  handleClick: () => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: FormEvent) => void;
}
export const InputCSVpapparse: React.FC<IInput> = ({
  //handleClick,
  handleOnChange,
  //handleOnSubmit,
  nameInput,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Flex flexDirection={'row'} gap={2}>
      <input
        type="file"
        accept=".csv"
        id={`${nameInput}`}
        onChange={async e => handleOnChange(e)}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <Input
        as={Button}
        rightIcon={<CiSearch size={'16px'} />}
        placeholder={'Your file ...'}
        onClick={() => inputRef.current?.click()}
        value={inputRef.current?.value}
        colorScheme="blue"
        style={{ borderColor: '#2b6cb0' }}
        variant="outline"
        color={'#2b6cb0'}
        _hover={{ backgroundColor: '#ebf8ff' }}
      >
        Carregar Planilha
      </Input>

      {/* <Button
        rightIcon={<CiSearch size={'16px'} />}
        colorScheme="blue"
        variant="outline"
        onClick={handle}
      >
        Buscar Planilha
      </Button> */}
      {/*  <Button
        type="button"
        rightIcon={<BiUpload size={'16px'} />}
        colorScheme="blue"
        variant="outline"
        onClick={async (e: FormEvent) => {
          await handleOnSubmit(e);
        }} // Usando onClick para submissão
      >
        Carregar Planilha
      </Button> */}
    </Flex>
  );
};
