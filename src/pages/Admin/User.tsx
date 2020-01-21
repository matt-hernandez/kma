import React from 'react';
import styled from 'styled-components';
import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { addPageData } from '../../util/add-page-data';
import { withRouter } from 'react-router';
import { USERS, USER_SCORE, PAST_TASKS } from '../../apollo-client/query/admin';
import { User as UserInterface, ScoreDetails } from '../../apollo-client/types/user';
import useQueryHelper from '../../util/use-query-helper';
import LoadingBlock from '../../components/LoadingBlock';
import { RouteParams } from '../../util/interface-overrides';
import H1 from '../../components/H1';
import Spacer from '../../components/Spacer';
import LargeCopy from '../../components/LargeCopy';
import MarginWrapper from '../../components/MarginWrapper';
import { TaskForAdmin } from '../../apollo-client/types/admin';
import UserHistoricalTask, { UserHistoricalTaskLoading } from '../../components/UserHistoricalTask';
import RegularCopy from '../../components/RegularCopy';

const slug = '/user-info/:cid';
const title = 'User Info';

const UserInfoLoading = styled(LoadingBlock)`
  width: 100%;
  height: 100px;
`;

const UserPageLoading = (
  <>
    <H1 centered marginBottom marginTop>Loading user info...</H1>
    <MarginWrapper marginRight marginLeft marginBottom>
      <LargeCopy>Score</LargeCopy>
    </MarginWrapper>
    <UserInfoLoading />
  </>
);

export default addPageData(withRouter(({ history, match }) => {
  const cid = (match.params as RouteParams)['cid'];
  const { loading: loadingUsers, error: errorUsers, data: users } = useQueryHelper<UserInterface[]>(USERS, 'users');
  const { loading: loadingUserScore, error: errorUserScore, data: userScore } = useQueryHelper<ScoreDetails>(USER_SCORE, 'userScore', {
    variables: {
      cid
    }
  });
  const { loading: loadingPastTasks, error: errorPastTasks, data: pastTasks } = useQueryHelper<TaskForAdmin[]>(PAST_TASKS, 'pastTasks');
  if (loadingUsers || loadingUserScore) {
    return UserPageLoading;
  }
  const user = users.find(({ cid: userCid }) => cid === userCid);
  if (!user) {
    history.replace('/admin/tasks/current');
    return UserPageLoading;
  }
  const userPastTasks = pastTasks && pastTasks.filter(({ outcomes }) => outcomes.some(({ userCid }) => user.cid === userCid));
  return (
    <>
      <H1 centered marginBottom marginTop>{user.name}</H1>
      <MarginWrapper marginRight marginLeft>
        <LargeCopy>Score: {userScore.score}</LargeCopy>
      </MarginWrapper>
      <Spacer height="16px" />
      <IonList>
        <IonItem>
          <IonLabel slot="start">
            Tasks done with a partner:
          </IonLabel>
          <IonLabel slot="end">
            {userScore.tasksDoneWithAPartner}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel slot="start">
            Tasks done solo:
          </IonLabel>
          <IonLabel slot="end">
            {userScore.tasksDoneAlone}
          </IonLabel>
        </IonItem>
      </IonList>
      <MarginWrapper marginRight marginLeft>
        <LargeCopy>Task history</LargeCopy>
      </MarginWrapper>
      {(!!userPastTasks && userPastTasks.length > 0) && (
        <IonList>
          {userPastTasks.map(({ cid, title, outcomes }) => {
            const outcome = outcomes.find(({ userCid }) => user.cid === userCid);
            if (outcome) {
              return (
                <UserHistoricalTask key={`${user.cid}-${cid}`} title={title} status={outcome.type} />
              );
            }
            return (
              <></>
            );
          })}
        </IonList>
      )}
      {loadingPastTasks && (
        <IonList>
          <UserHistoricalTaskLoading />
          <UserHistoricalTaskLoading />
          <UserHistoricalTaskLoading />
          <UserHistoricalTaskLoading />
        </IonList>
      )}
      {(!!userPastTasks && userPastTasks.length === 0) && (
        <MarginWrapper marginTop marginRight marginLeft>
          <RegularCopy>
            This user has no tasks in their history
          </RegularCopy>
        </MarginWrapper>
      )}
      <MarginWrapper marginTop marginRight marginLeft>
        <IonButton color="danger">Delete user</IonButton>
      </MarginWrapper>
    </>
  );
}), { slug, title });
