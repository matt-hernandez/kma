import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonModal, IonButton, IonCheckbox, IonLabel } from '@ionic/react';
import Task from '../../../components/Task';
import H1 from '../../../components/H1';
import LargeCopy from '../../../components/LargeCopy';
import RegularCopy from '../../../components/RegularCopy';
import InlineColor from '../../../components/InlineColor';
import InlineBold from '../../../components/InlineBold';
import Spacer from '../../../components/Spacer';
import MarginWrapper from '../../../components/MarginWrapper';
import { StateProps, ourConnect, commitToTask, addTaskTemplateToSkip, State } from '../../../util/state';
import { formatDueDate } from '../../../util/date-time-helpers';
import { addPageData } from '../../../util/add-page-data';
import { useStateHelper, listenerTypes } from '../../../util/use-state-helper';
import FlexRow from '../../../components/FlexRow';
import { ArrayUnpacked } from '../../../declarations';
import { colors } from '../../../styles/colors';

const slug = '/open';
const title = 'Open Tasks';

const ModalPadding = styled.div`
  padding: 20px;
`;

const OpenTasks: React.FunctionComponent<StateProps & RouteComponentProps> = ({
    dispatch,
    state: { openTasks, me: { templatesToSkipCommitConfirm }, today },
    history
  }) => {
  const [ showModal, setShowModal ] = useState(false);
  const [ commitOnModalDismiss, setCommitOnModalDismiss ] = useState(false);
  const commitOnModalDismissRef = useRef(commitOnModalDismiss); // using a ref for modal dismissal because of old callback being called when user commits to task
  const [ taskToConfirm, setTaskToConfirm ] = useState<ArrayUnpacked<State['openTasks']>>();
  const [ skipConfirm, toggleSkipConfirm ] = useStateHelper(false, listenerTypes.TOGGLE);
  return (
    <>
      {openTasks.map((task) => {
        const { cid, partnerUpDeadline, title, due, description, templateCid } = task;
        return (
          <Task
            key={cid}
            isCommitted={false}
            partnerUpDeadline={partnerUpDeadline}
            title={title}
            due={due}
            description={description}
            onCommit={() => {
              if (templateCid && templatesToSkipCommitConfirm.includes(templateCid)) {
                // dispatch(commitToTask(cid));
                history.push(`/main/confirmed/${cid}`);
              } else {
                setTaskToConfirm(task);
                setShowModal(true);
              }
            }}
            debugNow={today}
          />
        )
      })}
      {(taskToConfirm !== undefined &&
        <IonModal isOpen={showModal} onDidDismiss={() => {
          setShowModal(false);
          if (commitOnModalDismissRef.current) {
            history.push(`/main/confirmed/${taskToConfirm.cid}`);
          }
        }}>
          <ModalPadding>
            <H1 grayLevel={8}>Ready to commit to this?</H1>
            <Spacer height="6px" />
            <LargeCopy grayLevel={8} marginTop>{taskToConfirm.title}</LargeCopy>
            <RegularCopy grayLevel={7}><InlineBold>{formatDueDate(taskToConfirm.due)}</InlineBold></RegularCopy>
            {typeof taskToConfirm.description === 'string' && (
              <RegularCopy grayLevel={7}>
                {taskToConfirm.description}
              </RegularCopy>
            )}
            <Spacer height="20px" />
            <FlexRow>
              <IonCheckbox checked={skipConfirm} onChange={toggleSkipConfirm} />
              <IonLabel onClick={toggleSkipConfirm}>
                <InlineColor color={colors.gray8}>
                  Don't ask again to confirm for this type of task
                </InlineColor>
              </IonLabel>
            </FlexRow>
            <Spacer height="6px" />
            <MarginWrapper marginTop marginBottom>
              <IonButton expand="block" color="primary" onClick={() => {
                if (skipConfirm && taskToConfirm.templateCid) {
                  // dispatch(addTaskTemplateToSkip(taskToConfirm.templateCid));
                }
                // dispatch(commitToTask(taskToConfirm.cid));
                setCommitOnModalDismiss(true);
                setShowModal(false);
                commitOnModalDismissRef.current = true;
              }}>Yes, commit!</IonButton>
            </MarginWrapper>
            <IonButton expand="block" color="medium" fill="outline" onClick={() => setShowModal(false)}>Nevermind</IonButton>
          </ModalPadding>
        </IonModal>
      )}
    </>
  )
};

export default addPageData(
  ourConnect()(
    withRouter(OpenTasks)
  ),
  { slug, title }
);