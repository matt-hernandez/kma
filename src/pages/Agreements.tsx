import React from 'react';
import styled from 'styled-components/macro';
import { Redirect, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import FlexRow from '../components/FlexRow';
import Tab from '../components/Tab';
import OpenAgreements from './Agreements/OpenAgreements';
import MyAgreements from './Agreements/MyAgreements';
import { colors } from '../styles/colors';
import { addPageData } from '../util/add-page-data';

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
  }
];

const Agreements: React.FunctionComponent<RouteComponentProps> = ({
  history,
  location,
  match }) => {
  return (
    <>
      <TabsContainer>
        {tabs.map(({ title, slug }, i) => (
          <Tab key={slug} name={title} isActive={`${match.url}${slug}` === location.pathname} onClick={() => history.push(`${match.url}${slug}`)} />
        ))}
      </TabsContainer>
      <Route path={`${match.url}${OpenAgreements.pageData.slug}`} component={OpenAgreements} strict exact />
      <Route path={`${match.url}${MyAgreements.pageData.slug}`} component={MyAgreements} strict exact />
      <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}${OpenAgreements.pageData.slug}`} />} />
    </>
  );
};

export default addPageData(withRouter(Agreements), { slug, title });
