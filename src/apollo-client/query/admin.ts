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

export const ALL_PAST_TASKS = gql`
  query AllPastTasks {
    allPastTasks {
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

export const ALL_UPCOMING_TASKS = gql`
  query AllUpcomingTasks {
    allUpcomingTasks {
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
