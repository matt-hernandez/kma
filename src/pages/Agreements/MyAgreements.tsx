import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect, getPartnerRequestsSent, getConfirmedPartnershipsSent, getConfirmedPartnershipsReceived, getPartnerRequestsReceived, confirmPartnerRequest, denyPartnerRequest } from '../../util/state';
import { addPageData } from '../../util/add-page-data';

const slug = '/my';
const title = 'My Agreements';

const MyAgreements: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    dispatch,
    history,
    state: { myAgreements, today, me }
  }) => (
  <>
    {myAgreements.map(({ id, partnerUpDeadline, title, due, description, connections }) => (
      <Agreement
        key={id}
        isCommitted={true}
        partnerUpDeadline={partnerUpDeadline}
        pendingPartners={getPartnerRequestsSent(connections, me.id).map(({to, toName}) => ({ id: to, name: toName}))}
        confirmedPartners={
          getConfirmedPartnershipsSent(connections, me.id).map(({to, toName}) => ({ id: to, name: toName}))
            .concat(getConfirmedPartnershipsReceived(connections, me.id).map(({from, fromName}) => ({ id: from, name: fromName})))
        }
        partnerRequestsToMe={getPartnerRequestsReceived(connections, me.id).map(({from, fromName}) => ({ id: from, name: fromName}))}
        title={title}
        due={due}
        description={description}
        onFindPartner={() => history.push(`/find-a-partner/${id}`)}
        debugNow={today}
        onConfirmRequest={(partnerId) => dispatch(confirmPartnerRequest(id, partnerId))}
        onDenyRequest={(partnerId) => dispatch(denyPartnerRequest(id, partnerId))}
      />
    ))}
  </>
);

export default addPageData(withRouter(ourConnect()(MyAgreements)), { slug, title });
