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
import { unlock, codeWorking } from 'ionicons/icons';
import InflateContent from '../components/InflateContent';
import { AppPage } from '../declarations';
import { User } from '../apollo-client/types/user';
import { ME } from '../apollo-client/query/user';
import { ModalContext } from '../contexts/ModalContext';
import { useCache } from '../contexts/QueryTrackerContext';

interface MenuProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps & RouteComponentProps> = ({
    appPages,
    location,
    history
  }) => {
  const { loading, error, data: me } = useCache<User>({
    query: ME,
    propName: 'me'
  });
  const { showModal } = useContext(ModalContext);
  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <InflateContent top={56}>
        {loading && <IonList /> }
        {error && <div>Error</div>}
        {me && <IonList>
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
              showModal({
                type: 'DEV_TOOLS',
                content: <></>
              });
            }}>
              Developer Tools
            </IonItem>
          </IonMenuToggle>
        </IonList>}
      </InflateContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
