export interface User {
  cid: string;
  name: string;
  email: string;
  score: number;
  isAdmin: boolean;
  templatesToSkipCommitConfirm: string[];
  templatesToSkipMarkAsDone: string[];
}

export interface PossiblePartners {
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
  partnerUpDeadline: number;
  description?: string;
  isCommitted: boolean;
  connections: Connection[];
  wasCompleted: boolean | null;
}
