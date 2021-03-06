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
      outcomeType
    }
  }
`;

export const ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM = gql`
  mutation AddTaskTemplateToSkipCommitConfirm($templateCid: String!) {
    addTaskTemplateToSkipCommitConfirm(templateCid: $templateCid) {
      cid
      name 
      email
      accessRights
      templatesToSkipCommitConfirm {
        cid
        title
      }
      templatesToSkipMarkAsDone {
        cid
        title
      }
    }
  }
`;

export const ADD_TASK_TEMPLATE_TO_SKIP_DONE_CONFIRM = gql`
  mutation AddTaskTemplateToSkipDoneConfirm($templateCid: String!) {
    addTaskTemplateToSkipDoneConfirm(templateCid: $templateCid) {
      cid
      name 
      email
      accessRights
      templatesToSkipCommitConfirm {
        cid
        title
      }
      templatesToSkipMarkAsDone {
        cid
        title
      }
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
      outcomeType
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
      outcomeType
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
      outcomeType
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
      outcomeType
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
      outcomeType
    }
  }
`;

export const BREAK_COMMITMENT = gql`
  mutation BreakCommitment($taskCid: String!) {
    breakCommitment(taskCid: $taskCid) {
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
      outcomeType
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
      outcomeType
    }
  }
`;

export const MAKE_USER_INACTIVE = gql`
  mutation MakeUserInactive($cid: String!) {
    makeUserInactive(cid: $cid) {
      cid
      name 
      email
      accessRights
      isActive
    }
  }
`;

export const MAKE_USER_ACTIVE = gql`
  mutation MakeUserActive($cid: String!) {
    makeUserActive(cid: $cid) {
      cid
      name 
      email
      accessRights
      isActive
    }
  }
`;

export const MAKE_USER_AN_ADMIN = gql`
  mutation MakeUserAnAdmin($cid: String!) {
    makeUserAnAdmin(cid: $cid) {
      cid
      name 
      email
      accessRights
      isActive
    }
  }
`;

export const REMOVE_USER_AS_ADMIN = gql`
  mutation RemoveUserAsAdmin($cid: String!) {
    removeUserAsAdmin(cid: $cid) {
      cid
      name 
      email
      accessRights
      isActive
    }
  }
`;

export const CHANGE_TASK_STATUS_FOR_USER = gql`
  mutation ChangeTaskStatusForUser($outcomeCid: String!, $outcomeType: OutcomeType!) {
    changeTaskStatusForUser(outcomeCid: $outcomeCid, outcomeType: $outcomeType) {
      cid
      templateCid
      title
      due
      pointValue
      publishDate
      partnerUpDeadline
      description
      committedUsers {
        cid
        name
        email
      }
      connections {
        cid
        fromCid
        fromName
        type
        toCid
        toName
      }
      outcomes {
        cid
        taskCid
        userCid
        type
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $due: Float!, $publishDate: Float!, $partnerUpDeadline: PartnerUpDeadline!, $pointValue: Int!, $description: String) {
    createTask(title: $title, due: $due, publishDate: $publishDate, partnerUpDeadline: $partnerUpDeadline, pointValue: $pointValue, description: $description) {
      cid
      templateCid
      title
      due
      pointValue
      publishDate
      partnerUpDeadline
      description
      committedUsers {
        cid
        name
        email
      }
      connections {
        cid
        fromCid
        fromName
        type
        toCid
        toName
      }
      outcomes {
        cid
        taskCid
        userCid
        type
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($cid: String!, $title: String!, $due: Float!, $publishDate: Float!, $partnerUpDeadline: PartnerUpDeadline!, $pointValue: Int!, $description: String) {
    updateTask(cid: $cid, title: $title, due: $due, publishDate: $publishDate, partnerUpDeadline: $partnerUpDeadline, pointValue: $pointValue, description: $description) {
      cid
      templateCid
      title
      due
      pointValue
      publishDate
      partnerUpDeadline
      description
      committedUsers {
        cid
        name
        email
      }
      connections {
        cid
        fromCid
        fromName
        type
        toCid
        toName
      }
      outcomes {
        cid
        taskCid
        userCid
        type
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($cid: String!) {
    deleteTask(cid: $cid) {
      cid
      templateCid
      title
      due
      publishDate
      partnerUpDeadline
      description
      committedUsers {
        cid
        name
        email
      }
      connections {
        cid
        fromCid
        fromName
        type
        toCid
        toName
      }
      outcomes {
        cid
        taskCid
        userCid
        type
      }
    }
  }
`;

export const CREATE_TASK_TEMPLATE = gql`
  mutation CreateTaskTemplate($taskCid: String!, $repeatFrequency: RepeatFrequency!) {
    createTaskTemplate(taskCid: $taskCid, repeatFrequency: $repeatFrequency) {
      cid
      title
      repeatFrequency
      publishDate
      pointValue
      due
      partnerUpDeadline
      description
    }
  }
`;

export const UPDATE_TASK_TEMPLATE = gql`
  mutation UpdateTaskTemplate($cid: String!, $title: String!, $description: String, $pointValue: Int!, $due: Float!, $publishDate: Float!, $partnerUpDeadline: PartnerUpDeadline!, $repeatFrequency: RepeatFrequency!) {
    updateTaskTemplate(cid: $cid, title: $title, description: $description, pointValue: $pointValue, due: $due, publishDate: $publishDate, partnerUpDeadline: $partnerUpDeadline, repeatFrequency: $repeatFrequency) {
      cid
      title
      description
      pointValue
      repeatFrequency
      publishDate
      due
      partnerUpDeadline
    }
  }
`;

export const DELETE_TASK_TEMPLATE = gql`
  mutation DeleteTaskTemplate($cid: String!) {
    deleteTaskTemplate(cid: $cid) {
      cid
      title
      description
      pointValue
      repeatFrequency
      publishDate
      due
      partnerUpDeadline
    }
  }
`;

export const CONFIRM_AS_DONE = gql`
  mutation ConfirmAsDone($taskCid: String!, $userCid: String!) {
    confirmAsDone(taskCid: $taskCid, userCid: $userCid) {
      task {
        cid
        templateCid
        title
        due
        publishDate
        partnerUpDeadline
        description
        committedUsers {
          cid
          name
          email
        }
        connections {
          cid
          fromCid
          fromName
          type
          toCid
          toName
        }
        outcomes {
          cid
          taskCid
          userCid
          type
        }
      }
      outcome {
        cid
        taskCid
        userCid
        type
      }
    }
  }
`;

export const DENY_AS_DONE = gql`
  mutation DenyAsDone($taskCid: String!, $userCid: String!) {
    denyAsDone(taskCid: $taskCid, userCid: $userCid) {
      task {
        cid
        templateCid
        title
        due
        publishDate
        partnerUpDeadline
        description
        committedUsers {
          cid
          name
          email
        }
        connections {
          cid
          fromCid
          fromName
          type
          toCid
          toName
        }
        outcomes {
          cid
          taskCid
          userCid
          type
        }
      }
      outcome {
        cid
        taskCid
        userCid
        type
      }
    }
  }
`;
