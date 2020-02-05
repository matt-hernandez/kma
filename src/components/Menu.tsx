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
import styled from 'styled-components/macro';
import { unlock, codeWorking } from 'ionicons/icons';
import InflateContent from '../components/InflateContent';
import LoadingBlock from '../components/LoadingBlock';
import FlexRow from '../components/FlexRow';
import { AppPage } from '../declarations';
import { ME } from '../apollo-client/query/user';
import { DevToolsModal } from '../components/Modal';
import useQueryHelper from '../util/use-query-helper';
import { User } from '../apollo-client/types/user';

interface MenuProps {
  appPages: AppPage[];
}

const MenuItemIconLoading = styled(LoadingBlock)`
  flex-basis: 24px;
  flex-grow: 0;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-top: 14px;
  margin-right: 14px;
  margin-bottom: 14px;
`;

const MenuItemTextLoading = styled(LoadingBlock)`
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  height: 14px;
  margin-right: 20px;
`;

const Menu: React.FunctionComponent<MenuProps & RouteComponentProps> = ({
    appPages,
    location,
    history
  }) => {
  const { loading, error, data: me } = useQueryHelper<User>(ME, 'me');
  const [ isDevToolsModalOpen, setIsDevToolsModalOpen ] = useState(false);
  return (
    <>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{me ? me.name : ''}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InflateContent top={56}>
          {loading && (
            <IonList>
              <IonMenuToggle autoHide={false}>
                {appPages.map((appPage) => {
                  return (
                    <IonItem key={`${appPage.url}-loading`}>
                      <FlexRow alignItems="center">
                        <MenuItemIconLoading />
                        <MenuItemTextLoading />
                      </FlexRow>
                    </IonItem>
                  );
                })}
              </IonMenuToggle>
            </IonList>
          )}
          {error && <div>Error</div>}
          {me && (
            <IonList>
              <IonMenuToggle autoHide={false}>
                {appPages.map((appPage) => {
                  return (
                    <IonItem key={`${appPage.url}-menu-item`} type="button" onClick={() => {
                      history.push(appPage.url);
                    }} color={appPage.url.includes(location.pathname) ? 'primary' : undefined}>
                      <IonIcon slot="start" icon={appPage.icon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  );
                })}
                {((me.accessRights === 'ADMIN' || me.accessRights === 'SUPER_ADMIN') && !location.pathname.includes('/admin')) && (
                  <IonItem type="button" onClick={() => {
                    history.push('/admin');
                  }}>
                    <IonIcon slot="start" icon={unlock} />
                    <IonLabel>Admin</IonLabel>
                  </IonItem>
                )}
                {((me.accessRights === 'ADMIN' || me.accessRights === 'SUPER_ADMIN') && location.pathname.includes('/admin')) && (
                  <IonItem type="button" onClick={() => {
                    history.push('/main');
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
      <DevToolsModal isOpen={isDevToolsModalOpen} onDismiss={() => {setIsDevToolsModalOpen(false)}} />
    </>
  );
};

export default withRouter(Menu);
