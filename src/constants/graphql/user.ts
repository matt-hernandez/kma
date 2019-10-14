export const me = `
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

export const possiblePartnersForAgreement = `
  query PossiblePartnersForAgreement($name: String!, $agreementCid: String!) {
    possiblePartnersForAgreement(name: $name, agreementCid: $agreementCid) {
      cid
      name
    }
  }
`;

export const userPool = `
  query UserPool($agreementCid: String!) {
    userPool(agreementCid: $agreementCid) {
      cid
      name
    }
  }
`;

export const openAgreements = `
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

export const myAgreements = `
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

export const requestedPartnerAgreements = `
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

export const myPastAgreements = `
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

export const commitToAgreement = `
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

export const addAgreementTemplateToSkipCommitConfirm = `
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

export const addAgreementTemplateToSkipDoneConfirm = `
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

export const requestPartnerForAgreement = `
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

export const confirmPartnerRequest = `
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

export const denyPartnerRequest = `
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

export const removeBrokenPartnership = `
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

export const cancelAgreement = `
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

export const breakAgreement = `
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

export const markAgreementAsDone = `
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
