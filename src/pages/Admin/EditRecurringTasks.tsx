import React, { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RouteComponentProps, withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import { TASK_TEMPLATES } from '../../apollo-client/query/admin';
import { UPDATE_TASK_TEMPLATE } from '../../apollo-client/mutation/admin';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { ToastContext } from '../../contexts/ToastContext';
import TaskForm, { TaskFormData, TaskFormLoading } from '../../components/TaskForm';
import H1 from '../../components/H1';
import { TaskTemplate } from '../../apollo-client/types/admin';
import MarginWrapper from '../../components/MarginWrapper';
import RegularCopy from '../../components/RegularCopy';
import { RouteParams } from '../../util/interface-overrides';
import client from '../../apollo-client/client';
import InlineItalic from '../../components/InlineItalic';
import HorizontalRule from '../../components/HorizontalRule';

const slug = '/tasks/edit-recurring/:cid';
const title = 'Edit Recurring Task';

const EditTask: React.FunctionComponent<RouteComponentProps> = ({
    history,
    match
  }) => {
  const cid = (match.params as RouteParams)['cid'];
  const [ updateTaskTemplate ] = useMutation(UPDATE_TASK_TEMPLATE, {
    update: generateCacheUpdate<TaskTemplate>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'taskTemplates',
        query: TASK_TEMPLATES,
        sort: (d1, d2) => d1.publishDate - d2.publishDate
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
          cid
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
  const { loading: loadingTaskTemplates } = useQuery(TASK_TEMPLATES);
  if (loadingTaskTemplates) {
    return <TaskFormLoading />;
  }
  const taskTemplate = client.readFragment<TaskTemplate>({
    id: cid,
    fragment: gql`
      fragment task on TaskTemplate {
        cid
        title
        description
        pointValue
        repeatFrequency
        publishDate
        due
        partnerUpDeadline
      }
    `
  });
  if (!taskTemplate) {
    history.replace('/admin/tasks/current');
    return <TaskFormLoading />;
  }
  return (
    <>
      <H1 centered marginBottom marginTop>Edit future tasks</H1>
      <MarginWrapper marginBottom marginTop marginLeft marginRight>
        <RegularCopy>
          <InlineItalic>
            This form holds the details of your future tasks based on the details
            you typed in when you originally set up your task and its frequency.
          </InlineItalic>
        </RegularCopy>
      </MarginWrapper>
      <HorizontalRule grayLevel={3} />
      <TaskForm isTemplate task={taskTemplate} onSubmit={updateTaskListener} />
    </>
  )
};

export default addPageData(withRouter(EditTask), { slug, title });
