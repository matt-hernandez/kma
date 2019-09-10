import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect } from '../../util/state';
import { addPageData } from '../../util/add-page-data';

const slug = '/requests';
const title = 'Partner Requests';

const PartnerRequests: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    dispatch,
    history,
    state: { requestsToBePartner, today }
  }) => (
  <>
    {requestsToBePartner.map(({ id, partnerUpDeadline, partnerRequests, title, due, description }) => (
      <Agreement
        key={id}
        isCommitted={false}
        partnerUpDeadline={partnerUpDeadline}
        title={title}
        due={due}
        description={description}
        partnerRequests={partnerRequests.map(({name}) => name)}
        debugNow={today}
      />
    ))}
  </>
);

export default addPageData(withRouter(ourConnect()(PartnerRequests)), { slug, title });
