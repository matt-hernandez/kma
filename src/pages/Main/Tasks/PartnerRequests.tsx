import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Task from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { REQUESTED_PARTNER_TASKS, ME, MY_TASKS } from '../../../apollo-client/query/user';
import { COMMIT_TO_TASK } from '../../../apollo-client/mutation/user';
import { Task as TaskInterface, User } from '../../../apollo-client/types/user';
import generateCacheUpdate from '../../../util/generate-cache-update';

const slug = '/requests';
const title = 'Partner Requests';

const PartnerRequests: React.FunctionComponent<RouteComponentProps> = ({
    history,
  }) => {
  const { loading: loadingMe, error: errorMe, data: me } = useQuery<User>(ME);
  const { loading: loadingRequestedPartnerTasks, error: errorRequestedPartnerTasks, data: requestedPartnerTasks } = useQuery<TaskInterface[]>(REQUESTED_PARTNER_TASKS);
  const { templatesToSkipCommitConfirm = [] } = (me || {});
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
      {requestedPartnerTasks && requestedPartnerTasks.map(({ cid, partnerUpDeadline, templateCid, connections, title, due, description }) => (
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
