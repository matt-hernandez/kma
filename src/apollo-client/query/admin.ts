import gql from 'graphql-tag';

export const USERS = gql`
  query Users {
    users {
      cid
      name 
      email
      accessRights
      isActive
    }
  }
`;

export const CURRENT_TASKS = gql`
  query CurrentTasks {
    currentTasks {
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

export const PAST_TASKS = gql`
  query PastTasks {
    pastTasks {
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

export const UPCOMING_TASKS = gql`
  query UpcomingTasks {
    upcomingTasks {
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

export const TASK_TEMPLATES = gql`
  query TaskTemplates {
    taskTemplates {
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

export const USER_SCORE = gql`
  query UserScore($cid: String!) {
    userScore(cid: $cid) {
      score
      tasksDoneWithAPartner
      tasksDoneAlone
    }
  }
`;

export const CLAIMS = gql`
  query Claims {
    claims {
      cid
      taskCid
      userCid
      type
    }
  }
`;
