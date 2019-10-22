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
import CreateTask from './CreateTask';
import CurrentTasks from './CurrentTasks';
import PastTasks from './PastTasks';
import UpcomingTasks from './UpcomingTasks';
import Users from './Users';
import { AppPage } from '../../declarations';

const adminPages: AppPage[] = [
  {
    title: CurrentTasks.pageData.title,
    url: `/admin${CurrentTasks.pageData.slug}`,
    icon: list,
    component: CurrentTasks
  },
  {
    title: PastTasks.pageData.title,
    url: `/admin${PastTasks.pageData.slug}`,
    icon: rewind,
    component: PastTasks
  },
  {
    title: UpcomingTasks.pageData.title,
    url: `/admin${UpcomingTasks.pageData.slug}`,
    icon: fastforward,
    component: UpcomingTasks
  },
  {
    title: CreateTask.pageData.title,
    url: `/admin${CreateTask.pageData.slug}`,
    icon: addCircle,
    component: (CreateTask as any)
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
          <Route path="/admin" exact render={() => <Redirect to="/admin/tasks/current" />} />
        </InflateContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Admin;
