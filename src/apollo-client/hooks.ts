import { useQuery, useMutation, useLazyQuery, QueryLazyOptions, QueryHookOptions, LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { ApolloError, MutationUpdaterFn } from 'apollo-boost';
import {
  Query,
  Mutation,
  QueryPartnerSearchArgs,
  QueryUserPoolArgs,
  QueryOnePossiblePartnerForTaskArgs,
  QueryGetPartnerDetailsArgs,
  QueryUserScoreArgs,
  MutationCommitToTaskArgs,
  MutationAddTaskTemplateToSkipCommitConfirmArgs,
  MutationAddTaskTemplateToSkipDoneConfirmArgs,
  MutationRequestPartnerForTaskArgs,
  MutationConfirmPartnerRequestArgs,
  MutationCancelPartnerRequestArgs,
  MutationDenyPartnerRequestArgs,
  MutationRemoveBrokenPartnershipArgs,
  MutationBreakCommitmentArgs,
  MutationMarkTaskAsDoneArgs,
  MutationMakeUserInactiveArgs,
  MutationMakeUserActiveArgs,
  MutationMakeUserAnAdminArgs,
  MutationRemoveUserAsAdminArgs,
  MutationChangeTaskStatusForUserArgs,
  MutationCreateTaskArgs,
  MutationUpdateTaskArgs,
  MutationDeleteTaskArgs,
  MutationCreateTaskTemplateArgs,
  MutationUpdateTaskTemplateArgs,
  MutationDeleteTaskTemplateArgs,
  MutationConfirmAsDoneArgs,
  MutationDenyAsDoneArgs
} from '../../__generated__/types';
import {
  ME,
  SCORE_DETAILS,
  PARTNER_SEARCH,
  USER_POOL,
  ONE_POSSIBLE_PARTNER_FOR_TASK,
  GET_PARTNER_DETAILS,
  OPEN_TASKS,
  MY_TASKS,
  REQUESTED_PARTNER_TASKS,
  MY_PAST_TASKS,
  USERS,
  CURRENT_TASKS,
  PAST_TASKS,
  UPCOMING_TASKS,
  TASK_TEMPLATES,
  CLAIMS,
  USER_SCORE
} from './queries';
import {
  COMMIT_TO_TASK,
  ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM,
  ADD_TASK_TEMPLATE_TO_SKIP_DONE_CONFIRM,
  REQUEST_PARTNER_FOR_TASK,
  CONFIRM_PARTNER_REQUEST,
  CANCEL_PARTNER_REQUEST,
  DENY_PARTNER_REQUEST,
  REMOVE_BROKEN_PARTNERSHIP,
  BREAK_COMMITMENT,
  MARK_TASK_AS_DONE,
  MAKE_USER_INACTIVE,
  MAKE_USER_ACTIVE,
  MAKE_USER_AN_ADMIN,
  REMOVE_USER_AS_ADMIN,
  CHANGE_TASK_STATUS_FOR_USER,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CREATE_TASK_TEMPLATE,
  UPDATE_TASK_TEMPLATE,
  DELETE_TASK_TEMPLATE,
  CONFIRM_AS_DONE,
  DENY_AS_DONE
} from './mutations';

export function useQueryMe(options?: QueryHookOptions<{ me: Query['me'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ me: Query['me'] }, null>(ME, options);
  return { loading, error, data: data ? data.me : data, __operationName: 'me', ...query };
}

export function useQueryScoreDetails(options?: QueryHookOptions<{ scoreDetails: Query['scoreDetails'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ scoreDetails: Query['scoreDetails'] }, null>(SCORE_DETAILS, options);
  return { loading, error, data: data ? data.scoreDetails : data, __operationName: 'scoreDetails', ...query };
}

export function useQueryPartnerSearch(options: QueryHookOptions<{ partnerSearch: Query['partnerSearch'] }, QueryPartnerSearchArgs>) {
  const { loading, error, data, ...query } = useQuery<{ partnerSearch: Query['partnerSearch'] }, QueryPartnerSearchArgs>(PARTNER_SEARCH, options);
  return { loading, error, data: data ? data.partnerSearch : data, __operationName: 'partnerSearch', ...query };
}

export function useQueryUserPool(options: QueryHookOptions<{ userPool: Query['userPool'] }, QueryUserPoolArgs>) {
  const { loading, error, data, ...query } = useQuery<{ userPool: Query['userPool'] }, QueryUserPoolArgs>(USER_POOL, options);
  return { loading, error, data: data ? data.userPool : data, __operationName: 'userPool', ...query };
}

export function useQueryOnePossiblePartnerForTask(options: QueryHookOptions<{ onePossiblePartnerForTask: Query['onePossiblePartnerForTask'] }, QueryOnePossiblePartnerForTaskArgs>) {
  const { loading, error, data, ...query } = useQuery<{ onePossiblePartnerForTask: Query['onePossiblePartnerForTask'] }, QueryOnePossiblePartnerForTaskArgs>(ONE_POSSIBLE_PARTNER_FOR_TASK, options);
  return { loading, error, data: data ? data.onePossiblePartnerForTask : data, __operationName: 'onePossiblePartnerForTask', ...query };
}

export function useQueryGetPartnerDetails(options: QueryHookOptions<{ getPartnerDetails: Query['getPartnerDetails'] }, QueryGetPartnerDetailsArgs>) {
  const { loading, error, data, ...query } = useQuery<{ getPartnerDetails: Query['getPartnerDetails'] }, QueryGetPartnerDetailsArgs>(GET_PARTNER_DETAILS, options);
  return { loading, error, data: data ? data.getPartnerDetails : data, __operationName: 'getPartnerDetails', ...query };
}

export function useQueryOpenTasks(options?: QueryHookOptions<{ openTasks: Query['openTasks'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ openTasks: Query['openTasks'] }, null>(OPEN_TASKS, options);
  return { loading, error, data: data ? data.openTasks : data, __operationName: 'openTasks', ...query };
}

export function useQueryMyTasks(options?: QueryHookOptions<{ myTasks: Query['myTasks'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ myTasks: Query['myTasks'] }, null>(MY_TASKS, options);
  return { loading, error, data: data ? data.myTasks : data, __operationName: 'myTasks', ...query };
}

export function useQueryRequestedPartnerTasks(options?: QueryHookOptions<{ requestedPartnerTasks: Query['requestedPartnerTasks'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ requestedPartnerTasks: Query['requestedPartnerTasks'] }, null>(REQUESTED_PARTNER_TASKS, options);
  return { loading, error, data: data ? data.requestedPartnerTasks : data, __operationName: 'requestedPartnerTasks', ...query };
}

export function useQueryMyPastTasks(options?: QueryHookOptions<{ myPastTasks: Query['myPastTasks'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ myPastTasks: Query['myPastTasks'] }, null>(MY_PAST_TASKS, options);
  return { loading, error, data: data ? data.myPastTasks : data, __operationName: 'myPastTasks', ...query };
}

export function useQueryUsers(options?: QueryHookOptions<{ users: Query['users'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ users: Query['users'] }, null>(USERS, options);
  return { loading, error, data: data ? data.users : data, __operationName: 'users', ...query };
}

export function useQueryCurrentTasks(options?: QueryHookOptions<{ currentTasks: Query['currentTasks'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ currentTasks: Query['currentTasks'] }, null>(CURRENT_TASKS, options);
  return { loading, error, data: data ? data.currentTasks : data, __operationName: 'currentTasks', ...query };
}

export function useQueryPastTasks(options?: QueryHookOptions<{ pastTasks: Query['pastTasks'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ pastTasks: Query['pastTasks'] }, null>(PAST_TASKS, options);
  return { loading, error, data: data ? data.pastTasks : data, __operationName: 'pastTasks', ...query };
}

export function useQueryUpcomingTasks(options?: QueryHookOptions<{ upcomingTasks: Query['upcomingTasks'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ upcomingTasks: Query['upcomingTasks'] }, null>(UPCOMING_TASKS, options);
  return { loading, error, data: data ? data.upcomingTasks : data, __operationName: 'upcomingTasks', ...query };
}

export function useQueryTaskTemplates(options?: QueryHookOptions<{ taskTemplates: Query['taskTemplates'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ taskTemplates: Query['taskTemplates'] }, null>(TASK_TEMPLATES, options);
  return { loading, error, data: data ? data.taskTemplates : data, __operationName: 'taskTemplates', ...query };
}

export function useQueryClaims(options?: QueryHookOptions<{ claims: Query['claims'] }, null>) {
  const { loading, error, data, ...query } = useQuery<{ claims: Query['claims'] }, null>(CLAIMS, options);
  return { loading, error, data: data ? data.claims : data, __operationName: 'claims', ...query };
}

export function useQueryUserScore(options: QueryHookOptions<{ userScore: Query['userScore'] }, QueryUserScoreArgs>) {
  const { loading, error, data, ...query } = useQuery<{ userScore: Query['userScore'] }, QueryUserScoreArgs>(USER_SCORE, options);
  return { loading, error, data: data ? data.userScore : data, __operationName: 'userScore', ...query };
}

type LazyQuery<T> = (options?: QueryLazyOptions<T>) => void;
type LazyQueryStatus<T> = { loading: boolean, error: ApolloError | undefined, data: T | undefined };

export function useLazyQueryMe(options?: LazyQueryHookOptions<{ me: Query['me'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['me']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ me: Query['me'] }, null>(ME, options);
  return [ queryFetch, { loading, error, data: data ? data.me : data } ];
}

export function useLazyQueryScoreDetails(options?: LazyQueryHookOptions<{ scoreDetails: Query['scoreDetails'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['scoreDetails']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ scoreDetails: Query['scoreDetails'] }, null>(SCORE_DETAILS, options);
  return [ queryFetch, { loading, error, data: data ? data.scoreDetails : data } ];
}

export function useLazyQueryPartnerSearch(options?: LazyQueryHookOptions<{ partnerSearch: Query['partnerSearch'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['partnerSearch']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ partnerSearch: Query['partnerSearch'] }, null>(PARTNER_SEARCH, options);
  return [ queryFetch, { loading, error, data: data ? data.partnerSearch : data } ];
}

export function useLazyQueryUserPool(options?: LazyQueryHookOptions<{ userPool: Query['userPool'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['userPool']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ userPool: Query['userPool'] }, null>(USER_POOL, options);
  return [ queryFetch, { loading, error, data: data ? data.userPool : data } ];
}

export function useLazyQueryOnePossiblePartnerForTask(options?: LazyQueryHookOptions<{ onePossiblePartnerForTask: Query['onePossiblePartnerForTask'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['onePossiblePartnerForTask']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ onePossiblePartnerForTask: Query['onePossiblePartnerForTask'] }, null>(ONE_POSSIBLE_PARTNER_FOR_TASK, options);
  return [ queryFetch, { loading, error, data: data ? data.onePossiblePartnerForTask : data } ];
}

export function useLazyQueryGetPartnerDetails(options?: LazyQueryHookOptions<{ getPartnerDetails: Query['getPartnerDetails'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['getPartnerDetails']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ getPartnerDetails: Query['getPartnerDetails'] }, null>(GET_PARTNER_DETAILS, options);
  return [ queryFetch, { loading, error, data: data ? data.getPartnerDetails : data } ];
}

export function useLazyQueryOpenTasks(options?: LazyQueryHookOptions<{ openTasks: Query['openTasks'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['openTasks']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ openTasks: Query['openTasks'] }, null>(OPEN_TASKS, options);
  return [ queryFetch, { loading, error, data: data ? data.openTasks : data } ];
}

export function useLazyQueryMyTasks(options?: LazyQueryHookOptions<{ myTasks: Query['myTasks'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['myTasks']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ myTasks: Query['myTasks'] }, null>(MY_TASKS, options);
  return [ queryFetch, { loading, error, data: data ? data.myTasks : data } ];
}

export function useLazyQueryRequestedPartnerTasks(options?: LazyQueryHookOptions<{ requestedPartnerTasks: Query['requestedPartnerTasks'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['requestedPartnerTasks']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ requestedPartnerTasks: Query['requestedPartnerTasks'] }, null>(REQUESTED_PARTNER_TASKS, options);
  return [ queryFetch, { loading, error, data: data ? data.requestedPartnerTasks : data } ];
}

export function useLazyQueryMyPastTasks(options?: LazyQueryHookOptions<{ myPastTasks: Query['myPastTasks'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['myPastTasks']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ myPastTasks: Query['myPastTasks'] }, null>(MY_PAST_TASKS, options);
  return [ queryFetch, { loading, error, data: data ? data.myPastTasks : data } ];
}

export function useLazyQueryUsers(options?: LazyQueryHookOptions<{ users: Query['users'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['users']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ users: Query['users'] }, null>(USERS, options);
  return [ queryFetch, { loading, error, data: data ? data.users : data } ];
}

export function useLazyQueryCurrentTasks(options?: LazyQueryHookOptions<{ currentTasks: Query['currentTasks'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['currentTasks']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ currentTasks: Query['currentTasks'] }, null>(CURRENT_TASKS, options);
  return [ queryFetch, { loading, error, data: data ? data.currentTasks : data } ];
}

export function useLazyQueryPastTasks(options?: LazyQueryHookOptions<{ pastTasks: Query['pastTasks'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['pastTasks']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ pastTasks: Query['pastTasks'] }, null>(PAST_TASKS, options);
  return [ queryFetch, { loading, error, data: data ? data.pastTasks : data } ];
}

export function useLazyQueryUpcomingTasks(options?: LazyQueryHookOptions<{ upcomingTasks: Query['upcomingTasks'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['upcomingTasks']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ upcomingTasks: Query['upcomingTasks'] }, null>(UPCOMING_TASKS, options);
  return [ queryFetch, { loading, error, data: data ? data.upcomingTasks : data } ];
}

export function useLazyQueryTaskTemplates(options?: LazyQueryHookOptions<{ taskTemplates: Query['taskTemplates'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['taskTemplates']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ taskTemplates: Query['taskTemplates'] }, null>(TASK_TEMPLATES, options);
  return [ queryFetch, { loading, error, data: data ? data.taskTemplates : data } ];
}

export function useLazyQueryClaims(options?: LazyQueryHookOptions<{ claims: Query['claims'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['claims']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ claims: Query['claims'] }, null>(CLAIMS, options);
  return [ queryFetch, { loading, error, data: data ? data.claims : data } ];
}

export function useLazyQueryUserScore(options?: LazyQueryHookOptions<{ userScore: Query['userScore'] }, null>): [LazyQuery<null>, LazyQueryStatus<Query['userScore']>] {
  const [ queryFetch, { loading, error, data } ] = useLazyQuery<{ userScore: Query['userScore'] }, null>(USER_SCORE, options);
  return [ queryFetch, { loading, error, data: data ? data.userScore : data } ];
}

type MutationUpdaterFnParams<R> = Parameters<MutationUpdaterFn<R>>;
type SimpleUpdate<R, T> = (cache: MutationUpdaterFnParams<R>[0], result: { data: T }, context?: MutationUpdaterFnParams<R>[1]['context']) => void;
type MutationHookOptionsWrap<R, T, A> = Omit<MutationHookOptions<R, A>, 'update'> & { update: SimpleUpdate<R, T> };

function generateSimpleUpdate<R extends { [key: string]: T }, T>(name: string, update: SimpleUpdate<R, T>): MutationUpdaterFn<R> {
  return (cache, { data, context }) => {
    if (data === undefined || data === null) {
      throw new Error('Mutation result cannot be `undefined` or `null`');
    }
    update(cache, { data: data[name] }, context);
  };
}

export function useMutationCommitToTask(options: MutationHookOptionsWrap<{ commitToTask: Mutation['commitToTask'] }, Mutation['commitToTask'], MutationCommitToTaskArgs>) {
  const updater: MutationUpdaterFn<{ commitToTask: Mutation['commitToTask'] }> = generateSimpleUpdate('commitToTask', options.update);
  const [ mutationFn ] = useMutation<{ commitToTask: Mutation['commitToTask'] }, MutationCommitToTaskArgs>(COMMIT_TO_TASK, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.commitToTask };
  });
}

export function useMutationAddTaskTemplateToSkipCommitConfirm(options: MutationHookOptionsWrap<{ addTaskTemplateToSkipCommitConfirm: Mutation['addTaskTemplateToSkipCommitConfirm'] }, Mutation['addTaskTemplateToSkipCommitConfirm'], MutationAddTaskTemplateToSkipCommitConfirmArgs>) {
  const updater: MutationUpdaterFn<{ addTaskTemplateToSkipCommitConfirm: Mutation['addTaskTemplateToSkipCommitConfirm'] }> = generateSimpleUpdate('addTaskTemplateToSkipCommitConfirm', options.update);
  const [ mutationFn ] = useMutation<{ addTaskTemplateToSkipCommitConfirm: Mutation['addTaskTemplateToSkipCommitConfirm'] }, MutationAddTaskTemplateToSkipCommitConfirmArgs>(ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.addTaskTemplateToSkipCommitConfirm };
  });
}

export function useMutationAddTaskTemplateToSkipDoneConfirm(options: MutationHookOptionsWrap<{ addTaskTemplateToSkipDoneConfirm: Mutation['addTaskTemplateToSkipDoneConfirm'] }, Mutation['addTaskTemplateToSkipDoneConfirm'], MutationAddTaskTemplateToSkipDoneConfirmArgs>) {
  const updater: MutationUpdaterFn<{ addTaskTemplateToSkipDoneConfirm: Mutation['addTaskTemplateToSkipDoneConfirm'] }> = generateSimpleUpdate('addTaskTemplateToSkipDoneConfirm', options.update);
  const [ mutationFn ] = useMutation<{ addTaskTemplateToSkipDoneConfirm: Mutation['addTaskTemplateToSkipDoneConfirm'] }, MutationAddTaskTemplateToSkipDoneConfirmArgs>(ADD_TASK_TEMPLATE_TO_SKIP_DONE_CONFIRM, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.addTaskTemplateToSkipDoneConfirm };
  });
}

export function useMutationRequestPartnerForTask(options: MutationHookOptionsWrap<{ requestPartnerForTask: Mutation['requestPartnerForTask'] }, Mutation['requestPartnerForTask'], MutationRequestPartnerForTaskArgs>) {
  const updater: MutationUpdaterFn<{ requestPartnerForTask: Mutation['requestPartnerForTask'] }> = generateSimpleUpdate('requestPartnerForTask', options.update);
  const [ mutationFn ] = useMutation<{ requestPartnerForTask: Mutation['requestPartnerForTask'] }, MutationRequestPartnerForTaskArgs>(REQUEST_PARTNER_FOR_TASK, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.requestPartnerForTask };
  });
}

export function useMutationConfirmPartnerRequest(options: MutationHookOptionsWrap<{ confirmPartnerRequest: Mutation['confirmPartnerRequest'] }, Mutation['confirmPartnerRequest'], MutationConfirmPartnerRequestArgs>) {
  const updater: MutationUpdaterFn<{ confirmPartnerRequest: Mutation['confirmPartnerRequest'] }> = generateSimpleUpdate('confirmPartnerRequest', options.update);
  const [ mutationFn ] = useMutation<{ confirmPartnerRequest: Mutation['confirmPartnerRequest'] }, MutationConfirmPartnerRequestArgs>(CONFIRM_PARTNER_REQUEST, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.confirmPartnerRequest };
  });
}

export function useMutationCancelPartnerRequest(options: MutationHookOptionsWrap<{ cancelPartnerRequest: Mutation['cancelPartnerRequest'] }, Mutation['cancelPartnerRequest'], MutationCancelPartnerRequestArgs>) {
  const updater: MutationUpdaterFn<{ cancelPartnerRequest: Mutation['cancelPartnerRequest'] }> = generateSimpleUpdate('cancelPartnerRequest', options.update);
  const [ mutationFn ] = useMutation<{ cancelPartnerRequest: Mutation['cancelPartnerRequest'] }, MutationCancelPartnerRequestArgs>(CANCEL_PARTNER_REQUEST, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.cancelPartnerRequest };
  });
}

export function useMutationDenyPartnerRequest(options: MutationHookOptionsWrap<{ denyPartnerRequest: Mutation['denyPartnerRequest'] }, Mutation['denyPartnerRequest'], MutationDenyPartnerRequestArgs>) {
  const updater: MutationUpdaterFn<{ denyPartnerRequest: Mutation['denyPartnerRequest'] }> = generateSimpleUpdate('denyPartnerRequest', options.update);
  const [ mutationFn ] = useMutation<{ denyPartnerRequest: Mutation['denyPartnerRequest'] }, MutationDenyPartnerRequestArgs>(DENY_PARTNER_REQUEST, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.denyPartnerRequest };
  });
}

export function useMutationRemoveBrokenPartnership(options: MutationHookOptionsWrap<{ removeBrokenPartnership: Mutation['removeBrokenPartnership'] }, Mutation['removeBrokenPartnership'], MutationRemoveBrokenPartnershipArgs>) {
  const updater: MutationUpdaterFn<{ removeBrokenPartnership: Mutation['removeBrokenPartnership'] }> = generateSimpleUpdate('removeBrokenPartnership', options.update);
  const [ mutationFn ] = useMutation<{ removeBrokenPartnership: Mutation['removeBrokenPartnership'] }, MutationRemoveBrokenPartnershipArgs>(REMOVE_BROKEN_PARTNERSHIP, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.removeBrokenPartnership };
  });
}

export function useMutationBreakCommitment(options: MutationHookOptionsWrap<{ breakCommitment: Mutation['breakCommitment'] }, Mutation['breakCommitment'], MutationBreakCommitmentArgs>) {
  const updater: MutationUpdaterFn<{ breakCommitment: Mutation['breakCommitment'] }> = generateSimpleUpdate('breakCommitment', options.update);
  const [ mutationFn ] = useMutation<{ breakCommitment: Mutation['breakCommitment'] }, MutationBreakCommitmentArgs>(BREAK_COMMITMENT, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.breakCommitment };
  });
}

export function useMutationMarkTaskAsDone(options: MutationHookOptionsWrap<{ markTaskAsDone: Mutation['markTaskAsDone'] }, Mutation['markTaskAsDone'], MutationMarkTaskAsDoneArgs>) {
  const updater: MutationUpdaterFn<{ markTaskAsDone: Mutation['markTaskAsDone'] }> = generateSimpleUpdate('markTaskAsDone', options.update);
  const [ mutationFn ] = useMutation<{ markTaskAsDone: Mutation['markTaskAsDone'] }, MutationMarkTaskAsDoneArgs>(MARK_TASK_AS_DONE, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.markTaskAsDone };
  });
}

export function useMutationMakeUserInactive(options: MutationHookOptionsWrap<{ makeUserInactive: Mutation['makeUserInactive'] }, Mutation['makeUserInactive'], MutationMakeUserInactiveArgs>) {
  const updater: MutationUpdaterFn<{ makeUserInactive: Mutation['makeUserInactive'] }> = generateSimpleUpdate('makeUserInactive', options.update);
  const [ mutationFn ] = useMutation<{ makeUserInactive: Mutation['makeUserInactive'] }, MutationMakeUserInactiveArgs>(MAKE_USER_INACTIVE, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.makeUserInactive };
  });
}

export function useMutationMakeUserActive(options: MutationHookOptionsWrap<{ makeUserActive: Mutation['makeUserActive'] }, Mutation['makeUserActive'], MutationMakeUserActiveArgs>) {
  const updater: MutationUpdaterFn<{ makeUserActive: Mutation['makeUserActive'] }> = generateSimpleUpdate('makeUserActive', options.update);
  const [ mutationFn ] = useMutation<{ makeUserActive: Mutation['makeUserActive'] }, MutationMakeUserActiveArgs>(MAKE_USER_ACTIVE, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.makeUserActive };
  });
}

export function useMutationMakeUserAnAdmin(options: MutationHookOptionsWrap<{ makeUserAnAdmin: Mutation['makeUserAnAdmin'] }, Mutation['makeUserAnAdmin'], MutationMakeUserAnAdminArgs>) {
  const updater: MutationUpdaterFn<{ makeUserAnAdmin: Mutation['makeUserAnAdmin'] }> = generateSimpleUpdate('makeUserAnAdmin', options.update);
  const [ mutationFn ] = useMutation<{ makeUserAnAdmin: Mutation['makeUserAnAdmin'] }, MutationMakeUserAnAdminArgs>(MAKE_USER_AN_ADMIN, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.makeUserAnAdmin };
  });
}

export function useMutationRemoveUserAsAdmin(options: MutationHookOptionsWrap<{ removeUserAsAdmin: Mutation['removeUserAsAdmin'] }, Mutation['removeUserAsAdmin'], MutationRemoveUserAsAdminArgs>) {
  const updater: MutationUpdaterFn<{ removeUserAsAdmin: Mutation['removeUserAsAdmin'] }> = generateSimpleUpdate('removeUserAsAdmin', options.update);
  const [ mutationFn ] = useMutation<{ removeUserAsAdmin: Mutation['removeUserAsAdmin'] }, MutationRemoveUserAsAdminArgs>(REMOVE_USER_AS_ADMIN, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.removeUserAsAdmin };
  });
}

export function useMutationChangeTaskStatusForUser(options: MutationHookOptionsWrap<{ changeTaskStatusForUser: Mutation['changeTaskStatusForUser'] }, Mutation['changeTaskStatusForUser'], MutationChangeTaskStatusForUserArgs>) {
  const updater: MutationUpdaterFn<{ changeTaskStatusForUser: Mutation['changeTaskStatusForUser'] }> = generateSimpleUpdate('changeTaskStatusForUser', options.update);
  const [ mutationFn ] = useMutation<{ changeTaskStatusForUser: Mutation['changeTaskStatusForUser'] }, MutationChangeTaskStatusForUserArgs>(CHANGE_TASK_STATUS_FOR_USER, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.changeTaskStatusForUser };
  });
}

export function useMutationCreateTask(options: MutationHookOptionsWrap<{ createTask: Mutation['createTask'] }, Mutation['createTask'], MutationCreateTaskArgs>) {
  const updater: MutationUpdaterFn<{ createTask: Mutation['createTask'] }> = generateSimpleUpdate('createTask', options.update);
  const [ mutationFn ] = useMutation<{ createTask: Mutation['createTask'] }, MutationCreateTaskArgs>(CREATE_TASK, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.createTask };
  });
}

export function useMutationUpdateTask(options: MutationHookOptionsWrap<{ updateTask: Mutation['updateTask'] }, Mutation['updateTask'], MutationUpdateTaskArgs>) {
  const updater: MutationUpdaterFn<{ updateTask: Mutation['updateTask'] }> = generateSimpleUpdate('updateTask', options.update);
  const [ mutationFn ] = useMutation<{ updateTask: Mutation['updateTask'] }, MutationUpdateTaskArgs>(UPDATE_TASK, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.updateTask };
  });
}

export function useMutationDeleteTask(options: MutationHookOptionsWrap<{ deleteTask: Mutation['deleteTask'] }, Mutation['deleteTask'], MutationDeleteTaskArgs>) {
  const updater: MutationUpdaterFn<{ deleteTask: Mutation['deleteTask'] }> = generateSimpleUpdate('deleteTask', options.update);
  const [ mutationFn ] = useMutation<{ deleteTask: Mutation['deleteTask'] }, MutationDeleteTaskArgs>(DELETE_TASK, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.deleteTask };
  });
}

export function useMutationCreateTaskTemplate(options: MutationHookOptionsWrap<{ createTaskTemplate: Mutation['createTaskTemplate'] }, Mutation['createTaskTemplate'], MutationCreateTaskTemplateArgs>) {
  const updater: MutationUpdaterFn<{ createTaskTemplate: Mutation['createTaskTemplate'] }> = generateSimpleUpdate('createTaskTemplate', options.update);
  const [ mutationFn ] = useMutation<{ createTaskTemplate: Mutation['createTaskTemplate'] }, MutationCreateTaskTemplateArgs>(CREATE_TASK_TEMPLATE, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.createTaskTemplate };
  });
}

export function useMutationUpdateTaskTemplate(options: MutationHookOptionsWrap<{ updateTaskTemplate: Mutation['updateTaskTemplate'] }, Mutation['updateTaskTemplate'], MutationUpdateTaskTemplateArgs>) {
  const updater: MutationUpdaterFn<{ updateTaskTemplate: Mutation['updateTaskTemplate'] }> = generateSimpleUpdate('updateTaskTemplate', options.update);
  const [ mutationFn ] = useMutation<{ updateTaskTemplate: Mutation['updateTaskTemplate'] }, MutationUpdateTaskTemplateArgs>(UPDATE_TASK_TEMPLATE, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.updateTaskTemplate };
  });
}

export function useMutationDeleteTaskTemplate(options: MutationHookOptionsWrap<{ deleteTaskTemplate: Mutation['deleteTaskTemplate'] }, Mutation['deleteTaskTemplate'], MutationDeleteTaskTemplateArgs>) {
  const updater: MutationUpdaterFn<{ deleteTaskTemplate: Mutation['deleteTaskTemplate'] }> = generateSimpleUpdate('deleteTaskTemplate', options.update);
  const [ mutationFn ] = useMutation<{ deleteTaskTemplate: Mutation['deleteTaskTemplate'] }, MutationDeleteTaskTemplateArgs>(DELETE_TASK_TEMPLATE, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.deleteTaskTemplate };
  });
}

export function useMutationConfirmAsDone(options: MutationHookOptionsWrap<{ confirmAsDone: Mutation['confirmAsDone'] }, Mutation['confirmAsDone'], MutationConfirmAsDoneArgs>) {
  const updater: MutationUpdaterFn<{ confirmAsDone: Mutation['confirmAsDone'] }> = generateSimpleUpdate('confirmAsDone', options.update);
  const [ mutationFn ] = useMutation<{ confirmAsDone: Mutation['confirmAsDone'] }, MutationConfirmAsDoneArgs>(CONFIRM_AS_DONE, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.confirmAsDone };
  });
}

export function useMutationDenyAsDone(options: MutationHookOptionsWrap<{ denyAsDone: Mutation['denyAsDone'] }, Mutation['denyAsDone'], MutationDenyAsDoneArgs>) {
  const updater: MutationUpdaterFn<{ denyAsDone: Mutation['denyAsDone'] }> = generateSimpleUpdate('denyAsDone', options.update);
  const [ mutationFn ] = useMutation<{ denyAsDone: Mutation['denyAsDone'] }, MutationDenyAsDoneArgs>(DENY_AS_DONE, { ...options, update: updater });
  type Options = Parameters<typeof mutationFn>[0];
  return (options: Options) => mutationFn(options).then(({ data }) => {
    if (data === undefined) {
      throw new Error('Value of `data` from successful mutation cannot be undefined!');
    }
    return { data: data.denyAsDone };
  });
}
