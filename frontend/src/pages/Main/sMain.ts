import styled from 'styled-components';

interface ContentProps {
  margin: string;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
`;

export const Content = styled.div<ContentProps>`
  width: 100%;
  will-change: margin-left;
  margin-left: ${({ margin }) => margin};
  transition: margin 0.2s ease-in-out;
`;
