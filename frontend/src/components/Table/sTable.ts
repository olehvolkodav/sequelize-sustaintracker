import styled, { css } from 'styled-components';

interface HeaderCellProps {
  width?: string;
  $highlight?: boolean;
}

interface RowCellProps {
  width?: string;
  $highlight?: boolean;
  align?: string;
}

interface HeaderCellContentProps {
  $isSortable?: boolean;
  align?: string;
}

interface HeaderCellSortIconsContainerProps {
  sorted?: 'asc' | 'desc' | false;
}

export const Container = styled.div`
  font-size: 14px;
  text-align: left;

  overflow: auto;
  height: inherit;
  width: 100%;

  box-shadow: 0px 0px 12px 0px #0000001a;
  border-radius: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background-color: #e3e3e3;
    position: sticky;
    top: 0;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th,
  td {
    padding: 0.685em 0 0.685em 1em;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: -1em;
`;

export const HeaderRow = styled.tr`
  color: #000;
  font-weight: 700;
`;

export const HeaderCell = styled.th<HeaderCellProps>`
  width: ${(props) => props.width || 'fit-content'};
  ${({ $highlight }) =>
    $highlight &&
    css`
      background: rgba(189, 189, 189, 0.3);
    `}
`;

export const HeaderCellWrapper = styled.div`
  position: relative;
  margin: 0;
  display: block;
  width: 100%;
`;

export const HeaderCellContent = styled.div<HeaderCellContentProps>`
  cursor: ${({ $isSortable }) => ($isSortable ? 'pointer' : 'default')};
  display: flex;
  flex-direction: row;
  align-items: center;

  > span {
    width: ${({ $isSortable }) => !$isSortable && '100%'};
    margin-right: 1em;
    text-align: ${({ align }) => align};
  }
`;

export const HeaderCellSortIconsContainer = styled.div<HeaderCellSortIconsContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 28px;
  margin-left: 6px;

  > svg {
    width: 13px;
    height: 15px;
  }

  ${({ sorted, theme }) => {
    if (sorted === 'asc')
      return css`
        > svg + svg path {
          stroke: ${theme.colors.gray_3};
        }
      `;
    if (sorted === 'desc')
      return css`
        > svg:first-of-type path {
          stroke: ${theme.colors.gray_3};
        }
      `;
    return null;
  }}

  > svg + svg {
    margin-left: -3px;
  }
`;

export const Body = styled.tbody`
  height: 3.375em;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Row = styled.tr`
  font-weight: 400;
  background-color: #fff;
`;

export const RowCell = styled.td<RowCellProps>`
  width: ${(props) => props.width || 'fit-content'};
  ${({ $highlight }) =>
    $highlight &&
    css`
      background: rgba(189, 189, 189, 0.3);
      font-weight: 700;
    `}

  > span {
    display: block;
    width: 100%;
    padding-right: 1em;
    text-align: ${({ align }) => align};
  }
`;
