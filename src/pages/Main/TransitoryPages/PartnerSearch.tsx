import React, { useRef, useState } from 'react';
import { IonSearchbar, IonList } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import PageWrapper from '../../../components/PageWrapper';
import UserItem from '../../../components/UserItem';
import { addPageData } from '../../../util/add-page-data';
import { RouteParams } from '../../../util/interface-overrides';
import { ourConnect, StateProps, searchForPartnerForTask, clearSearchQuery, saveSearchQuery } from '../../../util/state';

const slug = '/partner-search/:cid';
const title = 'Partner Search';

const PartnerSearch: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    match,
    history,
    dispatch,
    state: { usersInSearch, myTasks, savedSearchQuery }
  }) => {
  const taskCid = (match.params as RouteParams)['cid'];
  const task = myTasks.find(({cid: aCid}) => aCid === taskCid);
  const queryRef = useRef(savedSearchQuery);
  const [ query, setQuery ] = useState('');
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
        value={savedSearchQuery || query}
        onIonInput={({ target }) => {
          if (!target) {
            return;
          }
          const { value } = (target as any);
          queryRef.current = value;
          setQuery(value);
          if (value.length === 0) {
            dispatch(clearSearchQuery());
            return;
          }
          if (value.length > 0) {
            dispatch(saveSearchQuery(queryRef.current));
            // dispatch(searchForPartnerForTask(value, taskCid));
          }
        }}
        onIonClear={() => {
          queryRef.current = '';
          dispatch(clearSearchQuery());
        }}
      />
      <IonList>
        { usersInSearch.map(({ cid: userCid, name }) => (
          <UserItem key={userCid} name={name} onClick={() => {
            dispatch(saveSearchQuery(queryRef.current));
            history.push(`/main/confirm-partner/${taskCid}/${userCid}`);
          }} />
        )) }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData((withRouter(ourConnect()(PartnerSearch))), { slug, title });
