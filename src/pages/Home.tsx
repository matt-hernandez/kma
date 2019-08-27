import React from 'react';
import FlexRow from '../components/FlexRow';
import Tab from '../components/Tab';
import './Home.css';
import { useStateHelper, listenerTypes } from '../util/use-state-helper';

const tabs = [
  'Open Agreements',
  'My Agreements'
];

const HomePage: React.FunctionComponent = () => {
  const [
    activeTab,
    ...listeners
  ] = useStateHelper(tabs[0], listenerTypes.VALUES, tabs);
  return (
    <>
      <FlexRow>
        {tabs.map((tab, i) => (
          <Tab key={tab} name={tab} isActive={tab === activeTab} onClick={listeners[i]} />
        ))}
      </FlexRow>
    </>
  );
};

export default HomePage;
