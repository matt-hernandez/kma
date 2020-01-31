import React, { useState } from 'react';
import { IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import ModalContainer, { ModalProps } from '../ModalContainer';
import cookies from '../../util/cookies';

export const DevToolsModal: React.FunctionComponent<ModalProps> = ({ isOpen, onDismiss }) => {
  const [ userToBe, setUserToBe ] = useState('');
  return (
    <ModalContainer isOpen={isOpen} onDismiss={onDismiss}>
      <IonSelect placeholder="Change user" interface="popover" onIonChange={(e) => setUserToBe((e as any).target.value)}>
        <IonSelectOption value="Matt Hernandez">Matt Hernandez</IonSelectOption>
        <IonSelectOption value="Katie Fryer">Katie Fryer</IonSelectOption>
        <IonSelectOption value="Erin Armstrong">Erin Armstrong</IonSelectOption>
        <IonSelectOption value="Dave Goode">Dave Goode</IonSelectOption>
        <IonSelectOption value="Norbi Zylberberg">Norbi Zylberberg</IonSelectOption>
      </IonSelect>
      <IonButton expand="block" color="primary" onClick={() => {
        const cookieName = 'lkma__at';
        if (userToBe === 'Matt Hernandez') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0dCBIZXJuYW5kZXoiLCJlbWFpbCI6Im1hdHQuaXNhaWFoLmhlcm5hbmRlekBnbWFpbC5jb20ifQ.WdTMhn-FWocBOLZAOfygTYPPP1Sb0PO0MKkNKVIRMRk'
          );
        } else if (userToBe === 'Katie Fryer') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2F0aWUgR29vbHNiZWUiLCJlbWFpbCI6ImthdGllLmdvb2xzYmVlQGxpb25za3Jhdm1hZ2EuY29tIn0.u-4d8nKYTv9xn5O06TnoN2kw0w7JRRuvXqkl534FFmY'
          );
        } else if (userToBe === 'Erin Armstrong') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJpbiBBcm1zdHJvbmciLCJlbWFpbCI6ImVyaW4uYXJtc3Ryb25nQGxpb25za3Jhdm1hZ2EuY29tIn0.rBMCrfXTXWJ1xOq-w_N_Mv_hIAj0B9E8RRdplJX40lY'
          );
        } else if (userToBe === 'Dave Goode') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGF2ZSBHb29kZSIsImVtYWlsIjoiZGF2ZS5nb29kZUBsaW9uc2tyYXZtYWdhLmNvbSJ9.VJN1iuhHIcATopd-3MUEnKFPB2mBHu9GKCcPOcOQQAs'
          );
        } else if (userToBe === 'Norbi Zylberberg') {
          cookies.setItem(
            cookieName,
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9yYmkgWnlsYmVyYmVyZyIsImVtYWlsIjoibm9yYmkuenlsYmVyYmVyZ0BsaW9uc2tyYXZtYWdhLmNvbSJ9.1zcBpQ2MFFM-KTvHgS6Oj-fYP4F6I7UniFMfbDg8VAg'
          );
        }
        document.location.href = document.location.origin;
      }}>Change user</IonButton>
    </ModalContainer>
  );
};
