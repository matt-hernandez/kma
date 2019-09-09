import React from 'react';
import styled from 'styled-components/macro';
import { IonList } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import H1 from '../components/H1';
import LargeCopy from '../components/LargeCopy';
import Spacer from '../components/Spacer';
import PageWrapper from '../components/PageWrapper';
import UserItem from '../components/UserItem';
import HorizontalRule from '../components/HorizontalRule';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';
import { ourConnect, StateProps } from '../util/state';

const slug = '/user-pool/:id';
const title = 'User Pool';

const HorizontalRuleContainer = styled.div`
  padding-left: 16px;
`;

const PartnerSearch: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    match,
    history,
    state: { otherUsers, myAgreements }
  }) => {
  const agreementId = (match.params as RouteParams)['id'];
  const agreement = myAgreements.find(({id: aId}) => aId === agreementId);
  if (!agreement) {
    return <Redirect to="/404" />
  }
  const users = otherUsers
    .filter(user => user.agreements.find(({ id: aId }) => aId === agreementId))
    .filter(user => 
      !agreement.pendingPartners.some(({ id }) => id === user.id) &&
      !agreement.confirmedPartners.some(({ id }) => id === user.id)
    );
  return (
    <PageWrapper>
      <Spacer height="12px" />
      <H1 centered>For "{`${agreement.title}`}"</H1>
      <Spacer height="16px" />
      <LargeCopy centered>You can choose from these partners</LargeCopy>
      <Spacer height="24px" />
      <HorizontalRuleContainer>
        <HorizontalRule borderWidth={1} grayLevel={2} />
      </HorizontalRuleContainer>
      <IonList>
        { users.map(({ id: userId, name }) => (
          <UserItem key={userId} name={name} onClick={() => {
            history.push(`/confirm-partner/${agreementId}/${userId}`);
          }} />
        )) }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData((withRouter(ourConnect()(PartnerSearch))), { slug, title });