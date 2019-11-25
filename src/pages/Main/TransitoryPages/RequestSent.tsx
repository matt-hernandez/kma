import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import FlexColumn from '../../../components/FlexColumn';
import FlexCell from '../../../components/FlexCell';
import LargeCopy, { LargeCopyLoading } from '../../../components/LargeCopy';
import PageWrapper from '../../../components/PageWrapper';
import ButtonLoading from '../../../components/ButtonLoading';
import Spacer from '../../../components/Spacer';
import { addPageData } from '../../../util/add-page-data';
import { ReactComponent as UserPic } from '../../../assets/large-user-pic.svg';
import client from '../../../apollo-client/client';
import { RouteParams } from '../../../util/interface-overrides';
import { PossiblePartner } from '../../../apollo-client/types/user';
import useLazyQueryHelper from '../../../util/use-lazy-query-helper';
import { GET_PARTNER_DETAILS } from '../../../apollo-client/query/user';

const slug = '/request-sent/:partnerCid';
const title = 'Request Sent!';

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
        <Spacer height="14px"/>
        <ButtonsContainer>
          <ButtonLoading />
        </ButtonsContainer>
      </FlexColumn>
    </Half>
  </FlexColumn>
);

const RequestSent: React.FunctionComponent<RouteComponentProps> = ({
    history,
    match
  }) => {
  const partnerCid = (match.params as RouteParams)['partnerCid'];
  const [ getPartner, { loading: loadingPartner, error: errorPartner, data: fetchedPartner } ] = useLazyQueryHelper<PossiblePartner>(GET_PARTNER_DETAILS, 'getPartnerDetails', {
    variables: {
      partnerCid
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
  if (!cachedPartner && !loadingPartner && fetchedPartner === undefined) {
    getPartner();
    return <LoadingScreen />;
  }
  if (loadingPartner) {
    return <LoadingScreen />;
  }
  const partner = fetchedPartner ? fetchedPartner : cachedPartner;
  if (!partner) {
    return <Redirect to="/404" />
  }
  return (
    <FlexColumn shouldInflate centered>
      <Half shouldInflate>
        <FlexColumn shouldInflate alignBottom centeredHorizontal>
          <UserPic />
          <PageWrapper>
            <LargeCopy centered>Your request to {partner.name} has been sent!</LargeCopy>
          </PageWrapper>
        </FlexColumn>
      </Half>
      <Half shouldInflate>
        <FlexColumn shouldInflate centeredHorizontal>
          <ButtonsContainer>
            <IonButton expand="block" color="primary" onClick={() => {
              history.push('/main/tasks/my');
            }}>
              Go to My Tasks
            </IonButton>
          </ButtonsContainer>
        </FlexColumn>
      </Half>
    </FlexColumn>
  );
};

export default addPageData((withRouter(RequestSent)), { slug, title });
