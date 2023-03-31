import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: min-content;

  > * + * {
    margin-left: 25px;
  }
`;

export const InputItem = styled.input`
  width: 70px;
  height: 90px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-radius: 8px;
  font-size: 40px;
  font-weight: 700px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;
