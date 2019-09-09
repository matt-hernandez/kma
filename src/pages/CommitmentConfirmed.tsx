import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import H1 from '../components/H1';
import LargeCopy from '../components/LargeCopy';
import FlexColumn from '../components/FlexColumn';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';
import { StateProps, ourConnect } from '../util/state';

const slug = '/confirmed/:id';
const title = 'You Have Committed!';

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 46%;
  justify-content: space-between;
  margin-top: 60px;
`;

const CommitmentConfirmed: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    history,
    match,
    state: { myAgreements }
  }) => {
  const agreementId = (match.params as RouteParams)['id'];
  const agreement = myAgreements.find(({id}) => id === agreementId);
  if (!agreement) {
    return <Redirect to="/404" />
  }
  return (
    <FlexColumn shouldInflate centeredHorizontal>
      <PageContent>
        <H1 centered>You have committed!</H1>
        <LargeCopy centered>Now it's time to find a partner. You can do one of two things.</LargeCopy>
        <IonButton expand="block" color="primary" onClick={() => history.push(`/partner-search/${agreementId}`)}>Direct message a person</IonButton>
        <LargeCopy centered>Or</LargeCopy>
        <IonButton expand="block" color="primary" onClick={() => history.push(`/user-pool/${agreementId}`)}>Choose from others who have made the same agreement</IonButton>
      </PageContent>
    </FlexColumn>
  );
};

export default addPageData(ourConnect()(withRouter(CommitmentConfirmed)), { slug, title });