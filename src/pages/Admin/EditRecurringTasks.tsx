import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import { TASK_TEMPLATES } from '../../apollo-client/query/admin';
import { UPDATE_TASK_TEMPLATE } from '../../apollo-client/mutation/admin';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { ToastContext } from '../../contexts/ToastContext';
import TaskForm, { TaskFormData } from '../../components/TaskForm';
import H1 from '../../components/H1';
import { TaskTemplate } from '../../apollo-client/types/admin';

const slug = '/tasks/edit-recurring/:cid';
const title = 'Edit Recurring Task';

const EditTask: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const [ updateTaskTemplate ] = useMutation(UPDATE_TASK_TEMPLATE, {
    update: generateCacheUpdate<TaskTemplate>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'taskTemplates',
        query: TASK_TEMPLATES,
        sort: (d1, d2) => d1.nextPublishDate - d2.nextPublishDate
      },
      'updateTaskTemplate'
    )
  });
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const updateTaskListener = (taskData: TaskFormData) => {
    showLoadingScreen();
    updateTaskTemplate({ variables: {
          ...taskData,
          nextPublishDate: taskData.publishDate,
          nextDueDate: taskData.due
        } 
      })
      .then(() => {
        hideLoadingScreen();
        let url = '/admin/tasks/upcoming';
        showToast({
          color: 'success',
          message: 'Your future tasks were updated successfully!',
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
          message: 'There was an error updating your future tasks!'
        });
      });
  };
  return (
    <>
      <H1>Edit task</H1>
      <TaskForm isTemplate onSubmit={updateTaskListener} />
    </>
  )
};

export default addPageData(withRouter(EditTask), { slug, title });
