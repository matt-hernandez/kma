import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Task from '../../../components/Task';
import { StateProps, ourConnect, confirmPartnerRequest, denyPartnerRequest } from '../../../util/state';
import { addPageData } from '../../../util/add-page-data';
import { MY_TASKS, ME } from '../../../constants/graphql/user';
import apolloClient from '../../../util/apollo-client';

const slug = '/my';
const title = 'My Tasks';

const MyTasks: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const { myTasks } = apolloClient.readQuery({
    query: MY_TASKS
  }) as any;
  const { me } = apolloClient.readQuery({
    query: ME
  }) as any;
  return (
    <>
      {myTasks.map((task: any) => {
        const { cid, partnerUpDeadline, title, due, description, connections } = task;
        return (
          <Task
            key={cid}
            isCommitted={true}
            partnerUpDeadline={partnerUpDeadline}
            pendingPartners={connections.filter(({ type }: any) => type === 'REQUEST_TO')}
            confirmedPartners={connections.filter(({ type }: any) => type === 'CONFIRMED')}
            partnerRequestsToMe={connections.filter(({ type }: any) => type === 'REQUEST_FROM')}
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
        );
      })}
    </>
  );
};

export default addPageData(withRouter(ourConnect()(MyTasks)), { slug, title });
