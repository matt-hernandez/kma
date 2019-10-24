import React, { useContext } from 'react';
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
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { unlock } from 'ionicons/icons';
import InflateContent from '../components/InflateContent';
import { AppPage } from '../declarations';
import { readCachedQuery } from '../apollo-client/client';
import { User } from '../apollo-client/types/user';
import { ME } from '../apollo-client/queries/user';
import { ModalContext } from '../contexts/ModalContext';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps> = ({
    appPages,
    location
  }) => {
  const me = readCachedQuery<User>({
    query: ME
  }, 'me');
  const { showModal } = useContext(ModalContext);
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
            {me.isAdmin && (
              <IonItem href={'/admin'} color={location.pathname === '/admin' ? 'primary' : undefined}>
                <IonIcon slot="start" icon={unlock} />
                <IonLabel>Admin</IonLabel>
              </IonItem>
            )}
            <IonItem onClick={() => {
              showModal({
                type: 'DEV_TOOLS',
                content: <></>
              });
            }}>
              Developer Tools
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </InflateContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
