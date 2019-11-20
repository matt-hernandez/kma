import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import PageWrapper from '../../../components/PageWrapper';
import FlexColumn from '../../../components/FlexColumn';
import FlexCell from '../../../components/FlexCell';
import LargeCopy from '../../../components/LargeCopy';
import ButtonLoading from '../../../components/ButtonLoading';
import Spacer from '../../../components/Spacer';
import { LargeCopyLoading } from '../../../components/LargeCopy';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { ReactComponent as UserPic } from '../../../assets/large-user-pic.svg';
import { Task as TaskInterface, PossiblePartners } from '../../../apollo-client/types/user';
import { MY_TASKS, POSSIBLE_PARTNERS_FOR_TASK, USER_POOL } from '../../../apollo-client/query/user';
import useQueryHelper from '../../../util/use-query-helper';

const slug = '/confirm-partner/:taskCid/:userCid';
const title = 'Confirm Partner';

const Half = styled(FlexCell)`
  position: relative;
`;

const ButtonsContainer = styled.div`
  width: 50%;
`;

const LoadingScreen = () => (
  <FlexColumn centered shouldInflate>
    <Half shouldInflate>
      <FlexColumn shouldInflate alignBottom centeredHorizontal>
        <UserPic />
        <PageWrapper>
          <LargeCopyLoading />
        </PageWrapper>
      </FlexColumn>
    </Half>
    <Half shouldInflate>
      <FlexColumn shouldInflate centeredHorizontal>
        <Spacer height="4px" />
        <ButtonsContainer>
          <ButtonLoading />
          <Spacer height="4px" />
          <ButtonLoading />
        </ButtonsContainer>
      </FlexColumn>
    </Half>
  </FlexColumn>
)

const ConfirmPartnerRequest: React.FunctionComponent<RouteComponentProps> = ({
    match,
    history,
  }) => {
  const taskCid = (match.params as RouteParams)['taskCid'];
  const userCid = (match.params as RouteParams)['userCid'];
  const { loading: loadingMyTasks, error: errorMyTasks, data: myTasks } = useQueryHelper<TaskInterface[]>(MY_TASKS, 'myTasks');
  const { loading: loadingUserPool, error: errorUserPool, data: userPool } = useQueryHelper<PossiblePartners[]>(USER_POOL, 'userPool', {
    variables: { taskCid }
  });
  const { loading: loadingPossiblePartnersForTask, error: errorPossiblePartnersForTask, data: possiblePartnersForTask } = useQueryHelper<PossiblePartners[]>(POSSIBLE_PARTNERS_FOR_TASK, 'possiblePartnersForTask');
  if (loadingMyTasks || loadingUserPool || loadingPossiblePartnersForTask) {
    return <LoadingScreen />;
  }
  const task = (myTasks || []).find(({cid}) => cid === taskCid);
  const userToConfirm = [...(possiblePartnersForTask || []), ...(userPool || [])].find(({cid}) => cid === userCid);
  if (!task || !userToConfirm) {
    return <Redirect to="/404" />
  }
  return (
    <FlexColumn centered shouldInflate>
      <Half shouldInflate>
        <FlexColumn shouldInflate alignBottom centeredHorizontal>
          <UserPic />
          <PageWrapper>
            <LargeCopy centered>Send a partner request to {userToConfirm.name} for "{task.title}?"</LargeCopy>
          </PageWrapper>
        </FlexColumn>
      </Half>
      <Half shouldInflate>
        <FlexColumn shouldInflate centeredHorizontal>
          <Spacer height="4px" />
          <ButtonsContainer>
            <IonButton expand="block" color="primary" onClick={() => {
              localStorage.setItem('lkma__saved-search-query', '');
              history.push('/main/request-sent');
            }}>
              Yes, send!
            </IonButton>
            <Spacer height="4px" />
            <IonButton expand="block" color="medium" fill="outline" onClick={() => history.goBack()}>Go back</IonButton>
          </ButtonsContainer>
        </FlexColumn>
      </Half>
    </FlexColumn>
  );
};

export default addPageData(withRouter(ConfirmPartnerRequest), { slug, title });
