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
import { ourConnect, StateProps, resetStateToInitial } from '../util/state';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps & StateProps> = ({ appPages, location, dispatch }) => (
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
      </IonList>
    </InflateContent>
  </IonMenu>
);

export default withRouter(ourConnect()(Menu));
