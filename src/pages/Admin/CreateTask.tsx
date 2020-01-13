import React, { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RouteComponentProps, withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import { CURRENT_TASKS, UPCOMING_TASKS, TASK_TEMPLATES } from '../../apollo-client/query/admin';
import { CREATE_TASK, CREATE_TASK_TEMPLATE } from '../../apollo-client/mutation/admin';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { TaskForAdmin, TaskTemplate } from '../../apollo-client/types/admin';
import { ToastContext } from '../../contexts/ToastContext';
import TaskForm, { TaskFormData, TaskFormLoading } from '../../components/TaskForm';
import { RouteParams } from '../../util/interface-overrides';
import client from '../../apollo-client/client';

const slug = '/tasks/create/:cid?';
const title = 'Create Task';

const CreateTask: React.FunctionComponent<RouteComponentProps> = ({
    history,
    match
  }) => {
  const [ createTask ] = useMutation(CREATE_TASK, {
    update: (cache, { data }) => {
      const updateCurrentTasks = generateCacheUpdate<TaskForAdmin>(
        'INSERT_ITEM',
        {
          name: 'currentTasks',
          query: CURRENT_TASKS,
          sort: (d1, d2) => d1.publishDate - d2.publishDate
        },
        'createTask'
      );
      const updateUpcomingTasks = generateCacheUpdate<TaskForAdmin>(
        'INSERT_ITEM',
        {
          name: 'upcomingTasks',
          query: UPCOMING_TASKS,
          sort: (d1, d2) => d1.publishDate - d2.publishDate
        },
        'createTask'
      );
      const item: TaskForAdmin = data.createTask;
      if (item.publishDate > Date.now()) {
        updateUpcomingTasks(cache, { data });
      } else {
        updateCurrentTasks(cache, { data });
      }
    }
  });
  const [ createTaskTemplate ] = useMutation(CREATE_TASK_TEMPLATE, {
    update: generateCacheUpdate<TaskTemplate>(
      'INSERT_ITEM',
      {
        name: 'taskTemplates',
        query: TASK_TEMPLATES,
        sort: (d1, d2) => d1.nextPublishDate - d2.nextPublishDate
      },
      'createTaskTemplate'
    )
  });
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const createTaskListener = (taskData: TaskFormData) => {
    showLoadingScreen();
    let taskTemplateCreationHasError = false;
    let createdTask: TaskForAdmin | null = null;
    const createTaskPromise = createTask({ variables: taskData }).then(({ data }) => createdTask = data || null);
    if (taskData.repeatFrequency) {
      createTaskPromise.then(() => createTaskTemplate({
          variables: taskData
        }).catch(() => {
          taskTemplateCreationHasError = true;
        })
      );
    }
    createTaskPromise.then(() => {
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
  const { loading: loadingCurrentTasks } = useQuery(CURRENT_TASKS);
  const { loading: loadingUpcomingTasks } = useQuery(UPCOMING_TASKS);
  if (loadingCurrentTasks && loadingUpcomingTasks) {
    return <TaskFormLoading />;
  }
  const taskCid = (match.params as RouteParams)['cid'];
  if (taskCid) {
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
        <TaskForm isNew task={task} onSubmit={createTaskListener} />
      </>
    );
  }
  return (
    <>
      <TaskForm isNew onSubmit={createTaskListener} />
    </>
  )
};

export default addPageData(withRouter(CreateTask), { slug, title });
