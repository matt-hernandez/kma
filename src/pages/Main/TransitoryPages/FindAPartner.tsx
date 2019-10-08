import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import LargeCopy from '../../../components/LargeCopy';
import FlexColumn from '../../../components/FlexColumn';
import InlineBold from '../../../components/InlineBold';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { StateProps, ourConnect } from '../../../util/state';

const slug = '/find-a-partner/:cid';
const title = 'Find a Partner';

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 46%;
  width: 50%;
  justify-content: space-between;
  margin-top: 60px;
`;

const FindAPartner: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    history,
    match,
    state: { myAgreements }
  }) => {
  const agreementId = (match.params as RouteParams)['cid'];
  const agreement = myAgreements.find(({cid}) => cid === agreementId);
  if (!agreement) {
    return <Redirect to="/404" />
  }
  const myConnections = agreement.connections;
  const canRequestPartner = myConnections.length < 2;
  const hasSentRequest = myConnections.some(({ type }) => type === 'REQUEST_TO');
  const hasConfirmedPartner = myConnections.some(({ type }) => type === 'CONFIRMED');
  const hasReceivedRequest = myConnections.some(({ type }) => type === 'REQUEST_FROM');
  return (
    <FlexColumn shouldInflate centeredHorizontal>
      <PageContent>
          {canRequestPartner && (
            <>
              {myConnections.length === 0 && (
                <>
                  <LargeCopy centered>
                    It's time to find a partner for:
                  </LargeCopy>
                  <LargeCopy centered>
                    <InlineBold>{`"${agreement.title}."`}</InlineBold>
                  </LargeCopy>
                  <LargeCopy centered>
                    You can do one of two things.
                  </LargeCopy>
                </>
              )}
              {myConnections.length > 0 && (
                <>
                  {hasSentRequest && (
                    <>
                      <LargeCopy centered>
                        You already have a pending partner request for:
                      </LargeCopy>
                      <LargeCopy centered>
                        <InlineBold>{`"${agreement.title}."`}</InlineBold>
                      </LargeCopy>
                      <LargeCopy centered>
                        You are allowed to send one more additional request.
                      </LargeCopy>
                    </>
                  )}
                  {hasConfirmedPartner && (
                    <>
                      <LargeCopy centered>
                        You already have a confirmed partner for:
                      </LargeCopy>
                      <LargeCopy centered>
                        <InlineBold>{`"${agreement.title}."`}</InlineBold>
                      </LargeCopy>
                      <LargeCopy centered>
                        You are allowed to request one more additional partner.
                      </LargeCopy>
                    </>
                  )}
                  {hasReceivedRequest && (
                    <>
                      <LargeCopy centered>
                        You have already received a partner request for:
                      </LargeCopy>
                      <LargeCopy centered>
                        <InlineBold>{`"${agreement.title}."`}</InlineBold>
                      </LargeCopy>
                      <LargeCopy centered>
                        You are allowed to send one more request of your own to an additional partner.
                      </LargeCopy>
                    </>
                  )}
                </>
              )}
            </>
          )}
          {!canRequestPartner && (
            <>
              <LargeCopy centered>
                You have reached the maximum number of partners for:
              </LargeCopy>
              <LargeCopy centered>
                <InlineBold>{`"${agreement.title}."`}</InlineBold>
              </LargeCopy>
            </>
          )}
        {canRequestPartner && (
          <>
            <IonButton expand="block" color="primary" onClick={() => history.push(`/main/partner-search/${agreementId}`)}>Direct message a person</IonButton>
            <LargeCopy centered>Or</LargeCopy>
            <IonButton expand="block" color="primary" onClick={() => history.push(`/main/user-pool/${agreementId}`)}>Choose from others who have made the same agreement</IonButton>
          </>
        )}
        {!canRequestPartner && (
          <IonButton expand="block" color="primary" onClick={() => {
            history.push('/main/agreements/my');
          }}>
            Go to My Agreements
          </IonButton>
        )}
      </PageContent>
    </FlexColumn>
  );
};

export default addPageData(ourConnect()(withRouter(FindAPartner)), { slug, title });
