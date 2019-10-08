import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import FlexColumn from '../../../components/FlexColumn';
import FlexCell from '../../../components/FlexCell';
import LargeCopy from '../../../components/LargeCopy';
import PageWrapper from '../../../components/PageWrapper';
import { addPageData } from '../../../util/add-page-data';
import { ReactComponent as UserPic } from '../../../assets/large-user-pic.svg';

const slug = '/request-sent';
const title = 'Request Sent!';

const Half = styled(FlexCell)`
  position: relative;
`;

const ButtonsContainer = styled.div`
  width: 50%;
`;

const RequestSent: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  return (
    <FlexColumn shouldInflate centered>
      <Half shouldInflate>
        <FlexColumn shouldInflate alignBottom centeredHorizontal>
          <UserPic />
          <PageWrapper>
            <LargeCopy centered>Your request has been sent!</LargeCopy>
          </PageWrapper>
        </FlexColumn>
      </Half>
      <Half shouldInflate>
        <FlexColumn shouldInflate centeredHorizontal>
          <ButtonsContainer>
            <IonButton expand="block" color="primary" onClick={() => {
              history.push('/main/agreements/my');
            }}>
              Go to My Agreements
            </IonButton>
          </ButtonsContainer>
        </FlexColumn>
      </Half>
    </FlexColumn>
  );
};

export default addPageData((withRouter(RequestSent)), { slug, title });
