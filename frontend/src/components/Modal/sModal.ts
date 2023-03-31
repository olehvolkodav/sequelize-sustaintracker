import styled from 'styled-components';

import { Close } from '../../assets/icons';

interface BackgroundProps {
  showModal: boolean;
}

interface ContentWrapperProps {
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export const Background = styled.div<BackgroundProps>`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  background-color: ${({ showModal }) =>
    showModal ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'};
  visibility: ${({ showModal }) => (showModal ? 'visible' : 'collapse')};
  transition-property: background-color, visibility;
  transition-duration: 0.2s, 0s;
  transition-delay: ${({ showModal }) => (showModal ? '0s, 0s' : '0s, 0.2s')};
`;

export const ModalWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px #0000001a;
  background-color: #fff;
  opacity: 1;
  z-index: 10;
`;

export const CloseModalButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 1.25em;
  right: 1.25em;
  width: 1.8em;
  height: 1.8em;
  background: #fff;
  border: none;
  border-radius: 2px;
  transition: background 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray_6};
  }
`;

export const CloseModalButtonIcon = styled(Close)`
  display: block;
  margin: auto;
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-width: ${({ minWidth }) => minWidth};
  min-height: ${({ minHeight }) => minHeight};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};

  padding: 3.6em 4em;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.8em;
`;

export const Subtitle = styled.h5`
  font-size: 0.875rem;
  font-weight: 400;
  margin-bottom: 4em;
`;
