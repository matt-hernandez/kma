import { Dispatch, createStore } from "redux";
import { connect } from "react-redux";

export type ConnectionTypeForAdmin = 'REQUESTED' | 'CONFIRMED' | 'BROKE_WITH';

export interface ConnectionForAdmin {
  cid: string;
  fromCid: string;
  fromName: string;
  type: ConnectionTypeForAdmin;
  toCid: string;
  toName: string;
}

type OutcomeType = 'FULFILLED' | 'BROKEN' | 'PENDING';

export interface Outcome {
  cid: string;
  agreementCid: string;
  userCid: string;
  type: OutcomeType;
}

export type ConnectionType = 'REQUEST_TO' | 'REQUEST_FROM' | 'CONFIRMED' | 'BROKE_WITH';

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

export interface AgreementForAdmin {
  cid: string;
  templateCid?: string;
  title: string;
  due: number;
  publishDate: number;
  partnerUpDeadline: number;
  description?: string;
  committedUsers: User[];
  connections: ConnectionForAdmin[];
  outcomes: Outcome[];
}

export interface State {
  me: User;
  isLoadingScreenVisible: boolean;
  loadingScreenText: string;
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
  isLoadingScreenVisible = false;
  loadingScreenText = 'Please wait...'
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
  } else if (type === 'TRIGGER_LOADING_SCREEN') {
    const loadingScreenText = payload;
    return {
      ...state,
      isLoadingScreenVisible: true,
      loadingScreenText: loadingScreenText || state.loadingScreenText
    }
  } else if (type === 'DISMISS_LOADING_SCREEN') {
    return {
      ...state,
      isLoadingScreenVisible: false,
      loadingScreenText: 'Please wait...'
    }
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

export function triggerLoadingScreen(payload?: string) {
  return {
    type: 'TRIGGER_LOADING_SCREEN',
    payload
  };
}

export function dismissLoadingScreen() {
  return {
    type: 'DISMISS_LOADING_SCREEN'
  }
}

export const ourConnect = () => connect((state: State) => ({ state }));

export const store = createStore(reducer);
