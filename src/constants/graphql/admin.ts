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

export const ALL_CURRENT_AGREEMENTS = gql`
  query AllCurrentAgreements {
    allCurrentAgreements {
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

export const ALL_PAST_AGREEMENTS = gql`
  query AllPastAgreements {
    allPastAgreements {
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

export const ALL_UPCOMING_AGREEMENTS = gql`
  query AllUpcomingAgreements {
    allUpcomingAgreements {
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

export const CREATE_AGREEMENT = gql`
  mutation CreateAgreement($title: String!, $due: Float!, $publishDate: Float!, $partnerUpDeadline: Float!, $description: String) {
    createAgreement(title: $title, due: $due, publishDate: $publishDate, partnerUpDeadline: $partnerUpDeadline, description: $description) {
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

export const DELETE_AGREEMENT = gql`
  mutation DeleteAgreement($agreementCid: String!) {
    deleteAgreement(agreementCid: $agreementCid) {
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

export const CREATE_AGREEMENT_TEMPLATE = gql`
  mutation CreateAgreementTemplate($title: String!, $due: Float!, $nextPublishDate: Float!, $partnerUpDeadline: Float!, $repeatFrequency: String!, $nextDueDate: Float!, $description: String) {
    createAgreementTemplate(title: $title, due: $due, publishDate: $publishDate, partnerUpDeadline: $partnerUpDeadline, repeatFrequency: $repeatFrequency, nextDueDate: $nextDueDate, description: $description) {
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
