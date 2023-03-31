import styled from 'styled-components';

interface InputContainerProps {
  $error: boolean;
}

export const Container = styled.div`
  flex: 1;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
`;

export const Label = styled.p`
  display: block;
  color: ${({ theme }) => theme.colors.gray_0};
  margin-bottom: 5px;
`;

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  min-height: 3.063em;
  background-color: #fff;
  border: 1px solid
    ${({ $error, theme }) => ($error ? theme.colors.red : theme.colors.gray_5)};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray_1};
  font-size: 14px;

  > .DayPickerInput {
    display: flex;
    align-items: center;
    padding: 0.375em;
    padding-left: 1.125em;

    > input {
      border: none;
      width: 100%;
      color: ${({ theme }) => theme.colors.gray_1};
    }
  }

  .DayPickerInput-OverlayWrapper {
    position: absolute;
  }

  .DayPickerInput-Overlay {
    border-radius: 8px !important;
  }

  .DayPicker {
    font-size: 0.88rem;

    &-Day {
      transition: all 0.2s;

      &--today {
        color: ${({ theme }) => theme.colors.gray_3};
      }

      &--selected:not(.DayPicker-Day--disabled) {
        color: ${({ theme }) => theme.colors.primary} !important;
        background-color: #fff !important;
      }
    }

    &:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background: ${({ theme }) => theme.colors.gray_6};
    }
  }
`;

export const Error = styled.div`
  min-height: 1.6em;
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.red};
`;
