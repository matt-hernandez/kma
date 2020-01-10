import gql from 'graphql-tag';

export const ME = gql`
  query Me {
    me {
      cid
      name 
      email
      isAdmin
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

export const SCORE_DETAILS = gql`
  query ScoreDetails {
    scoreDetails {
      score
      tasksDoneWithAPartner
      tasksDoneAlone
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

export const ONE_POSSIBLE_PARTNER_FOR_TASK = gql`
  query OnePossiblePartnerForTask($taskCid: String!, $partnerCid: String!) {
    onePossiblePartnerForTask(taskCid: $taskCid, partnerCid: $partnerCid) {
      cid
      name
    }
  }
`;

export const GET_PARTNER_DETAILS = gql`
  query GetPartnerDetails($partnerCid: String!) {
    getPartnerDetails(partnerCid: $partnerCid) {
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
      pointValue
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
      pointValue
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
      pointValue
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
      pointValue
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
