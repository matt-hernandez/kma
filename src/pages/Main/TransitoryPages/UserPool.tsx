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
import { readCachedQuery } from '../../../apollo-client/client';
import { MY_TASKS, USER_POOL } from '../../../apollo-client/queries/user';
import { Task as TaskInterface, PossiblePartners } from '../../../apollo-client/types/user';
import { useQuery } from '@apollo/react-hooks';

const slug = '/user-pool/:cid';
const title = 'User Pool';

const HorizontalRuleContainer = styled.div`
  padding-left: 16px;
`;

const PartnerSearch: React.FunctionComponent<RouteComponentProps> = ({
    match,
    history
  }) => {
  const taskCid = (match.params as RouteParams)['cid'];
  const myTasks = readCachedQuery<TaskInterface[]>({
    query: MY_TASKS
  }, 'myTasks');
  const task = myTasks.find(({cid}) => cid === taskCid);
  const { loading, error, data }= useQuery<PossiblePartners[]>(USER_POOL, {
    variables: { taskCid }
  });
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
      <IonList>
        {loading ? 'Please wait' : <></>}
        {(!loading && !error && data) ? data.map((user) => (
          <UserItem key={user.cid} name={user.name} onClick={() => {
            history.push(`/main/confirm-partner/${taskCid}`);
          }} />
        )) : <></> }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData(withRouter(PartnerSearch), { slug, title });
