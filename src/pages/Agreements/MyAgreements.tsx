import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect, getPartnerRequestsSent, getConfirmedPartnershipsSent, getConfirmedPartnershipsReceived, getPartnerRequestsReceived } from '../../util/state';
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
        pendingPartners={getPartnerRequestsSent(connections, me.id).map(({toName}) => toName)}
        confirmedPartners={
          getConfirmedPartnershipsSent(connections, me.id).map(({toName}) => toName)
            .concat(getConfirmedPartnershipsReceived(connections, me.id).map(({fromName}) => fromName))
        }
        partnerRequestsToMe={getPartnerRequestsReceived(connections, me.id).map(({fromName}) => fromName)}
        title={title}
        due={due}
        description={description}
        onFindPartner={() => history.push(`/find-a-partner/${id}`)}
        debugNow={today}
      />
    ))}
  </>
);

export default addPageData(withRouter(ourConnect()(MyAgreements)), { slug, title });
