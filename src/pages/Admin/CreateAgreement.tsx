import React, { useState } from 'react';
import {
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonToast
  } from '@ionic/react';
import { useMutation } from '@apollo/react-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import { ReactComponent as Question } from '../../assets/question.svg';
import Tooltip from '../../components/Tooltip';
import { addPageData } from '../../util/add-page-data';
import { ONE_HOUR_MILLISECONDS, ONE_DAY_MILLISECONDS, TODAY_DATE_ZONED, TOMORROW_AT_NOON_MILLISECONDS_ZONED, TODAY_MILLISECONDS_ZONED, TIME_ZONE_DIFFERENCE } from '../../constants/date';
import { CREATE_AGREEMENT, CREATE_AGREEMENT_TEMPLATE } from '../../constants/graphql/admin';
import { StateProps, ourConnect, dismissLoadingScreen, triggerLoadingScreen } from '../../util/state';
import { isBeforeNow, getUTCTimeInMilliseconds } from '../../util/date-time-helpers';

const slug = '/agreements/create';
const title = 'Create Task';

const TODAY_DATE_WITH_TIME_DIFFERENCE = new Date(TODAY_MILLISECONDS_ZONED + TIME_ZONE_DIFFERENCE);
const TOMORROW_MIDNIGHT = new Date(TOMORROW_AT_NOON_MILLISECONDS_ZONED - ONE_HOUR_MILLISECONDS * 12);
const TOMORROW_AT_NOON_DATE = new Date(TOMORROW_AT_NOON_MILLISECONDS_ZONED);

const partnerUpDeadlineMilliseconds = [
  {
    value: ONE_HOUR_MILLISECONDS,
    text: '1 hour before due date'
  },
  {
    value: ONE_HOUR_MILLISECONDS * 2,
    text: '2 hours before'
  },
  {
    value: ONE_HOUR_MILLISECONDS * 6,
    text: '6 hours before'
  },
  {
    value: ONE_HOUR_MILLISECONDS * 12,
    text: '12 hours before'
  },
  {
    value: ONE_DAY_MILLISECONDS,
    text: '1 day before'
  },
  {
    value: ONE_DAY_MILLISECONDS * 7,
    text: '1 week before'
  }
];

const CreateAgreement: React.FunctionComponent<StateProps & RouteComponentProps> = ({
    dispatch,
    history
  }) => {
  const [ createAgreement ] = useMutation(CREATE_AGREEMENT);
  const [ createAgreementTemplate ] = useMutation(CREATE_AGREEMENT_TEMPLATE)
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ due, setDue ] = useState(TOMORROW_AT_NOON_DATE.toISOString());
  const [ partnerUpDeadline, setPartnerUpDeadline ] = useState(ONE_HOUR_MILLISECONDS);
  const [ publishDate, setPublishDate ] = useState(TODAY_DATE_ZONED.toISOString());
  const [ repeatFrequency, setRepeatFrequency ] = useState(0);
  const [ toastData, setToastData ] = useState<any>(null);
  const checkFormValidity = () => {
    return title.trim() && due && partnerUpDeadline;
  };
  const isFormValid = checkFormValidity();
  const createAgreementListener = () => {
    const now = TODAY_MILLISECONDS_ZONED;
    const agreementData = {
      title,
      description,
      due: getUTCTimeInMilliseconds(due),
      partnerUpDeadline,
      publishDate: getUTCTimeInMilliseconds(publishDate) || now
    };
    dispatch(triggerLoadingScreen());
    let agreementCreationHasError = false;
    let agreementTemplateCreationHasError = false;
    const createAgreementPromise = createAgreement({ variables: agreementData }).catch(() => {agreementCreationHasError = true});
    if (repeatFrequency) {
      createAgreementPromise.then((agreement) => createAgreementTemplate({
          variables: {
            ...agreementData,
            repeatFrequency,
            nextPublishDate: getUTCTimeInMilliseconds(due),
            nextDueDate: getUTCTimeInMilliseconds(due) + Number(repeatFrequency)
          }
        }).then(() => agreement).catch(() => {
          agreementTemplateCreationHasError = true;
          return agreement;
        })
      );
    }
    createAgreementPromise.then((agreement: any) => {
      dispatch(dismissLoadingScreen());
      if (agreementCreationHasError) {
        setToastData({
          color: 'danger',
          message: 'There was an error creating your task!'
        });
      } else if (agreementTemplateCreationHasError) {
        setToastData({
          color: 'warning',
          message: 'Your task was created, but there was a problem setting up recurring tasks.'
        });
      } else {
        let url: string;
        if (agreement.publishDate > TODAY_MILLISECONDS_ZONED) {
          url = '/admin/agreements/upcoming';
        } else {
          url = '/admin/agreements/current';
        }
        setToastData({
          color: 'success',
          message: 'Your task was created successfully!',
          buttons: [{
            text: 'View task',
            handler: () => {
              history.push(url);
            }
          }]
        });
      }
    });
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
        <IonDatetime value={due} min={TOMORROW_MIDNIGHT.toISOString()} displayFormat="MMM DD, YYYY h:mm A" placeholder="Select due date" minuteValues="0,15,30,45" name="due" onIonChange={(e) => setDue((e as any).target.value)} slot="end" />
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Sign-up deadline* <Tooltip text={['The deadline for people to agree to tasks and find partners.', 'After the deadline, uncommitted users will not be able to agree to the task, and committed users will not be able to find or replace partners.']}><Question /></Tooltip></IonLabel>
        <IonSelect value={partnerUpDeadline} placeholder="Select one" interface="popover" name="partnerUpDeadline" onIonChange={(e) => setPartnerUpDeadline((e as any).target.value)} slot="end">
          {partnerUpDeadlineMilliseconds.map(({ value, text }) => (
            <IonSelectOption key={text} value={value} disabled={isBeforeNow(new Date(due).getTime(), value)}>{text}</IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Publish date <Tooltip text={['When users will see this task in their "Open Tasks" feed and be able to sign-up.']}><Question /></Tooltip></IonLabel>
        <IonDatetime value={publishDate} min={TODAY_DATE_WITH_TIME_DIFFERENCE.toISOString()} displayFormat="MMM DD, YYYY h:mm A" placeholder="Now" name="publishDate" onIonChange={(e) => setPublishDate((e as any).target.value)} slot="end" />
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Task frequency <Tooltip text={['Use this to create a task that repeats at a regular amount of time.', 'NOTE: The publish date for future repeating tasks is always right after the due date of the current one.']}><Question /></Tooltip></IonLabel>
        <IonSelect value={repeatFrequency} placeholder="Once" interface="popover" name="repeatFrequency" onIonChange={(e) => setRepeatFrequency((e as any).target.value)} slot="end">
          <IonSelectOption value={0}>Once</IonSelectOption>
          <IonSelectOption value={ONE_DAY_MILLISECONDS}>Daily</IonSelectOption>
          <IonSelectOption value={ONE_DAY_MILLISECONDS * 7}>Weekly</IonSelectOption>
          <IonSelectOption value={ONE_DAY_MILLISECONDS * 7}>Same date every month</IonSelectOption>
          <IonSelectOption value={ONE_DAY_MILLISECONDS * 7}>End of the month</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonButton expand="block" color="primary" onClick={createAgreementListener} disabled={!isFormValid}>Create task</IonButton>
      {toastData !== null && (
        <IonToast
          isOpen
          color={toastData.color}
          onDidDismiss={() => setToastData(null)}
          message={toastData.message}
          duration={5000}
          buttons={toastData.buttons ? toastData.buttons : []}
        />
      )}
    </>
  )
};

export default addPageData(withRouter(ourConnect()(CreateAgreement)), { slug, title });
