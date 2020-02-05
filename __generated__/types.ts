export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export enum AccessRights {
  User = 'USER',
  Admin = 'ADMIN',
  SuperAdmin = 'SUPER_ADMIN'
}

export type ConfirmTaskAsDoneResult = {
   __typename?: 'ConfirmTaskAsDoneResult',
  task: TaskForAdmin,
  outcome: Outcome,
};

export type Connection = {
   __typename?: 'Connection',
  cid: Scalars['String'],
  connectedUserCid: Scalars['String'],
  connectedUserName: Scalars['String'],
  type: ConnectionType,
};

export type ConnectionForAdmin = {
   __typename?: 'ConnectionForAdmin',
  cid: Scalars['String'],
  fromCid: Scalars['String'],
  fromName: Scalars['String'],
  type: ConnectionTypeForAdmin,
  toCid: Scalars['String'],
  toName: Scalars['String'],
};

export enum ConnectionType {
  RequestTo = 'REQUEST_TO',
  RequestFrom = 'REQUEST_FROM',
  Confirmed = 'CONFIRMED',
  BrokeWith = 'BROKE_WITH'
}

export enum ConnectionTypeForAdmin {
  Requested = 'REQUESTED',
  Confirmed = 'CONFIRMED',
  BrokeWith = 'BROKE_WITH'
}

export type Mutation = {
   __typename?: 'Mutation',
  commitToTask: Task,
  addTaskTemplateToSkipCommitConfirm: User,
  addTaskTemplateToSkipDoneConfirm: User,
  requestPartnerForTask: Task,
  confirmPartnerRequest: Task,
  cancelPartnerRequest: Task,
  denyPartnerRequest: Task,
  removeBrokenPartnership: Task,
  breakCommitment: Task,
  markTaskAsDone: Task,
  createUser: User,
  makeUserInactive: User,
  makeUserActive: User,
  makeUserAnAdmin: User,
  removeUserAsAdmin: User,
  changeTaskStatusForUser: TaskForAdmin,
  createTask: TaskForAdmin,
  updateTask: TaskForAdmin,
  deleteTask: TaskForAdmin,
  createTaskTemplate: TaskTemplate,
  updateTaskTemplate: TaskTemplate,
  deleteTaskTemplate: TaskTemplate,
  confirmAsDone: ConfirmTaskAsDoneResult,
  denyAsDone: ConfirmTaskAsDoneResult,
};


export type MutationCommitToTaskArgs = {
  taskCid: Scalars['String']
};


export type MutationAddTaskTemplateToSkipCommitConfirmArgs = {
  templateCid: Scalars['String']
};


export type MutationAddTaskTemplateToSkipDoneConfirmArgs = {
  templateCid: Scalars['String']
};


export type MutationRequestPartnerForTaskArgs = {
  taskCid: Scalars['String'],
  partnerCid: Scalars['String']
};


export type MutationConfirmPartnerRequestArgs = {
  taskCid: Scalars['String'],
  connectionCid: Scalars['String']
};


export type MutationCancelPartnerRequestArgs = {
  taskCid: Scalars['String'],
  connectionCid: Scalars['String']
};


export type MutationDenyPartnerRequestArgs = {
  taskCid: Scalars['String'],
  connectionCid: Scalars['String']
};


export type MutationRemoveBrokenPartnershipArgs = {
  taskCid: Scalars['String'],
  connectionCid: Scalars['String']
};


export type MutationBreakCommitmentArgs = {
  taskCid: Scalars['String']
};


export type MutationMarkTaskAsDoneArgs = {
  taskCid: Scalars['String']
};


export type MutationCreateUserArgs = {
  name: Scalars['String'],
  email: Scalars['String'],
  loginTimestamp: Scalars['Float']
};


export type MutationMakeUserInactiveArgs = {
  cid: Scalars['String']
};


export type MutationMakeUserActiveArgs = {
  cid: Scalars['String']
};


export type MutationMakeUserAnAdminArgs = {
  cid: Scalars['String']
};


export type MutationRemoveUserAsAdminArgs = {
  cid: Scalars['String']
};


export type MutationChangeTaskStatusForUserArgs = {
  outcomeCid: Scalars['String'],
  outcomeType: OutcomeType
};


export type MutationCreateTaskArgs = {
  title: Scalars['String'],
  due: Scalars['Float'],
  publishDate: Scalars['Float'],
  partnerUpDeadline: PartnerUpDeadline,
  description?: Maybe<Scalars['String']>,
  pointValue: Scalars['Int']
};


export type MutationUpdateTaskArgs = {
  cid: Scalars['String'],
  title: Scalars['String'],
  due: Scalars['Float'],
  publishDate: Scalars['Float'],
  partnerUpDeadline: PartnerUpDeadline,
  description?: Maybe<Scalars['String']>,
  pointValue: Scalars['Int']
};


export type MutationDeleteTaskArgs = {
  cid: Scalars['String']
};


export type MutationCreateTaskTemplateArgs = {
  taskCid: Scalars['String'],
  repeatFrequency: RepeatFrequency
};


export type MutationUpdateTaskTemplateArgs = {
  cid: Scalars['String'],
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  pointValue: Scalars['Int'],
  due: Scalars['Float'],
  publishDate: Scalars['Float'],
  partnerUpDeadline: PartnerUpDeadline,
  repeatFrequency?: Maybe<RepeatFrequency>
};


export type MutationDeleteTaskTemplateArgs = {
  cid: Scalars['String']
};


export type MutationConfirmAsDoneArgs = {
  taskCid: Scalars['String'],
  userCid: Scalars['String']
};


export type MutationDenyAsDoneArgs = {
  taskCid: Scalars['String'],
  userCid: Scalars['String']
};

export type Outcome = {
   __typename?: 'Outcome',
  cid: Scalars['String'],
  taskCid: Scalars['String'],
  userCid: Scalars['String'],
  type: OutcomeType,
};

export enum OutcomeType {
  Fulfilled = 'FULFILLED',
  FulfilledOmitPartner = 'FULFILLED_OMIT_PARTNER',
  Pending = 'PENDING',
  Broken = 'BROKEN',
  BrokenOmitPartner = 'BROKEN_OMIT_PARTNER'
}

export enum PartnerUpDeadline {
  OneHour = 'ONE_HOUR',
  TwoHours = 'TWO_HOURS',
  SixHours = 'SIX_HOURS',
  TwelveHours = 'TWELVE_HOURS',
  OneDay = 'ONE_DAY',
  OneWeek = 'ONE_WEEK'
}

export type PossiblePartner = {
   __typename?: 'PossiblePartner',
  cid: Scalars['String'],
  name: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  me: User,
  scoreDetails: ScoreDetails,
  possiblePartnersForTask: Array<PossiblePartner>,
  userPool: Array<PossiblePartner>,
  onePossiblePartnerForTask?: Maybe<PossiblePartner>,
  getPartnerDetails: PossiblePartner,
  openTasks: Array<Task>,
  myTasks: Array<Task>,
  requestedPartnerTasks: Array<Task>,
  myPastTasks: Array<Task>,
  users: Array<Maybe<User>>,
  currentTasks: Array<Maybe<TaskForAdmin>>,
  pastTasks: Array<Maybe<TaskForAdmin>>,
  upcomingTasks: Array<Maybe<TaskForAdmin>>,
  taskTemplates: Array<Maybe<TaskTemplate>>,
  claims: Array<Maybe<Outcome>>,
  userScore: ScoreDetails,
};


export type QueryPossiblePartnersForTaskArgs = {
  query: Scalars['String'],
  taskCid: Scalars['String']
};


export type QueryUserPoolArgs = {
  taskCid: Scalars['String']
};


export type QueryOnePossiblePartnerForTaskArgs = {
  taskCid: Scalars['String'],
  partnerCid: Scalars['String']
};


export type QueryGetPartnerDetailsArgs = {
  partnerCid: Scalars['String']
};


export type QueryUserScoreArgs = {
  cid: Scalars['String']
};

export enum RepeatFrequency {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  EndOfMonth = 'END_OF_MONTH'
}

export type ScoreDetails = {
   __typename?: 'ScoreDetails',
  score: Scalars['Int'],
  tasksDoneWithAPartner: Scalars['Int'],
  tasksDoneAlone: Scalars['Int'],
};

export type Task = {
   __typename?: 'Task',
  cid: Scalars['String'],
  templateCid?: Maybe<Scalars['String']>,
  title: Scalars['String'],
  due: Scalars['Float'],
  pointValue: Scalars['Int'],
  partnerUpDeadline: PartnerUpDeadline,
  description?: Maybe<Scalars['String']>,
  isCommitted: Scalars['Boolean'],
  hasOthers: Scalars['Boolean'],
  connections: Array<Maybe<Connection>>,
  outcomeType?: Maybe<OutcomeType>,
};

export type TaskForAdmin = {
   __typename?: 'TaskForAdmin',
  cid: Scalars['String'],
  templateCid?: Maybe<Scalars['String']>,
  title: Scalars['String'],
  due: Scalars['Float'],
  pointValue: Scalars['Int'],
  publishDate: Scalars['Float'],
  partnerUpDeadline: PartnerUpDeadline,
  description?: Maybe<Scalars['String']>,
  committedUsers: Array<Maybe<User>>,
  connections: Array<Maybe<ConnectionForAdmin>>,
  outcomes: Array<Maybe<Outcome>>,
};

export type TaskTemplate = {
   __typename?: 'TaskTemplate',
  cid: Scalars['String'],
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  due: Scalars['Float'],
  publishDate: Scalars['Float'],
  pointValue: Scalars['Int'],
  repeatFrequency: RepeatFrequency,
  partnerUpDeadline: PartnerUpDeadline,
};

export type TemplateSummary = {
   __typename?: 'TemplateSummary',
  title: Scalars['String'],
  cid: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  cid: Scalars['String'],
  name: Scalars['String'],
  email: Scalars['String'],
  accessRights: AccessRights,
  isActive: Scalars['Boolean'],
  templatesToSkipCommitConfirm: Array<Maybe<TemplateSummary>>,
  templatesToSkipMarkAsDone: Array<Maybe<TemplateSummary>>,
};
