import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect, confirmPartnerRequest, denyPartnerRequest } from '../../util/state';
import { addPageData } from '../../util/add-page-data';

const slug = '/my';
const title = 'My Agreements';

const MyAgreements: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    dispatch,
    history,
    state: { myAgreements, today, me }
  }) => (
  <>
    {myAgreements.map(({ cid, partnerUpDeadline, title, due, description, connections }) => (
      <Agreement
        key={cid}
        isCommitted={true}
        partnerUpDeadline={partnerUpDeadline}
        pendingPartners={connections.filter(({ type }) => type === 'REQUEST_TO')}
        confirmedPartners={connections.filter(({ type }) => type === 'CONFIRMED')}
        partnerRequestsToMe={connections.filter(({ type }) => type === 'REQUEST_FROM')}
        title={title}
        due={due}
        description={description}
        onFindPartner={() => history.push(`/find-a-partner/${cid}`)}
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

export default addPageData(withRouter(ourConnect()(MyAgreements)), { slug, title });
