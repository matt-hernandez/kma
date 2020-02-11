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
import { MY_PAST_TASKS } from '../../apollo-client/query/user';
import { Task } from '../../apollo-client/types/user';
import useQueryHelper from '../../util/use-query-helper';
import UserHistoricalTask from '../../components/UserHistoricalTask';

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
  const { loading: loadingMyPastTasks, data: myPastTasks } = useQueryHelper<Task[]>(MY_PAST_TASKS, 'myPastTasks');
  if (loadingMyPastTasks) {
    return <></>;
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
            status={outcomeType === null ? 'BROKEN' : outcomeType}
          />
        ))}
      </IonList>
    </PageWrapper>
  );
};

export default addPageData(withRouter(MyPastTasks), { slug, title });
