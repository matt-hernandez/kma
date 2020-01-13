import React, { useContext, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import { ApolloError, gql } from 'apollo-boost';
import { addPageData } from '../../util/add-page-data';
import { CURRENT_TASKS, UPCOMING_TASKS } from '../../apollo-client/query/admin';
import { UPDATE_TASK } from '../../apollo-client/mutation/admin';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { TaskForAdmin } from '../../apollo-client/types/admin';
import { ToastContext } from '../../contexts/ToastContext';
import TaskForm, { TaskFormData, TaskFormLoading } from '../../components/TaskForm';
import H1 from '../../components/H1';
import { RouteParams } from '../../util/interface-overrides';
import client from '../../apollo-client/client';

const slug = '/tasks/edit/:cid';
const title = 'Edit Task';

const EditTask: React.FunctionComponent<RouteComponentProps> = ({
    history,
    match
  }) => {
  const isRedirecting = useRef(false);
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
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
  const { loading: loadingCurrentTasks } = useQuery(CURRENT_TASKS, {
    fetchPolicy: 'cache-and-network',
    onError
  });
  const { loading: loadingUpcomingTasks } = useQuery(UPCOMING_TASKS, {
    fetchPolicy: 'cache-and-network',
    onError
  });
  const [ updateTask ] = useMutation(UPDATE_TASK, {
    update: (cache, { data }) => {
      const updateCurrentTasks = generateCacheUpdate<TaskForAdmin>(
        'OVERWRITE_ITEM_IN_ARRAY',
        {
          name: 'currentTasks',
          query: CURRENT_TASKS,
          sort: (d1, d2) => d1.publishDate - d2.publishDate
        },
        'updateTask'
      );
      const updateUpcomingTasks = generateCacheUpdate<TaskForAdmin>(
        'OVERWRITE_ITEM_IN_ARRAY',
        {
          name: 'upcomingTasks',
          query: UPCOMING_TASKS,
          sort: (d1, d2) => d1.publishDate - d2.publishDate
        },
        'updateTask'
      );
      const item: TaskForAdmin = data.updateTask;
      if (item.publishDate > Date.now()) {
        updateUpcomingTasks(cache, { data });
      } else {
        updateCurrentTasks(cache, { data });
      }
    }
  });
  if (loadingCurrentTasks || loadingUpcomingTasks) {
    return (
      <>
        <H1 centered marginTop>Edit task</H1>
        <TaskFormLoading />
      </>
    );
  }
  const updateTaskListener = (taskData: TaskFormData) => {
    showLoadingScreen();
    updateTask({ variables: taskData })
      .then(({ data: modifiedTask }) => {
        hideLoadingScreen();
        let url: string;
        if (modifiedTask.publishDate > Date.now()) {
          url = '/admin/tasks/upcoming';
        } else {
          url = '/admin/tasks/current';
        }
        showToast({
          color: 'success',
          message: 'Your task was modified successfully!',
          buttons: [{
            text: 'View task',
            handler: () => {
              history.push(url);
            }
          }]
        });
      })
      .catch(() => {
        showToast({
          color: 'danger',
          message: 'There was an error modifying your task!'
        });
      });
  };
  const taskCid = (match.params as RouteParams)['cid'];
  const task: TaskFormData | null = client.readFragment({
    id: taskCid,
    fragment: gql`
      fragment task on TaskForAdmin {
        cid
        title
        due
        description
        pointValue
        partnerUpDeadline
        publishDate
      }
    `
  });
  if (!task) {
    history.replace('/admin/tasks/current');
    return <TaskFormLoading />;
  }
  return (
    <>
      <H1 centered marginTop>Edit task</H1>
      <TaskForm task={task} onSubmit={updateTaskListener} />
    </>
  )
};

export default addPageData(withRouter(EditTask), { slug, title });
