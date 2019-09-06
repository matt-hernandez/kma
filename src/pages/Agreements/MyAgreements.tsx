import React from 'react';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect } from '../../util/state';
import { formatDueDate } from '../../util/format-due-date';
import { addPageData } from '../../util/add-page-data';

const slug = '/my';
const title = 'My Agreements';

const MyAgreements: React.FunctionComponent<StateProps> = ({ dispatch, state: { myAgreements } }) => (
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
      />
    ))}
  </>
);

export default addPageData(ourConnect()(MyAgreements), { slug, title });
