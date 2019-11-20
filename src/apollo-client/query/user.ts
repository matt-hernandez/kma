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
  query PossiblePartnersForTask($query: String!, $taskCid: String!) {
    possiblePartnersForTask(query: $query, taskCid: $taskCid) {
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
