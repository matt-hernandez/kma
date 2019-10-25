import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Task from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { readCachedQueryWithDefault } from '../../../apollo-client/client';
import { REQUESTED_PARTNER_TASKS, ME, COMMIT_TO_TASK, MY_TASKS } from '../../../apollo-client/queries/user';
import { Task as TaskInterface, User } from '../../../apollo-client/types/user';
import { DefaultUser } from '../../../apollo-client/defaults/user';
import generateCacheUpdate from '../../../util/generate-cache-update';

const slug = '/requests';
const title = 'Partner Requests';

const PartnerRequests: React.FunctionComponent<RouteComponentProps> = ({
    history,
  }) => {
  const { templatesToSkipCommitConfirm } = readCachedQueryWithDefault<User>({
    query: ME
  }, 'me', new DefaultUser());
  const requestedPartnerTasks = readCachedQueryWithDefault<TaskInterface[]>({
    query: REQUESTED_PARTNER_TASKS
  }, 'requestedPartnerTasks', []);
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
