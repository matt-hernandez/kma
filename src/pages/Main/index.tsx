import React from 'react';
import {
    IonPage,
    IonHeader,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonRouterOutlet,
    IonSplitPane
  } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { contacts, list, stats, settings, personAdd } from 'ionicons/icons';
import Menu from '../../components/Menu';
import InflateContent from '../../components/InflateContent';
import Agreements from './Agreements';
import CommitmentConfirmed from './TransitoryPages/CommitmentConfirmed';
import PartnerSearch from './TransitoryPages/PartnerSearch';
import ConfirmPartnerRequest from './TransitoryPages/ConfirmPartnerRequest';
import RequestSent from './TransitoryPages/RequestSent';
import FindAPartner from './TransitoryPages/FindAPartner';
import UserPool from './TransitoryPages/UserPool';
import PageDoesNotExist from '../404';
import { AppPage } from '../../declarations';

const mainPages: AppPage[] = [
  {
    title: 'Open Agreements',
    url: '/agreements/open',
    icon: list
  },
  {
    title: 'Partner Requests',
    url: '/agreements/requests',
    icon: personAdd
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

const Main: React.FunctionComponent = () => {
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
        <IonRouterOutlet>
          <InflateContent top={56} as="main">
            <Switch>
              <Route path={Agreements.pageData.slug} component={Agreements} />
              <Route path={CommitmentConfirmed.pageData.slug} component={CommitmentConfirmed} strict exact />
              <Route path={PartnerSearch.pageData.slug} component={PartnerSearch} strict exact />
              <Route path={ConfirmPartnerRequest.pageData.slug} component={ConfirmPartnerRequest} strict exact />
              <Route path={RequestSent.pageData.slug} component={RequestSent} strict exact />
              <Route path={FindAPartner.pageData.slug} component={FindAPartner} strict exact />
              <Route path={UserPool.pageData.slug} component={UserPool} strict exact />
              <Route path="/score" component={() => <div />} strict exact />
              <Route path="/" exact render={() => <Redirect to="/agreements/open" />} />
              <Route component={PageDoesNotExist} />
              <Route path="/404" strict exact component={PageDoesNotExist} />
            </Switch>
          </InflateContent>
        </IonRouterOutlet>
      </IonPage>
    </IonSplitPane>
  );
};

export default Main;
