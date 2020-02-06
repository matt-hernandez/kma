import React from 'react';
import styled from 'styled-components/macro';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import H1 from '../../components/H1';
import Spacer from '../../components/Spacer';
import PageWrapper from '../../components/PageWrapper';
import LoadingBlock from '../../components/LoadingBlock';
import { UserItemLoading } from '../../components/UserItem';
import { addPageData } from '../../util/add-page-data';
import { useQueryScoreDetails } from '../../apollo-client/hooks';

const slug = '/score';
const title = 'Score';

const LoadingScore = styled(LoadingBlock)`
  width: 75px;
  height: 50px;
  margin: 0 auto;
`;

const ScoreCopy = styled(H1)`
  color: green;
`;

const LoadingScoreDetails = () => (
  <IonList>
    <UserItemLoading />
    <UserItemLoading />
  </IonList>
);

const Score: React.FunctionComponent<RouteComponentProps> = ({
    match,
    history
  }) => {
  const { loading: loadingScoreDetails, data: scoreDetails } = useQueryScoreDetails();
  return (
    <PageWrapper>
      <Spacer height="12px" />
      <H1 centered>Score</H1>
      <Spacer height="16px" />
      {loadingScoreDetails && (
        <>
          <LoadingScore />
          <LoadingScoreDetails />
        </>
      )}
      {(!loadingScoreDetails && scoreDetails) && (
        <>
          <ScoreCopy centered>{scoreDetails.score}</ScoreCopy>
          <Spacer height="16px" />
          <IonList>
            <IonItem>
              <IonLabel slot="start">
                Tasks done with a partner:
              </IonLabel>
              <IonLabel slot="end">
                {scoreDetails.tasksDoneWithAPartner}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel slot="start">
                Tasks done solo:
              </IonLabel>
              <IonLabel slot="end">
                {scoreDetails.tasksDoneAlone}
              </IonLabel>
            </IonItem>
          </IonList>
        </>
      )}
    </PageWrapper>
  );
};

export default addPageData(withRouter(Score), { slug, title });
