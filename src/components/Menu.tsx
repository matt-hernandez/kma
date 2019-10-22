import React, { useState } from 'react';
import {
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import styled from 'styled-components/macro';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { unlock } from 'ionicons/icons';
import InflateContent from '../components/InflateContent';
import { AppPage } from '../declarations';
import { ourConnect, StateProps, jumpAheadTwoDays, jumpAheadOneDay } from '../util/state';
import { useStateHelper, listenerTypes } from '../util/use-state-helper';
import cookies from '../util/cookies';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const ModalPadding = styled.div`
  padding: 20px;
`;

const Menu: React.FunctionComponent<MenuProps & StateProps> = ({
    appPages,
    location,
    dispatch,
    state: { openTasks, myTasks, me }
  }) => {
  const [ userToBe, setUserToBe ] = useState('');
  const [ isDevToolsModalVisible, showDevToolsModal, hideDevToolsModal ] = useStateHelper(false, listenerTypes.TOGGLE_MANUALLY);
  const firstTask = myTasks[0];
  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <InflateContent top={56}>
        <IonList>
          <IonMenuToggle autoHide={false}>
            {appPages.map((appPage, index) => {
              return (
                <IonItem key={index} href={appPage.url} color={location.pathname === appPage.url ? 'primary' : undefined}>
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              );
            })}
            {!!firstTask && (
              <IonItem button={true} onClick={() => {
                dispatch(jumpAheadTwoDays());
              }}>
                <IonLabel>Jump Ahead 2 Days</IonLabel>
              </IonItem>
            )}
            {!!firstTask && (
              <IonItem button={true} onClick={() => {
                dispatch(jumpAheadOneDay());
              }}>
                <IonLabel>Jump Ahead 1 Day</IonLabel>
              </IonItem>
            )}
            {!!openTasks.length && (
              <IonItem button={true}>
                <IonLabel>Receive partner request</IonLabel>
              </IonItem>
            )}
            {me.isAdmin && (
              <IonItem href={'/admin'} color={location.pathname === '/admin' ? 'primary' : undefined}>
                <IonIcon slot="start" icon={unlock} />
                <IonLabel>Admin</IonLabel>
              </IonItem>
            )}
            <IonItem onClick={showDevToolsModal}>
              Developer Tools
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonModal isOpen={isDevToolsModalVisible} onDidDismiss={hideDevToolsModal}>
          <ModalPadding>
            <IonSelect placeholder="Change user" interface="popover" onIonChange={(e) => setUserToBe((e as any).target.value)}>
              <IonSelectOption value="Matt Hernandez">Matt Hernandez</IonSelectOption>
              <IonSelectOption value="Katie Goolsbee">Katie Goolsbee</IonSelectOption>
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
              } else if (userToBe === 'Katie Goolsbee') {
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
          </ModalPadding>
        </IonModal>
      </InflateContent>
    </IonMenu>
  );
};

export default withRouter(ourConnect()(Menu));
