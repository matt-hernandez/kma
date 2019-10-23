import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Task from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { readCachedQuery } from '../../../apollo-client/client';
import { REQUESTED_PARTNER_TASKS } from '../../../apollo-client/queries/user';
import { Task as TaskInterface } from '../../../apollo-client/types/user';

const slug = '/requests';
const title = 'Partner Requests';

const PartnerRequests: React.FunctionComponent<RouteComponentProps> = ({
    history,
  }) => {
  const requestedPartnerTasks = readCachedQuery<TaskInterface[]>({
    query: REQUESTED_PARTNER_TASKS
  }, 'requestedPartnerTasks');
  return (
    <>
      {requestedPartnerTasks.map(({ cid, partnerUpDeadline, connections, title, due, description }) => (
        <Task
          key={cid}
          isCommitted={false}
          partnerUpDeadline={partnerUpDeadline}
          title={title}
          due={due}
          description={description}
          partnerRequestsToMe={connections.filter(({ type }) => type === 'REQUEST_FROM')}
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
