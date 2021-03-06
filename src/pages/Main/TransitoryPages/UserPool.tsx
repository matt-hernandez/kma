import React from 'react';
import styled from 'styled-components/macro';
import { IonList } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import H1, { H1Loading } from '../../../components/H1';
import LargeCopy, { LargeCopyLoading } from '../../../components/LargeCopy';
import Spacer from '../../../components/Spacer';
import PageWrapper from '../../../components/PageWrapper';
import UserItem, { UserItemLoading } from '../../../components/UserItem';
import HorizontalRule from '../../../components/HorizontalRule';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { MY_TASKS, USER_POOL } from '../../../apollo-client/query/user';
import { Task as TaskInterface, PossiblePartner } from '../../../apollo-client/types/user';
import useQueryHelper from '../../../util/use-query-helper';

const slug = '/user-pool/:cid';
const title = 'User Pool';

const HorizontalRuleContainer = styled.div`
  padding-left: 16px;
`;

const LoadingUserPool = () => (
  <IonList>
    <UserItemLoading />
    <UserItemLoading />
    <UserItemLoading />
    <UserItemLoading />
  </IonList>
);

const LoadingScreen = () => (
  <PageWrapper>
    <Spacer height="12px" />
    <H1Loading />
    <Spacer height="16px" />
    <LargeCopyLoading />
    <Spacer height="24px" />
    <HorizontalRuleContainer>
      <HorizontalRule borderWidth={1} grayLevel={2} />
    </HorizontalRuleContainer>
    <LoadingUserPool />
  </PageWrapper>
);

const PartnerSearch: React.FunctionComponent<RouteComponentProps> = ({
    match,
    history
  }) => {
  const taskCid = (match.params as RouteParams)['cid'];
  const { loading: loadingMyTasks, error: errorMyTasks, data: myTasks } = useQueryHelper<TaskInterface[]>(MY_TASKS, 'myTasks');
  const { loading: loadingUserPool, error: errorUserPool, data: userPool } = useQueryHelper<PossiblePartner[]>(USER_POOL, 'userPool', {
    variables: { taskCid },
    fetchPolicy: 'network-only'
  });
  if (loadingMyTasks || !myTasks) {
    return <LoadingScreen />;
  }
  let task = myTasks.find(({cid}) => cid === taskCid);
  if (!task) {
    return <Redirect to="/404" />
  }
  return (
    <PageWrapper>
      <Spacer height="12px" />
      <H1 centered>For "{`${task.title}`}"</H1>
      <Spacer height="16px" />
      <LargeCopy centered>You can choose from these partners</LargeCopy>
      <Spacer height="24px" />
      <HorizontalRuleContainer>
        <HorizontalRule borderWidth={1} grayLevel={2} />
      </HorizontalRuleContainer>
      {loadingUserPool && <LoadingUserPool />}
      {userPool && (
        <IonList>
          {userPool.map((user) => (
            <UserItem key={user.cid} name={user.name} onClick={() => {
              history.push(`/main/confirm-partner/${taskCid}/${user.cid}`);
            }} />
          ))}
        </IonList>
      )}
    </PageWrapper>
  );
};

export default addPageData(withRouter(PartnerSearch), { slug, title });
