import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './pages/Main';
import Admin from './pages/Admin';
import PageDoesNotExist from './pages/404';
import LoadingWrapper from './subpages/LoadingWrapper';
import { Provider as LoadingProvider } from './util/loading-context';

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
import { listenerTypes, useStateHelper } from './util/use-state-helper';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  credentials: 'include',
  cache: new InMemoryCache({
    dataIdFromObject: (object: any) => object.cid || null
  })
});

const App: React.FunctionComponent = () => {
  const [ shouldShowLoadingScreen, showLoadingScreen, hideLoadingScreen ] = useStateHelper(false, listenerTypes.TOGGLE_MANUALLY);
  return (
    <IonApp>
      <LoadingProvider value={{ shouldShowLoadingScreen, showLoadingScreen, hideLoadingScreen }}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <IonReactRouter>
              <Switch>
                <Route path="/" exact render={() => <Redirect to="/main" />} />
                <Route path="/main" component={Main} />
                <Route path="/admin" component={Admin} />
                <Route component={PageDoesNotExist} />
                <Route path="/404" strict exact component={PageDoesNotExist} />
              </Switch>
              <LoadingWrapper />
            </IonReactRouter>
          </Provider>
        </ApolloProvider>
      </LoadingProvider>
    </IonApp>
  )
};

export default App;
