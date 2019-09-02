import React from 'react';
import styled from 'styled-components/macro';
import { Redirect, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import FlexRow from '../components/FlexRow';
import Tab from '../components/Tab';
import Agreement from '../components/Agreement';
import './Home.css';
import { colors } from '../styles/colors';
import { StateProps, ourConnect, commitToAgreement } from '../util/state';
import { formatDueDate } from '../util/format-due-date';

const TabsContainer = styled(FlexRow)`
  margin-bottom: 14px;
  border-bottom: 1px solid ${colors.gray3};
`;

const tabs = [
  {
    name: 'Open Agreements',
    url: '/home/open-agreements'
  },
  {
    name: 'My Agreements',
    url: '/home/my-agreements'
  }
];

const HomePage: React.FunctionComponent<RouteComponentProps & StateProps> = ({
  history,
  location,
  dispatch,
  state: { openAgreements, myAgreements } }) => {
  return (
    <>
      <TabsContainer>
        {tabs.map(({ name, url }, i) => (
          <Tab key={url} name={name} isActive={url === location.pathname} onClick={() => history.push(url)} />
        ))}
      </TabsContainer>
      <Route path="/home/open-agreements" component={() => (
        <>
          {openAgreements.map(({ id, expiration, title, due, description }) => (
            <Agreement
              key={id}
              isCommitted={false}
              expiration={expiration}
              onExpire={() => {}}
              title={title}
              due={formatDueDate(due)}
              description={description}
              onCommit={() => dispatch(commitToAgreement(id))}
            />
          ))}
        </>
      )} exact={true} />
      <Route path="/home/my-agreements" component={() => (
        <>
          {myAgreements.map(({ id, expiration, pendingPartners, confirmedPartners, title, due, description }) => (
            <Agreement
              key={id}
              isCommitted={true}
              expiration={expiration}
              onExpire={() => {}}
              pendingPartners={pendingPartners}
              confirmedPartners={confirmedPartners}
              title={title}
              due={formatDueDate(due)}
              description={description}
            />
          ))}
        </>
      )} exact={true} />
      <Route exact path="/home" render={() => <Redirect to="/home/open-agreements" />} />
    </>
  );
};

export default withRouter(ourConnect()(HomePage));
