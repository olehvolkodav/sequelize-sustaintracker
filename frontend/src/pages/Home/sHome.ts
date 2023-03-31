import styled from 'styled-components';

import Button from '../../components/Button/Button';

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;
`;

export const Title = styled.div`
  font-size: 1.6rem;
`;

export const Content = styled.div`
  margin-top: 1.56em;

  > div {
    width: 22vw;
    height: 18vw;
    min-width: 380px;
    min-height: 320px;
    max-width: 500px;
    max-height: 400px;
    display: inline-flex;
    margin: 0 1.56em 1.56em 0;
  }

  div:last-child {
    margin: 0;
  }
`;

export const Illustration = styled.img`
  height: 64%;
  align-self: center;
  margin-top: auto;
`;

export const CardButton = styled(Button)`
  margin-top: auto;
  align-self: center;
`;
