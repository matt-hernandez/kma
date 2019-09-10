import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import LargeCopy from '../components/LargeCopy';
import FlexColumn from '../components/FlexColumn';
import InlineBold from '../components/InlineBold';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';
import { StateProps, ourConnect, findMyConnections, getPartnerRequestsSent, getPartnerRequestsReceived, getAllMyConfirmedPartnerships } from '../util/state';

const slug = '/find-a-partner/:id';
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
    state: { myAgreements, me }
  }) => {
  const agreementId = (match.params as RouteParams)['id'];
  const agreement = myAgreements.find(({id}) => id === agreementId);
  if (!agreement) {
    return <Redirect to="/404" />
  }
  const myConnections = findMyConnections(agreement.connections, me.id);
  const canRequestPartner = myConnections.length < 2;
  const hasSentRequest = getPartnerRequestsSent(myConnections, me.id).length > 0;
  const hasReceivedRequest = getPartnerRequestsReceived(myConnections, me.id).length > 0;
  const hasConfirmedPartner = getAllMyConfirmedPartnerships(myConnections, me.id).length > 0;
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
            <IonButton expand="block" color="primary" onClick={() => history.push(`/partner-search/${agreementId}`)}>Direct message a person</IonButton>
            <LargeCopy centered>Or</LargeCopy>
            <IonButton expand="block" color="primary" onClick={() => history.push(`/user-pool/${agreementId}`)}>Choose from others who have made the same agreement</IonButton>
          </>
        )}
        {!canRequestPartner && (
          <IonButton expand="block" color="primary" onClick={() => {
            history.push('/agreements/my');
          }}>
            Go to My Agreements
          </IonButton>
        )}
      </PageContent>
    </FlexColumn>
  );
};

export default addPageData(ourConnect()(withRouter(FindAPartner)), { slug, title });
