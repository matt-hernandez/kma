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
import { useMutation } from '@apollo/react-hooks';
import { ReactComponent as Question } from '../../assets/question.svg';
import Tooltip from '../../components/Tooltip';
import { addPageData } from '../../util/add-page-data';
import { oneHour, oneDay } from '../../util/date-time-helpers';
import { createAgreement } from '../../constants/graphql/admin';

const slug = '/agreements/create';
const title = 'Create Task';

export default addPageData(() => {
  const [ create, { data }] = useMutation(createAgreement);
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
  const createAgreementListener = () => {
    const now = new Date().getUTCMilliseconds();
    const agreementData = {
      title,
      description,
      due: new Date(partnerUpDeadline).getUTCMilliseconds(),
      partnerUpDeadline,
      publishDate: publishDate || now
    };
    create({ variables: agreementData });
  };
  return (
    <>
      <IonItem>
        <IonInput placeholder="Title*" name="title" onIonInput={(e) => setTitle((e as any).target.value)}></IonInput>
      </IonItem>
      <IonItem>
        <IonTextarea placeholder="Description" name="description" onIonInput={(e) => setDescription((e as any).target.value)} />
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Due date &amp; time* <Tooltip text={['The date and time when the task should be completed.', 'Users will have 2 days after this date to mark their tasks as "Done." After that, their agreements will be broken automatically.']}><Question /></Tooltip></IonLabel>
        <IonDatetime slot="end" displayFormat="MMM DD, YYYY h:mm A" placeholder="Select due date" minuteValues="0,15,30,45" name="due" onIonChange={(e) => setDue((e as any).target.value)} />
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Sign-up deadline* <Tooltip text={['The deadline for people to agree to tasks and find partners.', 'After the deadline, uncommitted users will not be able to agree to the task, and committed users will not be able to find or replace partners.']}><Question /></Tooltip></IonLabel>
        <IonSelect slot="end" placeholder="Select one" interface="popover" name="partnerUpDeadline" onIonChange={(e) => setPartnerUpDeadline((e as any).target.value)}>
          <IonSelectOption value={oneHour}>1 hour before due date</IonSelectOption>
          <IonSelectOption value={oneHour * 2}>2 hours before</IonSelectOption>
          <IonSelectOption value={oneHour * 6}>6 hours before</IonSelectOption>
          <IonSelectOption value={oneHour * 12}>12 hours before</IonSelectOption>
          <IonSelectOption value={oneDay}>1 day before</IonSelectOption>
          <IonSelectOption value={oneDay * 7}>1 week before</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Publish date <Tooltip text={['When users will see this task in their "Open Tasks" feed and be able to sign-up.']}><Question /></Tooltip></IonLabel>
        <IonDatetime slot="end" displayFormat="MMM DD, YYYY h:mm A" placeholder="Now" minuteValues="0,15,30,45" name="publishDate" onIonChange={(e) => setPublishDate((e as any).target.value)} />
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Task frequency <Tooltip text={['Use this to create a task that repeats at a regular amount of time.', 'NOTE: The publish date for future repeating tasks is always right after the due date of the current one.']}><Question /></Tooltip></IonLabel>
        <IonSelect slot="end" placeholder="Once" interface="popover" name="repeatFrequency" onIonChange={(e) => setRepeatFrequency((e as any).target.value)}>
          <IonSelectOption value={0}>Once</IonSelectOption>
          <IonSelectOption value={oneDay}>Daily</IonSelectOption>
          <IonSelectOption value={oneDay * 7}>Weekly</IonSelectOption>
          <IonSelectOption value={oneDay * 7}>Same date every month</IonSelectOption>
          <IonSelectOption value={oneDay * 7}>End of the month</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonButton expand="block" color="primary" onClick={createAgreementListener} disabled={!isFormValid}>Create task</IonButton>
    </>
  )
}, { slug, title });
