import { User, Task } from "../types/user";

export class DefaultUser implements User {
  cid = '';
  name = '...';
  email = '...';
  score = 0;
  isAdmin = false;
  templatesToSkipCommitConfirm = [];
  templatesToSkipMarkAsDone = [];

  static defaultUserCount: number = 0;

  constructor() {
    this.cid = `${DefaultUser.defaultUserCount}__defaultUser`;
    DefaultUser.defaultUserCount++;
  }
}

export class DefaultTask implements Task {
  cid = '';
  title = '...';
  due = 0;
  partnerUpDeadline = 0;
  isCommitted = false;
  connections = [];
  wasCompleted = null;

  static defaultTaskCount: number = 0;

  constructor() {
    this.cid = `${DefaultTask.defaultTaskCount}__defaultTask`;
    DefaultTask.defaultTaskCount++;
  }
}
