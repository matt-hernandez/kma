export const users = `
  query Users {
    users {
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

export const allCurrentAgreements = `
  query AllCurrentAgreements {
    allCurrentAgreements {

    }
  }
`;

export const allPastAgreements = `
  query AllPastAgreements {
    allPastAgreements {

    }
  }
`;

export const allUpcomingAgreements = `
  query AllUpcomingAgreements {
    allUpcomingAgreements {

    }
  }
`;