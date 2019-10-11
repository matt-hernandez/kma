import React, { useState } from 'react';
import {
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonSelect,
  IonSelectOption
  } from '@ionic/react';
import { addPageData } from '../../util/add-page-data';
import { oneHour, oneDay } from '../../util/date-time-helpers';

const slug = '/agreements/create';
const title = 'Create Agreement';

export default addPageData(() => {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ due, setDue ] = useState('');
  const [ partnerUpDeadline, setPartnerUpDeadline ] = useState('');
  const [ publishDate, setPublishDate ] = useState('');
  const [ repeatFrequency, setRepeatFrequency ] = useState('');
  const checkFormValidity = () => {
    return title.trim() && due && partnerUpDeadline;
  };
  const isFormValid = checkFormValidity();
  const createTask = () => {
    const data = {
      title,
      description,
      due,
      partnerUpDeadline,
      publishDate: publishDate || 0,
      repeatFrequency: repeatFrequency || 0
    };
    const json = JSON.stringify(data);
  };
  return (
    <>
      <IonItem>
        <IonInput placeholder="Title" name="title" onIonInput={(e) => setTitle((e as any).target.value)}></IonInput>
      </IonItem>
      <IonItem>
        <IonTextarea placeholder="Description" name="description" onIonInput={(e) => setDescription((e as any).target.value)} />
      </IonItem>
      <IonItem>
        <IonLabel>Due date &amp; time</IonLabel>
        <IonDatetime displayFormat="MMM DD, YYYY h:mm A" pickerFormat="MMM DD, YYYY h:m A" placeholder="Select due date" minuteValues="0,15,30,45" name="due" onIonChange={(e) => setDue((e as any).target.value)} />
      </IonItem>
      <IonItem>
        <IonLabel>Commit &amp; partner-up deadline</IonLabel>
        <IonSelect placeholder="Select one" interface="popover" name="partnerUpDeadline" onIonChange={(e) => setPartnerUpDeadline((e as any).target.value)}>
          <IonSelectOption value={oneHour}>1 hour before due date</IonSelectOption>
          <IonSelectOption value={oneHour * 2}>2 hours before</IonSelectOption>
          <IonSelectOption value={oneHour * 6}>6 hours before</IonSelectOption>
          <IonSelectOption value={oneHour * 12}>12 hours before</IonSelectOption>
          <IonSelectOption value={oneDay}>1 day before</IonSelectOption>
          <IonSelectOption value={oneDay * 7}>1 week before</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel>Publish date</IonLabel>
        <IonDatetime displayFormat="MMM DD, YYYY h:mm A" pickerFormat="MMM DD, YYYY h:m A" placeholder="Now" minuteValues="0,15,30,45" name="publishDate" onIonChange={(e) => setPublishDate((e as any).target.value)} />
      </IonItem>
      <IonItem>
        <IonLabel>Task frequency</IonLabel>
        <IonSelect placeholder="Once" interface="popover" name="repeatFrequency" onIonChange={(e) => setRepeatFrequency((e as any).target.value)}>
          <IonSelectOption value={0}>Once</IonSelectOption>
          <IonSelectOption value={oneDay}>Daily</IonSelectOption>
          <IonSelectOption value={oneDay * 7}>Weekly</IonSelectOption>
          <IonSelectOption value={oneDay * 7}>Same date every month</IonSelectOption>
          <IonSelectOption value={oneDay * 7}>End of the month</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonButton expand="block" color="primary" onClick={createTask} disabled={!isFormValid}>Create task</IonButton>
    </>
  )
}, { slug, title });
