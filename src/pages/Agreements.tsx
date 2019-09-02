import React from 'react';
import styled from 'styled-components/macro';
import { Redirect, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import FlexRow from '../components/FlexRow';
import Tab from '../components/Tab';
import OpenAgreements from './Agreements/OpenAgreements';
import MyAgreements from './Agreements/MyAgreements';
import { colors } from '../styles/colors';

const TabsContainer = styled(FlexRow)`
  margin-bottom: 14px;
  border-bottom: 1px solid ${colors.gray3};
`;

const tabs = [
  {
    name: 'Open Agreements',
    url: '/agreements/open'
  },
  {
    name: 'My Agreements',
    url: '/agreements/my'
  }
];

const Agreements: React.FunctionComponent<RouteComponentProps> = ({
  history,
  location }) => {
  return (
    <>
      <TabsContainer>
        {tabs.map(({ name, url }, i) => (
          <Tab key={url} name={name} isActive={url === location.pathname} onClick={() => history.push(url)} />
        ))}
      </TabsContainer>
      <Route path="/agreements/open" component={OpenAgreements} exact={true} />
      <Route path="/agreements/my" component={MyAgreements} exact={true} />
      <Route exact path="/agreements" render={() => <Redirect to="/agreements/open" />} />
    </>
  );
};

export default withRouter(Agreements);
