import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect, getPartnerRequestsReceived } from '../../util/state';
import { addPageData } from '../../util/add-page-data';

const slug = '/requests';
const title = 'Partner Requests';

const PartnerRequests: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    dispatch,
    history,
    state: { requestsToBePartner, today, me }
  }) => (
  <>
    {requestsToBePartner.map(({ id, partnerUpDeadline, connections, title, due, description }) => (
      <Agreement
        key={id}
        isCommitted={false}
        partnerUpDeadline={partnerUpDeadline}
        title={title}
        due={due}
        description={description}
        partnerRequestsToMe={getPartnerRequestsReceived(connections, me.id).map(({fromName}) => fromName)}
        debugNow={today}
      />
    ))}
  </>
);

export default addPageData(withRouter(ourConnect()(PartnerRequests)), { slug, title });
