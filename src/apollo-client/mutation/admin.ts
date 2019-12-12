import gql from 'graphql-tag';

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
  mutation CreateTask($title: String!, $due: Float!, $publishDate: Float!, $partnerUpDeadline: Float!, $pointValue: Int!, $description: String) {
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
