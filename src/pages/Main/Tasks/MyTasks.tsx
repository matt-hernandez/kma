import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Task, { TaskLoading } from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { MY_TASKS, ME, MY_PAST_TASKS } from '../../../apollo-client/query/user';
import { Task as TaskInterface, User } from '../../../apollo-client/types/user';
import useQueryHelper from '../../../util/use-query-helper';
import { CONFIRM_PARTNER_REQUEST, CANCEL_PARTNER_REQUEST, DENY_PARTNER_REQUEST, MARK_TASK_AS_DONE, BREAK_COMMITMENT } from '../../../apollo-client/mutation/user';
import generateCacheUpdate from '../../../util/generate-cache-update';
import { ToastContext } from '../../../contexts/ToastContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { readCachedQuery, writeCachedQuery } from '../../../apollo-client/client';

const slug = '/my';
const title = 'My Tasks';

const MyTasks: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const { loading: loadingMe } = useQueryHelper<User>(ME, 'me');
  const { loading: loadingMyTasks, error: errorMyTasks, data: myTasks } = useQueryHelper<TaskInterface[]>(MY_TASKS, 'myTasks');
  const { showToast } = useContext(ToastContext);
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const [ confirmPartnerRequest ] = useMutation(CONFIRM_PARTNER_REQUEST, {
    update: generateCacheUpdate<TaskInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'myTasks',
        query: MY_TASKS
      },
      'confirmPartnerRequest'
    ),
  });
  const [ cancelPartnerRequest ] = useMutation(CANCEL_PARTNER_REQUEST, {
    update: generateCacheUpdate<TaskInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'myTasks',
        query: MY_TASKS
      },
      'cancelPartnerRequest'
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
  const [ markTaskAsDone ] = useMutation(MARK_TASK_AS_DONE, {
    update: generateCacheUpdate<TaskInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'myTasks',
        query: MY_TASKS
      },
      'markTaskAsDone'
    ),
  });
  const [ breakCommitment ] = useMutation(BREAK_COMMITMENT, {
    update: generateCacheUpdate<TaskInterface>(
      'TRANSFER_ITEM',
      {
        from: 'myTasks',
        fromQuery: MY_TASKS,
        to: 'myPastTasks',
        toQuery: MY_PAST_TASKS,
        sort: (d1, d2) => d1.due - d2.due
      },
      'breakCommitment'
    ),
  });
  const isPageLoading = loadingMe || loadingMyTasks;
  return (
    <>
      {isPageLoading && (
        <>
          <TaskLoading />
          <TaskLoading />
          <TaskLoading />
        </>
      )}
      {myTasks && myTasks.map((task) => {
        const { cid, pointValue, partnerUpDeadline, title, due, description, connections, outcomeType } = task;
        return (
          <Task
            key={cid}
            isCommitted={true}
            pointValue={pointValue}
            partnerUpDeadline={partnerUpDeadline}
            outcomeType={outcomeType}
            pendingPartners={connections.filter(({ type }) => type === 'REQUEST_TO')}
            confirmedPartners={connections.filter(({ type }) => type === 'CONFIRMED')}
            partnerRequestsToMe={connections.filter(({ type }) => type === 'REQUEST_FROM')}
            title={title}
            due={due}
            description={description}
            onFindPartner={() => history.push(`/main/find-a-partner/${cid}`)}
            onConfirmRequest={(connection) => {
              showLoadingScreen();
              confirmPartnerRequest({
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
            onCancelRequest={(connection) => {
              showLoadingScreen();
              cancelPartnerRequest({
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
            onMarkAsDone={() => {
              showLoadingScreen();
              markTaskAsDone({
                  variables: {
                    taskCid: cid
                  }
                })
                .catch((e: ApolloError) => {
                  if (e.networkError) {
                    showToast({
                      color: 'danger',
                      message: 'We couldn\'t connect to the internet. Please try again.'
                    });
                  } else {
                    showToast({
                      color: 'danger',
                      message: 'There was a problem marking your task as done. Please try again.'
                    });
                  }
                })
                .finally(hideLoadingScreen);
            }}
            onBreak={() => {
              showLoadingScreen();
              breakCommitment({
                  variables: {
                    taskCid: cid
                  }
                })
                .catch((e: ApolloError) => {
                  if (e.networkError) {
                    showToast({
                      color: 'danger',
                      message: 'We couldn\'t connect to the internet. Please try again.'
                    });
                  } else {
                    showToast({
                      color: 'danger',
                      message: 'There was a problem breaking your commitment. Please try again.'
                    });
                  }
                })
                .finally(hideLoadingScreen);
            }}
          />
        );
      })}
    </>
  );
};

export default addPageData(withRouter(MyTasks), { slug, title });
