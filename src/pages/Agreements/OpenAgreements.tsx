import React from 'react';
import Agreement from '../../components/Agreement';
import { StateProps, ourConnect, commitToAgreement } from '../../util/state';
import { formatDueDate } from '../../util/format-due-date';

const OpenAgreements: React.FunctionComponent<StateProps> = ({ dispatch, state: { openAgreements } }) => (
  <>
    {openAgreements.map(({ id, expiration, title, due, description }) => (
      <Agreement
        key={id}
        isCommitted={false}
        expiration={expiration}
        onExpire={() => {}}
        title={title}
        due={formatDueDate(due)}
        description={description}
        onCommit={() => dispatch(commitToAgreement(id))}
      />
    ))}
  </>
);

export default ourConnect()(OpenAgreements);
