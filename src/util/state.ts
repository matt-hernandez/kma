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

const allAgreements = [
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

const closedAgreements = allAgreements.slice(0, 3)
  .map(agreement => ({
    ...agreement,
    id: generateId(),
    due: new Date(agreement.due - oneWeekMS).getTime(),
    expiration: new Date(agreement.expiration - oneWeekMS).getTime(),
  }));

export const initialState = {
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
          point: -1
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
          point: -1
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
      point: -1,
      partners: ['Erin Armstrong']
    },
    {
      agreementId: closedAgreements[2].id,
      point: 1,
      partners: ['Norby Zylberberg']
    }
  ]
};


