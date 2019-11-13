import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Task from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { MY_TASKS } from '../../../apollo-client/query/user';
import { readCachedQueryWithDefault } from '../../../apollo-client/client';
import { Task as TaskInterface } from '../../../apollo-client/types/user';

const slug = '/my';
const title = 'My Tasks';

const MyTasks: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const myTasks = readCachedQueryWithDefault<TaskInterface[]>({
    query: MY_TASKS
  }, 'myTasks', []);
  return (
    <>
      {myTasks.map(({ cid, partnerUpDeadline, title, due, description, connections }) =>  (
        <Task
          key={cid}
          isCommitted={true}
          partnerUpDeadline={partnerUpDeadline}
          pendingPartners={connections.filter(({ type }) => type === 'REQUEST_TO')}
          confirmedPartners={connections.filter(({ type }) => type === 'CONFIRMED')}
          partnerRequestsToMe={connections.filter(({ type }) => type === 'REQUEST_FROM')}
          title={title}
          due={due}
          description={description}
          onFindPartner={() => history.push(`/main/find-a-partner/${cid}`)}
          onConfirmRequest={(partnerId) => {
            // dispatch(confirmPartnerRequest(''))
          }}
          onDenyRequest={(partnerId) => {
            // dispatch(denyPartnerRequest(''))
          }}
        />
      ))}
    </>
  );
};

export default addPageData(withRouter(MyTasks), { slug, title });
