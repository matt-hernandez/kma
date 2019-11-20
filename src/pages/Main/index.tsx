import React from 'react';
import {
    IonPage,
    IonHeader,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonSplitPane
  } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { checkmark, list, stats, settings, personAdd } from 'ionicons/icons';
import Menu from '../../components/Menu';
import InflateContent from '../../components/InflateContent';
import Tasks from './Tasks';
import PartnerSearch from './TransitoryPages/PartnerSearch';
import ConfirmPartnerRequest from './TransitoryPages/ConfirmPartnerRequest';
import RequestSent from './TransitoryPages/RequestSent';
import FindAPartner from './TransitoryPages/FindAPartner';
import UserPool from './TransitoryPages/UserPool';
import { AppPage } from '../../declarations';
import { ME, OPEN_TASKS, MY_TASKS, REQUESTED_PARTNER_TASKS } from '../../apollo-client/query/user';


const mainPages: AppPage[] = [
  {
    title: 'Open Tasks',
    url: '/main/tasks/open',
    icon: list
  },
  {
    title: 'My Tasks',
    url: '/main/tasks/my',
    icon: checkmark
  },
  {
    title: 'Partner Requests',
    url: '/main/tasks/requests',
    icon: personAdd
  },
  {
    title: 'Score',
    url: '/main/score',
    icon: stats
  },
  {
    title: 'Settings',
    url: '/main/settings',
    icon: settings
  }
];

const Main: React.FunctionComponent = () => {
  useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  });
  useQuery(OPEN_TASKS, {
    fetchPolicy: 'cache-and-network'
  });
  useQuery(MY_TASKS, {
    fetchPolicy: 'cache-and-network'
  });
  useQuery(REQUESTED_PARTNER_TASKS, {
    fetchPolicy: 'cache-and-network'
  });
  return (
    <IonSplitPane contentId="main">
      <Menu appPages={mainPages} />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>KMA</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InflateContent top={56} as="main">
          <Switch>
            <Route path={`/main${Tasks.pageData.slug}`} component={Tasks} />
            <Route path={`/main${PartnerSearch.pageData.slug}`} component={PartnerSearch} strict exact />
            <Route path={`/main${ConfirmPartnerRequest.pageData.slug}`} component={ConfirmPartnerRequest} strict exact />
            <Route path={`/main${RequestSent.pageData.slug}`} component={RequestSent} strict exact />
            <Route path={`/main${FindAPartner.pageData.slug}`} component={FindAPartner} strict exact />
            <Route path={`/main${UserPool.pageData.slug}`} component={UserPool} strict exact />
            <Route path="/main/score" component={() => <div />} strict exact />
            <Route path="/main" exact render={() => <Redirect to="/main/tasks/open" />} />
          </Switch>
        </InflateContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Main;
