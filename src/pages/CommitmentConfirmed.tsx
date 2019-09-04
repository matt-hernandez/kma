import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import H1 from '../components/H1';
import LargeCopy from '../components/LargeCopy';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';

const slug = '/confirmed/:id';
const title = 'You Have Committed!';

const PageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 46%;
  justify-content: space-between;
  margin-top: 60px;
`;

const CommitmentConfirmed: React.FunctionComponent<RouteComponentProps> = ({
    history,
    match
  }) => {
  const id = (match.params as RouteParams)['id'];
  return (
    <PageContainer>
      <PageContent>
        <H1 centered>You have committed!</H1>
        <LargeCopy centered>Now it's time to find a partner. You can do one of two things.</LargeCopy>
        <IonButton expand="block" color="primary" onClick={() => history.push(`/partner-search/${id}`)}>Direct message a person</IonButton>
        <LargeCopy centered>Or</LargeCopy>
        <IonButton expand="block" color="primary" onClick={() => {}}>Choose from others who have made the same agreement</IonButton>
      </PageContent>
    </PageContainer>
  );
};

export default addPageData((withRouter(CommitmentConfirmed)), { slug, title });
