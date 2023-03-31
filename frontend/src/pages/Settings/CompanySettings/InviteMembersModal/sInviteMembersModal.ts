import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  > button {
    margin-top: auto;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const UserFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  > * + * {
    margin-left: 1em;
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
  align-self: baseline;

  > svg {
    margin-right: 1em;
  }
`;
