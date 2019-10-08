import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import FlexColumn from '../components/FlexColumn';
import FlexCell from '../components/FlexCell';
import LargeCopy from '../components/LargeCopy';
import Spacer from '../components/Spacer';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';
import { ourConnect, StateProps, requestPartnerForAgreement, clearSearchQuery } from '../util/state';
import { ReactComponent as UserPic } from '../assets/large-user-pic.svg';

const slug = '/confirm-partner/:agreementCid';
const title = 'Confirm Partner';

const Half = styled(FlexCell)`
  position: relative;
`;

const ButtonsContainer = styled.div`
  width: 50%;
`;

const ConfirmPartnerRequest: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    match,
    history,
    dispatch,
    state: { myAgreements, userToConfirm }
  }) => {
  const agreementCid = (match.params as RouteParams)['agreementCid'];
  const agreement = myAgreements.find(({cid}) => cid === agreementCid);
  const title = agreement ? agreement.title : '';
  if (!title || userToConfirm === null) {
    return <Redirect to="/404" />
  }
  return (
    <FlexColumn centered shouldInflate>
      <Half shouldInflate>
        <FlexColumn shouldInflate alignBottom centeredHorizontal>
          <UserPic />
          <PageWrapper>
            <LargeCopy centered>Send a partner request to {userToConfirm.name} for "{title}?"</LargeCopy>
          </PageWrapper>
        </FlexColumn>
      </Half>
      <Half shouldInflate>
        <FlexColumn shouldInflate centeredHorizontal>
          <Spacer height="4px" />
          <ButtonsContainer>
            <IonButton expand="block" color="primary" onClick={() => {
              // dispatch(requestPartnerForAgreement(agreementCid, partnerCid));
              dispatch(clearSearchQuery());
              history.push('/request-sent');
            }}>
              Yes, send!
            </IonButton>
            <Spacer height="4px" />
            <IonButton expand="block" color="medium" fill="outline" onClick={() => history.goBack()}>Go back</IonButton>
          </ButtonsContainer>
        </FlexColumn>
      </Half>
    </FlexColumn>
  );
};

export default addPageData((withRouter(ourConnect()(ConfirmPartnerRequest))), { slug, title });
