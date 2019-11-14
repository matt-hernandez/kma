import React from 'react';
import { IonModal } from '@ionic/react';
import styled from 'styled-components/macro';
import { AcceptAnyReturnVoid } from '../util/interface-overrides';

const ModalPadding = styled.div`
  padding: 20px;
`;

export interface ModalProps {
  isOpen: boolean;
  onDismiss: AcceptAnyReturnVoid;
}

const ModalContainer: React.FunctionComponent<ModalProps> = ({ isOpen, onDismiss, children }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <ModalPadding>
        {children}
      </ModalPadding>
    </IonModal>
  );
};

export default ModalContainer;
