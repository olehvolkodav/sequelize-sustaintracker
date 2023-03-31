import React, { useEffect, useState } from 'react';

import { DayPickerInputProps } from 'react-day-picker';
import DayPickerInputComponent from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Controller, UseFormMethods } from 'react-hook-form';

import { Container, Error, InputContainer, Label } from './sDayPickerInput';

interface InputProps extends DayPickerInputProps {
  name?: string;
  label?: string;
  placeholder?: string;
  control?: UseFormMethods['control'];
  setValue?: UseFormMethods['setValue'];
  errors?: UseFormMethods['errors'];
}

const DayPickerInput: React.FC<InputProps> = ({
  name = '',
  label,
  placeholder,
  control,
  setValue,
  errors,
  ...rest
}) => {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError((errors && errors[name]?.message) || '');
  }, [errors, name]);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputContainer $error={!!error}>
        <Controller
          name={name}
          control={control}
          render={() => (
            <DayPickerInputComponent
              placeholder={placeholder}
              onDayChange={(day: Date) =>
                setValue ? setValue(name, day) : null
              }
              keepFocus
              {...rest}
            />
          )}
        />
      </InputContainer>
      {errors && <Error>{error}</Error>}
    </Container>
  );
};

export default DayPickerInput;
