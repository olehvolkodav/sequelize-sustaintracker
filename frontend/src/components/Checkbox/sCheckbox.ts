import styled from 'styled-components';

interface LabelProps {
  $checked: boolean;
}

export const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 0.6em;
`;

export const Label = styled.label<LabelProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;

  > ${StyledCheckbox} {
    border: ${({ $checked }) => ($checked ? '0' : '2px')} solid
      ${({ theme }) => theme.colors.gray_5};

    svg {
      transition: all 0.1s;
      opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    }
  }

  &:hover {
    > ${StyledCheckbox} {
      border: ${({ $checked, theme }) =>
        !$checked && `2px solid ${theme.colors.gray_3}`};
    }
  }
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;
