import gql from 'graphql-tag';

export const users = gql`
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

export const allCurrentAgreements = gql`
  query AllCurrentAgreements {
    allCurrentAgreements {
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

export const allPastAgreements = gql`
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

export const allUpcomingAgreements = gql`
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

export const deleteUser = gql`
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

export const createAgreement = gql`
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

export const deleteAgreement = gql`
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

export const createAgreementTemplate = gql`
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
