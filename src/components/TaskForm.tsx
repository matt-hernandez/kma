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
  } from '@ionic/react';
import { ReactComponent as Question } from '../assets/question.svg';
import Tooltip from '../components/Tooltip';
import {
  ONE_HOUR_MILLISECONDS,
  ONE_DAY_MILLISECONDS,
  TOMORROW_AT_NOON_MILLISECONDS_ZONED,
  TODAY_MILLISECONDS_ZONED,
  TIME_ZONE_DIFFERENCE,
  isBeforeNow,
  getUTCTimeInMilliseconds,
  getZonedDate
  } from '../util/date-time';
import { TaskForAdmin, TaskTemplate } from '../apollo-client/types/admin';

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

export type TaskFormData = Pick<TaskForAdmin, 'title' | 'description' | 'due' | 'pointValue' | 'partnerUpDeadline' | 'publishDate'> & { repeatFrequency: Pick<TaskTemplate, 'repeatFrequency'> | null };

type Props = {
  isNew?: boolean,
  isTemplate?: boolean,
  task?: TaskFormData,
  onSubmit: (data: TaskFormData) => void
};

const TaskForm: React.FunctionComponent<Props> = ({
    isNew,
    isTemplate,
    task = {
      title: '',
      description: '',
      due: TOMORROW_AT_NOON_DATE.getTime(),
      pointValue: 1,
      partnerUpDeadline: TOMORROW_AT_NOON_DATE.getTime() - ONE_HOUR_MILLISECONDS,
      publishDate: Date.now(),
      repeatFrequency: null
    },
    onSubmit
  }) => {
  const [ title, setTitle ] = useState(task.title);
  const [ description, setDescription ] = useState(task.description || '');
  const [ due, setDue ] = useState(getZonedDate(task.due).toISOString());
  const [ points, setPoints ] = useState(task.pointValue);
  const [ partnerUpDeadline, setPartnerUpDeadline ] = useState(task.due - task.partnerUpDeadline);
  const [ publishDate, setPublishDate ] = useState(getZonedDate(task.publishDate).toISOString());
  const [ repeatFrequency, setRepeatFrequency ] = useState(task.repeatFrequency);
  const checkFormValidity = () => {
    return title.trim() && due && partnerUpDeadline;
  };
  const isFormValid = checkFormValidity();
  return (
    <>
      <IonItem>
        <IonInput value={title} placeholder="Title*" name="title" onIonInput={(e) => setTitle((e as any).target.value)} />
      </IonItem>
      <IonItem>
        <IonTextarea value={description} placeholder="Description" name="description" onIonInput={(e) => setDescription((e as any).target.value)} />
      </IonItem>
      <IonItem>
        <IonLabel slot="start">
          {isTemplate ? 'Next due date & time' : 'Due date & time'} <Tooltip text={['The date and time when the task should be completed.', 'Users will have 2 days after this date to mark their tasks as "Done." After that, their tasks will be broken automatically.']}><Question /></Tooltip>
        </IonLabel>
        <IonDatetime value={due} min={TOMORROW_MIDNIGHT.toISOString()} displayFormat="MMM DD, YYYY h:mm A" placeholder="Select due date" minuteValues="0,15,30,45" name="due" onIonChange={(e) => setDue((e as any).target.value)} slot="end" />
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Points</IonLabel>
        <IonSelect value={points} interface="popover" name="points" onIonChange={(e) => setPoints((e as any).target.value)} slot="end">
          <IonSelectOption value={1}>1</IonSelectOption>
          <IonSelectOption value={2}>2</IonSelectOption>
          <IonSelectOption value={3}>3</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">Enrollment deadline <Tooltip text={['The deadline for people to commit to tasks and find partners.', 'After the deadline, uncommitted users will not be able to commit to the task, and committed users will not be able to find or replace partners.']}><Question /></Tooltip></IonLabel>
        <IonSelect value={partnerUpDeadline} placeholder="Select one" interface="popover" name="partnerUpDeadline" onIonChange={(e) => setPartnerUpDeadline((e as any).target.value)} slot="end">
          {partnerUpDeadlineMilliseconds.map(({ value, text }) => (
            <IonSelectOption key={text} value={value} disabled={isBeforeNow(new Date(due).getTime(), value)}>{text}</IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel slot="start">
          {isTemplate ? 'Next publish date' : 'Publish date'} <Tooltip text={['When users will see this task in their "Open Tasks" feed and be able to sign-up.']}><Question /></Tooltip>
        </IonLabel>
        <IonDatetime value={publishDate} min={TODAY_DATE_WITH_TIME_DIFFERENCE.toISOString()} displayFormat="MMM DD, YYYY h:mm A" placeholder="Now" name="publishDate" onIonChange={(e) => setPublishDate((e as any).target.value)} slot="end" />
      </IonItem>
      {(isNew || isTemplate) && (
        <IonItem>
          <IonLabel slot="start">Task frequency <Tooltip text={['Use this to create a task that repeats at a regular amount of time.', 'NOTE: The publish date for future repeating tasks is always right after the due date of the current one.']}><Question /></Tooltip></IonLabel>
          <IonSelect value={repeatFrequency} placeholder="Once" interface="popover" name="repeatFrequency" onIonChange={(e) => setRepeatFrequency((e as any).target.value)} slot="end">
            {isNew && <IonSelectOption value={null}>Once</IonSelectOption>}
            <IonSelectOption value="DAY">Daily</IonSelectOption>
            <IonSelectOption value="WEEK">Weekly</IonSelectOption>
            <IonSelectOption value="MONTH">Same date every month</IonSelectOption>
            <IonSelectOption value="END_OF_MONTH">End of the month</IonSelectOption>
          </IonSelect>
        </IonItem>
      )}
      <IonButton expand="block" color="primary" onClick={() => {
          const now = TODAY_MILLISECONDS_ZONED;
          const taskData: TaskFormData = {
            title,
            description,
            pointValue: points,
            due: getUTCTimeInMilliseconds(due),
            partnerUpDeadline: getUTCTimeInMilliseconds(due) - partnerUpDeadline,
            publishDate: getUTCTimeInMilliseconds(publishDate) || getUTCTimeInMilliseconds(now),
            repeatFrequency
          };
          onSubmit(taskData);
        }}
        disabled={!isFormValid}
      >
        Create task
      </IonButton>
    </>
  )
};

export default TaskForm;
