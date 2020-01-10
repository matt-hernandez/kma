import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import { ALL_CURRENT_TASKS, ALL_UPCOMING_TASKS } from '../../apollo-client/query/admin';
import { CREATE_TASK, CREATE_TASK_TEMPLATE } from '../../apollo-client/mutation/admin';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { TaskForAdmin } from '../../apollo-client/types/admin';
import { ToastContext } from '../../contexts/ToastContext';
import TaskForm, { TaskFormData } from '../../components/TaskForm';

const slug = '/tasks/create';
const title = 'Create Task';

const CreateTask: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const [ createTask ] = useMutation(CREATE_TASK, {
    update: (cache, { data }) => {
      const updateCurrentTasks = generateCacheUpdate<TaskForAdmin>(
        'INSERT_ITEM',
        {
          name: 'allCurrentTasks',
          query: ALL_CURRENT_TASKS,
          sort: (d1, d2) => d1.due - d2.due
        },
        'createTask'
      );
      const updateUpcomingTasks = generateCacheUpdate<TaskForAdmin>(
        'INSERT_ITEM',
        {
          name: 'allUpcomingTasks',
          query: ALL_UPCOMING_TASKS,
          sort: (d1, d2) => d1.due - d2.due
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
  const [ createTaskTemplate ] = useMutation(CREATE_TASK_TEMPLATE);
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const createTaskListener = (taskData: TaskFormData) => {
    showLoadingScreen();
    let taskTemplateCreationHasError = false;
    let createdTask: TaskForAdmin | null = null;
    const createTaskPromise = createTask({ variables: taskData }).then((task) => createdTask = task.data || null);
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
  return (
    <>
      <TaskForm onSubmit={createTaskListener} />
    </>
  )
};

export default addPageData(withRouter(CreateTask), { slug, title });
