import React from 'react';
import { IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import UserItem from '../components/UserItem';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';
import { ReactComponent as UserPic } from '../assets/user-pic.svg';

const slug = '/partner-search/:id';
const title = 'Search for Partner';

const SearchForPartner: React.FunctionComponent<RouteComponentProps> = ({
    match
  }) => {
  const id = (match.params as RouteParams)['id'];
  return (
    <PageWrapper>
      <IonSearchbar debounce={500} animated placeholder="Search for partners"></IonSearchbar>
      <IonList>
        <UserItem name="Katie Fryer" />
      </IonList>
    </PageWrapper>
  );
};

export default addPageData((withRouter(SearchForPartner)), { slug, title });
