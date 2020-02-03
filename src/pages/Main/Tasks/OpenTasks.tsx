import React, { useContext, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import Task, { TaskLoading } from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { OPEN_TASKS, ME, MY_TASKS } from '../../../apollo-client/query/user';
import { COMMIT_TO_TASK, ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM } from '../../../apollo-client/mutation/user';
import { Task as TaskInterface, User } from '../../../apollo-client/types/user';
import { TaskCommitConfirmationModal } from '../../../components/Modal';
import generateCacheUpdate from '../../../util/generate-cache-update';
import useQueryHelper from '../../../util/use-query-helper';
import { useStateHelper, listenerTypes } from '../../../util/use-state-helper';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { ToastContext } from '../../../contexts/ToastContext';
import { writeCachedQuery, readCachedQuery } from '../../../apollo-client/client';

const slug = '/open';
const title = 'Open Tasks';

const OpenTasks: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const [ taskToCommitTo, setTaskToCommitTo ] = useState<TaskInterface>();
  const [ isModalOpen, showModal, hideModal ] = useStateHelper(false, listenerTypes.TOGGLE_MANUALLY);
  const { loading: openTasksLoading, error: errorOpenTasks, data: openTasks } = useQueryHelper<TaskInterface[]>(OPEN_TASKS, 'openTasks');
  const { loading: loadingMe, error: errorMe, data: me } = useQueryHelper(ME, 'me');
  const { templatesToSkipCommitConfirm = [] } = (me || {});
  const { showToast } = useContext(ToastContext);
  const [ skipFutureTasksWithTemplate ] = useMutation(ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM, {
    update: generateCacheUpdate<User>(
      'OVERWRITE_SINGLE_ITEM',
      { name: 'me', query: ME },
      'addTaskTemplateToSkipCommitConfirm'
    )
  });
  const [ commitToTask ] = useMutation(COMMIT_TO_TASK, {
    update: generateCacheUpdate<TaskInterface>(
      'TRANSFER_ITEM',
      {
        from: 'openTasks',
        fromQuery: OPEN_TASKS,
        to: 'myTasks',
        toQuery: MY_TASKS,
        sort: (d1, d2) => d1.due - d2.due
      },
      'commitToTask'
    )
  });
  const commit = (taskCid: string) => commitToTask({ variables: { taskCid } });
  const goToFindPartnerPage = (taskCid: string) => history.push(`/main/find-a-partner/${taskCid}`);
  const isPageLoading = loadingMe || openTasksLoading;
  return (
    <>
      {isPageLoading && (
        <>
          <TaskLoading />
          <TaskLoading />
          <TaskLoading />
        </>
      )}
      {openTasks && openTasks.map((task, i) => {
        const { cid, partnerUpDeadline, pointValue, title, due, description, templateCid, outcomeType } = task;
        return (
          <Task
            key={cid}
            outcomeType={outcomeType}
            showTooltips={i === 0}
            isCommitted={false}
            partnerUpDeadline={partnerUpDeadline}
            title={title}
            due={due}
            pointValue={pointValue}
            description={description}
            onCommit={() => {
              if (templateCid && templatesToSkipCommitConfirm.includes(templateCid)) {
                showLoadingScreen();
                commit(cid)
                  .then(() => goToFindPartnerPage(cid))
                  .finally(() => hideLoadingScreen());
              } else {
                setTaskToCommitTo(task);
                showModal();
              }
            }}
          />
        )
      })}
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

export default addPageData(withRouter(OpenTasks), { slug, title });
