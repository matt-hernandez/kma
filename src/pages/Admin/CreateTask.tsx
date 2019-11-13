import React, { useState, useContext } from 'react';
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
import {
  ONE_HOUR_MILLISECONDS,
  ONE_DAY_MILLISECONDS,
  TODAY_ISO_STRING,
  TOMORROW_AT_NOON_MILLISECONDS_ZONED,
  TODAY_MILLISECONDS_ZONED,
  TIME_ZONE_DIFFERENCE,
  isBeforeNow,
  getUTCTimeInMilliseconds
  } from '../../util/date-time';
import { ALL_CURRENT_TASKS } from '../../apollo-client/query/admin';
import { CREATE_TASK, CREATE_TASK_TEMPLATE } from '../../apollo-client/mutation/admin';
import { LoadingContext } from '../../contexts/LoadingContext';
import generateCacheUpdate from '../../util/generate-cache-update';
import { TaskForAdmin } from '../../apollo-client/types/admin';

const slug = '/tasks/create';
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

const CreateTask: React.FunctionComponent<RouteComponentProps> = ({
    history
  }) => {
  const [ createTask ] = useMutation(CREATE_TASK, {
    update: generateCacheUpdate<TaskForAdmin>(
      'INSERT_ITEM',
      {
        name: 'allCurrentTasks',
        query: ALL_CURRENT_TASKS,
        sort: (d1, d2) => d1.due - d2.due
      },
      'createTask'
    )
  });
  const [ createTaskTemplate ] = useMutation(CREATE_TASK_TEMPLATE)
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ due, setDue ] = useState(TOMORROW_AT_NOON_DATE.toISOString());
  const [ partnerUpDeadline, setPartnerUpDeadline ] = useState(ONE_HOUR_MILLISECONDS);
  const [ publishDate, setPublishDate ] = useState(TODAY_ISO_STRING);
  const [ repeatFrequency, setRepeatFrequency ] = useState(0);
  const [ toastData, setToastData ] = useState<any>(null);
  const { showLoadingScreen, hideLoadingScreen } = useContext(LoadingContext);
  const checkFormValidity = () => {
    return title.trim() && due && partnerUpDeadline;
  };
  const isFormValid = checkFormValidity();
  const createTaskListener = () => {
    const now = TODAY_MILLISECONDS_ZONED;
    const taskData = {
      title,
      description,
      due: getUTCTimeInMilliseconds(due),
      partnerUpDeadline,
      publishDate: getUTCTimeInMilliseconds(publishDate) || getUTCTimeInMilliseconds(now)
    };
    showLoadingScreen();
    let taskCreationHasError = false;
    let taskTemplateCreationHasError = false;
    const createTaskPromise = createTask({ variables: taskData }).catch(() => {taskCreationHasError = true});
    if (repeatFrequency) {
      createTaskPromise.then((task) => createTaskTemplate({
          variables: {
            ...taskData,
            repeatFrequency,
            nextPublishDate: getUTCTimeInMilliseconds(due),
            nextDueDate: getUTCTimeInMilliseconds(due) + Number(repeatFrequency)
          }
        }).then(() => task).catch(() => {
          taskTemplateCreationHasError = true;
          return task;
        })
      );
    }
    createTaskPromise.then((task: any) => {
      hideLoadingScreen();
      if (taskCreationHasError) {
        setToastData({
          color: 'danger',
          message: 'There was an error creating your task!'
        });
      } else if (taskTemplateCreationHasError) {
        setToastData({
          color: 'warning',
          message: 'Your task was created, but there was a problem setting up recurring tasks.'
        });
      } else {
        let url: string;
        if (task.publishDate > TODAY_MILLISECONDS_ZONED) {
          url = '/admin/tasks/upcoming';
        } else {
          url = '/admin/tasks/current';
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
        <IonLabel slot="start">Due date &amp; time* <Tooltip text={['The date and time when the task should be completed.', 'Users will have 2 days after this date to mark their tasks as "Done." After that, their tasks will be broken automatically.']}><Question /></Tooltip></IonLabel>
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
      <IonButton expand="block" color="primary" onClick={createTaskListener} disabled={!isFormValid}>Create task</IonButton>
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

export default addPageData(withRouter(CreateTask), { slug, title });
