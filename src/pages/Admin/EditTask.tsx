import React, { useContext, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import { ApolloError, gql } from 'apollo-boost';
import { addPageData } from '../../util/add-page-data';
import { CURRENT_TASKS, UPCOMING_TASKS } from '../../apollo-client/query/admin';
import { UPDATE_TASK_TEMPLATE, UPDATE_TASK } from '../../apollo-client/mutation/admin';
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
          sort: (d1, d2) => d1.due - d2.due
        },
        'updateTask'
      );
      const updateUpcomingTasks = generateCacheUpdate<TaskForAdmin>(
        'OVERWRITE_ITEM_IN_ARRAY',
        {
          name: 'upcomingTasks',
          query: UPCOMING_TASKS,
          sort: (d1, d2) => d1.due - d2.due
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
  const [ updateTaskTemplate ] = useMutation(UPDATE_TASK_TEMPLATE);
  if (loadingCurrentTasks && loadingUpcomingTasks) {
    return <TaskFormLoading />;
  }
  const updateTaskListener = (taskData: TaskFormData) => {
    showLoadingScreen();
    let taskTemplateCreationHasError = false;
    let createdTask: TaskForAdmin | null = null;
    const updateTaskPromise = updateTask({ variables: taskData }).then((task) => createdTask = task.data || null);
    if (taskData.repeatFrequency) {
      updateTaskPromise.then(() => updateTaskTemplate({
          variables: taskData
        }).catch(() => {
          taskTemplateCreationHasError = true;
        })
      );
    }
    updateTaskPromise.then(() => {
      hideLoadingScreen();
      if (!createdTask) {
        showToast({
          color: 'danger',
          message: 'There was an error creating your task!'
        });
      } else if (taskTemplateCreationHasError) {
        showToast({
          color: 'warning',
          message: 'Your task was created, but there was a problem setting up recurring tasks.'
        });
      } else {
        let url: string;
        if (createdTask.publishDate > Date.now()) {
          url = '/admin/tasks/upcoming';
        } else {
          url = '/admin/tasks/current';
        }
        showToast({
          color: 'success',
          message: 'Your task was created successfully!',
          buttons: [{
            text: 'View task',
            handler: () => {
              history.push(url);
            }
          }]
        });
      }
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
      <H1>Edit task</H1>
      <TaskForm task={task} onSubmit={updateTaskListener} />
    </>
  )
};

export default addPageData(withRouter(EditTask), { slug, title });
