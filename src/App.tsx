import React from 'react';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './pages/Main';
import Admin from './pages/Admin';
import Login from './pages/Login';
import PageDoesNotExist from './pages/404';
import LoadingWrapper, { LoadingProvider } from './contexts/LoadingContext';
import ToastWrapper, { ToastProvider } from './contexts/ToastContext';
import apolloClient from './apollo-client/client';

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

const InnerApp = () => (
  <IonReactRouter>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/main" />} />
      <Route path="/login" exact component={Login} />
      <Route path="/main" component={Main} />
      <Route path="/admin" component={Admin} />
      <Route component={PageDoesNotExist} />
      <Route path="/404" strict exact component={PageDoesNotExist} />
    </Switch>
    <LoadingWrapper />
    <ToastWrapper />
  </IonReactRouter>
);

const App: React.FunctionComponent = () => {
  return (
    <IonApp>
      <ToastProvider>
        <LoadingProvider>
          <ApolloProvider client={apolloClient}>
            <InnerApp />
          </ApolloProvider>
        </LoadingProvider>
      </ToastProvider>
    </IonApp>
  )
};

export default App;
