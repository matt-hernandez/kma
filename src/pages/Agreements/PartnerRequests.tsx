import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect, denyPartnerRequest, confirmPartnerRequest } from '../../util/state';
import { addPageData } from '../../util/add-page-data';

const slug = '/requests';
const title = 'Partner Requests';

const PartnerRequests: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    dispatch,
    history,
    state: { requestsToBePartner, today, me }
  }) => (
  <>
    {requestsToBePartner.map(({ cid, partnerUpDeadline, connections, title, due, description }) => (
      <Agreement
        key={cid}
        isCommitted={false}
        partnerUpDeadline={partnerUpDeadline}
        title={title}
        due={due}
        description={description}
        partnerRequestsToMe={connections.filter(({ type }) => type === 'REQUEST_FROM')}
        debugNow={today}
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

export default addPageData(withRouter(ourConnect()(PartnerRequests)), { slug, title });
