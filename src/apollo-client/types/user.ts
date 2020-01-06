export interface User {
  cid: string;
  name: string;
  email: string;
  isAdmin: boolean;
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

export interface Task {
  cid: string;
  templateCid?: string;
  title: string;
  due: number;
  pointValue: number;
  partnerUpDeadline: number;
  description?: string;
  isCommitted: boolean;
  connections: Connection[];
  wasCompleted: boolean | null;
}
