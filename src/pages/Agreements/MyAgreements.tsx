import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect } from '../../util/state';
import { formatDueDate } from '../../util/format-due-date';
import { addPageData } from '../../util/add-page-data';

const slug = '/my';
const title = 'My Agreements';

const MyAgreements: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    dispatch,
    history,
    state: { myAgreements } }
  ) => (
  <>
    {myAgreements.map(({ id, expiration, title, due, description, pendingPartners, confirmedPartners }) => (
      <Agreement
        key={id}
        isCommitted={true}
        expiration={expiration}
        onExpire={() => {}}
        pendingPartners={pendingPartners.map(({name}) => name)}
        confirmedPartners={confirmedPartners.map(({name}) => name)}
        title={title}
        due={formatDueDate(due)}
        description={description}
        onFindPartner={() => history.push(`/find-a-partner/${id}`)}
      />
    ))}
  </>
);

export default addPageData(withRouter(ourConnect()(MyAgreements)), { slug, title });
