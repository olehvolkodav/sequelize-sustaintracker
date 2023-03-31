import React, { InputHTMLAttributes, useMemo, useState } from 'react';

import { UseFormMethods } from 'react-hook-form';

import { Radio } from '../../assets/icons';

import {
  Container,
  HiddenRadio,
  Label,
  StyledRadio,
} from './sRadioButtonGroup';

interface Option {
  value: string;
  label: string;
}

interface RadioButtonGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  options: Option[];
  defaultOption?: string;
  register?: UseFormMethods['register'];
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name = '',
  options,
  defaultOption,
  register,
}) => {
  const defaultChecked = useMemo(
    () =>
      defaultOption
        ? options.indexOf(
            options.find((option) => option.value === defaultOption) as Option
          )
        : null,
    [options, defaultOption]
  );

  const [checked, setChecked] = useState<number | null>(defaultChecked);

  return (
    <Container>
      {options.map((option, idx) => (
        <Label
          key={option.value}
          $checked={checked === idx}
          onClick={() => setChecked(idx)}
          className="radio-button-group_label"
        >
          <HiddenRadio
            type="radio"
            name={name}
            value={option.value}
            ref={register}
          />
          <StyledRadio>
            <Radio />
          </StyledRadio>
          {option.label}
        </Label>
      ))}
    </Container>
  );
};

export default RadioButtonGroup;
