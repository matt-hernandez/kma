import React from 'react';
import { IonButton } from '@ionic/react';
import ModalContainer, { ModalProps } from '../ModalContainer';
import H1 from '../H1';
import RegularCopy from '../RegularCopy';
import InlineBold from '../InlineBold';
import Spacer from '../Spacer';
import MarginWrapper from '../MarginWrapper';

export const ConfirmMakeUserInactiveModal: React.FunctionComponent<ModalProps> = ({
    onConfirm,
    onDismiss,
    isOpen
  }) => {
  return (
    <ModalContainer isOpen={isOpen} onDismiss={onDismiss}>
      <H1 grayLevel={8}>What will this do?</H1>
      <RegularCopy grayLevel={7}>
        Removing a user as an admin means they will no longer be able to access the "Admin app"
        section. If they attempt to access those pages, the app will redirect them back to the
        main app and show them an error message.
      </RegularCopy>
      <RegularCopy grayLevel={7}><InlineBold>Are you sure you want to remove this user as an admin?</InlineBold></RegularCopy>
      <Spacer height="20px" />
      <MarginWrapper marginTop marginBottom>
        <IonButton expand="block" color="danger" onClick={onConfirm}>Yes</IonButton>
      </MarginWrapper>
      <IonButton expand="block" color="medium" fill="outline" onClick={onDismiss}>Cancel</IonButton>
    </ModalContainer>
  );
};
