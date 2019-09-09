import React, { useRef, useState } from 'react';
import { IonSearchbar, IonList } from '@ionic/react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import UserItem from '../components/UserItem';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';
import { ourConnect, StateProps, searchForPartnerForAgreement, clearSearchQuery, saveSearchQuery } from '../util/state';

const slug = '/partner-search/:id';
const title = 'Partner Search';

const PartnerSearch: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    match,
    history,
    dispatch,
    state: { usersInSearch, myAgreements, savedSearchQuery }
  }) => {
  const agreementId = (match.params as RouteParams)['id'];
  const agreement = myAgreements.find(({id: aId}) => aId === agreementId);
  const queryRef = useRef(savedSearchQuery);
  const [ query, setQuery ] = useState('');
  if (!agreement) {
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
            dispatch(searchForPartnerForAgreement(value, agreementId));
          }
        }}
        onIonClear={() => {
          queryRef.current = '';
          dispatch(clearSearchQuery());
        }}
      />
      <IonList>
        { usersInSearch.map(({ id: userId, name }) => (
          <UserItem key={userId} name={name} onClick={() => {
            dispatch(saveSearchQuery(queryRef.current));
            history.push(`/confirm-partner/${agreementId}/${userId}`);
          }} />
        )) }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData((withRouter(ourConnect()(PartnerSearch))), { slug, title });
