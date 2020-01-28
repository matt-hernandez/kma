import React from 'react';
import { IonButton, IonList, IonCheckbox, IonLabel } from '@ionic/react';
import ModalContainer, { ModalProps } from '../ModalContainer';
import H1 from '../H1';
import RegularCopy from '../RegularCopy';
import MarginWrapper from '../MarginWrapper';
import { Outcome, ConnectionForAdmin } from '../../apollo-client/types/admin';
import UserItem from '../UserItem';
import { useStateHelper, listenerTypes } from '../../util/use-state-helper';
import InlineBold from '../InlineBold';
import InlineColor from '../InlineColor';

type Props = {
  connections: ConnectionForAdmin[],
  outcome: Outcome,
  name: string
};

export const ChangeTaskStatusModal: React.FunctionComponent<ModalProps & Props> = ({
    onConfirm = () => {},
    onDismiss,
    isOpen,
    connections,
    outcome,
    name
  }) => {
  const [ shouldAffectPartners, toggleShouldAffectPartners ] = useStateHelper(false, listenerTypes.TOGGLE);
  return (
    <ModalContainer isOpen={isOpen} onDismiss={onDismiss}>
      <H1 grayLevel={8}>Change Status</H1>
      <RegularCopy grayLevel={7}>
        Here you can change the status of a user's task from 'Completed' to 'Broken', or vice versa.
        You can also choose whether or not this change should impact the scores of their partners.
      </RegularCopy>
      <RegularCopy grayLevel={7}>
        Currently, this task for {name} is {
          outcome.type === 'BROKEN'
          ? <InlineBold><InlineColor color="red">BROKEN</InlineColor></InlineBold>
          : outcome.type === 'BROKEN_OMIT_PARTNER'
          ? <InlineBold><InlineColor color="red">BROKEN</InlineColor> but not affecting their partners' scores</InlineBold>
          : outcome.type === 'FULFILLED'
          ? <InlineBold><InlineColor color="green">FULFILLED</InlineColor></InlineBold>
          : <InlineBold><InlineColor color="green">FULFILLED</InlineColor> but not affecting their partners' scores</InlineBold>
        }
      </RegularCopy>
      {connections.length > 0 && (
        <>
          <RegularCopy grayLevel={7}>
            {shouldAffectPartners && 'The following people will have their scores affected by this change.'}
            {!shouldAffectPartners && (
              <>
                The following people <InlineBold>WILL NOT</InlineBold> have their scores affected by this change.
              </>
            )}
          </RegularCopy>
          <IonList>
            {connections.map(({ toCid, cid, fromName, toName }) => {
              const name = outcome.userCid === toCid ? fromName : toName;
              return <UserItem key={cid} name={name} />
            })}
          </IonList>
        </>
      )}
      <MarginWrapper marginTop marginBottom>
        <IonCheckbox checked={shouldAffectPartners} onChange={toggleShouldAffectPartners} />
        <IonLabel onClick={toggleShouldAffectPartners}>
          Change the scores of this user's partners for this task.
        </IonLabel>
      </MarginWrapper>
      <MarginWrapper marginTop marginBottom>
        {(outcome.type === 'BROKEN' || outcome.type === 'BROKEN_OMIT_PARTNER') && (
          <IonButton expand="block" color="primary" onClick={() => {
            if (shouldAffectPartners) {
              onConfirm('FULFILLED');
            } else {
              onConfirm('FULFILLED_OMIT_PARTNER')
            }
          }}>Change agreement to 'Fulfilled'</IonButton>
        )}
        {(outcome.type === 'FULFILLED' || outcome.type === 'FULFILLED_OMIT_PARTNER') && (
          <IonButton expand="block" color="danger" onClick={() => {
            if (shouldAffectPartners) {
              onConfirm('BROKEN');
            } else {
              onConfirm('BROKEN_OMIT_PARTNER');
            }
          }}>Change agreement to 'Broken'</IonButton>
        )}
      </MarginWrapper>
    </ModalContainer>
  );
};
