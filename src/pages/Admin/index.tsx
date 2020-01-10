import React, { useContext, useRef } from 'react';
import {
    IonPage,
    IonHeader,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonSplitPane
  } from '@ionic/react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import { list, rewind, fastforward, addCircle, person } from 'ionicons/icons';
import Menu from '../../components/Menu';
import InflateContent from '../../components/InflateContent';
import CreateTask from './CreateTask';
import CurrentTasks from './CurrentTasks';
import PastTasks from './PastTasks';
import UpcomingTasks from './UpcomingTasks';
import EditTask from './EditTask';
import EditRecurringTasks from './EditRecurringTasks';
import CopyIntoTask from './CopyIntoTask';
import Users from './Users';
import { AppPage } from '../../declarations';
import { CURRENT_TASKS, PAST_TASKS, UPCOMING_TASKS, USERS } from '../../apollo-client/query/admin';
import { ToastContext } from '../../contexts/ToastContext';

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

const Admin: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const { showToast } = useContext(ToastContext);
  const isRedirecting = useRef(false);
  const onError = (error: ApolloError) => {
    if (!isRedirecting.current && error.graphQLErrors) {
      isRedirecting.current = true;
      if (error.graphQLErrors.some((error) => error.message.includes('User is not an admin'))) {
        history.replace('/main');
        showToast({
          color: 'danger',
          message: 'You are not authorized to view that page.'
        });
      } else if (error.graphQLErrors.some((error) => error.message.includes('User is not authenticated'))) {
        history.replace('/login');
        showToast({
          color: 'danger',
          message: 'You need to log in.'
        });
      }
    }
  }
  useQuery(CURRENT_TASKS, {
    fetchPolicy: 'cache-and-network',
    onError
  });
  useQuery(UPCOMING_TASKS, {
    fetchPolicy: 'cache-and-network',
    onError
  });
  useQuery(PAST_TASKS, {
    fetchPolicy: 'cache-and-network',
    onError
  });
  useQuery(USERS, {
    fetchPolicy: 'cache-and-network',
    onError
  });
  return (
    <IonSplitPane contentId="main">
      <Menu appPages={adminPages} />
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
          {adminPages.map(({ url, component }) => <Route key={url} path={url} component={component} strict exact />)}
          <Route path={`/admin${EditTask.pageData.slug}`} component={EditTask} strict exact />
          <Route path={`/admin${EditRecurringTasks.pageData.slug}`} component={EditRecurringTasks} strict exact />
          <Route path={`/admin${CopyIntoTask.pageData.slug}`} component={CopyIntoTask} strict exact />
          <Route path="/admin" exact render={() => <Redirect to="/admin/tasks/current" />} />
        </InflateContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Admin;
