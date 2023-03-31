import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary_background};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1em;
  min-height: 100vh;

  > svg {
    width: 400px;
  }
`;

export const Content = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CancelButton = styled.div`
  cursor: pointer;
  border: none;
  background: none;
  text-size: 1rem;
  text-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  margin-left: auto;
  margin-bottom: 0.4em;
`;

export const Card = styled.div`
  width: 100%;
  background: #fff;
  padding: 0 4em;
  margin-bottom: 3em;
`;
