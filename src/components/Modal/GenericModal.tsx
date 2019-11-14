import React from 'react';
import ModalContainer, { ModalProps } from '../ModalContainer';

export const GenericModal: React.FunctionComponent<ModalProps> = ({ isOpen, onDismiss, children }) => {
  return (
    <ModalContainer isOpen={isOpen} onDismiss={onDismiss}>
      {children}
    </ModalContainer>
  );
};
