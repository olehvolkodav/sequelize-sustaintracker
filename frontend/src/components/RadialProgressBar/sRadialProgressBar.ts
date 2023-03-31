import styled from 'styled-components';

export const Container = styled.svg`
  width: 58px;
  height: 58px;
`;

export const Label = styled.text`
  fill: ${({ theme }) => theme.colors.gray_2};
  font-size: 1rem;
  font-weight: 600;
`;

export const Circle = styled.circle`
  fill: ${({ theme }) => theme.colors.gray_6};
`;

export const Center = styled.circle`
  fill: ${({ theme }) => theme.colors.secondary_light};
`;

export const Path = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-width: 8;
`;
