import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
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
import { Task as TaskInterface, PossiblePartner } from '../../../apollo-client/types/user';
import { MY_TASKS, ONE_POSSIBLE_PARTNER_FOR_TASK } from '../../../apollo-client/query/user';
import useQueryHelper from '../../../util/use-query-helper';
import useLazyQueryHelper from '../../../util/use-lazy-query-helper';
import client from '../../../apollo-client/client';
import { REQUEST_PARTNER_FOR_TASK } from '../../../apollo-client/mutation/user';
import { useMutation } from '@apollo/react-hooks';
import generateCacheUpdate from '../../../util/generate-cache-update';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { ToastContext } from '../../../contexts/ToastContext';

const slug = '/confirm-partner/:taskCid/:partnerCid';
const title = 'Confirm Partner';

const Half = styled(FlexCell)`
  position: relative;
`;

const ButtonsContainer = styled.div`
  width: 50%;
`;

const LargeCopyLoadingContainer = styled.div`
  width: 65%;
  margin-top: 20px;
`;

const LoadingScreen = () => (
  <FlexColumn centered shouldInflate>
    <Half shouldInflate>
      <FlexColumn shouldInflate alignBottom centeredHorizontal>
        <UserPic />
        <LargeCopyLoadingContainer>
          <LargeCopyLoading />
        </LargeCopyLoadingContainer>
      </FlexColumn>
    </Half>
    <Half shouldInflate>
      <FlexColumn shouldInflate centeredHorizontal>
        <Spacer height="16px" />
        <ButtonsContainer>
          <ButtonLoading />
          <Spacer height="12px" />
          <ButtonLoading />
        </ButtonsContainer>
      </FlexColumn>
    </Half>
  </FlexColumn>
);

const ConfirmPartnerRequest: React.FunctionComponent<RouteComponentProps> = ({
    match,
    history,
  }) => {
  const taskCid = (match.params as RouteParams)['taskCid'];
  const partnerCid = (match.params as RouteParams)['partnerCid'];
  const { loading: loadingMyTasks, error: errorMyTasks, data: myTasks } = useQueryHelper<TaskInterface[]>(MY_TASKS, 'myTasks');
  const [ requestPartnerForTask ] = useMutation(REQUEST_PARTNER_FOR_TASK, {
    update: generateCacheUpdate<TaskInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'myTasks',
        query: MY_TASKS,
        sort: (d1, d2) => d1.due - d2.due
      },
      'requestPartnerForTask'
    ),
    variables: {
      taskCid,
      partnerCid
    }
  });
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const { showToast } = useContext(ToastContext);
  const [ getOnePossiblePartner, { loading: loadingOnePossiblePartner, error: errorOnePossiblePartner, data: onePossiblePartner } ] = useLazyQueryHelper<PossiblePartner>(ONE_POSSIBLE_PARTNER_FOR_TASK, 'onePossiblePartnerForTask', {
    variables: {
      partnerCid,
      taskCid
    }
  });
  const cachedPartner = client.readFragment({
    id: partnerCid,
    fragment: gql`
      fragment cachedPartner on PossiblePartner {
        cid
        name
      }
    `
  });
  if (!cachedPartner && !loadingOnePossiblePartner && onePossiblePartner === undefined) {
    getOnePossiblePartner();
    return <LoadingScreen />;
  }
  if (loadingMyTasks || loadingOnePossiblePartner) {
    return <LoadingScreen />;
  }
  const task = myTasks.find(({cid}) => cid === taskCid);
  const userToConfirm = onePossiblePartner ? onePossiblePartner : cachedPartner;
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
              showLoadingScreen();
              requestPartnerForTask()
                .then(() => {
                  localStorage.setItem('lkma__saved-search-query', '');
                  history.push(`/main/request-sent/${partnerCid}`);
                })
                .catch(() => {
                  showToast({
                    color: 'danger',
                    message: 'There was an error requesting this partner!'
                  });
                })
                .finally(() => {
                  hideLoadingScreen();
                });
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
