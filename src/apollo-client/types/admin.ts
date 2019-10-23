import { User } from "./user";

export type ConnectionTypeForAdmin = 'REQUESTED' | 'CONFIRMED' | 'BROKE_WITH';

export interface ConnectionForAdmin {
  cid: string;
  fromCid: string;
  fromName: string;
  type: ConnectionTypeForAdmin;
  toCid: string;
  toName: string;
}

export type OutcomeType = 'FULFILLED' | 'PENDING' | 'BROKEN';

export interface Outcome {
  cid: string;
  taskCid: string;
  userCid: string;
  type: OutcomeType;
}

export interface TaskForAdmin {
  cid: string;
  templateCid?: string
  title: string;
  due: number;
  publishDate: number;
  partnerUpDeadline: number;
  description?: string
  committedUsers: User[];
  connections: ConnectionForAdmin[];
  outcomes: Outcome[];
}

export type RepeatFrequency = 'DAY' | 'WEEK' | 'TWO_WEEKS' | 'THREE_WEEKS' | 'THIRTY_DAYS';

export interface TaskTemplate {
  cid: string;
  title: string;
  creationDate: number;
  repeatFrequency: RepeatFrequency;
  nextPublishDate: number;
  nextDueDate: number;
  partnerUpDeadline: number;
  description?: string
}
