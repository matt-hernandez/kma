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
  IonList,
  IonListHeader,
  } from '@ionic/react';
import styled from 'styled-components';
import { ReactComponent as Question } from '../assets/question.svg';
import Tooltip from '../components/Tooltip';
import {
  ONE_HOUR_MILLISECONDS,
  TOMORROW_AT_NOON_MILLISECONDS_ZONED,
  TODAY_MILLISECONDS_ZONED,
  TIME_ZONE_DIFFERENCE,
  isBeforeNow,
  getUTCTimeInMilliseconds,
  getZonedDate,
  getPartnerUpDeadlineInMilliseconds
  } from '../util/date-time';
import { TaskForAdmin, RepeatFrequency } from '../apollo-client/types/admin';
import LoadingBlock from './LoadingBlock';
import { PartnerUpDeadline } from '../apollo-client/types/user';

const TODAY_DATE_WITH_TIME_DIFFERENCE = new Date(TODAY_MILLISECONDS_ZONED + TIME_ZONE_DIFFERENCE);
const TOMORROW_MIDNIGHT = new Date(TOMORROW_AT_NOON_MILLISECONDS_ZONED - ONE_HOUR_MILLISECONDS * 12);
const TOMORROW_AT_NOON_DATE = new Date(TOMORROW_AT_NOON_MILLISECONDS_ZONED);

const partnerUpDeadlineMilliseconds: Array<{ value: PartnerUpDeadline, text: string }> = [
  {
    value: 'ONE_HOUR',
    text: '1 hour before due date'
  },
  {
    value: 'TWO_HOURS',
    text: '2 hours before'
  },
  {
    value: 'SIX_HOURS',
    text: '6 hours before'
  },
  {
    value: 'TWELVE_HOURS',
    text: '12 hours before'
  },
  {
    value: 'ONE_DAY',
    text: '1 day before'
  },
  {
    value: 'ONE_WEEK',
    text: '1 week before'
  }
];

export type TaskFormData = Pick<TaskForAdmin, 'templateCid' | 'title' | 'description' | 'due' | 'pointValue' | 'partnerUpDeadline' | 'publishDate'> & { repeatFrequency?: RepeatFrequency | null };

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
      partnerUpDeadline: 'ONE_HOUR',
      publishDate: Date.now(),
      repeatFrequency: null
    },
    onSubmit
  }) => {
  const [ title, setTitle ] = useState(task.title);
  const [ description, setDescription ] = useState(task.description || '');
  const [ due, setDue ] = useState(getZonedDate(task.due).toISOString());
  const [ points, setPoints ] = useState(task.pointValue);
  const [ partnerUpDeadline, setPartnerUpDeadline ] = useState(task.partnerUpDeadline);
  const [ publishDate, setPublishDate ] = useState(getZonedDate(task.publishDate).toISOString());
  const [ repeatFrequency, setRepeatFrequency ] = useState(task.repeatFrequency);
  const checkFormValidity = () => {
    return title.trim() && due && partnerUpDeadline;
  };
  const isFormValid = checkFormValidity();
  return (
    <IonList>
      <IonListHeader>Title*</IonListHeader>
      <IonItem>
        <IonInput value={title} placeholder="(Title is required)" name="title" onIonInput={(e) => setTitle((e as any).target.value)} />
      </IonItem>
      <IonListHeader>Description</IonListHeader>
      <IonItem>
        <IonTextarea value={description} placeholder="(Optional)" name="description" onIonInput={(e) => setDescription((e as any).target.value)} />
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
            <IonSelectOption key={text} value={value} disabled={isBeforeNow(new Date(due).getTime(), getPartnerUpDeadlineInMilliseconds(value))}>{text}</IonSelectOption>
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
            partnerUpDeadline: partnerUpDeadline,
            publishDate: getUTCTimeInMilliseconds(publishDate) || getUTCTimeInMilliseconds(now),
            repeatFrequency
          };
          onSubmit(taskData);
        }}
        disabled={!isFormValid}
      >
        {isNew ? 'Create task' : 'Save changes'}
      </IonButton>
      {!isNew && !isTemplate && (
        <IonButton expand="block" color="danger">
          {task.templateCid ? 'Delete this task only' : 'Delete'}
        </IonButton>
      )}
      {!isNew && task.templateCid && (
        <IonButton expand="block" color="danger">
          Delete and cancel all future tasks
        </IonButton>
      )}
      {(task.templateCid || isTemplate) && (
        <IonButton expand="block" color="danger">
          Cancel all future tasks
        </IonButton>
      )}
    </IonList>
  );
};

export default TaskForm;

export const TaskFormLoading = styled(LoadingBlock)`
  width: 100%;
  height: 400px;
`;
