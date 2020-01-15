import React, { useContext } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RouteComponentProps, withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import { CURRENT_TASKS, UPCOMING_TASKS } from '../../apollo-client/query/admin';
import { UPDATE_TASK } from '../../apollo-client/mutation/admin';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { TaskForAdmin } from '../../apollo-client/types/admin';
import { ToastContext } from '../../contexts/ToastContext';
import TaskForm, { TaskFormData, TaskFormLoading } from '../../components/TaskForm';
import H1 from '../../components/H1';
import MarginWrapper from '../../components/MarginWrapper';
import RegularCopy from '../../components/RegularCopy';
import CustomLink from '../../components/CustomLink';
import { RouteParams } from '../../util/interface-overrides';
import client from '../../apollo-client/client';
import InlineItalic from '../../components/InlineItalic';
import HorizontalRule from '../../components/HorizontalRule';

const slug = '/tasks/edit/:cid';
const title = 'Edit Task';

const EditTask: React.FunctionComponent<RouteComponentProps> = ({
    history,
    match
  }) => {
  const cid = (match.params as RouteParams)['cid'];
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const { loading: loadingCurrentTasks } = useQuery(CURRENT_TASKS);
  const { loading: loadingUpcomingTasks } = useQuery(UPCOMING_TASKS);
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
    updateTask({
      variables: {
        ...taskData,
        cid
      }
    }).then(({ data: modifiedTask }) => {
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
  const task: TaskFormData | null = client.readFragment({
    id: cid,
    fragment: gql`
      fragment task on TaskForAdmin {
        cid
        templateCid
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
      <H1 centered marginTop marginBottom>Edit task</H1>
      {task.templateCid && (
        <>
          <MarginWrapper marginTop marginBottom marginLeft marginRight>
            <RegularCopy>
              <InlineItalic>
                This task is set up to repeat at regular intervals. This form will only make changes to
                the currently existing task. To modify the settings for all future tasks that will be
                created after, <CustomLink href={`/admin/tasks/edit-recurring/${task.templateCid}`}>click here</CustomLink>.
              </InlineItalic>
            </RegularCopy>
          </MarginWrapper>
          <HorizontalRule grayLevel={3} />
        </>
      )}
      <TaskForm task={task} onSubmit={updateTaskListener} />
    </>
  )
};

export default addPageData(withRouter(EditTask), { slug, title });
