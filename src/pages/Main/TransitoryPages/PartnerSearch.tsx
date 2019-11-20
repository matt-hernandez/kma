import React, { useState } from 'react';
import { IonSearchbar, IonList } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import useQueryHelper from '../../../util/use-query-helper';
import PageWrapper from '../../../components/PageWrapper';
import UserItem, { UserItemLoading } from '../../../components/UserItem';
import LoadingBlock from '../../../components/LoadingBlock';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { Task as TaskInterface, PossiblePartners } from '../../../apollo-client/types/user';
import { MY_TASKS, POSSIBLE_PARTNERS_FOR_TASK } from '../../../apollo-client/query/user';

const slug = '/partner-search/:cid';
const title = 'Partner Search';

const SearchBarLoading = styled(LoadingBlock)`
  width: 100%;
  height: 45px;
  margin: 10px;
`;

const LoadingScreen = () => (
  <PageWrapper>
    <SearchBarLoading />
    <IonList>
      <UserItemLoading />
      <UserItemLoading />
      <UserItemLoading />
      <UserItemLoading />
    </IonList>
  </PageWrapper>
);

const PartnerSearch: React.FunctionComponent<RouteComponentProps> = ({
    match,
    history
  }) => {
  const taskCid = (match.params as RouteParams)['cid'];
  const { loading: loadingMyTasks, error: errorMyTasks, data: myTasks } = useQueryHelper<TaskInterface[]>(MY_TASKS, 'myTasks');
  let task = (myTasks || []).find(({cid}) => cid === taskCid);
  const savedSearchQuery = localStorage.getItem('lkma__saved-search-query') || '';
  const [ query, setQuery ] = useState(savedSearchQuery);
  const isQueryBlank = query.trim() === '';
  const { loading, error, data: possiblePartnersForTask } = useQueryHelper<PossiblePartners[]>(POSSIBLE_PARTNERS_FOR_TASK, 'possiblePartnersForTask', {
    variables: { query, taskCid },
    skip: isQueryBlank
  });
  if (loadingMyTasks) {
    return <LoadingScreen />;
  }
  if (!task) {
    return <Redirect to="/404" />
  }
  return (
    <PageWrapper>
      <IonSearchbar
        debounce={500}
        animated
        placeholder="Search for partners"
        autocomplete="off"
        value={query}
        onIonInput={({ target }) => {
          if (!target) {
            return;
          }
          const { value } = (target as any);
          setQuery(value);
          if (value.length === 0) {
            localStorage.setItem('lkma__saved-search-query', '');
            return;
          }
          if (value.length > 0) {
            localStorage.setItem('lkma__saved-search-query', value);
          }
        }}
        onIonClear={() => {
          localStorage.setItem('lkma__saved-search-query', '');
        }}
      />
      <IonList>
        {isQueryBlank ? [] : <></>}
        {(!isQueryBlank && possiblePartnersForTask) ? possiblePartnersForTask.map(({ cid: userCid, name }) => (
          <UserItem key={userCid} name={name} onClick={() => {
            history.push(`/main/confirm-partner/${taskCid}/${userCid}`);
          }} />
        )) : <></> }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData(withRouter(PartnerSearch), { slug, title });
