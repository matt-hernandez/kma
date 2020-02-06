import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RouteComponentProps, withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { ToastContext } from '../../contexts/ToastContext';
import TaskForm, { TaskFormData, TaskFormLoading } from '../../components/TaskForm';
import H1 from '../../components/H1';
import RegularCopy from '../../components/RegularCopy';
import { RouteParams } from '../../util/interface-overrides';
import client from '../../apollo-client/client';
import MarginWrapper from '../../components/MarginWrapper';
import InlineItalic from '../../components/InlineItalic';
import HorizontalRule from '../../components/HorizontalRule';
import InlineBold from '../../components/InlineBold';
import { useMutationCreateTask, useMutationCreateTaskTemplate } from '../../apollo-client/hooks';
import { CURRENT_TASKS, UPCOMING_TASKS, TASK_TEMPLATES } from '../../apollo-client/queries';

const slug = '/tasks/create/:cid?';
const title = 'Create Task';

const CreateTask: React.FunctionComponent<RouteComponentProps> = ({
    history,
    match
  }) => {
  const createTask = useMutationCreateTask({
    update: (cache, { data: createdTask }) => {
      const updateCurrentTasks = generateCacheUpdate(
        'INSERT_ITEM',
        {
          name: 'currentTasks',
          query: CURRENT_TASKS,
          sort: (d1, d2) => d2.publishDate - d1.publishDate
        },
      );
      const updateUpcomingTasks = generateCacheUpdate(
        'INSERT_ITEM',
        {
          name: 'upcomingTasks',
          query: UPCOMING_TASKS,
          sort: (d1, d2) => d2.publishDate - d1.publishDate
        },
      );
      const item = createdTask;
      if (item.publishDate > Date.now()) {
        updateUpcomingTasks(cache, { data: createdTask });
      } else {
        updateCurrentTasks(cache, { data: createdTask });
      }
    }
  });
  const createTaskTemplate = useMutationCreateTaskTemplate({
    update: generateCacheUpdate(
      'INSERT_ITEM',
      {
        name: 'taskTemplates',
        query: TASK_TEMPLATES,
        sort: (d1, d2) => d1.publishDate - d2.publishDate
      }
    )
  });
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const createTaskListener = (taskData: TaskFormData) => {
    showLoadingScreen();
    createTask({ variables: taskData })
      .then(({ data: createdTask }) => {
        if (taskData.repeatFrequency) {
          return createTaskTemplate({
              variables: {
                taskCid: createdTask.cid,
                repeatFrequency: taskData.repeatFrequency
              }
            })
            .then(({ data }) => {
              client.writeFragment({
                id: createdTask.cid,
                fragment: gql`
                  fragment task on TaskForAdmin {
                    templateCid
                  }
                `,
                data: {
                  templateCid: data.cid
                }
              });
            })
            .catch(() => {
              showToast({
                color: 'warning',
                message: 'Your task was created, but there was a problem setting up recurring tasks.'
              });
            })
            .then(() => ({ data: createdTask }));
        }
        return { data: createdTask };
      })
      .then(({ data: createdTask }) => {
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
      })
      .catch(() => {
        showToast({
          color: 'danger',
          message: 'There was an error creating your task!'
        });
      })
      .finally(hideLoadingScreen);
  };
  const { loading: loadingCurrentTasks } = useQuery(CURRENT_TASKS);
  const { loading: loadingUpcomingTasks } = useQuery(UPCOMING_TASKS);
  if (loadingCurrentTasks || loadingUpcomingTasks) {
    return <TaskFormLoading />;
  }
  const cid = (match.params as RouteParams)['cid'];
  let task: TaskFormData | null = null
  if (cid) {
    task = client.readFragment({
      id: cid,
      fragment: gql`
        fragment task on TaskForAdmin {
          cid
          title
          due
          description
          templateCid
          pointValue
          partnerUpDeadline
          publishDate
        }
      `
    });
    if (!task) {
      history.replace('/admin/tasks/current');
      return <TaskFormLoading />;
    } else if (task.templateCid) {
      const taskTemplate = client.readFragment({
        id: task.templateCid,
        fragment: gql`
          fragment task on TaskTemplate {
            repeatFrequency
          }
        `
      });
      task.repeatFrequency = taskTemplate.repeatFrequency;
    }
  }
  return (
    <>
      <H1 centered marginBottom marginTop>Create task</H1>
      {task && (
        <>
          <MarginWrapper marginLeft marginRight>
            <RegularCopy>
              <InlineItalic>
                We copied your task details over to this form. Feel free to make any changes you
                wish. When you click on "Create task," a completely new task will be created. These
                changes <InlineBold>WILL NOT</InlineBold> affect your original task.
              </InlineItalic>
            </RegularCopy>
          </MarginWrapper>
          <HorizontalRule grayLevel={3} />
        </>
      )}
      {task
        ? <TaskForm isNew task={task} onSubmit={createTaskListener} />
        : <TaskForm isNew onSubmit={createTaskListener} />
      }
    </>
  )
};

export default addPageData(withRouter(CreateTask), { slug, title });
