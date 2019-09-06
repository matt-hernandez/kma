import React from 'react';
import { IonSearchbar, IonList } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import UserItem from '../components/UserItem';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';
import { ourConnect, StateProps, searchForPartnerForAgreement, clearPartnerSearch } from '../util/state';

const slug = '/partner-search/:id';
const title = 'Search for Partner';

const SearchForPartner: React.FunctionComponent<RouteComponentProps & StateProps> = ({
    match,
    history,
    dispatch,
    state: { usersInSearch }
  }) => {
  const agreementId = (match.params as RouteParams)['id'];
  return (
    <PageWrapper>
      <IonSearchbar
        debounce={500}
        animated
        placeholder="Search for partners"
        autocomplete="off"
        onIonInput={({ target }) => {
          if (!target) {
            return;
          }
          const { value } = (target as any);
          if (value.length === 0) {
            dispatch(clearPartnerSearch());
            return;
          }
          if (value.length > 2) {
            dispatch(searchForPartnerForAgreement(value, agreementId));
          }
        }}
        onIonClear={() => {
          dispatch(clearPartnerSearch());
        }}
      />
      <IonList>
        { usersInSearch.map(({ id: userId, name }) => (
          <UserItem key={userId} name={name} onClick={() => {
            history.push(`/confirm-partner/${agreementId}/${userId}`);
          }} />
        )) }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData((withRouter(ourConnect()(SearchForPartner))), { slug, title });
