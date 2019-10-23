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
import { StateProps, ourConnect, commitToTask, addTaskTemplateToSkip, State, User } from '../../../util/state';
import { formatDueDate } from '../../../util/date-time-helpers';
import { addPageData } from '../../../util/add-page-data';
import { useStateHelper, listenerTypes } from '../../../util/use-state-helper';
import apolloClient from '../../../util/apollo-client';
import FlexRow from '../../../components/FlexRow';
import { ArrayUnpacked } from '../../../declarations';
import { colors } from '../../../styles/colors';
import { OPEN_TASKS, ME, COMMIT_TO_TASK, MY_TASKS } from '../../../constants/graphql/user';
import { useMutation } from '@apollo/react-hooks';

const slug = '/open';
const title = 'Open Tasks';

const ModalPadding = styled.div`
  padding: 20px;
`;

const OpenTasks: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const [ showModal, setShowModal ] = useState(false);
  const [ commitOnModalDismiss, setCommitOnModalDismiss ] = useState(false);
  const commitOnModalDismissRef = useRef(commitOnModalDismiss); // using a ref for modal dismissal because of old callback being called when user commits to task
  const [ taskToConfirm, setTaskToConfirm ] = useState<ArrayUnpacked<State['openTasks']>>();
  const [ skipConfirm, toggleSkipConfirm ] = useStateHelper(false, listenerTypes.TOGGLE);
  const { openTasks } = apolloClient.readQuery({
    query: OPEN_TASKS
  }) as any;
  const { me } = apolloClient.readQuery({
    query: ME
  }) as any;
  const [ commitToTask ] = useMutation(COMMIT_TO_TASK);
  const refetchQueries = [
    { query: OPEN_TASKS },
    { query: MY_TASKS }
  ];
  const templatesToSkipCommitConfirm = me.templatesToSkipCommitConfirm;
  return (
    <>
      {openTasks.map((task: any) => {
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
                commitToTask({
                  variables: { taskCid: cid },
                  refetchQueries
                })
                  .then(() => {
                    history.push(`/main/confirmed/${cid}`);
                  });
              } else {
                setTaskToConfirm(task);
                setShowModal(true);
              }
            }}
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
                commitToTask({
                  variables: { taskCid: taskToConfirm.cid },
                  refetchQueries
                })
                  .then(() => {
                    history.push(`/main/confirmed/${taskToConfirm.cid}`);
                    setCommitOnModalDismiss(true);
                    setShowModal(false);
                    commitOnModalDismissRef.current = true;
                  });
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
