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
import H1 from '../../components/H1';
import RegularCopy from '../../components/RegularCopy';
import { RouteParams } from '../../util/interface-overrides';
import client from '../../apollo-client/client';
import MarginWrapper from '../../components/MarginWrapper';
import InlineItalic from '../../components/InlineItalic';
import HorizontalRule from '../../components/HorizontalRule';

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
        sort: (d1, d2) => d1.publishDate - d2.publishDate
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
    const createTaskPromise = createTask({ variables: taskData }).then(({ data }) => createdTask = data);
    if (taskData.repeatFrequency) {
      createTaskPromise.then(({ cid }) => createTaskTemplate({
          variables: {
            taskCid: cid,
            repeatFrequency: taskData.repeatFrequency
          }
        }).then(({ data }) => {
          if (createdTask && data) {
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
          }
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
      <H1 centered marginBottom marginTop>Create tasks</H1>
      {task && (
        <>
          <MarginWrapper marginLeft marginRight>
            <RegularCopy>
              <InlineItalic>
                We copied your task details over to this form. Feel free to make any changes you wish.
                When you click on "Create task," a completely new task will be created. These changes
                WILL NOT affect your original task.
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
