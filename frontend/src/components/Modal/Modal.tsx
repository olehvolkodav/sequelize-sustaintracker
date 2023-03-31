import React, { useCallback, useEffect, useRef } from 'react';

import {
  Background,
  CloseModalButton,
  CloseModalButtonIcon,
  ContentWrapper,
  ModalWrapper,
  Subtitle,
  Title,
} from './sModal';

interface Dimensions {
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export interface ModalProps {
  showModal: boolean;
  setShowModal: (key: boolean) => void;
  title?: string;
  subtitle?: string;
  dimensions?: Dimensions;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  setShowModal,
  title,
  subtitle,
  dimensions,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [showModal, setShowModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <Background ref={modalRef} showModal={showModal}>
      {showModal && (
        <ModalWrapper>
          <CloseModalButton onClick={() => setShowModal(false)}>
            <CloseModalButtonIcon />
          </CloseModalButton>
          <ContentWrapper {...dimensions}>
            {title && <Title>{title}</Title>}
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            {children}
          </ContentWrapper>
        </ModalWrapper>
      )}
    </Background>
  );
};

export default Modal;
