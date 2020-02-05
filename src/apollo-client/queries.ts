import gql from 'graphql-tag';

export const ME = gql`
  query Me {
    me {
      cid
      name 
      email
      accessRights
      isActive
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

export const PARTNER_SEARCH = gql`
  query PartnerSearch($query: String!, $taskCid: String!) {
    partnerSearch(query: $query, taskCid: $taskCid) {
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
      outcomeType
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
      outcomeType
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
      outcomeType
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
      outcomeType
    }
  }
`;

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

