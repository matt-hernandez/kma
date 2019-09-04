import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonModal, IonButton, IonCheckbox, IonLabel } from '@ionic/react';
import Agreement from '../../components/Agreement';
import H1 from '../../components/H1';
import LargeCopy from '../../components/LargeCopy';
import RegularCopy from '../../components/RegularCopy';
import InlineColor from '../../components/InlineColor';
import InlineBold from '../../components/InlineBold';
import Spacer from '../../components/Spacer';
import MarginWrapper from '../../components/MarginWrapper';
import { StateProps, ourConnect, commitToAgreement, addAgreementTemplateToSkip, State } from '../../util/state';
import { formatDueDate } from '../../util/format-due-date';
import { addPageData } from '../../util/add-page-data';
import { useStateHelper, listenerTypes } from '../../util/use-state-helper';
import FlexRow from '../../components/FlexRow';
import { ArrayUnpacked } from '../../util/ts-helpers';
import { colors } from '../../styles/colors';

const slug = '/open';
const title = 'Open Agreements';

const ModalPadding = styled.div`
  padding: 20px;
`;

const OpenAgreements: React.FunctionComponent<StateProps & RouteComponentProps> = ({
    dispatch,
    state: { openAgreements, skipConfirmCommitForThese },
    history
  }) => {
  const [ showModal, setShowModal ] = useState(false);
  const [ commitOnModalDismiss, setCommitOnModalDismiss ] = useState(false);
  const [ agreementToConfirm, setAgreementToConfirm ] = useState<ArrayUnpacked<State['openAgreements']>>();
  const [ skipConfirm, toggleSkipConfirm ] = useStateHelper(false, listenerTypes.TOGGLE);
  return (
    <>
      {openAgreements.map((agreement) => {
        const { id, expiration, title, due, description, templateId } = agreement;
        return (
          <Agreement
            key={id}
            isCommitted={false}
            expiration={expiration}
            onExpire={() => {}}
            title={title}
            due={formatDueDate(due)}
            description={description}
            onCommit={() => {
              if (skipConfirmCommitForThese.includes(templateId)) {
                dispatch(commitToAgreement(id));
                history.push(`/confirmed/${id}`);
              } else {
                setAgreementToConfirm(agreement);
                setShowModal(true);
              }
            }}
          />
        )
      })}
      {(agreementToConfirm !== undefined &&
        <IonModal isOpen={showModal} onDidDismiss={() => {
          setShowModal(false);
          if (commitOnModalDismiss) {
            history.push(`/confirmed/${agreementToConfirm.id}`);
          }
        }}>
          <ModalPadding>
            <H1 grayLevel={8}>Ready to commit to this?</H1>
            <Spacer height="6px" />
            <LargeCopy grayLevel={8} marginTop>{agreementToConfirm.title}</LargeCopy>
            <RegularCopy grayLevel={7}><InlineBold>{formatDueDate(agreementToConfirm.due)}</InlineBold></RegularCopy>
            {typeof agreementToConfirm.description === 'string' && (
              <RegularCopy grayLevel={7}>
                {agreementToConfirm.description}
              </RegularCopy>
            )}
            <Spacer height="20px" />
            <FlexRow>
              <IonCheckbox checked={skipConfirm} onChange={toggleSkipConfirm} />
              <IonLabel onClick={toggleSkipConfirm}>
                <InlineColor color={colors.gray8}>
                  Don't ask again to confirm for this type of agreement
                </InlineColor>
              </IonLabel>
            </FlexRow>
            <Spacer height="6px" />
            <MarginWrapper marginTop marginBottom>
              <IonButton expand="block" color="primary" onClick={() => {
                if (skipConfirm) {
                  dispatch(addAgreementTemplateToSkip(agreementToConfirm.templateId));
                }
                dispatch(commitToAgreement(agreementToConfirm.id));
                setCommitOnModalDismiss(true);
                setShowModal(false);
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
    withRouter(OpenAgreements)
  ),
  { slug, title }
);
