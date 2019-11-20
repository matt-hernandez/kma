import React, { useContext, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
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
  const commit = (taskCid: string) => commitToTask({ variables: { taskCid } })
    .then(() => {
      history.push(`/main/find-a-partner/${taskCid}`);
    });
  return (
    <>
      {openTasksLoading && (
        <>
          <TaskLoading />
          <TaskLoading />
          <TaskLoading />
        </>
      )}
      {openTasks && openTasks.map((task) => {
        const { cid, partnerUpDeadline, title, due, description, templateCid } = task;
        return (
          <Task
            key={cid}
            isCommitted={false}
            partnerUpDeadline={partnerUpDeadline}
            title={title}
            due={due}
            description={description}
            onCommit={() => {
              if (templateCid && templatesToSkipCommitConfirm.includes(templateCid)) {
                showLoadingScreen();
                commit(cid)
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
              const commitAndHideModal = () => commit(taskToCommitTo.cid).then(() => hideModal());
              if (skipConfirm) {
                skipFutureTasksWithTemplate({
                  variables: {
                    templateCid: taskToCommitTo.templateCid
                  }
                })
                  .then(commitAndHideModal)
                  .finally(() => hideLoadingScreen());
              } else {
                commitAndHideModal()
                  .finally(() => hideLoadingScreen());
              }
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
