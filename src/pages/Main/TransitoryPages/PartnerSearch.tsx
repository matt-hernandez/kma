import React, { useState } from 'react';
import { IonSearchbar, IonList } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import PageWrapper from '../../../components/PageWrapper';
import UserItem from '../../../components/UserItem';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { readCachedQuery } from '../../../apollo-client/client';
import { Task as TaskInterface, PossiblePartners } from '../../../apollo-client/types/user';
import { MY_TASKS, POSSIBLE_PARTNERS_FOR_TASK } from '../../../apollo-client/queries/user';

const slug = '/partner-search/:cid';
const title = 'Partner Search';

const PartnerSearch: React.FunctionComponent<RouteComponentProps> = ({
    match,
    history
  }) => {
  const taskCid = (match.params as RouteParams)['cid'];
  const myTasks = readCachedQuery<TaskInterface[]>({
    query: MY_TASKS
  }, 'myTasks');
  const task = myTasks.find(({cid}) => cid === taskCid);
  const savedSearchQuery = localStorage.getItem('lkma__saved-search-query') || '';
  const [ query, setQuery ] = useState(savedSearchQuery);
  const isQueryBlank = query.trim() === '';
  const { loading, error, data }= useQuery<{ possiblePartnersForTask: PossiblePartners[]}>(POSSIBLE_PARTNERS_FOR_TASK, {
    variables: { name: query, taskCid },
    skip: isQueryBlank
  });
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
        {loading && !isQueryBlank ? 'Please wait' : <></>}
        {(!loading && !error && !isQueryBlank && data) ? data.possiblePartnersForTask.map(({ cid: userCid, name }) => (
          <UserItem key={userCid} name={name} onClick={() => {
            history.push(`/main/confirm-partner/${taskCid}/${userCid}`);
          }} />
        )) : <></> }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData(withRouter(PartnerSearch), { slug, title });
