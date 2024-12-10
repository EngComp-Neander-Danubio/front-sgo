import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';

interface IInput extends InputProps {
  error?: FieldError | { message?: string };
  children?: React.ReactNode; // Define a prop children corretamente
}
export const InputPatternController: React.FC<IInput> = ({
  error,
  children, // Corrige para "children"
  ...props
}) => {
  return (
    <FormControl flexDirection={'column'} isInvalid={!!error}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          {/* <BiSearch color="gray.300" /> */}
          {children ?? null}
        </InputLeftElement>
        <Input type={props.type} placeholder={props.placeholder} {...props} />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </InputGroup>
    </FormControl>
  );
};
