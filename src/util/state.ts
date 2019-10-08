import { Dispatch, createStore, applyMiddleware } from "redux";
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
const threeDaysFromNowAt515AM = new Date(Date.now() + threeDaysMS);
threeDaysFromNowAt515AM.setHours(5, 15, 0);
const sevenDaysFromNowAt2PM = new Date(Date.now() + oneWeekMS);
sevenDaysFromNowAt2PM.setHours(14, 0, 0);
const sevenDaysFromNowAt12PM = new Date(Date.now() + oneWeekMS);
sevenDaysFromNowAt12PM.setHours(12, 0, 0);

type ConnectionType = 'REQUEST_TO' | 'REQUEST_FROM' | 'CONFIRMED' | 'BROKE_WITH';

export interface Connection {
  cid: string
  connectedUserCid: string
  connectedUserName: string
  type: ConnectionType
}

export interface User {
  cid: string;
  name: string;
  email: string;
  score: number;
  isAdmin: boolean;
  templatesToSkipCommitConfirm: string[];
  templatesToSkipMarkAsDone: string[];
}

export interface PossiblePartner {
  cid: string
  name: string
}

interface Agreement {
  cid: string
  templateCid?: string
  title: string
  due: number
  partnerUpDeadline: number
  description?: string
  isCommitted: boolean
  connections: Connection[]
  wasCompleted: boolean | null
}

const allAgreements: Agreement[] = [
  {
    cid: generateId(),
    templateCid: generateId(),
    title: 'Attend Kickstart Conditioning - Monday',
    due: threeDaysFromNowAt615AM.getTime(),
    partnerUpDeadline: new Date(threeDaysFromNowAt615AM.getTime() - twoHoursMS).getTime(),
    description: `Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
    Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
    tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
    in what sports scientists agree is one of the best total body workouts available.`,
    isCommitted: false,
    connections: [],
    wasCompleted: null
  },
  {
    cid: generateId(),
    templateCid: generateId(),
    title: 'Attend three KM or Fight Tactics classes this week',
    due: sevenDaysFromNowAt2PM.getTime(),
    partnerUpDeadline: new Date(sevenDaysFromNowAt2PM.getTime() - oneDayMS).getTime(),
    description: `Any KM 1+ class or Fight Tactics class counts towards doing this agreement.`,
    isCommitted: false,
    connections: [],
    wasCompleted: null
  },
  {
    cid: generateId(),
    templateCid: generateId(),
    title: 'Attend three conditioning classes this week',
    due: sevenDaysFromNowAt2PM.getTime(),
    partnerUpDeadline: new Date(sevenDaysFromNowAt2PM.getTime() - oneDayMS).getTime(),
    description: `Any Heavy Bag class or Kickstart Conditioning class counts towards doing this agreement.`,
    isCommitted: false,
    connections: [],
    wasCompleted: null
  },
  {
    cid: generateId(),
    templateCid: generateId(),
    title: 'Attend Groundwork Conditioning',
    due: sevenDaysFromNowAt2PM.getTime(),
    partnerUpDeadline: new Date(sevenDaysFromNowAt2PM.getTime() - twoHoursMS).getTime(),
    isCommitted: false,
    connections: [],
    wasCompleted: null
  },
  {
    cid: generateId(),
    templateCid: generateId(),
    title: 'Attend Kickstart Conditioning - Saturday',
    due: sevenDaysFromNowAt12PM.getTime(),
    partnerUpDeadline: new Date(sevenDaysFromNowAt12PM.getTime() - twoHoursMS).getTime(),
    description: `Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
    Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
    tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
    in what sports scientists agree is one of the best total body workouts available.`,
    isCommitted: false,
    connections: [],
    wasCompleted: null
  },
];

export interface State {
  me: User;
  openAgreements: Agreement[];
  myAgreements: Agreement[];
  requestsToBePartner: Agreement[];
  usersInSearch: PossiblePartner[];
  userToConfirm: PossiblePartner | null;
  userPool: PossiblePartner[];
  savedSearchQuery: string;
  closedAgreements: Agreement[];
  today: number;
}

export interface StateProps {
  state: State,
  dispatch: Dispatch
}

class StateConstructor implements State {
  me = {
    cid: '',
    name: '',
    email: '',
    score: 0,
    isAdmin: false,
    templatesToSkipCommitConfirm: [],
    templatesToSkipMarkAsDone: []
  };
  openAgreements = [];
  myAgreements = [];
  requestsToBePartner = [];
  usersInSearch = [];
  userToConfirm = null;
  userPool = [];
  savedSearchQuery = '';
  closedAgreements = [];
  today = Date.now();
};

let initialState: State = new StateConstructor();

export function reducer(state: State = initialState, action: any): State {
  const { type, payload } = action;
  if (type === 'COMMIT_TO_AGREEMENT') {
    const { agreementCid } = payload;
    const agreement = state.openAgreements.find(({cid: aCid }) => aCid === agreementCid);
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
          ...agreement
        }
      ]
    };
  } else if (type === 'SKIP_CONFIRM') {
    const me = payload;
    return {
      ...state,
      me
    };
  } else if (type === 'SEARCH_FOR_PARTNER') {
    const usersInSearch = payload;
    return {
      ...state,
      usersInSearch
    };
  } else if (type === 'SAVE_SEARCH_QUERY') {
    const query = payload;
    return {
      ...state,
      savedSearchQuery: query
    };
  } else if (type === 'CLEAR_SEARCH_QUERY') {
    return {
      ...state,
      savedSearchQuery: '',
      usersInSearch: []
    };
  } else if (type === 'REQUEST_PARTNER') {
    const { agreementCid } = payload;
    const agreement = state.myAgreements.find(({cid: aCid}) => aCid === agreementCid);
    if (!agreement) {
      return state;
    }
    const index = state.myAgreements.indexOf(agreement);
    return {
      ...state,
      myAgreements: [
        ...state.myAgreements.slice(0, index),
        {
          ...agreement
        },
        ...state.myAgreements.slice(index + 1),
      ]
    };
  } else if (type === 'CONFIRM_PARTNER') {
    const { agreementCid } = payload;
    const agreement = state.myAgreements.find(({ cid: aCid }) => aCid === agreementCid);
    if (!agreement) {
      return state;
    }
    const index = state.myAgreements.indexOf(agreement);
    return {
      ...state,
      myAgreements: [
        ...state.myAgreements.slice(0, index),
        {
          ...agreement
        },
        ...state.myAgreements.slice(index + 1),
      ]
    };
  } else if (type === 'SELECT_POSSIBLE_PARTNER_FOR_CONFIRM') {
    const userToConfirm = payload;
    return {
      ...state,
      userToConfirm
    };
  } else if (type === 'CONFIRM_PARTNER_REQUEST') {
    const { agreementCid } = payload;
    const agreement = state.myAgreements.find(({ cid: aCid }) => aCid === agreementCid);
    if (!agreement) {
      return state;
    }
    const index = state.myAgreements.indexOf(agreement);
    return {
      ...state,
      myAgreements: [
        ...state.myAgreements.slice(0, index),
        {
          ...agreement
        },
        ...state.myAgreements.slice(index + 1),
      ]
    };
  } else if (type === 'DENY_PARTNER_REQUEST') {
    const { agreementCid } = payload;
    const agreement = state.myAgreements.find(({ cid: aCid }) => aCid === agreementCid);
    if (!agreement) {
      return state;
    }
    const index = state.myAgreements.indexOf(agreement);
    return {
      ...state,
      myAgreements: [
        ...state.myAgreements.slice(0, index),
        {
          ...agreement
        },
        ...state.myAgreements.slice(index + 1),
      ]
    };
  } else if (type === 'BREAK_AGREEMENT') {
    const { agreementCid } = payload;
    const agreement = state.myAgreements.find(({ cid: aCid }) => aCid === agreementCid);
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
          ...agreement
        },
      ]
    };
  } else if (type === 'JUMP_AHEAD_TWO_DAYS') {
    const today = new Date(state.today);
    today.setDate(today.getDate() + 2);
    return {
      ...state,
      today: today.getTime()
    };
  } else if (type === 'JUMP_AHEAD_ONE_DAY') {
    const today = new Date(state.today);
    today.setDate(today.getDate() + 1);
    return {
      ...state,
      today: today.getTime()
    };
  } else if (type === 'RESET') {
    return new StateConstructor();
  }
  return state;
}

export function commitToAgreement(payload: Agreement) {
  return {
    type: 'COMMIT_TO_AGREEMENT',
    payload
  };
}

export function addAgreementTemplateToSkip(payload: User) {
  return {
    type: 'SKIP_CONFIRM',
    payload
  };
}

export function searchForPartnerForAgreement(payload: PossiblePartner[]) {
  return {
    type: 'SEARCH_FOR_PARTNER',
    payload
  };
}

export function saveSearchQuery(payload: string) {
  return {
    type: 'SAVE_SEARCH_QUERY',
    payload
  };
}

export function clearSearchQuery() {
  return {
    type: 'CLEAR_SEARCH_QUERY'
  };
}

export function requestPartnerForAgreement(payload: Agreement) {
  return {
    type: 'REQUEST_PARTNER',
    payload
  };
}

export function confirmPartnerForAgreement(payload: Agreement) {
  return {
    type: 'CONFIRM_PARTNER',
    payload
  };
}

export function selectPossiblePartnerForConfirm(payload: PossiblePartner) {
  return {
    type: 'SELECT_POSSIBLE_PARTNER_FOR_CONFIRM',
    payload
  };
}

export function confirmPartnerRequest(payload: Agreement) {
  return {
    type: 'CONFIRM_PARTNER_REQUEST',
    payload
  };
}

export function denyPartnerRequest(payload: Agreement) {
  return {
    type: 'DENY_PARTNER_REQUEST',
    payload
  };
}

export function breakAgreement(payload: Agreement) {
  return {
    type: 'BREAK_AGREEMENT',
    payload
  };
}

export function jumpAheadTwoDays() {
  return {
    type: 'JUMP_AHEAD_TWO_DAYS'
  };
}

export function jumpAheadOneDay() {
  return {
    type: 'JUMP_AHEAD_ONE_DAY'
  };
}

export function resetStateToInitial() {
  return {
    type: 'RESET'
  };
}

export const ourConnect = () => connect((state: State) => ({ state }));

export const store = createStore(reducer);
