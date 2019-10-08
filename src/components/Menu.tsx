import {
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { unlock } from 'ionicons/icons';
import InflateContent from '../components/InflateContent';
import { AppPage } from '../declarations';
import { ourConnect, StateProps, resetStateToInitial, jumpAheadTwoDays, jumpAheadOneDay } from '../util/state';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps & StateProps> = ({
    appPages,
    location,
    dispatch,
    state: { openAgreements, myAgreements, me }
  }) => {
  const firstAgreement = myAgreements[0];
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
            {!!firstAgreement && (
              <IonItem button={true} onClick={() => {
                dispatch(jumpAheadTwoDays());
              }}>
                <IonLabel>Jump Ahead 2 Days</IonLabel>
              </IonItem>
            )}
            {!!firstAgreement && (
              <IonItem button={true} onClick={() => {
                dispatch(jumpAheadOneDay());
              }}>
                <IonLabel>Jump Ahead 1 Day</IonLabel>
              </IonItem>
            )}
            {!!openAgreements.length && (
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
          </IonMenuToggle>
        </IonList>
      </InflateContent>
    </IonMenu>
  );
};

export default withRouter(ourConnect()(Menu));
