import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Controller, UseFormMethods } from 'react-hook-form';

import { Container, InputItem } from './sSplitInput';

interface SplitInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputNum: number;
  control?: UseFormMethods['control'];
  setValue?: UseFormMethods['setValue'];
}

const SplitInput: React.FC<SplitInputProps> = ({
  name = '',
  inputNum,
  control,
  setValue,
}) => {
  const [values, setValues] = useState<string[]>(() => {
    const state = [];
    for (let i = 0; i < inputNum; i += 1) {
      state.push('');
    }
    return state;
  });
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Sets the value of the focused input and moves focus to the next one
  // (only if the input is valid, in this case a number).
  // Pressing backspace deletes the current input or, if the current one
  // is empty, the previous one.
  const handleOnKeyDown = useCallback(
    (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (values[i].length) {
          setValues((state) => state.map((val, idx) => (i === idx ? '' : val)));
        } else if (i > 0) {
          setValues((state) =>
            state.map((val, idx) => (i === idx + 1 ? '' : val))
          );
          refs.current[i]?.blur();
          refs.current[i - 1]?.focus();
        }
      }

      const value = e.key.replace(/[^0-9]/g, '');
      if (value.length) {
        setValues((state) =>
          state.map((val, idx) => (i === idx ? value : val))
        );
        if (i < refs.current.length - 1) {
          refs.current[i]?.blur();
          refs.current[i + 1]?.focus();
        }
      }
    },
    [values]
  );

  const inputs = useMemo(() => {
    const result = [];
    for (let i = 0; i < inputNum; i += 1) {
      result.push(i);
    }
    return result;
  }, [inputNum]);

  useEffect(() => {
    if (refs.current[0]) refs.current[0].focus();
  }, []);

  useEffect(
    () => setValue && setValue(name, values.join('')),
    [name, setValue, values]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <Container>
          {inputs.map((idx) => (
            <InputItem
              key={idx}
              maxLength={1}
              value={values[idx]}
              onKeyDown={(e) => handleOnKeyDown(idx, e)}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={() => {}} // just to remove the warning
              ref={(ref) => {
                refs.current[idx] = ref;
              }}
            />
          ))}
        </Container>
      )}
    />
  );
};

export default SplitInput;
