import gql from 'graphql-tag';

export const ME = gql`
  query Me {
    me {
      cid
      name 
      email 
      score
      isAdmin
      templatesToSkipCommitConfirm
      templatesToSkipMarkAsDone
    }
  }
`;

export const POSSIBLE_PARTNERS_FOR_TASK = gql`
  query PossiblePartnersForTask($name: String!, $taskCid: String!) {
    possiblePartnersForTask(name: $name, taskCid: $taskCid) {
      cid
      name
    }
  }
`;

export const USER_POOL = gql`
  query UserPool($taskCid: String!) {
    userPool(taskCid: $taskCid) {
      cid
      name
    }
  }
`;

export const OPEN_TASKS = gql`
  query OpenTasks {
    openTasks {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections {
        cid
        connectedUserCid
        connectedUserName
        type
      }
      wasCompleted
    }
  }
`; 

export const MY_TASKS = gql`
  query MyTasks {
    myTasks {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections {
        cid
        connectedUserCid
        connectedUserName
        type
      }
      wasCompleted
    }
  }
`;

export const REQUESTED_PARTNER_TASKS = gql`
  query RequestedPartnerTasks {
    requestedPartnerTasks {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections {
        cid
        connectedUserCid
        connectedUserName
        type
      }
      wasCompleted
    }
  }
`;

export const MY_PAST_TASKS = gql`
  query MyPastTasks {
    myPastTasks {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections {
        cid
        connectedUserCid
        connectedUserName
        type
      }
      wasCompleted
    }
  }
`;

export const COMMIT_TO_TASK = gql`
  mutation CommitToTask($taskCid: String!) {
    commitToTask(taskCid: $taskCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections {
        cid
        connectedUserCid
        connectedUserName
        type
      }
      wasCompleted
    }
  }
`;

export const ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM = gql`
  mutation AddTaskTemplateToSkipCommitConfirm($templateCid: String!) {
    addTaskTemplateToSkipCommitConfirm(templateCid: $templateCid) {
      cid
      name 
      email 
      score
      isAdmin
      templatesToSkipCommitConfirm
      templatesToSkipMarkAsDone
    }
  }
`;

export const ADD_TASK_TEMPLATE_TO_SKIP_DONE_CONFIRM = gql`
  mutation AddTaskTemplateToSkipDoneConfirm($templateCid: String!) {
    addTaskTemplateToSkipDoneConfirm(templateCid: $templateCid) {
      cid
      name 
      email 
      score
      isAdmin
      templatesToSkipCommitConfirm
      templatesToSkipMarkAsDone
    }
  }
`;

export const REQUEST_PARTNER_FOR_TASK = gql`
  mutation RequestPartnerForTask($taskCid: String!, $partnerCid: String!) {
    requestPartnerForTask(taskCid: $taskCid, partnerCid: $partnerCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const CONFIRM_PARTNER_REQUEST = gql`
  mutation ConfirmPartnerRequest($taskCid: String!, $connectionCid: String!) {
    confirmPartnerRequest(taskCid: $taskCid, connectionCid: $connectionCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const DENY_PARTNER_REQUEST = gql`
  mutation DenyPartnerRequest($taskCid: String!, $connectionCid: String!) {
    denyPartnerRequest(taskCid: $taskCid, connectionCid: $connectionCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const REMOVE_BROKEN_PARTNERSHIP = gql`
  mutation RemoveBrokenPartnership($taskCid: String!, $connectionCid: String!) {
    removeBrokenPartnership(taskCid: $taskCid, connectionCid: $connectionCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const CANCEL_TASK = gql`
  mutation CancelTask($taskCid: String!) {
    cancelTask(taskCid: $taskCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const BREAK_TASK = gql`
  mutation BreakTask($taskCid: String!) {
    breakTask(taskCid: $taskCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const MARK_TASK_AS_DONE = gql`
  mutation MarkTaskAsDone($taskCid: String!) {
    markTaskAsDone(taskCid: $taskCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;
