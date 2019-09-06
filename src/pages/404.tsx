import React from 'react';
import styled from 'styled-components/macro';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import FlexColumn from '../components/FlexColumn';
import FlexCell from '../components/FlexCell';
import LargeCopy from '../components/LargeCopy';
import { addPageData } from '../util/add-page-data';

const slug = '/404';
const title = 'Page does not exist';

const Half = styled(FlexCell)`
  position: relative;
`;

const PageDoesNotExist: React.FunctionComponent<RouteComponentProps> = ({
    history,
  }) => {
  return (
    <FlexColumn centered shouldInflate>
      <Half shouldInflate>
        <FlexColumn shouldInflate alignBottom centeredHorizontal>
          <PageWrapper>
            <LargeCopy centered>This page does not exist.</LargeCopy>
          </PageWrapper>
        </FlexColumn>
      </Half>
      <Half shouldInflate>
        <FlexColumn shouldInflate centeredHorizontal>
          <PageWrapper>
            <IonButton expand="block" color="primary" onClick={() => history.goBack()}>Go back</IonButton>
          </PageWrapper>
        </FlexColumn>
      </Half>
    </FlexColumn>
  );
};

export default addPageData(withRouter(PageDoesNotExist), { slug, title });
