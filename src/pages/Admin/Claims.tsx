import React, { useContext } from 'react';
import { addPageData } from '../../util/add-page-data';
import { CLAIMS, CURRENT_TASKS, PAST_TASKS, USERS } from '../../apollo-client/query/admin';
import { User as UserInterface } from '../../apollo-client/types/user';
import { TaskForAdmin } from '../../apollo-client/types/admin';
import { Outcome, ConfirmTaskAsDoneResult } from '../../apollo-client/types/admin';
import { UserLoading } from '../../components/User';
import useQueryHelper from '../../util/use-query-helper';
import Claim from '../../components/Claim';
import { useMutation } from '@apollo/react-hooks';
import { CONFIRM_AS_DONE, DENY_AS_DONE } from '../../apollo-client/mutation/admin';
import client from '../../apollo-client/client';
import { gql, ApolloError } from 'apollo-boost';
import { ToastContext } from '../../contexts/ToastContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';

const slug = '/claims';
const title = 'Claims';

function updateTaskAndOutcome(task: TaskForAdmin) {
  client.writeFragment<TaskForAdmin>({
    id: task.cid,
    fragment: gql`
      fragment task on TaskForAdmin {
        connections
        outcomes
      }
    `,
    data: {
      ...task
    }
  });
}

export default addPageData(() => {
  const { loading: loadingUsers, error: errorUsers, data: users } = useQueryHelper<UserInterface[]>(USERS, 'users');
  const { loading: loadingCurrentTasks, error: errorCurrentTasks, data: currentTasks } = useQueryHelper<TaskForAdmin[]>(CURRENT_TASKS, 'currentTasks');
  const { loading: loadingPastTasks, error: errorPastTasks, data: pastTasks } = useQueryHelper<TaskForAdmin[]>(PAST_TASKS, 'pastTasks');
  const { loading: loadingClaims, error: errorClaims, data: claims } = useQueryHelper<Outcome[]>(CLAIMS, 'claims');
  const [ confirmAsDone ] = useMutation(CONFIRM_AS_DONE, {
    update: (cache, { data }) => {
      const confirmedTask = data['confirmAsDone'] as ConfirmTaskAsDoneResult;
      updateTaskAndOutcome(confirmedTask.task);
      const outcome = confirmedTask.outcome;
      generateCacheUpdate(
        'REMOVE_ITEM',
        {
          name: 'claims',
          query: CLAIMS
        },
        'confirmedTask'
      )(cache, { data: { confirmedTask: outcome } });
    }
  });
  const [ denyAsDone ] = useMutation(DENY_AS_DONE, {
    update: (cache, { data }) => {
      const confirmedTask = data['denyAsDone'] as ConfirmTaskAsDoneResult;
      updateTaskAndOutcome(confirmedTask.task);
      const outcome = confirmedTask.outcome;
      generateCacheUpdate(
        'REMOVE_ITEM',
        {
          name: 'claims',
          query: CLAIMS
        },
        'confirmedTask'
      )(cache, { data: { confirmedTask: outcome } });
    }
  });
  const { showToast } = useContext(ToastContext);
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const loading = loadingCurrentTasks || loadingPastTasks || loadingClaims || loadingUsers;
  if (loading) {
    return (
      <>
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
      </>
    );
  }
  return (
    <>
      {claims.map(({ userCid, type, taskCid, cid }) => {
        const task = [...currentTasks, ...pastTasks].find(({ cid }) => cid === taskCid);
        const user = users.find(({ cid }) => cid === userCid);
        if (!task || !user) {
          return <></>;
        }
        const name = user.name;
        const title = task.title;
        const due = task.due;
        return (
          <Claim
            key={cid}
            name={name}
            taskTitle={title}
            taskDue={due}
            onConfirm={() => {
              showLoadingScreen();
              confirmAsDone({
                  variables: {
                    taskCid: task.cid,
                    userCid: user.cid
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
                      message: 'There was a problem confirming the task as done. Please try again.'
                    });
                  }
                })
                .finally(hideLoadingScreen);
            }}
            onDeny={() => {
              showLoadingScreen();
              denyAsDone({
                  variables: {
                    taskCid: task.cid,
                    userCid: user.cid
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
                      message: 'There was a problem denying the task as done. Please try again.'
                    });
                  }
                })
                .finally(hideLoadingScreen);
            }} />
        );
      })}
    </>
  );
}, { slug, title });
