import styled, { css } from 'styled-components';

interface ContainerProps {
  gridConfig?: {
    rStart?: number;
    rEnd?: number;
    cStart?: number;
    cEnd?: number;
  };
}

export const Container = styled.div<ContainerProps>`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px #0000001a;

  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  padding: 1.273em;

  ${(props) =>
    props.gridConfig?.rStart &&
    css`
      grid-row-start: ${props.gridConfig.rStart};
    `}

  ${(props) =>
    props.gridConfig?.rEnd &&
    css`
      grid-row-end: ${props.gridConfig.rEnd};
    `}

  ${(props) =>
    props.gridConfig?.cStart &&
    css`
      grid-column-start: ${props.gridConfig.cStart};
    `}

  ${(props) =>
    props.gridConfig?.cEnd &&
    css`
      grid-column-end: ${props.gridConfig.cEnd};
    `}
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.318em;
`;
