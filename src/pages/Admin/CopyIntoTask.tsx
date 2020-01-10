import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import { CURRENT_TASKS, UPCOMING_TASKS } from '../../apollo-client/query/admin';
import { UPDATE_TASK_TEMPLATE, UPDATE_TASK } from '../../apollo-client/mutation/admin';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { TaskForAdmin } from '../../apollo-client/types/admin';
import { ToastContext } from '../../contexts/ToastContext';
import TaskForm, { TaskFormData } from '../../components/TaskForm';
import H1 from '../../components/H1';

const slug = '/tasks/copy/:cid';
const title = 'Copy Into Task';

const EditTask: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
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
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
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
  return (
    <>
      <H1>Edit task</H1>
      <TaskForm isNew onSubmit={updateTaskListener} />
    </>
  )
};

export default addPageData(withRouter(EditTask), { slug, title });
