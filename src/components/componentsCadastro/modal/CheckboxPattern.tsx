import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { OptionType } from '../../../types/typesOPM';
import React from 'react';

interface ICheckbox extends CheckboxProps {
  labelCheckbox: string;
  optionsOPMs: any[];
  handleCheckboxChange?: (label: string) => void;
  handleCheckboxChangeGrandeOPM?: (label: string) => void;
  handleCheckbox: (checked: boolean, value: OptionType[]) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBoxPattern: React.FC<ICheckbox> = ({
  handleCheckbox,
  handleCheckboxChange,
  handleCheckboxChangeGrandeOPM,
  labelCheckbox,
  optionsOPMs,
  onChange,
}) => {
  return (
    <Checkbox
      size="md"
      onChange={e => {
        if (handleCheckboxChange) handleCheckboxChange;
        else if (handleCheckboxChangeGrandeOPM)
          handleCheckboxChangeGrandeOPM(labelCheckbox);
        handleCheckbox(e.currentTarget.checked, optionsOPMs);

        if (onChange) {
          onChange(e);
        }
      }}
      colorScheme="green"
    >
      {labelCheckbox}
    </Checkbox>
  );
};
