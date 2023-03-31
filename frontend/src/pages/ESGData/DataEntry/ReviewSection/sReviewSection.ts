import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface VerificationStatusProps {
  bgColor: string;
  color?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-start: 2;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5em;

  > button {
    margin-left: auto;
    width: 12em;
    height: 2em;
    background-color: ${({ theme }) => theme.colors.secondary_light};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) =>
        shade(0.2, theme.colors.secondary_light)};
    }
`;

export const VerificationStatusContainer = styled.div`
  width: 100%;
  padding-right: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const VerificationStatus = styled.div<VerificationStatusProps>`
  height: 1.688em;
  width: 10em;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 0.85em;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;

  > button {
    color: ${({ theme }) => theme.colors.primary};
    background: none;
    border: none;
    text-decoration: underline;
  }

  > button:first-child {
    margin-right: 1em;
  }

  > button:disabled {
    cursor: default;
    color: #c1c6c4;
  }
`;
