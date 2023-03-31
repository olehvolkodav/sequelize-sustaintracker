import styled from 'styled-components';

interface LabelProps {
  $checked: boolean;
}

export const Container = styled.fieldset`
  border: none;
  margin-bottom: 1.6em;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  font-weight: 400;

  > label {
    margin-right: 1em;
  }

  > label + label {
    margin-left: 4em;
  }
`;

export const StyledRadio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 0.6em;
`;

export const Label = styled.label<LabelProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  > ${StyledRadio} {
    border: ${({ $checked }) => ($checked ? '0' : '2px')} solid
      ${({ theme }) => theme.colors.gray_5};

    svg {
      width: 14px;
      height: 14px;
      transition: all 0.1s;
      opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    }
  }

  &:hover {
    > ${StyledRadio} {
      border: ${({ $checked, theme }) =>
        !$checked && `2px solid ${theme.colors.gray_3}`};
    }
  }
`;

export const HiddenRadio = styled.input`
  display: none;
`;
