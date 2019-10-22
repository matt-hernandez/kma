import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import PageWrapper from '../../../components/PageWrapper';
import FlexColumn from '../../../components/FlexColumn';
import FlexCell from '../../../components/FlexCell';
import LargeCopy from '../../../components/LargeCopy';
import Spacer from '../../../components/Spacer';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { ourConnect, StateProps, requestPartnerForTask, clearSearchQuery } from '../../../util/state';
import { ReactComponent as UserPic } from '../../../assets/large-user-pic.svg';

const slug = '/confirm-partner/:taskCid';
const title = 'Confirm Partner';

const Half = styled(FlexCell)`
  position: relative;
`;

const ButtonsContainer = styled.div`
  width: 50%;
`;

const ConfirmPartnerRequest: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    match,
    history,
    dispatch,
    state: { myTasks, userToConfirm }
  }) => {
  const taskCid = (match.params as RouteParams)['taskCid'];
  const task = myTasks.find(({cid}) => cid === taskCid);
  const title = task ? task.title : '';
  if (!title || userToConfirm === null) {
    return <Redirect to="/404" />
  }
  return (
    <FlexColumn centered shouldInflate>
      <Half shouldInflate>
        <FlexColumn shouldInflate alignBottom centeredHorizontal>
          <UserPic />
          <PageWrapper>
            <LargeCopy centered>Send a partner request to {userToConfirm.name} for "{title}?"</LargeCopy>
          </PageWrapper>
        </FlexColumn>
      </Half>
      <Half shouldInflate>
        <FlexColumn shouldInflate centeredHorizontal>
          <Spacer height="4px" />
          <ButtonsContainer>
            <IonButton expand="block" color="primary" onClick={() => {
              // dispatch(requestPartnerForTask(taskCid, partnerCid));
              dispatch(clearSearchQuery());
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

export default addPageData((withRouter(ourConnect()(ConfirmPartnerRequest))), { slug, title });
