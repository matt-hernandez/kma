import React from 'react';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect, commitToAgreement } from '../../util/state';
import { formatDueDate } from '../../util/format-due-date';

const MyAgreements: React.FunctionComponent<StateProps> = ({ dispatch, state: { myAgreements } }) => (
  <>
    {myAgreements.map(({ id, expiration, title, due, description, pendingPartners, confirmedPartners }) => (
      <Agreement
        key={id}
        isCommitted={true}
        expiration={expiration}
        onExpire={() => {}}
        pendingPartners={pendingPartners}
        confirmedPartners={confirmedPartners}
        title={title}
        due={formatDueDate(due)}
        description={description}
      />
    ))}
  </>
);

export default ourConnect()(MyAgreements);
