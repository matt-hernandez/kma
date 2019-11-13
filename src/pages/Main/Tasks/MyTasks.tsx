import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Task from '../../../components/Task';
import { addPageData } from '../../../util/add-page-data';
import { MY_TASKS } from '../../../apollo-client/query/user';
import { Task as TaskInterface } from '../../../apollo-client/types/user';
import { useQuery } from '@apollo/react-hooks';

const slug = '/my';
const title = 'My Tasks';

const MyTasks: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
    const { loading: loadingMyTasks, error: errorMyTasks, data: myTasks } = useQuery<TaskInterface[]>(MY_TASKS);
  return (
    <>
      {myTasks && myTasks.map(({ cid, partnerUpDeadline, title, due, description, connections }) =>  (
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
