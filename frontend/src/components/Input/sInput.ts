import ReactSelect from 'react-select';
import styled, { css } from 'styled-components';

interface InputContainerProps {
  $isDisabled: boolean;
  $error: boolean;
}

interface SelectInputProps {
  $isDisabled: boolean;
  $error: boolean;
}

const containerCss = css`
  border: 1px solid ${(props) => props.theme.colors.gray_5};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.gray_5};
`;

const placeholder = css`
  color: ${(props) => props.theme.colors.gray_2};
`;

export const Container = styled.div`
  flex: 1;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.gray_0};
  margin-bottom: 5px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  border: none;
  color: ${({ theme }) => theme.colors.gray_1};

  &::placeholder {
    ${placeholder}
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  width: 100%;
  border: 1px solid
    ${({ $isDisabled, $error, theme }) =>
      $isDisabled
        ? `${theme.colors.gray_5} !important`
        : $error
        ? theme.colors.red
        : theme.colors.gray_5};
  border-radius: 8px;
  padding-left: 1.125em;
  min-height: 3.063em;
  padding: 0.375em;
  display: flex;
  align-items: center;
  background: ${({ $isDisabled, theme }) =>
    $isDisabled ? `${theme.colors.gray_6} !important` : '#fff'};
  transition-property: background, border;
  transition-duration: 0.1s, 0.1s;

  .icon_right {
    margin-right: 0.4em;
    width: 20px;
  }

  .clickable {
    cursor: pointer;
  }
`;

export const InputTag = styled.input`
  border: none;
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray_1};
  transition: background 0.1s;

  &:disabled {
    background: ${({ theme }) => `${theme.colors.gray_6} !important`};
  }
`;

export const PasswordVisibilityToggle = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  path,
  circle {
    stroke: ${({ theme }) => theme.colors.gray_1};
  }
`;

export const SelectInput = styled(ReactSelect)<SelectInputProps>`
  & .react-select__control {
    ${containerCss}
    border: 1px solid
      ${({ $isDisabled, $error, theme }) =>
      $isDisabled
        ? `${theme.colors.gray_5} !important`
        : $error
        ? theme.colors.red
        : theme.colors.gray_5};
    padding: 0.375em;
    min-height: 3.063em;

    background: ${({ $isDisabled, theme }) =>
      $isDisabled ? `${theme.colors.gray_6} !important` : '#fff'};
  }

  & .react-select__control--is-focused {
    ${containerCss}
    box-shadow: none;

    &:hover {
      ${containerCss}
    }
  }

  & .react-select__value-container {
    padding: 0;
    padding-left: 0.75em;
  }

  & .react-select__single-value {
    color: ${({ theme }) => theme.colors.gray_1};
  }

  & .react-select__placeholder {
    ${placeholder}
  }

  & .react-select__indicator-separator {
    display: none;
  }

  & .react-select__indicator {
    padding: 0;
    padding-right: 0.75em;

    svg {
      height: 1.2em;
      width: 1.2em;
    }
  }

  & .react-select__menu {
    border-radius: 8px;
  }

  & .react-select__option {
    color: ${({ theme }) => theme.colors.gray_2};
    padding-left: 1.125em;
    &:active {
      background-color: transparent;
    }
  }

  & .react-select__option--is-focused {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.gray_1};
  }

  & .react-select__option--is-selected {
    color: ${(props) => props.theme.colors.primary};
    background-color: transparent;
    font-weight: 600;
  }
`;

export const Error = styled.div`
  min-height: 1.6em;
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.red};
`;
