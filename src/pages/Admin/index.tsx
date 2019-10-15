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
import { Redirect, Route } from 'react-router-dom';
import { list, rewind, fastforward, addCircle, person } from 'ionicons/icons';
import Menu from '../../components/Menu';
import InflateContent from '../../components/InflateContent';
import CreateAgreement from './CreateAgreement';
import CurrentAgreements from './CurrentAgreements';
import PastAgreements from './PastAgreements';
import UpcomingAgreements from './UpcomingAgreements';
import Users from './Users';
import { AppPage } from '../../declarations';

const adminPages: AppPage[] = [
  {
    title: CurrentAgreements.pageData.title,
    url: `/admin${CurrentAgreements.pageData.slug}`,
    icon: list,
    component: CurrentAgreements
  },
  {
    title: PastAgreements.pageData.title,
    url: `/admin${PastAgreements.pageData.slug}`,
    icon: rewind,
    component: PastAgreements
  },
  {
    title: UpcomingAgreements.pageData.title,
    url: `/admin${UpcomingAgreements.pageData.slug}`,
    icon: fastforward,
    component: UpcomingAgreements
  },
  {
    title: CreateAgreement.pageData.title,
    url: `/admin${CreateAgreement.pageData.slug}`,
    icon: addCircle,
    component: CreateAgreement
  },
  {
    title: Users.pageData.title,
    url: `/admin${Users.pageData.slug}`,
    icon: person,
    component: Users
  }
];

const Admin: React.FunctionComponent = () => {
  return (
    <IonSplitPane contentId="admin">
      <Menu appPages={adminPages} />
      <IonPage id="admin">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>KMA</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InflateContent top={56} as="main">
          {adminPages.map(({ url, component }) => <Route key={url} path={url} component={component} strict exact />)}
          <Route path="/admin" exact render={() => <Redirect to="/admin/agreements/current" />} />
        </InflateContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Admin;
