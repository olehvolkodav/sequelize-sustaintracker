import styled from 'styled-components';

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;
`;

export const Title = styled.div`
  font-size: 1.6rem;
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

  > button {
    margin-top: 2em;
  }
`;
