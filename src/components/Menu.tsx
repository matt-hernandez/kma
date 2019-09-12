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
import InflateContent from '../components/InflateContent';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppPage } from '../declarations';
import { ourConnect, StateProps, resetStateToInitial, confirmPartnerForAgreement, jumpAheadTwoDays, jumpAheadOneDay, getPartnerRequestsSent, receivePartnerRequest } from '../util/state';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps & StateProps> = ({
    appPages,
    location,
    dispatch,
    state: { openAgreements, myAgreements, me, otherUsers }
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
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem href={appPage.url} color={location.pathname === appPage.url ? 'primary' : undefined}>
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem button={true} onClick={() => dispatch(resetStateToInitial())}>
            <IonLabel>Reset</IonLabel>
          </IonItem>
          {(!!firstAgreement && getPartnerRequestsSent(firstAgreement.connections, me.id).length > 0) && (
            <IonItem button={true} onClick={() => {
              getPartnerRequestsSent(firstAgreement.connections, me.id).forEach((connection) => {
                dispatch(confirmPartnerForAgreement(firstAgreement.id, connection.to));
              });
            }}>
              <IonLabel>Confirm Partners for first agreement</IonLabel>
            </IonItem>
          )}
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
            <IonItem button={true} onClick={() => {
              dispatch(receivePartnerRequest(openAgreements[openAgreements.length - 1].id, otherUsers[2].id));
            }}>
              <IonLabel>Receive partner request</IonLabel>
            </IonItem>
          )}
        </IonList>
      </InflateContent>
    </IonMenu>
  );
};

export default withRouter(ourConnect()(Menu));
