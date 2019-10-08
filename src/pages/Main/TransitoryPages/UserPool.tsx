import React from 'react';
import styled from 'styled-components/macro';
import { IonList } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import H1 from '../../../components/H1';
import LargeCopy from '../../../components/LargeCopy';
import Spacer from '../../../components/Spacer';
import PageWrapper from '../../../components/PageWrapper';
import UserItem from '../../../components/UserItem';
import HorizontalRule from '../../../components/HorizontalRule';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { ourConnect, StateProps, selectPossiblePartnerForConfirm } from '../../../util/state';

const slug = '/user-pool/:cid';
const title = 'User Pool';

const HorizontalRuleContainer = styled.div`
  padding-left: 16px;
`;

const PartnerSearch: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    match,
    history,
    dispatch,
    state: { myAgreements, userPool }
  }) => {
  const agreementCid = (match.params as RouteParams)['cid'];
  const agreement = myAgreements.find(({cid: aCid}) => aCid === agreementCid);
  if (!agreement) {
    return <Redirect to="/404" />
  }
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
        { userPool.map((user) => (
          <UserItem key={user.cid} name={user.name} onClick={() => {
            dispatch(selectPossiblePartnerForConfirm(user));
            history.push(`/main/confirm-partner/${agreementCid}`);
          }} />
        )) }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData((withRouter(ourConnect()(PartnerSearch))), { slug, title });
