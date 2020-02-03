export type AccessRights = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  cid: string;
  name: string;
  email: string;
  accessRights: AccessRights;
  isActive: boolean;
  templatesToSkipCommitConfirm: TemplateSummary[];
  templatesToSkipMarkAsDone: TemplateSummary[];
}

export interface TemplateSummary {
  title: string;
  cid: string;
}

export interface ScoreDetails {
  score: number;
  tasksDoneWithAPartner: number;
  tasksDoneAlone: number;
}

export interface PossiblePartner {
  cid: string;
  name: string;
}

export type ConnectionType = 'REQUEST_TO' | 'REQUEST_FROM' | 'CONFIRMED' | 'BROKE_WITH';

export interface Connection {
  cid: string;
  connectedUserCid: string;
  connectedUserName: string;
  type: ConnectionType;
}

export type PartnerUpDeadline = 'ONE_HOUR' | 'TWO_HOURS' | 'SIX_HOURS' | 'TWELVE_HOURS' | 'ONE_DAY' | 'ONE_WEEK';

export type OutcomeType = 'FULFILLED' | 'FULFILLED_OMIT_PARTNER' | 'PENDING' | 'BROKEN' | 'BROKEN_OMIT_PARTNER';

export interface Task {
  cid: string;
  templateCid?: string;
  title: string;
  due: number;
  pointValue: number;
  partnerUpDeadline: PartnerUpDeadline;
  description?: string;
  isCommitted: boolean;
  connections: Connection[];
  outcomeType: OutcomeType | null;
}
