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

export const POSSIBLE_PARTNERS_FOR_AGREEMENT = gql`
  query PossiblePartnersForAgreement($name: String!, $agreementCid: String!) {
    possiblePartnersForAgreement(name: $name, agreementCid: $agreementCid) {
      cid
      name
    }
  }
`;

export const USER_POOL = gql`
  query UserPool($agreementCid: String!) {
    userPool(agreementCid: $agreementCid) {
      cid
      name
    }
  }
`;

export const OPEN_AGREEMENTS = gql`
  query OpenAgreements {
    openAgreements {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`; 

export const MY_AGREEMENTS = gql`
  query MyAgreements {
    myAgreements {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const REQUESTED_PARTNER_AGREEMENTS = gql`
  query RequestedPartnerAgreements {
    requestedPartnerAgreements {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const MY_PAST_AGREEMENTS = gql`
  query MyPastAgreements {
    myPastAgreements {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const COMMIT_TO_AGREEMENT = gql`
  mutation CommitToAgreement($agreementCid: String!) {
    commitToAgreement(agreementCid: $agreementCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const ADD_AGREEMENT_TEMPLATE_TO_SKIP_COMMIT_CONFIRM = gql`
  mutation AddAgreementTemplateToSkipCommitConfirm($templateCid: String!) {
    addAgreementTemplateToSkipCommitConfirm(templateCid: $templateCid) {
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

export const ADD_AGREEMENT_TEMPLATE_TO_SKIP_DONE_CONFIRM = gql`
  mutation AddAgreementTemplateToSkipDoneConfirm($templateCid: String!) {
    addAgreementTemplateToSkipDoneConfirm(templateCid: $templateCid) {
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

export const REQUEST_PARTNER_FOR_AGREEMENT = gql`
  mutation RequestPartnerForAgreement($agreementCid: String!, $partnerCid: String!) {
    requestPartnerForAgreement(agreementCid: $agreementCid, partnerCid: $partnerCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const CONFIRM_PARTNER_REQUEST = gql`
  mutation ConfirmPartnerRequest($agreementCid: String!, $connectionCid: String!) {
    confirmPartnerRequest(agreementCid: $agreementCid, connectionCid: $connectionCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const DENY_PARTNER_REQUEST = gql`
  mutation DenyPartnerRequest($agreementCid: String!, $connectionCid: String!) {
    denyPartnerRequest(agreementCid: $agreementCid, connectionCid: $connectionCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const REMOVE_BROKEN_PARTNERSHIP = gql`
  mutation RemoveBrokenPartnership($agreementCid: String!, $connectionCid: String!) {
    removeBrokenPartnership(agreementCid: $agreementCid, connectionCid: $connectionCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const CANCEL_AGREEMENT = gql`
  mutation CancelAgreement($agreementCid: String!) {
    cancelAgreement(agreementCid: $agreementCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const BREAK_AGREEMENT = gql`
  mutation BreakAgreement($agreementCid: String!) {
    breakAgreement(agreementCid: $agreementCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;

export const MARK_AGREEMENT_AS_DONE = gql`
  mutation MarkAgreementAsDone($agreementCid: String!) {
    markAgreementAsDone(agreementCid: $agreementCid) {
      cid
      templateCid
      title
      due
      partnerUpDeadline
      description
      isCommitted
      connections
      wasCompleted
    }
  }
`;
