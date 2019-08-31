function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const oneHourMS = 1000 * 60 * 60;
const twoHoursMS = oneHourMS * 2;
const oneDayMS = oneHourMS * 24;
const threeDaysMS = oneDayMS * 3;
const oneWeekMS = oneDayMS * 7;

const threeDaysFromNowAt615AM = new Date(Date.now() + threeDaysMS);
threeDaysFromNowAt615AM.setHours(6, 15, 0);
const sevenDaysFromNowAt2PM = new Date(Date.now() + oneWeekMS);
sevenDaysFromNowAt2PM.setHours(14, 0, 0);
const sevenDaysFromNowAt12PM = new Date(Date.now() + oneWeekMS);
sevenDaysFromNowAt12PM.setHours(12, 0, 0);

interface Agreement {
  id: string;
  templateId: string;
  title: string;
  due: number;
  expiration: number;
  description?: string;
}

const allAgreements: Agreement[] = [
  {
    title: 'Attend Kickstart Conditioning - Monday',
    due: threeDaysFromNowAt615AM.getTime(),
    expiration: new Date(threeDaysFromNowAt615AM.getTime() - twoHoursMS).getTime(),
    description: `Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
    Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
    tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
    in what sports scientists agree is one of the best total body workouts available.`
  },
  {
    title: 'Attend three KM or Fight Tactics classes this week',
    due: sevenDaysFromNowAt2PM.getTime(),
    expiration: new Date(sevenDaysFromNowAt2PM.getTime() - oneDayMS).getTime(),
    description: `Any KM 1+ class or Fight Tactics class counts towards doing this agreement.`
  },
  {
    title: 'Attend three conditioning classes this week',
    due: sevenDaysFromNowAt2PM.getTime(),
    expiration: new Date(sevenDaysFromNowAt2PM.getTime() - oneDayMS).getTime(),
    description: `Any Heavy Bag class or Kickstart Conditioning class counts towards doing this agreement.`
  },
  {
    title: 'Attend Groundwork Conditioning',
    due: sevenDaysFromNowAt2PM.getTime(),
    expiration: new Date(sevenDaysFromNowAt2PM.getTime() - twoHoursMS).getTime()
  },
  {
    title: 'Attend Kickstart Conditioning - Saturday',
    due: sevenDaysFromNowAt12PM.getTime(),
    expiration: new Date(sevenDaysFromNowAt12PM.getTime() - twoHoursMS).getTime(),
    description: `Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
    Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
    tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
    in what sports scientists agree is one of the best total body workouts available.`
  },
].map(agreement => ({
  ...agreement,
  id: generateId(),
  templateId: generateId()
}));

interface CommittedAgreementRef {
  agreementId: string;
  pendingPartners: string[];
  confirmedPartners: string[];
}

const closedAgreements: Agreement[] = allAgreements.slice(0, 3)
  .map(agreement => ({
    ...agreement,
    id: generateId(),
    due: new Date(agreement.due - oneWeekMS).getTime(),
    expiration: new Date(agreement.expiration - oneWeekMS).getTime(),
  }));

interface ClosedAgreementRef {
  agreementId: string;
  point: 0 | 1;
  partners?: string[];
}

interface User {
  name: string;
  agreements: Agreement[];
  closedAgreements?: ClosedAgreementRef[];
}

interface State {
  allAgreements: Agreement[];
  myAgreements: CommittedAgreementRef[];
  otherUsers: User[];
  skipConfirmCommitForThese: string[];
  closedAgreements: ClosedAgreementRef[];
  today: number;
}

export let state: State = {
  allAgreements,
  myAgreements: [],
  otherUsers: [
    {
      name: 'Katie Fryer',
      agreements: [],
      closedAgreements: [
        {
          agreementId: closedAgreements[0].id,
          point: 1
        }
      ]
    },
    {
      name: 'Katie Banks',
      agreements: []
    },
    {
      name: 'Kati Taylor',
      agreements: []
    },
    {
      name: 'Katherine Love',
      agreements: []
    },
    {
      name: 'Erin Armstrong',
      agreements: [
        allAgreements[0]
      ],
      closedAgreements: [
        {
          agreementId: closedAgreements[1].id,
          point: 1,
        }
      ]
    },
    {
      name: 'Dave Goode',
      agreements: [
        allAgreements[0]
      ],
      closedAgreements: [
        {
          agreementId: closedAgreements[0].id,
          point: 1
        }
      ]
    },
    {
      name: 'Norbi Zylberberg',
      agreements: [
        allAgreements[0]
      ],
      closedAgreements: [
        {
          agreementId: closedAgreements[2].id,
          point: 0
        }
      ]
    },
    {
      name: 'Rachel Weiss',
      agreements: [
        allAgreements[0]
      ],
      closedAgreements: []
    }
  ],
  skipConfirmCommitForThese: [
    allAgreements[1].templateId
  ],
  closedAgreements: [
    {
      agreementId: closedAgreements[0].id,
      point: 1,
      partners: ['Katie Fryer', 'Dave Goode']
    },
    {
      agreementId: closedAgreements[1].id,
      point: 0,
      partners: ['Erin Armstrong']
    },
    {
      agreementId: closedAgreements[2].id,
      point: 1,
      partners: ['Norby Zylberberg']
    }
  ],
  today: Date.now()
};

const initialState: State = {
  ...state
};

export function getState() {
  return state;
}

export function commitToAgreement(agreement: Agreement) {
  const index = state.allAgreements.indexOf(agreement);
  state.allAgreements = [
    ...state.allAgreements.slice(0, index),
    ...state.allAgreements.slice(index + 1)
  ];
  state.myAgreements = [
    ...state.myAgreements,
    {
      agreementId: agreement.id,
      pendingPartners: [],
      confirmedPartners: []
    }
  ];
}

export function requestPartnerForAgreement(agreementId: string, partner: string) {
  const index = state.myAgreements.findIndex(({agreementId: aId}) => aId === agreementId);
  const agreement = state.myAgreements[index];
  state.myAgreements = [
    ...state.myAgreements.slice(0, index),
    {
      ...agreement,
      pendingPartners: [ ...agreement.pendingPartners, partner ]
    },
    ...state.myAgreements.slice(index + 1),
  ];
}

export function confirmPartnerForFirstAgreement() {
  const agreement = state.myAgreements[0];
  if (!agreement) {
    return;
  }
  const firstPartner = agreement.pendingPartners[0];
  if (!firstPartner) {
    return;
  }
  const confirmedAgreement = {
    ...agreement,
    pendingPartners: agreement.pendingPartners.slice(1),
    confirmedPartners: [ ...agreement.pendingPartners.slice(0, 1), firstPartner ]
  };
  state.myAgreements = [
    confirmedAgreement,
    ...state.myAgreements.slice(1)
  ];
}

export function breakFirstAgreement() {
  const agreement = state.myAgreements[0];
  state.myAgreements = state.myAgreements.slice(1);
  state.closedAgreements = [
    ...state.closedAgreements,
    {
      agreementId: agreement.agreementId,
      point: 0,
      partners: [ ...agreement.confirmedPartners ]
    }
  ];
}

export function jumpAheadThreeDays() {
  const today = new Date(state.today);
  today.setDate(today.getDate() + 3);
}

export function resetStateToInitial() {
  state = JSON.parse(JSON.stringify(initialState));
}
