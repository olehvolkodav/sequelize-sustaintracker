import styled, { css } from 'styled-components';

import Button from '../../../components/Button/Button';

interface SectionItemProps {
  $isSelected: boolean;
}

interface AccessActionCellProps {
  color: string;
}

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;
`;

export const Title = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
`;

export const SaveButton = styled(Button)`
  margin-left: auto;
  width: 14.6em;
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 2.5em;
  background-color: ${({ theme }) => theme.colors.gray_5};
`;

export const SectionSelector = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.875em;

  & > * + * {
    margin-left: 5em;
  }
`;

export const SectionItem = styled.div<SectionItemProps>`
  cursor: pointer;
  font-weight: 700;
  font-size: 1.125rem;

  &:hover {
    border-bottom: 4px solid ${({ theme }) => theme.colors.gray_5};
  }

  ${(props) =>
    props.$isSelected &&
    css`
      border-bottom: 4px solid ${props.theme.colors.primary} !important;
    `}
  padding-bottom: 0.438em;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 3.125em 26% 0 26%;
  width: 100%;
  align-items: center;

  > div {
    width: 100%;
  }
`;

export const HiddenSubmit = styled.button`
  display: none;
`;

export const TableContainer = styled.div`
  padding: 30px 5% 30px 5%;
  height: calc(100vh - 80px - 30px - 85px - 110px);

  > div:first-child {
    height: 100%;
  }
`;

export const AddMembersContainer = styled.div`
  margin-top: 1.125em;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: min-content;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  > svg {
    margin-right: 1em;
  }
`;

export const AccessActionCell = styled.div<AccessActionCellProps>`
  color: ${({ color }) => color};
  text-decoration: underline;
  width: fit-content;
  cursor: pointer;
`;
