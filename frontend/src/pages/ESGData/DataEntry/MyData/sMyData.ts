import styled, { css } from 'styled-components';

interface StatusBarProps {
  color: string;
  width: string;
}

interface VerificationStatusProps {
  bgColor: string;
  color?: string;
}

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;

  > * + * {
    margin-top: 2em;
  }
`;

export const Title = styled.div`
  font-size: 1.6rem;
`;

export const StatusBar = styled.div<StatusBarProps>`
  background-color: #e8e8e8;
  height: 0.5em;
  border-radius: 0.5em;
  margin-right: 1em;

  > div {
    height: 100%;
    border-radius: 0.5em;
    background-color: ${({ color }) => color};
    width: ${({ width }) => width};
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
  align-items: center;
  padding-right: 1.6em;

  > *,
  button,
  svg {
    width: 1.2em;
    height: 1.2em;
  }

  > * + * {
    margin-left: auto;
  }

  button:disabled {
    cursor: default;

    > svg:not(.stroke) path {
      fill: #c1c6c4;
    }

    > svg.stroke path {
      stroke: #c1c6c4;
    }
  }
`;

export const ActionButton = styled.button`
  border: none;
  background: none;

  > svg path {
    transition: fill 0.1s;
  }

  &:hover {
    > svg:not(.stroke) path {
      fill: ${({ theme }) => theme.colors.primary};
    }

    > svg.stroke path {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }
`;
