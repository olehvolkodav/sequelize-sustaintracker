import { shade, tint } from 'polished';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transfrom: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17.8em;
  height: 3em;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  color: #fff;
  font-size: 14px;

  transition: background-color 0.3s;
  background-color: ${({ theme }) => theme.colors.primary};
  &:hover {
    background-color: ${({ theme }) => shade(0.2, theme.colors.primary)};
  }

  .loader {
    border: 2px solid ${({ theme }) => theme.colors.gray_6};
    border-top: 3px solid #fff;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    animation: ${spin} 1s linear infinite;
  }

  &:disabled {
    background-color: ${({ theme }) => tint(0.5, theme.colors.primary)};
  }
`;
