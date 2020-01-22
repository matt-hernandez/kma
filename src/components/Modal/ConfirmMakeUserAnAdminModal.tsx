import React from 'react';
import { IonButton } from '@ionic/react';
import ModalContainer, { ModalProps } from '../ModalContainer';
import H1 from '../H1';
import RegularCopy from '../RegularCopy';
import InlineBold from '../InlineBold';
import Spacer from '../Spacer';
import MarginWrapper from '../MarginWrapper';

export const ConfirmMakeUserAnAdminModal: React.FunctionComponent<ModalProps> = ({
    onConfirm,
    onDismiss,
    isOpen
  }) => {
  return (
    <ModalContainer isOpen={isOpen} onDismiss={onDismiss}>
      <H1 grayLevel={8}>What will this do?</H1>
      <RegularCopy grayLevel={7}>
        Making a user an admin means they will be able to access the "Admin app" section. They will
        be able to see all current, future, and past tasks, to look up user info, and confirm
        whether users have completed tasks.
      </RegularCopy>
      <RegularCopy grayLevel={7}>
        They <InlineBold>WILL NOT</InlineBold> be able to grant admin access to other users or take
        admin access away from anyone. That is reserved for "Super admins". To make someone a
        "Super admin", contact Matt Hernandez.
      </RegularCopy>
      <RegularCopy grayLevel={7}><InlineBold>Are you sure you want to make this user an admin?</InlineBold></RegularCopy>
      <Spacer height="20px" />
      <MarginWrapper marginTop marginBottom>
        <IonButton expand="block" color="primary" onClick={onConfirm}>Yes</IonButton>
      </MarginWrapper>
      <IonButton expand="block" color="medium" fill="outline" onClick={onDismiss}>Cancel</IonButton>
    </ModalContainer>
  );
};
