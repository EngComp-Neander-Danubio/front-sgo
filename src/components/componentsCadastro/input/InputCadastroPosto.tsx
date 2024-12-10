import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
} from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';
interface IInput extends InputProps {
  label: string;
  name: string;
  control: Control;
  type: string;
}
export const InputCadastoPosto: React.FC<IInput> = ({
  label,
  name,
  control,
  type,
}) => {
  return (
    <InputGroup>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={`${type}`}
              // aria-invalid={errors.name ? 'true' : 'false'}
              placeholder={`Informe seus dados de ${name}`}
            />
          )}
        />
      </FormControl>
    </InputGroup>
  );
};
