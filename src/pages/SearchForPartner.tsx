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
    dispatch,
    state: { usersInSearch }
  }) => {
  const id = (match.params as RouteParams)['id'];
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
            dispatch(searchForPartnerForAgreement(value, id));
          }
        }}
        onIonClear={() => {
          dispatch(clearPartnerSearch());
        }}
      />
      <IonList>
        { usersInSearch.map(({ id, name }) => (
          <UserItem key={id} name={name} />
        )) }
      </IonList>
    </PageWrapper>
  );
};

export default addPageData((withRouter(ourConnect()(SearchForPartner))), { slug, title });
