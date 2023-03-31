import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Controller, UseFormMethods } from 'react-hook-form';

import { Close, Eye, EyeCrossed, Search } from '../../assets/icons';
import { resolvePath } from '../../utils/object';

import {
  Container,
  Error,
  InputContainer,
  InputTag,
  Label,
  PasswordVisibilityToggle,
  SelectInput,
  TextArea,
} from './sInput';

// options for the select inputs
interface Option {
  value: string;
  label: string;
}

// if the input belongs to a field array this info
// is needed to retrieve the error from the errors
// object
interface FieldArrayInfo {
  fieldArrayName: string;
  index: number;
  name: string;
  defaultValue?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType?: 'select' | 'textarea' | 'search';
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  options?: Option[];
  selectDefaultValue?: Option | null;
  register?: UseFormMethods['register'];
  control?: UseFormMethods['control'];
  value?: string;
  setSelectValue?: UseFormMethods['setValue'];
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  errors?: UseFormMethods['errors'];
  isDisabled?: boolean;
  rows?: number;
  isPasswordInput?: boolean;
  fieldArrayInfo?: FieldArrayInfo;
  isClearable?: boolean;
  focus?: boolean;
}

const Input: React.FC<InputProps> = ({
  name = '',
  inputType,
  options,
  label,
  placeholder,
  defaultValue,
  selectDefaultValue,
  register,
  control,
  value,
  setSelectValue,
  setValue,
  errors,
  isDisabled,
  rows,
  isPasswordInput,
  fieldArrayInfo,
  isClearable,
  focus,
  ...rest
}) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(!isPasswordInput);
  const [error, setError] = useState<string>('');
  const [showClearIcon, setShowClearIcon] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setError(() => {
      if (isDisabled) return '';
      if (errors && fieldArrayInfo) {
        const { fieldArrayName, index, name: inputName } = fieldArrayInfo;
        const errorProperty = resolvePath(
          errors,
          `${fieldArrayName}[${index}].${inputName}.message`
        );
        return errorProperty || '';
      }
      return errors ? errors[name]?.message : '';
    });
  }, [isDisabled, errors, name, fieldArrayInfo]);

  const handleSelectOnChange = useCallback(
    (option: unknown) => {
      if (setSelectValue) {
        if (option === null) setSelectValue(name, null);
        else setSelectValue(name, (option as Option).value);
      }
    },
    [setSelectValue, name]
  );

  const handleVisibility = useCallback(() => {
    setPasswordVisibility((state) => !state);
  }, []);

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.type = isPasswordVisible ? 'text' : 'password';
  }, [isPasswordVisible]);

  useEffect(() => {
    if (isClearable && value === '') setShowClearIcon(false);
  }, [isClearable, value]);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const renderInput = useMemo(() => {
    switch (inputType) {
      case 'select':
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={fieldArrayInfo?.defaultValue}
            render={({ value }) => (
              <SelectInput
                classNamePrefix="react-select"
                placeholder={placeholder}
                defaultValue={selectDefaultValue}
                options={options}
                value={!value ? null : value?.value}
                onChange={handleSelectOnChange}
                isDisabled={isDisabled}
                $isDisabled={!!isDisabled}
                $error={!!error}
                isClearable={isClearable}
              />
            )}
          />
        );

      case 'textarea':
        return (
          <TextArea
            name={name}
            ref={register}
            placeholder={placeholder}
            rows={rows}
            defaultValue={defaultValue}
          />
        );

      case 'search':
      default:
        return (
          <InputContainer
            className="Input_Container"
            $isDisabled={!!isDisabled}
            $error={!!error}
          >
            <InputTag
              {...rest}
              defaultValue={defaultValue}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => {
                if (setValue) setValue(e.target.value);
                if (isClearable) {
                  setShowClearIcon(e.target.value !== '');
                }
              }}
              ref={(e) => {
                if (register) register(e);
                inputRef.current = e;
              }}
              disabled={isDisabled}
            />
            {isPasswordInput && (
              <PasswordVisibilityToggle onClick={handleVisibility}>
                {isPasswordVisible ? <Eye /> : <EyeCrossed />}
              </PasswordVisibilityToggle>
            )}
            {showClearIcon && (
              <Close
                className="icon_right clickable"
                onClick={() => setValue && setValue('')}
              />
            )}
            {inputType === 'search' && !showClearIcon && (
              <Search className="icon_right" />
            )}
          </InputContainer>
        );
    }
  }, [
    control,
    defaultValue,
    error,
    fieldArrayInfo?.defaultValue,
    handleSelectOnChange,
    handleVisibility,
    inputType,
    isClearable,
    isDisabled,
    isPasswordInput,
    isPasswordVisible,
    name,
    options,
    placeholder,
    register,
    rest,
    rows,
    selectDefaultValue,
    setValue,
    showClearIcon,
    value,
  ]);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      {renderInput}
      {errors && <Error>{error}</Error>}
    </Container>
  );
};

export default Input;
