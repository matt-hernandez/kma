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
        Making a user "inactive" means they will no longer be able to use the app in any way.
        If they log in to the app, they will be redirected to a screen which says their account
        is "inactive". You should use this functionality if the gym member has cancelled their
        membership and is not expected to come back, or if there is any other reason they should be
        shut out from this app.
      </RegularCopy>
      <RegularCopy grayLevel={7}>
        Making a user "inactve" <InlineBold>DOES NOT</InlineBold> affect anyone's score. All points
        awarded to other people for partnering up with this user remain in place.
      </RegularCopy>
      <RegularCopy grayLevel={7}><InlineBold>Are you sure you want to make this user inactive?</InlineBold></RegularCopy>
      <Spacer height="20px" />
      <MarginWrapper marginTop marginBottom>
        <IonButton expand="block" color="danger" onClick={onConfirm}>Yes</IonButton>
      </MarginWrapper>
      <IonButton expand="block" color="medium" fill="outline" onClick={onDismiss}>Cancel</IonButton>
    </ModalContainer>
  );
};
