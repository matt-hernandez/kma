import { Dispatch } from "redux";
import { connect } from "react-redux";

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
    id: generateId(),
    templateId: generateId(),
    title: 'Attend Kickstart Conditioning - Monday',
    due: threeDaysFromNowAt615AM.getTime(),
    expiration: new Date(threeDaysFromNowAt615AM.getTime() - twoHoursMS).getTime(),
    description: `Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
    Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
    tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
    in what sports scientists agree is one of the best total body workouts available.`
  },
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend three KM or Fight Tactics classes this week',
    due: sevenDaysFromNowAt2PM.getTime(),
    expiration: new Date(sevenDaysFromNowAt2PM.getTime() - oneDayMS).getTime(),
    description: `Any KM 1+ class or Fight Tactics class counts towards doing this agreement.`
  },
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend three conditioning classes this week',
    due: sevenDaysFromNowAt2PM.getTime(),
    expiration: new Date(sevenDaysFromNowAt2PM.getTime() - oneDayMS).getTime(),
    description: `Any Heavy Bag class or Kickstart Conditioning class counts towards doing this agreement.`
  },
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend Groundwork Conditioning',
    due: sevenDaysFromNowAt2PM.getTime(),
    expiration: new Date(sevenDaysFromNowAt2PM.getTime() - twoHoursMS).getTime()
  },
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend Kickstart Conditioning - Saturday',
    due: sevenDaysFromNowAt12PM.getTime(),
    expiration: new Date(sevenDaysFromNowAt12PM.getTime() - twoHoursMS).getTime(),
    description: `Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
    Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
    tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
    in what sports scientists agree is one of the best total body workouts available.`
  },
];

interface CommittedAgreement extends Agreement {
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

interface ClosedAgreement extends Agreement {
  point: number;
  partners?: string[];
}

interface User {
  id: string;
  name: string;
  agreements: Agreement[];
  closedAgreements?: ClosedAgreement[];
}

export interface State {
  allAgreements: Agreement[];
  openAgreements: Agreement[];
  myAgreements: CommittedAgreement[];
  otherUsers: User[];
  usersInSearch: User[];
  skipConfirmCommitForThese: string[];
  closedAgreements: ClosedAgreement[];
  today: number;
}

export interface StateProps {
  state: State,
  dispatch: Dispatch
}

class StateConstructor implements State {
  allAgreements = allAgreements;
  openAgreements = allAgreements;
  myAgreements = [];
  otherUsers = [
    {
      id: generateId(),
      name: 'Katie Fryer',
      agreements: [],
      closedAgreements: [
        {
          ...closedAgreements[0],
          point: 1
        }
      ]
    },
    {
      id: generateId(),
      name: 'Katie Banks',
      agreements: []
    },
    {
      id: generateId(),
      name: 'Kati Taylor',
      agreements: []
    },
    {
      id: generateId(),
      name: 'Katherine Love',
      agreements: []
    },
    {
      id: generateId(),
      name: 'Erin Armstrong',
      agreements: [
        allAgreements[0]
      ],
      closedAgreements: [
        {
          ...closedAgreements[1],
          point: 1,
        }
      ]
    },
    {
      id: generateId(),
      name: 'Dave Goode',
      agreements: [
        allAgreements[0]
      ],
      closedAgreements: [
        {
          ...closedAgreements[0],
          point: 1
        }
      ]
    },
    {
      id: generateId(),
      name: 'Norbi Zylberberg',
      agreements: [
        allAgreements[0]
      ],
      closedAgreements: [
        {
          ...closedAgreements[2],
          point: 0
        }
      ]
    },
    {
      id: generateId(),
      name: 'Rachel Weiss',
      agreements: [
        allAgreements[0]
      ],
      closedAgreements: []
    }
  ];
  usersInSearch = [];
  skipConfirmCommitForThese = [
    allAgreements[0].templateId
  ];
  closedAgreements = [
    {
      ...closedAgreements[0],
      point: 1,
      partners: ['Katie Fryer', 'Dave Goode']
    },
    {
      ...closedAgreements[1],
      point: 0,
      partners: ['Erin Armstrong']
    },
    {
      ...closedAgreements[2],
      point: 1,
      partners: ['Norby Zylberberg']
    }
  ];
  today = Date.now();
};

let initialState: State = new StateConstructor();

export function reducer(state: State = initialState, action: any): State {
  const { type, payload } = action;
  if (type === 'COMMIT_TO_AGREEMENT') {
    const { agreementId } = payload;
    const agreement = state.openAgreements.find(({id: aId }) => aId === agreementId);
    if (!agreement) {
      return state;
    }
    const index = state.openAgreements.indexOf(agreement);
    return {
      ...state,
      openAgreements: [
        ...state.openAgreements.slice(0, index),
        ...state.openAgreements.slice(index + 1)
      ],
      myAgreements: [
        ...state.myAgreements,
        {
          ...agreement,
          pendingPartners: [],
          confirmedPartners: []
        }
      ]
    };
  } else if (type === 'SKIP_CONFIRM') {
    const { templateId } = payload;
    return {
      ...state,
      skipConfirmCommitForThese: [
        ...state.skipConfirmCommitForThese,
        templateId
      ]
    };
  } else if (type === 'REQUEST_PARTNER') {
    const { agreementId, partner } = payload;
    const agreement = state.myAgreements.find(({id: aId}) => aId === agreementId);
    if (!agreement) {
      return state;
    }
    const index = state.myAgreements.indexOf(agreement);
    return {
      ...state,
      myAgreements: [
        ...state.myAgreements.slice(0, index),
        {
          ...agreement,
          pendingPartners: [ ...agreement.pendingPartners, partner ]
        },
        ...state.myAgreements.slice(index + 1),
      ]
    };
  } else if ('CONFIRM_PARTNER') {
    const agreement = state.myAgreements[0];
    if (!agreement) {
      return state;
    }
    const firstPartner = agreement.pendingPartners[0];
    if (!firstPartner) {
      return state;
    }
    const confirmedAgreement = {
      ...agreement,
      pendingPartners: agreement.pendingPartners.slice(1),
      confirmedPartners: [ ...agreement.pendingPartners.slice(0, 1), firstPartner ]
    };
    return {
      ...state,
      myAgreements: [
        confirmedAgreement,
        ...state.myAgreements.slice(1)
      ]
    };
  } else if ('BREAK_AGREEMENT') {
    const { agreementId } = payload;
    const agreement = state.myAgreements.find(({id: aId }) => aId === agreementId);
    if (!agreement) {
      return state;
    }
    const index = state.myAgreements.indexOf(agreement);
    return {
      ...state,
      myAgreements: [
        ...state.myAgreements.slice(0, index),
        ...state.myAgreements.slice(index + 1),
      ],
      closedAgreements: [
        ...state.closedAgreements,
        {
          ...agreement,
          point: 0,
          partners: [ ...agreement.confirmedPartners ]
        }
      ]
    };
  } else if ('JUMP_AHEAD') {
    const today = new Date(state.today);
    today.setDate(today.getDate() + 3);
    return {
      ...state,
      today: today.getTime()
    };
  } else if ('RESET') {
    return new StateConstructor();
  }
  return state;
}

export function commitToAgreement(agreementId: string) {
  return {
    type: 'COMMIT_TO_AGREEMENT',
    payload: {
      agreementId
    }
  };
}

export function addAgreementTemplateToSkip(templateId: string) {
  return {
    type: 'SKIP_CONFIRM',
    payload: {
      templateId
    }
  };
}

export function requestPartnerForAgreement(agreementId: string, partner: string) {
  return {
    type: 'REQUEST_PARTNER',
    payload: {
      agreementId,
      partner
    }
  };
}

export function confirmPartnerForFirstAgreement() {
  return {
    type: 'CONFIRM_PARTNER'
  };
}

export function breakFirstAgreement(agreementId: string) {
  return {
    type: 'BREAK_AGREEMENT',
    payload: {
      agreementId
    }
  };
}

export function jumpAheadThreeDays() {
  return {
    type: 'JUMP_AHEAD'
  };
}

export function resetStateToInitial() {
  return {
    type: 'RESET'
  };
}

export const ourConnect = () => connect((state: State) => ({ state }));
