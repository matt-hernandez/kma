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
  IonToolbar
} from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { unlock, codeWorking } from 'ionicons/icons';
import InflateContent from '../components/InflateContent';
import { AppPage } from '../declarations';
import { ME } from '../apollo-client/query/user';
import { DevToolsModal } from '../components/Modal';
import useQueryHelper from '../util/use-query-helper';

interface MenuProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps & RouteComponentProps> = ({
    appPages,
    location,
    history
  }) => {
  const { loading, error, data: me } = useQueryHelper(ME, 'me');
  const [ isDevToolsModalOpen, setIsDevToolsModalOpen ] = useState(false);
  return (
    <>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InflateContent top={56}>
          {loading && (
            <IonList>
              <IonMenuToggle autoHide={false}>
                <IonItem>
                  Loading
                </IonItem>
              </IonMenuToggle>
            </IonList>
          )}
          {error && <div>Error</div>}
          {me && (
            <IonList>
              <IonMenuToggle autoHide={false}>
                {appPages.map((appPage, index) => {
                  return (
                    <IonItem key={index} type="button" onClick={() => {
                      history.push(appPage.url);
                    }} color={location.pathname === appPage.url ? 'primary' : undefined}>
                      <IonIcon slot="start" icon={appPage.icon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  );
                })}
                {(me.isAdmin && !location.pathname.includes('/admin')) && (
                  <IonItem type="button" onClick={() => {
                    history.push('/admin');
                  }}>
                    <IonIcon slot="start" icon={unlock} />
                    <IonLabel>Admin</IonLabel>
                  </IonItem>
                )}
                {(me.isAdmin && location.pathname.includes('/admin')) && (
                  <IonItem type="button" onClick={() => {
                    history.push('/');
                  }}>
                    <IonIcon slot="start" icon={codeWorking} />
                    <IonLabel>Main app</IonLabel>
                  </IonItem>
                )}
                <IonItem onClick={() => {
                  setIsDevToolsModalOpen(true);
                }}>
                  Developer Tools
                </IonItem>
              </IonMenuToggle>
            </IonList>
          )}
        </InflateContent>
      </IonMenu>
      <DevToolsModal isOpen={isDevToolsModalOpen} onDismiss={() => {}} />
    </>
  );
};

export default withRouter(Menu);
