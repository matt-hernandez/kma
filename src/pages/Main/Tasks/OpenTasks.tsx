import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Task from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { readCachedQuery } from '../../../apollo-client/client';
import { OPEN_TASKS, ME, COMMIT_TO_TASK, MY_TASKS, ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM } from '../../../apollo-client/queries/user';
import { Task as TaskInterface, User } from '../../../apollo-client/types/user';
import { ModalContext } from '../../../contexts/ModalContext';
import generateCacheUpdate from '../../../util/generate-cache-update';

const slug = '/open';
const title = 'Open Tasks';

const OpenTasks: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const { showModal, hideModalRef } = useContext(ModalContext);
  const openTasks = readCachedQuery<TaskInterface[]>({
    query: OPEN_TASKS
  }, 'openTasks');
  const { templatesToSkipCommitConfirm } = readCachedQuery<User>({
    query: ME
  }, 'me');
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
  return (
    <>
      {openTasks.map((task) => {
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
              const commit = () => {
                commitToTask({
                  variables: { taskCid: cid }
                })
                  .then(() => {
                    hideModalRef.current();
                    history.push(`/main/confirmed/${cid}`);
                  });
              };
              if (templateCid && templatesToSkipCommitConfirm.includes(templateCid)) {
                commit();
              } else {
                showModal({
                  type: 'TASK_CONFIRM_COMMIT',
                  content: task,
                  manualDismiss: true,
                  onConfirm: ({ skipConfirm }) => {
                    if (skipConfirm) {
                      skipFutureTasksWithTemplate()
                        .then(commit);
                    } else {
                      commit();
                    }
                  }
                });
              }
            }}
          />
        )
      })}
    </>
  )
};

export default addPageData(withRouter(OpenTasks), { slug, title });
