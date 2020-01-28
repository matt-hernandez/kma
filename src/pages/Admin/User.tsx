import React, { useContext } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router';
import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { addPageData } from '../../util/add-page-data';
import { USERS, USER_SCORE, PAST_TASKS } from '../../apollo-client/query/admin';
import { MAKE_USER_INACTIVE, MAKE_USER_ACTIVE, MAKE_USER_AN_ADMIN, REMOVE_USER_AS_ADMIN } from '../../apollo-client/mutation/admin';
import { User as UserInterface, ScoreDetails, User } from '../../apollo-client/types/user';
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
import { useStateHelper, listenerTypes } from '../../util/use-state-helper';
import { ME } from '../../apollo-client/query/user';
import { ConfirmMakeUserInactiveModal, ConfirmRemoveUserAsAdminModal, ConfirmMakeUserAnAdminModal } from '../../components/Modal';
import { ConfirmMakeUserActiveModal } from '../../components/Modal/ConfirmMakeUserActiveModal';
import { ToastContext } from '../../contexts/ToastContext';
import { LoadingContext } from '../../contexts/LoadingContext';

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
  const [ makeUserInactive ] = useMutation(MAKE_USER_INACTIVE);
  const [ makeUserActive ] = useMutation(MAKE_USER_ACTIVE);
  const [ makeUserAnAdmin ] = useMutation(MAKE_USER_AN_ADMIN);
  const [ removeUserAsAdmin ] = useMutation(REMOVE_USER_AS_ADMIN);
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
        }} />
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
        }} />
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
        }} />
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
        }} />
      )}
    </>
  );
}), { slug, title });
