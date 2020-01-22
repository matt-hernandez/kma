import gql from 'graphql-tag';

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
      acessRights
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
      acessRights
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

export const CANCEL_PARTNER_REQUEST = gql`
  mutation CancelPartnerRequest($taskCid: String!, $connectionCid: String!) {
    cancelPartnerRequest(taskCid: $taskCid, connectionCid: $connectionCid) {
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
