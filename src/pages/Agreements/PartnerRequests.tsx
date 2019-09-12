import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect, getPartnerRequestsReceived, getPartnerRequestsSent, getConfirmedPartnershipsReceived, getConfirmedPartnershipsSent, denyPartnerRequest, confirmPartnerRequest } from '../../util/state';
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
        pendingPartners={getPartnerRequestsSent(connections, me.id).map(({to, toName}) => ({ id: to, name: toName}))}
        confirmedPartners={
          getConfirmedPartnershipsSent(connections, me.id).map(({to, toName}) => ({ id: to, name: toName}))
            .concat(getConfirmedPartnershipsReceived(connections, me.id).map(({from, fromName}) => ({ id: from, name: fromName})))
        }
        partnerRequestsToMe={getPartnerRequestsReceived(connections, me.id).map(({from, fromName}) => ({ id: from, name: fromName}))}
        debugNow={today}
        onConfirmRequest={(partnerId) => dispatch(confirmPartnerRequest(id, partnerId))}
        onDenyRequest={(partnerId) => dispatch(denyPartnerRequest(id, partnerId))}
      />
    ))}
  </>
);

export default addPageData(withRouter(ourConnect()(PartnerRequests)), { slug, title });
