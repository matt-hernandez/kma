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
const sevenDaysFromNowAt2PM = new Date(Date.now() + oneWeekMS);
sevenDaysFromNowAt2PM.setHours(14, 0, 0);
const sevenDaysFromNowAt12PM = new Date(Date.now() + oneWeekMS);
sevenDaysFromNowAt12PM.setHours(12, 0, 0);

interface Connection {
  from: string;
  fromName: string;
  type: 'REQUESTED' | 'CONFIRMED' | 'BROKE_WITH';
  to: string;
  toName: string;
}

type OutcomeType = 'FULFILLED' | 'BROKEN';

interface Outcome {
  id: string;
  type: OutcomeType;
}

interface User {
  id: string;
  name: string;
}

interface Agreement {
  id: string;
  templateId: string;
  title: string;
  due: number;
  partnerUpDeadline: number;
  description?: string;
  committedUsers: User[];
  connections: Connection[];
  outcomes: Outcome[];
}

const users: User[] = [
  {
    id: generateId(),
    name: 'Katie Fryer'
  },
  {
    id: generateId(),
    name: 'Katie Banks'
  },
  {
    id: generateId(),
    name: 'Kati Taylor'
  },
  {
    id: generateId(),
    name: 'Katherine Love'
  },
  {
    id: generateId(),
    name: 'Erin Armstrong'
  },
  {
    id: generateId(),
    name: 'Dave Goode'
  },
  {
    id: generateId(),
    name: 'Norbi Zylberberg'
  },
  {
    id: generateId(),
    name: 'Rachel Weiss'
  }
];

function findUserByName(name: string): User {
  const user = users.find(({ name: n }) => n === name);
  if (!user) {
    throw new Error('Attempted to find user by name, but no user with that name was found.');
  }
  return user;
}

const allAgreements: Agreement[] = [
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend Kickstart Conditioning - Monday',
    due: threeDaysFromNowAt615AM.getTime(),
    partnerUpDeadline: new Date(threeDaysFromNowAt615AM.getTime() - twoHoursMS).getTime(),
    description: `Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
    Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
    tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
    in what sports scientists agree is one of the best total body workouts available.`,
    committedUsers: [
      findUserByName('Erin Armstrong'),
      findUserByName('Dave Goode'),
      findUserByName('Rachel Weiss'),
      findUserByName('Norbi Zylberberg')
    ],
    connections: [],
    outcomes: []
  },
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend three KM or Fight Tactics classes this week',
    due: sevenDaysFromNowAt2PM.getTime(),
    partnerUpDeadline: new Date(sevenDaysFromNowAt2PM.getTime() - oneDayMS).getTime(),
    description: `Any KM 1+ class or Fight Tactics class counts towards doing this agreement.`,
    committedUsers: [],
    connections: [],
    outcomes: []
  },
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend three conditioning classes this week',
    due: sevenDaysFromNowAt2PM.getTime(),
    partnerUpDeadline: new Date(sevenDaysFromNowAt2PM.getTime() - oneDayMS).getTime(),
    description: `Any Heavy Bag class or Kickstart Conditioning class counts towards doing this agreement.`,
    committedUsers: [],
    connections: [],
    outcomes: []
  },
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend Groundwork Conditioning',
    due: sevenDaysFromNowAt2PM.getTime(),
    partnerUpDeadline: new Date(sevenDaysFromNowAt2PM.getTime() - twoHoursMS).getTime(),
    committedUsers: [],
    connections: [],
    outcomes: []
  },
  {
    id: generateId(),
    templateId: generateId(),
    title: 'Attend Kickstart Conditioning - Saturday',
    due: sevenDaysFromNowAt12PM.getTime(),
    partnerUpDeadline: new Date(sevenDaysFromNowAt12PM.getTime() - twoHoursMS).getTime(),
    description: `Kickstart your day with a strength-building, lung-challenging, ass-kicking workout!
    Burn up to 1000 calories in this high intensity class that utilizes plyometrics,
    tabata training, and a range of boxing and kickboxing techniques. Spend 45 minutes
    in what sports scientists agree is one of the best total body workouts available.`,
    committedUsers: [],
    connections: [],
    outcomes: []
  },
];

const me: User = {
  id: generateId(),
  name: 'Matt'
}

const closedAgreements: Agreement[] = allAgreements.slice(0, 3)
  .map((agreement, index) => {
    let connections = agreement.connections;
    let outcomes = agreement.outcomes;
    if (index === 0) {
      {
        const partner = findUserByName('Katie Fryer');
        outcomes = [
          {
            id: me.id,
            type: 'FULFILLED'
          },
          {
            id: partner.id,
            type: 'FULFILLED'
          }
        ];
        connections = [
          {
            from: me.id,
            fromName: me.name,
            type: 'CONFIRMED',
            to: partner.id,
            toName: partner.name
          }
        ];
      }
      {
        const partner = findUserByName('Dave Goode');
        outcomes = [
          ...outcomes,
          {
            id: partner.id,
            type: 'FULFILLED'
          }
        ];
        connections = [
          ...connections,
          {
            from: me.id,
            fromName: me.name,
            type: 'CONFIRMED',
            to: partner.id,
            toName: partner.name
          }
        ];
      }
    } else if (index === 1) {
      const partner = findUserByName('Erin Armstrong');
      outcomes = [
        {
          id: me.id,
          type: 'BROKEN'
        },
        {
          id: partner.id,
          type: 'FULFILLED'
        }
      ];
      connections = [
        {
          from: partner.id,
          fromName: partner.name,
          type: 'CONFIRMED',
          to: me.id,
          toName: me.name
        }
      ];
    } else if (index === 2) {
      const partner = findUserByName('Norbi Zylberberg');
      outcomes = [
        {
          id: me.id,
          type: 'FULFILLED'
        },
        {
          id: partner.id,
          type: 'BROKEN'
        }
      ];
      connections = [
        {
          from: partner.id,
          fromName: partner.name,
          type: 'CONFIRMED',
          to: me.id,
          toName: me.name
        }
      ];
    }
    return {
      ...agreement,
      id: generateId(),
      due: new Date(agreement.due - oneWeekMS).getTime(),
      partnerUpDeadline: new Date(agreement.partnerUpDeadline - oneWeekMS).getTime(),
      connections,
      outcomes
    };
  });

export interface State {
  me: User;
  openAgreements: Agreement[];
  myAgreements: Agreement[];
  requestsToBePartner: Agreement[];
  otherUsers: User[];
  usersInSearch: User[];
  savedSearchQuery: string;
  skipConfirmCommitForThese: string[];
  closedAgreements: Agreement[];
  today: number;
}

export interface StateProps {
  state: State,
  dispatch: Dispatch
}

class StateConstructor implements State {
  me = me;
  openAgreements = allAgreements;
  requestsToBePartner = [];
  myAgreements = [];
  otherUsers = users;
  usersInSearch = [];
  savedSearchQuery = '';
  skipConfirmCommitForThese = [
    allAgreements[0].templateId
  ];
  closedAgreements = closedAgreements;
  today = Date.now();
};

export function findMyConnections(connections: Connection[], myId: string): Connection[] {
  return connections.filter(({ from, to }) => from === myId || to === myId);
}

function findAConnection(connections: Connection[], myId: string, partnerId: string): Connection | undefined {
  return connections.find(({ from, to }) =>
    (from === myId && to === partnerId) ||
    (from === partnerId && to === myId));
}

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
          committedUsers: [
            ...agreement.committedUsers,
            {
              ...state.me
            }
          ]
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
  } else if (type === 'SEARCH_FOR_PARTNER') {
    const { agreementId, query } = payload;
    const agreement = state.myAgreements.find(({id: aId}) => aId === agreementId);
    if (!agreement) {
      return state;
    }
    const { otherUsers } = state;
    const usersInSearch = otherUsers
      .filter(({ name }) => name.indexOf(query) !== -1)
      .sort(({ name: a }, { name: b }) => {
        const aIndex = a.toLowerCase().indexOf(query.toLowerCase());
        const bIndex = b.toLowerCase().indexOf(query.toLowerCase());
        if (aIndex === bIndex) {
          return a.length - b.length;
        }
        return aIndex - bIndex;
      });
    return {
      ...state,
      usersInSearch
    }
  } else if (type === 'SAVE_SEARCH_QUERY') {
    const { query } = payload;
    return {
      ...state,
      savedSearchQuery: query
    }
  } else if (type === 'CLEAR_SEARCH_QUERY') {
    return {
      ...state,
      savedSearchQuery: '',
      usersInSearch: []
    }
  } else if (type === 'REQUEST_PARTNER') {
    const { agreementId, partnerId } = payload;
    const agreement = state.myAgreements.find(({id: aId}) => aId === agreementId);
    if (!agreement) {
      return state;
    }
    const index = state.myAgreements.indexOf(agreement);
    const partner = state.otherUsers.find(({id: uId}) => uId === partnerId);
    if (!partner) {
      return state;
    }
    const myConnections = findMyConnections(agreement.connections, state.me.id);
    if (myConnections.length > 2) {
      return state;
    }
    return {
      ...state,
      myAgreements: [
        ...state.myAgreements.slice(0, index),
        {
          ...agreement,
          connections: [
            ...agreement.connections,
            {
              from: state.me.id,
              fromName: state.me.name,
              type: 'REQUESTED',
              to: partner.id,
              toName: partner.name,
            }
          ]
        },
        ...state.myAgreements.slice(index + 1),
      ]
    };
  } else if (type === 'CONFIRM_PARTNER') {
    const { agreementId, partnerId } = payload;
    const agreement = state.myAgreements.find(({ id: aId }) => aId === agreementId);
    if (!agreement) {
      return state;
    }
    const connection = findAConnection(agreement.connections, state.me.id, partnerId);
    if (!connection) {
      return state;
    }
    const confirmedAgreement: Agreement = {
      ...agreement,
      connections: [
        ...agreement.connections.slice(0, agreement.connections.indexOf(connection)),
        {
          ...connection,
          type: 'CONFIRMED'
        },
        ...agreement.connections.slice(agreement.connections.indexOf(connection) + 1)
      ],
    };
    return {
      ...state,
      myAgreements: [
        ...state.myAgreements.slice(0, state.myAgreements.indexOf(agreement)),
        confirmedAgreement,
        ...state.myAgreements.slice(state.myAgreements.indexOf(agreement) + 1),
      ]
    };
  } else if (type === 'BREAK_AGREEMENT') {
    const { agreementId } = payload;
    const agreement = state.myAgreements.find(({id: aId }) => aId === agreementId);
    if (!agreement) {
      return state;
    }
    const index = state.myAgreements.indexOf(agreement);
    const myAgreements = [
      ...state.myAgreements.slice(0, index),
      ...state.myAgreements.slice(index + 1),
    ];
    const myConnections = findMyConnections(agreement.connections, state.me.id);
    if (!myConnections.length) {
      return state;
    }
    let connections = agreement.connections.filter(connection => !myConnections.includes(connection));
    const brokenConnections: Connection[] = myConnections.map((connection) => {
      const partnerId = connection.from === state.me.id ? connection.to : connection.from;
      const partnerName = connection.from === state.me.id ? connection.toName : connection.fromName;
      return {
        from: state.me.id,
        fromName: state.me.name,
        type: 'BROKE_WITH',
        to: partnerId,
        toName: partnerName
      };
    });
    const closedAgreements: Agreement[] = [
      ...state.closedAgreements,
      {
        ...agreement,
        connections: [
          ...connections,
          ...brokenConnections
        ],
        outcomes: [
          ...agreement.outcomes,
          {
            id: state.me.id,
            type: 'BROKEN'
          }
        ]
      }
    ];
    return {
      ...state,
      myAgreements,
      closedAgreements
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

export function searchForPartnerForAgreement(query: string, agreementId: string) {
  return {
    type: 'SEARCH_FOR_PARTNER',
    payload: {
      query,
      agreementId
    }
  };
}

export function saveSearchQuery(query: string) {
  return {
    type: 'SAVE_SEARCH_QUERY',
    payload: {
      query
    }
  };
}

export function clearSearchQuery() {
  return {
    type: 'CLEAR_SEARCH_QUERY'
  };
}

export function requestPartnerForAgreement(agreementId: string, partnerId: string) {
  return {
    type: 'REQUEST_PARTNER',
    payload: {
      agreementId,
      partnerId
    }
  };
}

export function confirmPartnerForAgreement(agreementId: string, partnerId: string) {
  return {
    type: 'CONFIRM_PARTNER',
    payload: {
      agreementId,
      partnerId
    }
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

const pastState = localStorage.getItem('km-agreements-state');

export const store = createStore(
  reducer,
  pastState ? JSON.parse(pastState) : initialState,
  applyMiddleware(store => next => action => {
    let result = next(action);
    localStorage.setItem('km-agreements-state', JSON.stringify(store.getState()));
    return result;
  })
);

export function getPartnerRequestsSent(connections: Connection[], myId: string): Connection[] {
  return connections.filter(({ from, type }) => from === myId && type === 'REQUESTED');
}

export function getPartnerRequestsReceived(connections: Connection[], myId: string): Connection[] {
  return connections.filter(({ to, type }) => to === myId && type === 'REQUESTED');
}

export function getConfirmedPartnershipsSent(connections: Connection[], myId: string): Connection[] {
  return findMyConnections(connections, myId)
    .filter(({ from, type }) => from === myId && type === 'CONFIRMED');
}

export function getConfirmedPartnershipsReceived(connections: Connection[], myId: string): Connection[] {
  return findMyConnections(connections, myId)
    .filter(({ to, type }) => to === myId && type === 'CONFIRMED');
}

export function getAllMyConfirmedPartnerships(connections: Connection[], myId: string): Connection[] {
  return getConfirmedPartnershipsSent(connections, myId).concat(getConfirmedPartnershipsReceived(connections, myId));
}

export function getBrokenPartnershipsSent(connections: Connection[], myId: string): Connection[] {
  return connections.filter(({ from, type }) => from === myId && type === 'BROKE_WITH');
}

export function getBrokenPartnershipsRecieved(connections: Connection[], myId: string): Connection[] {
  return connections.filter(({ to, type }) => to === myId && type === 'BROKE_WITH');
}
