import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent
  } from '@ionic/react';
import { useStateHelper, listenerTypes } from '../util/use-state-helper';

type PropTypes = {
  title: string;
  due: string;
  description: string;
  onCommit: (...args: any) => void;
};

const Agreement: React.FunctionComponent<PropTypes> = ({ title, due, description, onCommit }) => {
  const [ isDescriptionOpen, toggleDescription ] = useStateHelper(false, listenerTypes.TOGGLE);
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{due}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {description}
      </IonCardContent>
      <IonCardContent>
        <IonButton expand="block" color="primary" onClick={onCommit}>Commit to this agreement</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default Agreement;
