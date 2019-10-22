import React from 'react';
import styled from 'styled-components/macro';
import { Redirect, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import FlexRow from '../../../components/FlexRow';
import Tab from '../../../components/Tab';
import OpenTasks from './OpenTasks';
import MyTasks from './MyTasks';
import PartnerRequests from './PartnerRequests';
import { colors } from '../../../styles/colors';
import { addPageData } from '../../../util/add-page-data';
import { ourConnect, StateProps } from '../../../util/state';

const TabsContainer = styled(FlexRow)`
  margin-bottom: 14px;
  border-bottom: 1px solid ${colors.gray3};
`;

const slug = '/tasks'
const title = 'Tasks'

const tabs = [
  {
    title: OpenTasks.pageData.title,
    slug: OpenTasks.pageData.slug
  },
  {
    title: MyTasks.pageData.title,
    slug: MyTasks.pageData.slug
  },
  {
    title: PartnerRequests.pageData.title,
    slug: PartnerRequests.pageData.slug
  }
];

const Tasks: React.FunctionComponent<RouteComponentProps & StateProps> = ({
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
      <Route path={`${match.url}${OpenTasks.pageData.slug}`} component={OpenTasks} strict exact />
      <Route path={`${match.url}${MyTasks.pageData.slug}`} component={MyTasks} strict exact />
      <Route path={`${match.url}${PartnerRequests.pageData.slug}`} component={PartnerRequests} strict exact />
      <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}${OpenTasks.pageData.slug}`} />} />
    </>
  );
};

export default addPageData(withRouter(ourConnect()(Tasks)), { slug, title });
