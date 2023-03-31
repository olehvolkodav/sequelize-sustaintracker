import styled from 'styled-components';

import Button from '../../../components/Button/Button';

export const Container = styled.div`
  font-weight: 700;
  padding: 1.875em 1.8em 0 1.8em;
`;

export const Title = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SaveButton = styled(Button)`
  margin-left: 1em;
  width: 14.6em;
  margin-left: auto;
`;

export const Info = styled.div`
  margin: 2em 0 2em 0;
  font-size: 16px;
  font-weight: 700;
  white-space: break-spaces;
`;
