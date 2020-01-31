import React, { useContext, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import Task, { TaskLoading } from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { REQUESTED_PARTNER_TASKS, ME, MY_TASKS, OPEN_TASKS } from '../../../apollo-client/query/user';
import { COMMIT_TO_TASK, CONFIRM_PARTNER_REQUEST, DENY_PARTNER_REQUEST, ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM } from '../../../apollo-client/mutation/user';
import { Task as TaskInterface, User } from '../../../apollo-client/types/user';
import generateCacheUpdate from '../../../util/generate-cache-update';
import useQueryHelper from '../../../util/use-query-helper';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { useStateHelper, listenerTypes } from '../../../util/use-state-helper';
import { ToastContext } from '../../../contexts/ToastContext';
import { readCachedQuery, writeCachedQuery } from '../../../apollo-client/client';
import { TaskCommitConfirmationModal } from '../../../components/Modal';

const slug = '/requests';
const title = 'Partner Requests';

const PartnerRequests: React.FunctionComponent<RouteComponentProps> = ({
    history,
  }) => {
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const [ taskToCommitTo, setTaskToCommitTo ] = useState<TaskInterface>();
  const [ isModalOpen, showModal, hideModal ] = useStateHelper(false, listenerTypes.TOGGLE_MANUALLY);
  const { loading: loadingMe, error: errorMe, data: me } = useQueryHelper<User>(ME, 'me');
  const { loading: loadingRequestedPartnerTasks, error: errorRequestedPartnerTasks, data: requestedPartnerTasks } = useQueryHelper<TaskInterface[]>(REQUESTED_PARTNER_TASKS, 'requestedPartnerTasks');
  const { templatesToSkipCommitConfirm = [] } = (me || {});
  const [ skipFutureTasksWithTemplate ] = useMutation(ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM, {
    update: generateCacheUpdate<User>(
      'OVERWRITE_SINGLE_ITEM',
      { name: 'me', query: ME },
      'addTaskTemplateToSkipCommitConfirm'
    )
  });
  const [ confirmPartnerRequest ] = useMutation(CONFIRM_PARTNER_REQUEST, {
    update: generateCacheUpdate<TaskInterface>(
      'TRANSFER_ITEM',
      {
        from: 'requestedPartnerTasks',
        fromQuery: REQUESTED_PARTNER_TASKS,
        to: 'myTasks',
        toQuery: MY_TASKS,
        sort: (d1, d2) => d1.due - d2.due
      },
      'confirmPartnerRequest'
    ),
  });
  const [ denyPartnerRequest ] = useMutation(DENY_PARTNER_REQUEST, {
    update: generateCacheUpdate<TaskInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'myTasks',
        query: MY_TASKS
      },
      'denyPartnerRequest'
    ),
  });
  const [ commitToTask ] = useMutation(COMMIT_TO_TASK, {
    update: generateCacheUpdate<TaskInterface>(
      'TRANSFER_ITEM',
      {
        from: 'requestedPartnerTasks',
        fromQuery: REQUESTED_PARTNER_TASKS,
        to: 'myTasks',
        toQuery: MY_TASKS,
        sort: (d1, d2) => d1.due - d2.due
      },
      'commitToTask'
    )
  });
  const commit = (taskCid: string) => commitToTask({ variables: { taskCid } });
  const goToMyTasks = () => history.push('/main/tasks/my');
  const goToFindPartnerPage = (taskCid: string) => history.push(`/main/find-a-partner/${taskCid}`);
  const isPageLoading = loadingMe || loadingRequestedPartnerTasks;
  return (
    <>
      {isPageLoading && (
        <>
          <TaskLoading />
          <TaskLoading />
          <TaskLoading />
        </>
      )}
      {requestedPartnerTasks && requestedPartnerTasks.map((task) => {
          const { cid, partnerUpDeadline, templateCid, connections, title, due, pointValue, description } = task;
          return (
            <Task
              key={cid}
              isCommitted={false}
              partnerUpDeadline={partnerUpDeadline}
              title={title}
              due={due}
              pointValue={pointValue}
              description={description}
              partnerRequestsToMe={connections.filter(({ type }) => type === 'REQUEST_FROM')}
              onCommit={() => {
                if (templateCid && templatesToSkipCommitConfirm.some(({ cid }) => cid === templateCid)) {
                  showLoadingScreen();
                  commit(cid)
                    .then(() => goToFindPartnerPage(cid))
                    .finally(() => hideLoadingScreen());
                } else {
                  setTaskToCommitTo(task);
                  showModal();
                }
              }}
              onConfirmRequest={(connection) => {
                showLoadingScreen();
                confirmPartnerRequest({
                    variables: {
                      taskCid: cid,
                      connectionCid: connection.cid
                    }
                  })
                  .then(goToMyTasks)
                  .catch((e: ApolloError) => {
                    if (e.networkError) {
                      showToast({
                        color: 'danger',
                        message: 'We couldn\'t connect to the internet. Please try again.'
                      });
                    } else if (e.graphQLErrors.some((e) => e.message.includes('Task is past deadline'))) {
                      showToast({
                        color: 'danger',
                        message: 'Enrollment for this task has expired. You can no longer confirm this partnership.'
                      });
                      let items = readCachedQuery<TaskInterface[]>({
                        query: MY_TASKS
                      }, 'myTasks');
                      const index = items.findIndex(({ cid }) => task.cid === cid);
                      items = [
                        ...items.slice(0, index),
                        {
                          ...task,
                          connections: task.connections.filter(conn => conn.cid !== connection.cid)
                        },
                        ...items.slice(index + 1),
                      ];
                      writeCachedQuery(MY_TASKS, 'myTasks', items);
                    }
                  })
                  .finally(hideLoadingScreen);
              }}
              onDenyRequest={(connection) => {
                showLoadingScreen();
                denyPartnerRequest({
                    variables: {
                      taskCid: cid,
                      connectionCid: connection.cid
                    }
                  })
                  .catch((e: ApolloError) => {
                    if (e.networkError) {
                      showToast({
                        color: 'danger',
                        message: 'We couldn\'t connect to the internet. Please try again.'
                      });
                    } else if (e.graphQLErrors.some((e) => e.message.includes('Task is past deadline'))) {
                      let items = readCachedQuery<TaskInterface[]>({
                        query: MY_TASKS
                      }, 'myTasks');
                      const index = items.findIndex(({ cid }) => task.cid === cid);
                      items = [
                        ...items.slice(0, index),
                        {
                          ...task,
                          connections: task.connections.filter(conn => conn.cid !== connection.cid)
                        },
                        ...items.slice(index + 1),
                      ];
                      writeCachedQuery(MY_TASKS, 'myTasks', items);
                    }
                  })
                  .finally(hideLoadingScreen);
              }}
            />
          );
        }
      )}
      {taskToCommitTo && (
        <TaskCommitConfirmationModal
          isOpen={isModalOpen}
          task={taskToCommitTo}
          onConfirm={({ skipConfirm }) => {
            if (taskToCommitTo) {
              showLoadingScreen();
              const navigate = () => goToFindPartnerPage(taskToCommitTo.cid);
              const skipFutureConfirm = () => skipFutureTasksWithTemplate({
                  variables: {
                    templateCid: taskToCommitTo.templateCid
                  }
                })
                .catch(() => {
                  showToast({
                    color: 'danger',
                    message: 'We got you committed to the task, but we couldn\'t save it as one to skip confirmation.'
                  });
                });
              const doCommit = () => commit(taskToCommitTo.cid).catch((e: ApolloError) => {
                if (e.networkError) {
                  showToast({
                    color: 'danger',
                    message: 'We couldn\'t connect to the internet. Please try again.'
                  });
                } else if (e.graphQLErrors.some((e) => e.message.includes('Task is past deadline'))) {
                  hideModal();
                  showToast({
                    color: 'danger',
                    message: 'That task is no longer available.'
                  });
                  let items = readCachedQuery<TaskInterface[]>({
                    query: OPEN_TASKS
                  }, 'openTasks');
                  const index = items.findIndex(({ cid }) => taskToCommitTo.cid === cid);
                  items = [
                    ...items.slice(0, index),
                    ...items.slice(index + 1),
                  ];
                  writeCachedQuery(OPEN_TASKS, 'openTasks', items);
                }
                throw e;
              });
              doCommit()
                .then(() => skipConfirm ? skipFutureConfirm() : Promise.resolve(null))
                .then(() => {
                  navigate();
                })
                .finally(() => hideLoadingScreen());
            }
          }}
          onDismiss={() => {
            hideModal();
          }}
        />
      )}
    </>
  )
};

export default addPageData(withRouter(PartnerRequests), { slug, title });
