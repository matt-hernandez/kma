import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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
import Home from './pages/Home';
import List from './pages/List';
import { contacts, stats, settings } from 'ionicons/icons';

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

const appPages: AppPage[] = [
  {
    title: 'Agreements',
    url: '/home',
    icon: contacts
  },
  {
    title: 'Score',
    url: '/score',
    icon: stats
  },
  {
    title: 'Settings',
    url: '/score',
    icon: settings
  }
];

const App: React.FunctionComponent = () => (
  <IonApp>
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
            <Route path="/home" component={Home} exact={true} />
            <Route path="/score" component={List} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonPage>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
