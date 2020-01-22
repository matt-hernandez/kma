import React from 'react';
import FlexRow from '../FlexRow';
import { IonLabel, IonCheckbox, IonButton } from '@ionic/react';
import ModalContainer, { ModalProps } from '../ModalContainer';
import H1 from '../H1';
import LargeCopy from '../LargeCopy';
import RegularCopy from '../RegularCopy';
import InlineColor from '../InlineColor';
import InlineBold from '../InlineBold';
import Spacer from '../Spacer';
import MarginWrapper from '../MarginWrapper';
import { Task } from '../../apollo-client/types/user';
import { formatDueDate } from '../../util/date-time';
import { colors } from '../../styles/colors';
import { useStateHelper, listenerTypes } from '../../util/use-state-helper';

interface Props extends ModalProps {
  task: Task;
}

export const TaskCommitConfirmationModal: React.FunctionComponent<Props> = ({
    task: {
      title,
      due,
      description,
      templateCid
    },
    onConfirm = () => {},
    onDismiss,
    isOpen
  }) => {
  const [ skipConfirm, toggleSkipConfirm ] = useStateHelper(false, listenerTypes.TOGGLE);
  return (
    <ModalContainer isOpen={isOpen} onDismiss={onDismiss}>
      <H1 grayLevel={8}>Ready to commit to this?</H1>
      <Spacer height="6px" />
      <LargeCopy grayLevel={8} marginTop>{title}</LargeCopy>
      <RegularCopy grayLevel={7}><InlineBold>{formatDueDate(due)}</InlineBold></RegularCopy>
      {typeof description === 'string' && (
        <RegularCopy grayLevel={7}>
          {description}
        </RegularCopy>
      )}
      <Spacer height="20px" />
      {templateCid && (
        <FlexRow>
          <IonCheckbox checked={skipConfirm} onChange={toggleSkipConfirm} />
          <IonLabel onClick={toggleSkipConfirm}>
            <InlineColor color={colors.gray8}>
              Don't ask again to confirm for this type of task
            </InlineColor>
          </IonLabel>
        </FlexRow>
      )}
      <Spacer height="6px" />
      <MarginWrapper marginTop marginBottom>
        <IonButton expand="block" color="primary" onClick={() => {
          onConfirm({ skipConfirm });
        }}>Yes, commit!</IonButton>
      </MarginWrapper>
      <IonButton expand="block" color="medium" fill="outline" onClick={onDismiss}>Nevermind</IonButton>
    </ModalContainer>
  )
};
