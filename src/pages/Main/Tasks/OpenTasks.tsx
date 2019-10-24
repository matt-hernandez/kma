import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Task from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { readCachedQuery } from '../../../apollo-client/client';
import { OPEN_TASKS, ME, COMMIT_TO_TASK, MY_TASKS } from '../../../apollo-client/queries/user';
import { Task as TaskInterface, User } from '../../../apollo-client/types/user';
import { ModalContext } from '../../../contexts/ModalContext';

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
  const [ commitToTask ] = useMutation(COMMIT_TO_TASK, {
    update(cache, { data: { commitToTask } }) {
      const cachedOpenTasks = readCachedQuery<TaskInterface[]>({
        query: OPEN_TASKS
      }, 'openTasks');
      let cachedMyTasks = readCachedQuery<TaskInterface[]>({
        query: MY_TASKS
      }, 'myTasks');
      cache.writeQuery({
        query: OPEN_TASKS,
        data: { openTasks: cachedOpenTasks.filter(({cid}) => cid !== commitToTask.cid) },
      });
      cachedMyTasks = [ ...cachedMyTasks, commitToTask ];
      cachedMyTasks.sort((d1, d2) => {
        return d1.due - d2.due;
      });
      cache.writeQuery({
        query: MY_TASKS,
        data: { myTasks: cachedMyTasks },
      });
    }
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
              const onConfirm = () => {
                commitToTask({
                  variables: { taskCid: cid }
                })
                  .then(() => {
                    hideModalRef.current();
                    history.push(`/main/confirmed/${cid}`);
                  });
              };
              if (templateCid && templatesToSkipCommitConfirm.includes(templateCid)) {
                onConfirm();
              } else {
                showModal({
                  type: 'TASK_CONFIRM_COMMIT',
                  content: task,
                  manualDismiss: true,
                  onConfirm
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
