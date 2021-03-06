import React, { useState, useRef, useEffect } from 'react';
import { IonSearchbar, IonList } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import useQueryHelper from '../../../util/use-query-helper';
import PageWrapper from '../../../components/PageWrapper';
import UserItem, { UserItemLoading } from '../../../components/UserItem';
import LoadingBlock from '../../../components/LoadingBlock';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { Task as TaskInterface, PossiblePartner } from '../../../apollo-client/types/user';
import { MY_TASKS, PARTNER_SEARCH } from '../../../apollo-client/query/user';

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
  const searchBarRef = useRef(null);
  const { loading: loadingMyTasks, error: errorMyTasks, data: myTasks } = useQueryHelper<TaskInterface[]>(MY_TASKS, 'myTasks');
  let task = (myTasks || []).find(({cid}) => cid === taskCid);
  const savedSearchQuery = localStorage.getItem('lkma__saved-search-query') || '';
  const [ query, setQuery ] = useState(savedSearchQuery);
  const isQueryBlank = query.trim() === '';
  const { loading, error, data: partnerSearch } = useQueryHelper<PossiblePartner[]>(PARTNER_SEARCH, 'partnerSearch', {
    variables: { query, taskCid },
    skip: isQueryBlank,
    fetchPolicy: 'network-only'
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      const searchBarEl = document.querySelector('.searchbar-input') as HTMLInputElement;
      if (searchBarEl) {
        searchBarEl.focus();
        clearInterval(intervalId);
      }
    }, 100);
    return () => {
      clearInterval(intervalId);
    }
  }, [])
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
        ref={searchBarRef}
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
        {(!isQueryBlank && partnerSearch) ? partnerSearch.map(({ cid: userCid, name }) => (
          <UserItem key={userCid} name={name} onClick={() => {
            history.push(`/main/confirm-partner/${taskCid}/${userCid}`);
          }} />
        )) : <></> }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData(withRouter(PartnerSearch), { slug, title });
