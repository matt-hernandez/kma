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

export const openAgreements = `
  query OpenAgreements {
    openAgreements {

    }
  }
`; 

const myAgreements = `
  query MyAgreements {
    myAgreements {

    }
  }
`;

const requestedPartnerAgreements = `
  query RequestedPartnerAgreements {
    requestedPartnerAgreements {

    }
  }
`;

const myPastAgreements = `
  query MyPastAgreements {
    myPastAgreements {

    }
  }
`;
