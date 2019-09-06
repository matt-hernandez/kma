import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import FlexColumn from '../components/FlexColumn';
import FlexCell from '../components/FlexCell';
import LargeCopy from '../components/LargeCopy';
import Spacer from '../components/Spacer';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';
import { ourConnect, StateProps, requestPartnerForAgreement } from '../util/state';
import { ReactComponent as UserPic } from '../assets/large-user-pic.svg';

const slug = '/confirm-partner/:agreementId/:partnerId';
const title = 'Confirm Partner';

const Half = styled(FlexCell)`
  position: relative;
`;

const ButtonsContainer = styled.div`
  width: 40%;
`;

const ConfirmPartnerRequest: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    match,
    history,
    dispatch,
    state: { otherUsers, myAgreements }
  }) => {
  const agreementId = (match.params as RouteParams)['agreementId'];
  const partnerId = (match.params as RouteParams)['partnerId'];
  const agreement = myAgreements.find(({id}) => id === agreementId);
  const partner = otherUsers.find(({id}) => id === partnerId);
  const title = agreement ? agreement.title : '';
  const name = partner ? partner.name : '';
  return (
    <FlexColumn centered shouldInflate>
        {(!title || !name) && (
          <>
            <Half shouldInflate>
              <FlexColumn shouldInflate alignBottom centeredHorizontal>
                <PageWrapper>
                  <LargeCopy centered>Bad request</LargeCopy>
                </PageWrapper>
              </FlexColumn>
            </Half>
            <Half shouldInflate>
              <FlexColumn shouldInflate centeredHorizontal>
                <PageWrapper>
                  <IonButton expand="block" color="primary" onClick={() => history.goBack()}>Go back</IonButton>
                </PageWrapper>
              </FlexColumn>
            </Half>
          </>
        )}
        {(title && name) && (
          <>
            <Half shouldInflate>
              <FlexColumn shouldInflate alignBottom centeredHorizontal>
                <UserPic />
                <PageWrapper>
                  <LargeCopy centered>Send a partner request to {name} for "{title}?"</LargeCopy>
                </PageWrapper>
              </FlexColumn>
            </Half>
            <Half shouldInflate>
              <FlexColumn shouldInflate centeredHorizontal>
                <Spacer height="4px" />
                <ButtonsContainer>
                  <IonButton expand="block" color="primary" onClick={() => {
                    dispatch(requestPartnerForAgreement(agreementId, partnerId));
                    history.push('/request-sent');
                  }}>
                    Yes, send!
                  </IonButton>
                  <Spacer height="4px" />
                  <IonButton expand="block" color="medium" fill="outline" onClick={() => history.goBack()}>Go back</IonButton>
                </ButtonsContainer>
              </FlexColumn>
            </Half>
          </>
        )}
    </FlexColumn>
  );
};

export default addPageData((withRouter(ourConnect()(ConfirmPartnerRequest))), { slug, title });
