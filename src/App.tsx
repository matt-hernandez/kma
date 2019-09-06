import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  IonApp,
  IonPage,
  IonHeader,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
  IonSplitPane
  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import InflateContent from './components/InflateContent';
import Agreements from './pages/Agreements';
import CommitmentConfirmed from './pages/CommitmentConfirmed';
import PartnerSearch from './pages/PartnerSearch';
import ConfirmPartnerRequest from './pages/ConfirmPartnerRequest';
import RequestSent from './pages/RequestSent';
import FindAPartner from './pages/FindAPartner';
import PageDoesNotExist from './pages/404';
import { contacts, list, stats, settings } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './overrides.css';
import { store } from './util/state';

const appPages: AppPage[] = [
  {
    title: 'Open Agreements',
    url: '/agreements/open',
    icon: list
  },
  {
    title: 'My Agreements',
    url: '/agreements/my',
    icon: contacts
  },
  {
    title: 'Score',
    url: '/score',
    icon: stats
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: settings
  }
];

const App: React.FunctionComponent = () => (
  <IonApp>
    <Provider store={store}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu appPages={appPages} />
          <IonPage id="main">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton />
                </IonButtons>
                <IonTitle>KMA</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonRouterOutlet>
              <InflateContent top={56} as="main">
                <Switch>
                  <Route path={Agreements.pageData.slug} component={Agreements} />
                  <Route path={CommitmentConfirmed.pageData.slug} component={CommitmentConfirmed} strict exact />
                  <Route path={PartnerSearch.pageData.slug} component={PartnerSearch} strict exact />
                  <Route path={ConfirmPartnerRequest.pageData.slug} component={ConfirmPartnerRequest} strict exact />
                  <Route path={RequestSent.pageData.slug} component={RequestSent} strict exact />
                  <Route path={FindAPartner.pageData.slug} component={FindAPartner} strict exact />
                  <Route path="/score" component={() => <div />} strict exact />
                  <Route path="/" exact render={() => <Redirect to="/agreements/open" />} />
                  <Route component={PageDoesNotExist} />
                  <Route path="/404" strict exact component={PageDoesNotExist} />
                </Switch>
              </InflateContent>
            </IonRouterOutlet>
          </IonPage>
        </IonSplitPane>
      </IonReactRouter>
    </Provider>
  </IonApp>
);

export default App;
