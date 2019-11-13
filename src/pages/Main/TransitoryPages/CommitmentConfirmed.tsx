import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import H1 from '../../../components/H1';
import LargeCopy from '../../../components/LargeCopy';
import FlexColumn from '../../../components/FlexColumn';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { Task as TaskInterface } from '../../../apollo-client/types/user';
import { MY_TASKS } from '../../../apollo-client/query/user';
import useQueryHelper from '../../../util/use-query-helper';

const slug = '/confirmed/:cid';
const title = 'You Have Committed!';

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
  const taskCid = (match.params as RouteParams)['cid'];
  const { loading, error, data: myTasks } = useQueryHelper<TaskInterface[]>(MY_TASKS, 'myTasks');
  if (loading || !myTasks) {
    return <></>;
  }
  let task = myTasks.find(({cid}) => cid === taskCid);
  if (!task) {
    return <Redirect to="/404" />
  }
  return (
    <FlexColumn shouldInflate centeredHorizontal>
      <PageContent>
        <H1 centered>You have committed!</H1>
        <LargeCopy centered>Now it's time to find a partner. You can do one of two things.</LargeCopy>
        <IonButton expand="block" color="primary" onClick={() => history.push(`/main/partner-search/${taskCid}`)}>Direct message a person</IonButton>
        <LargeCopy centered>Or</LargeCopy>
        <IonButton expand="block" color="primary" onClick={() => history.push(`/main/user-pool/${taskCid}`)}>Choose from others who have made the same task</IonButton>
      </PageContent>
    </FlexColumn>
  );
};

export default addPageData(withRouter(CommitmentConfirmed), { slug, title });
