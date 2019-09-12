import React from 'react';
import styled from 'styled-components/macro';
import { Redirect, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import FlexRow from '../components/FlexRow';
import Tab from '../components/Tab';
import OpenAgreements from './Agreements/OpenAgreements';
import MyAgreements from './Agreements/MyAgreements';
import PartnerRequests from './Agreements/PartnerRequests';
import { colors } from '../styles/colors';
import { addPageData } from '../util/add-page-data';
import { ourConnect, StateProps } from '../util/state';

const TabsContainer = styled(FlexRow)`
  margin-bottom: 14px;
  border-bottom: 1px solid ${colors.gray3};
`;

const slug = '/agreements'
const title = 'Agreements'

const tabs = [
  {
    title: OpenAgreements.pageData.title,
    slug: OpenAgreements.pageData.slug
  },
  {
    title: MyAgreements.pageData.title,
    slug: MyAgreements.pageData.slug
  },
  {
    title: PartnerRequests.pageData.title,
    slug: PartnerRequests.pageData.slug
  }
];

const Agreements: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    history,
    location,
    match,
    state: { requestsToBePartner }
  }) => {
  return (
    <>
      <TabsContainer>
        {tabs.map(({ title, slug }, i) => {
          return (
            <Tab key={slug} showBadge={title === PartnerRequests.pageData.title} badgeNumber={requestsToBePartner.length} name={title} isActive={`${match.url}${slug}` === location.pathname} onClick={() => history.push(`${match.url}${slug}`)} />
          );
        })}
      </TabsContainer>
      <Route path={`${match.url}${OpenAgreements.pageData.slug}`} component={OpenAgreements} strict exact />
      <Route path={`${match.url}${MyAgreements.pageData.slug}`} component={MyAgreements} strict exact />
      <Route path={`${match.url}${PartnerRequests.pageData.slug}`} component={PartnerRequests} strict exact />
      <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}${OpenAgreements.pageData.slug}`} />} />
    </>
  );
};

export default addPageData(withRouter(ourConnect()(Agreements)), { slug, title });
