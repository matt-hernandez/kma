import React from 'react';
import styled from 'styled-components/macro';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IonList } from '@ionic/react';
import H1 from '../../components/H1';
import Spacer from '../../components/Spacer';
import PageWrapper from '../../components/PageWrapper';
import LoadingBlock from '../../components/LoadingBlock';
import { UserItemLoading } from '../../components/UserItem';
import { addPageData } from '../../util/add-page-data';
import UserHistoricalTask from '../../components/UserHistoricalTask';
import { useQueryMyPastTasks } from '../../apollo-client/hooks';

const slug = '/my-past-tasks';
const title = 'My Past Tasks';

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

const MyPastTasks: React.FunctionComponent<RouteComponentProps> = ({
    match,
    history
  }) => {
  const { loading: loadingMyPastTasks, error: errorMyPastTasks, data: myPastTasks } = useQueryMyPastTasks();
  if (loadingMyPastTasks) {
    return <></>;
  }
  if (errorMyPastTasks || !myPastTasks) {
    return <>Error encountered!</>;
  }
  return (
    <PageWrapper>
      <Spacer height="12px" />
      <H1 centered>My past tasks</H1>
      <Spacer height="16px" />
      <IonList>
        {myPastTasks.map(({ cid, title, outcomeType, due }) => (
          <UserHistoricalTask
            key={cid}
            title={title}
            due={due}
            status={outcomeType}
          />
        ))}
      </IonList>
    </PageWrapper>
  );
};

export default addPageData(withRouter(MyPastTasks), { slug, title });
