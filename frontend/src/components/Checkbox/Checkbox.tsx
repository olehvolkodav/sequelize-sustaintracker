import React, { InputHTMLAttributes, useRef } from 'react';

import { UseFormMethods } from 'react-hook-form';

import { Checkbox as CheckboxIcon } from '../../assets/icons';

import { HiddenCheckbox, Label, StyledCheckbox } from './sCheckbox';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
  register?: UseFormMethods['register'];
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  register,
  children,
  ...rest
}) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  return (
    <Label className="Custom_Checkbox" $checked={isChecked}>
      <HiddenCheckbox
        ref={(e) => {
          if (register) register(e);
          checkboxRef.current = e;
        }}
        type="checkbox"
        defaultChecked={isChecked}
        onChange={onChange}
        {...rest}
      />
      <StyledCheckbox>
        <CheckboxIcon />
      </StyledCheckbox>
      {children}
    </Label>
  );
};

export default Checkbox;
