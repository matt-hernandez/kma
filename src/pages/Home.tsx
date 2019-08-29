import React from 'react';
import styled from 'styled-components/macro';
import { Redirect, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import FlexRow from '../components/FlexRow';
import Tab from '../components/Tab';
import Agreement from '../components/Agreement';
import './Home.css';
import { colors } from '../styles/colors';

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

const today = Date.now();
const expiration = new Date(today + 1000 * 60 * 60 * 24 * 3).getTime();

const HomePage: React.FunctionComponent<RouteComponentProps> = ({ history, location }) => {
  return (
    <>
      <TabsContainer>
        {tabs.map(({ name, url }, i) => (
          <Tab key={url} name={name} isActive={url === location.pathname} onClick={() => history.push(url)} />
        ))}
      </TabsContainer>
      <Route path="/home/open-agreements" component={() => (
        <Agreement
          isCommitted={false}
          expiration={expiration}
          onExpire={() => {}}
          title="Attend Kickstart Conditioning"
          due="Due date: 7/12/19 at 6:15 AM"
          description={`
            Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
            Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
            tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
            in what sports scientists agree is one of the best total body workouts available.
          `}
          onCommit={() => {}}
        />
      )} exact={true} />
      <Route path="/home/my-agreements" component={() => (
        <>
          <Agreement
            isCommitted={true}
            expiration={expiration}
            onExpire={() => {}}
            pendingRequests={['Katie Fryer']}
            acceptedRequests={['Dave Goode']}
            title="Attend Groundwork Conditioning"
            due="Due date: 7/12/19"
            description={`
              Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
              Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
              tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
              in what sports scientists agree is one of the best total body workouts available.
            `}
            onCommit={() => {}}
          />
          <Agreement
            isCommitted={true}
            expiration={expiration}
            onExpire={() => {}}
            title="Attend Groundwork Conditioning"
            due="Due date: 7/15/19"
            description={`
              Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
              Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
              tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
              in what sports scientists agree is one of the best total body workouts available.
            `}
            onCommit={() => {}}
          />
        </>
      )} exact={true} />
      <Route exact path="/home" render={() => <Redirect to="/home/open-agreements" />} />
    </>
  );
};

export default withRouter(HomePage);
