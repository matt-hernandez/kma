import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Task from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { readCachedQuery } from '../../../apollo-client/client';
import { REQUESTED_PARTNER_TASKS, ME, COMMIT_TO_TASK, MY_TASKS } from '../../../apollo-client/queries/user';
import { Task as TaskInterface, User } from '../../../apollo-client/types/user';

const slug = '/requests';
const title = 'Partner Requests';

const PartnerRequests: React.FunctionComponent<RouteComponentProps> = ({
    history,
  }) => {
  const { templatesToSkipCommitConfirm } = readCachedQuery<User>({
    query: ME
  }, 'me');
  const requestedPartnerTasks = readCachedQuery<TaskInterface[]>({
    query: REQUESTED_PARTNER_TASKS
  }, 'requestedPartnerTasks');
  const [ commitToTask ] = useMutation(COMMIT_TO_TASK, {
    update(cache, { data: { commitToTask } }) {
      const cachedRequestedPartnerTasks = readCachedQuery<TaskInterface[]>({
        query: REQUESTED_PARTNER_TASKS
      }, 'requestedPartnerTasks');
      let cachedMyTasks = readCachedQuery<TaskInterface[]>({
        query: MY_TASKS
      }, 'myTasks');
      cache.writeQuery({
        query: REQUESTED_PARTNER_TASKS,
        data: { requestedPartnerTasks: cachedRequestedPartnerTasks.filter(({cid}) => cid !== commitToTask.cid) },
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
      {requestedPartnerTasks.map(({ cid, partnerUpDeadline, templateCid, connections, title, due, description }) => (
        <Task
          key={cid}
          isCommitted={false}
          partnerUpDeadline={partnerUpDeadline}
          title={title}
          due={due}
          description={description}
          partnerRequestsToMe={connections.filter(({ type }) => type === 'REQUEST_FROM')}
          onCommit={() => {
            if (templateCid && templatesToSkipCommitConfirm.includes(templateCid)) {
              commitToTask({
                variables: { taskCid: cid }
              })
                .then(() => {
                  history.push(`/main/confirmed/${cid}`);
                });
            } else {
              // setTaskToConfirm(task);
              // setShowModal(true);
            }
          }}
          onConfirmRequest={(partnerId) => {
            // dispatch(confirmPartnerRequest(''))
          }}
          onDenyRequest={(partnerId) => {
            // dispatch(denyPartnerRequest(''))
          }}
        />
      ))}
      
    </>
  )
};

export default addPageData(withRouter(PartnerRequests), { slug, title });
