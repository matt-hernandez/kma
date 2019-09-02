import React from 'react';
import { IonButton } from '@ionic/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import H1 from '../components/H1';
import LargeCopy from '../components/LargeCopy';
import { addPageData } from '../util/add-page-data';
import { RouteParams } from '../util/interface-overrides';

const slug = '/confirmed/:id'
const title = 'You Have Committed!'

const CommitmentConfirmed: React.FunctionComponent<RouteComponentProps> = ({
    history,
    match
  }) => {
  const id = (match.params as RouteParams)['id'];
  return (
    <>
      <H1 centered>You have committed!</H1>
      <LargeCopy centered>Now it's time to find a partner. You can do one of two things.</LargeCopy>
      <IonButton expand="block" color="primary" onClick={() => {}}>Direct message a person</IonButton>
      <LargeCopy centered>Or</LargeCopy>
      <IonButton expand="block" color="primary" onClick={() => {}}>Choose from others who have made the same agreement</IonButton>
    </>
  );
};

export default addPageData((withRouter(CommitmentConfirmed)), { slug, title });
