import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router';
import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { addPageData } from '../../util/add-page-data';
import { USERS, USER_SCORE, PAST_TASKS } from '../../apollo-client/query/admin';
import { MAKE_USER_INACTIVE, MAKE_USER_ACTIVE, MAKE_USER_AN_ADMIN, REMOVE_USER_AS_ADMIN, CHANGE_TASK_STATUS_FOR_USER } from '../../apollo-client/mutation/admin';
import { User as UserInterface, ScoreDetails, User, OutcomeType } from '../../apollo-client/types/user';
import useQueryHelper from '../../util/use-query-helper';
import LoadingBlock from '../../components/LoadingBlock';
import { RouteParams } from '../../util/interface-overrides';
import H1 from '../../components/H1';
import Spacer from '../../components/Spacer';
import LargeCopy from '../../components/LargeCopy';
import MarginWrapper from '../../components/MarginWrapper';
import { TaskForAdmin, ConnectionForAdmin, Outcome } from '../../apollo-client/types/admin';
import UserHistoricalTask, { UserHistoricalTaskLoading } from '../../components/UserHistoricalTask';
import RegularCopy from '../../components/RegularCopy';
import { useStateHelper, listenerTypes } from '../../util/use-state-helper';
import { ME } from '../../apollo-client/query/user';
import { ConfirmMakeUserInactiveModal, ConfirmRemoveUserAsAdminModal, ConfirmMakeUserAnAdminModal } from '../../components/Modal';
import { ConfirmMakeUserActiveModal } from '../../components/Modal/ConfirmMakeUserActiveModal';
import { ToastContext } from '../../contexts/ToastContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { ChangeTaskStatusModal } from '../../components/Modal/ChangeTaskStatusModal';
import generateCacheUpdate from '../../util/generate-cache-update';

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
  const { loading: loadingMe, error: errorMe, data: me } = useQueryHelper<User>(ME, 'me');
  const { loading: loadingUsers, error: errorUsers, data: users } = useQueryHelper<UserInterface[]>(USERS, 'users');
  const { loading: loadingUserScore, error: errorUserScore, data: userScore } = useQueryHelper<ScoreDetails>(USER_SCORE, 'userScore', {
    variables: {
      cid
    }
  });
  const { loading: loadingPastTasks, error: errorPastTasks, data: pastTasks } = useQueryHelper<TaskForAdmin[]>(PAST_TASKS, 'pastTasks');
  const { showToast } = useContext(ToastContext);
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const [ makeUserInactive ] = useMutation(MAKE_USER_INACTIVE, {
    update: generateCacheUpdate<UserInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'users',
        query: USERS
      },
      'makeUserInactive'
    )
  });
  const [ makeUserActive ] = useMutation(MAKE_USER_ACTIVE, {
    update: generateCacheUpdate<UserInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'users',
        query: USERS
      },
      'makeUserActive'
    )
  });
  const [ makeUserAnAdmin ] = useMutation(MAKE_USER_AN_ADMIN, {
    update: generateCacheUpdate<UserInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'users',
        query: USERS
      },
      'makeUserAnAdmin'
    )
  });
  const [ removeUserAsAdmin ] = useMutation(REMOVE_USER_AS_ADMIN, {
    update: generateCacheUpdate<UserInterface>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'users',
        query: USERS
      },
      'removeUserAsAdmin'
    )
  });
  const [ changeTaskStatusForUser ] = useMutation(CHANGE_TASK_STATUS_FOR_USER, {
    update: generateCacheUpdate<TaskForAdmin>(
      'OVERWRITE_ITEM_IN_ARRAY',
      {
        name: 'pastTasks',
        query: PAST_TASKS,
        sort: (d1, d2) => d1.publishDate - d2.publishDate
      },
      'changeTaskStatusForUser'
    )
  });
  const [ connectionsForChangeStatus, setConnectionsForChangeStatus ] = useState<ConnectionForAdmin[]>([]);
  const [ outcomeForChangeStatus, setOutcomeForChangeStatus ] = useState<Outcome | null>(null);
  const [ shouldShowChangeStatusModal, toggleChangeStatusModal ] = useStateHelper(false, listenerTypes.TOGGLE);
  const [ shouldShowUserActiveModal, toggleUserActiveModal ] = useStateHelper(false, listenerTypes.TOGGLE);
  const [ shouldShowUserAdminModal, toggleUserAdminModal ] = useStateHelper(false, listenerTypes.TOGGLE);
  if (loadingMe || loadingUsers || loadingUserScore) {
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
          {userPastTasks.map(({ cid, title, outcomes, connections }) => {
            const outcome = outcomes.find(({ userCid }) => user.cid === userCid);
            const connectionsForAgreement = connections.filter(({ fromCid, toCid, type }) => (user.cid === fromCid || user.cid === toCid) && type === 'CONFIRMED');
            if (outcome) {
              return (
                <UserHistoricalTask key={`${user.cid}-${cid}`} title={title} status={outcome.type} onChangeStatus={() => {
                  toggleChangeStatusModal();
                  setConnectionsForChangeStatus(connectionsForAgreement);
                  setOutcomeForChangeStatus(outcome);
                }} />
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
        {user.isActive && <IonButton color="danger" onClick={toggleUserActiveModal}>Make user inactive</IonButton>}
        {!user.isActive && <IonButton color="primary" onClick={toggleUserActiveModal}>Make user active</IonButton>}
        {me.accessRights === 'SUPER_ADMIN' && (
          <>
            {user.accessRights === 'USER' && (
              <IonButton color="primary" onClick={toggleUserAdminModal}>Make user an admin</IonButton>
            )}
            {user.accessRights === 'ADMIN' && (
              <IonButton color="danger" onClick={toggleUserAdminModal}>Remove user as an admin</IonButton>
            )}
          </>
        )}
      </MarginWrapper>
      {user.isActive && (
        <ConfirmMakeUserInactiveModal isOpen={shouldShowUserActiveModal} onConfirm={() => {
          showLoadingScreen();
          makeUserInactive({
              variables: {
                cid: user.cid
              }
            })
            .then(toggleUserActiveModal)
            .catch(() => {
              showToast({
                color: 'danger',
                message: 'There was an error inactivating this user! Please try again.'
              });
            })
            .finally(hideLoadingScreen);
        }} onDismiss={toggleUserActiveModal} />
      )}
      {!user.isActive && (
        <ConfirmMakeUserActiveModal isOpen={shouldShowUserActiveModal} onConfirm={() => {
          showLoadingScreen();
          makeUserActive({
              variables: {
                cid: user.cid
              }
            })
            .then(toggleUserActiveModal)
            .catch(() => {
              showToast({
                color: 'danger',
                message: 'There was an error activating this user! Please try again.'
              });
            })
            .finally(hideLoadingScreen);
        }} onDismiss={toggleUserActiveModal} />
      )}
      {user.accessRights === 'USER' && (
        <ConfirmMakeUserAnAdminModal isOpen={shouldShowUserAdminModal} onConfirm={() => {
          showLoadingScreen();
          makeUserAnAdmin({
              variables: {
                cid: user.cid
              }
            })
            .then(toggleUserAdminModal)
            .catch(() => {
              showToast({
                color: 'danger',
                message: 'There was an error making this user an admin! Please try again.'
              });
            })
            .finally(hideLoadingScreen);
        }} onDismiss={toggleUserAdminModal} />
      )}
      {user.accessRights === 'ADMIN' && (
        <ConfirmRemoveUserAsAdminModal isOpen={shouldShowUserAdminModal} onConfirm={() => {
          showLoadingScreen();
          removeUserAsAdmin({
              variables: {
                cid: user.cid
              }
            })
            .then(toggleUserAdminModal)
            .catch(() => {
              showToast({
                color: 'danger',
                message: 'There was an error removing this user as an admin! Please try again.'
              });
            })
            .finally(hideLoadingScreen);
        }} onDismiss={toggleUserAdminModal} />
      )}
      {(shouldShowChangeStatusModal && outcomeForChangeStatus !== null) && (
        <ChangeTaskStatusModal
          connections={connectionsForChangeStatus}
          outcome={outcomeForChangeStatus}
          onConfirm={(outcomeType: OutcomeType) => {
            showLoadingScreen();
            changeTaskStatusForUser({
                variables: {
                  outcomeCid: outcomeForChangeStatus.cid,
                  outcomeType
                }
              })
              .then(toggleChangeStatusModal)
              .catch(() => {
                showToast({
                  color: 'danger',
                  message: 'There was an error changing the status of this task! Please try again.'
                });
              })
              .finally(hideLoadingScreen);
          }}
          isOpen={shouldShowChangeStatusModal}
          name={user.name}
          onDismiss={toggleChangeStatusModal}
        />
      )}
    </>
  );
}), { slug, title });
