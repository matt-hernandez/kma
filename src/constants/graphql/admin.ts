import gql from 'graphql-tag';

export const USERS = gql`
  query Users {
    users {
      cid
      name 
      email 
      score
      isAdmin
    }
  }
`;

export const ALL_CURRENT_TASKS = gql`
  query AllCurrentTasks {
    allCurrentTasks {
      cid
      templateCid
      title
      due
      publishDate
      partnerUpDeadline
      description
      committedUsers {
        cid
      }
      connections {
        cid
      }
      outcomes {
        cid
      }
    }
  }
`;

export const ALL_PAST_TASKS = gql`
  query AllPastTasks {
    allPastTasks {
      cid
      templateCid
      title
      due
      publishDate
      partnerUpDeadline
      description
      committedUsers
      connections
      outcomes
    }
  }
`;

export const ALL_UPCOMING_TASKS = gql`
  query AllUpcomingTasks {
    allUpcomingTasks {
      cid
      templateCid
      title
      due
      publishDate
      partnerUpDeadline
      description
      committedUsers
      connections
      outcomes
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email) {
      cid
      name 
      email 
      score
      isAdmin
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $due: Float!, $publishDate: Float!, $partnerUpDeadline: Float!, $description: String) {
    createTask(title: $title, due: $due, publishDate: $publishDate, partnerUpDeadline: $partnerUpDeadline, description: $description) {
      cid
      templateCid
      title
      due
      publishDate
      partnerUpDeadline
      description
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($taskCid: String!) {
    deleteTask(taskCid: $taskCid) {
      cid
      templateCid
      title
      due
      publishDate
      partnerUpDeadline
      description
      committedUsers
      connections
      outcomes
    }
  }
`;

export const CREATE_TASK_TEMPLATE = gql`
  mutation CreateTaskTemplate($title: String!, $due: Float!, $nextPublishDate: Float!, $partnerUpDeadline: Float!, $repeatFrequency: String!, $nextDueDate: Float!, $description: String) {
    createTaskTemplate(title: $title, due: $due, publishDate: $publishDate, partnerUpDeadline: $partnerUpDeadline, repeatFrequency: $repeatFrequency, nextDueDate: $nextDueDate, description: $description) {
      cid
      title
      creationDate
      repeatFrequency
      nextPublishDate
      nextDueDate
      partnerUpDeadline
      description
    }
  }
`;
