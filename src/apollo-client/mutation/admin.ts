import gql from 'graphql-tag';

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
  mutation ConfirmAsDone($cid: String!) {
    confirmAsDone(cid: $cid) {
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

export const DENY_AS_DONE = gql`
  mutation DenyAsDone($cid: String!) {
    DenyAsDone(cid: $cid) {
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

