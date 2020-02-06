import { useQuery, useMutation, useLazyQuery, QueryLazyOptions, QueryHookOptions, LazyQueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
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
  const { loading, error, data } = useQuery<{ me: Query['me'] }, null>(ME, options);
  return { loading, error, data: data ? data.me : data };
}

export function useQueryScoreDetails(options?: QueryHookOptions<{ scoreDetails: Query['scoreDetails'] }, null>) {
  const { loading, error, data } = useQuery<{ scoreDetails: Query['scoreDetails'] }, null>(SCORE_DETAILS, options);
  return { loading, error, data: data ? data.scoreDetails : data };
}

export function useQueryPartnerSearch(options: QueryHookOptions<{ partnerSearch: Query['partnerSearch'] }, QueryPartnerSearchArgs>) {
  const { loading, error, data } = useQuery<{ partnerSearch: Query['partnerSearch'] }, QueryPartnerSearchArgs>(PARTNER_SEARCH, options);
  return { loading, error, data: data ? data.partnerSearch : data };
}

export function useQueryUserPool(options: QueryHookOptions<{ userPool: Query['userPool'] }, QueryUserPoolArgs>) {
  const { loading, error, data } = useQuery<{ userPool: Query['userPool'] }, QueryUserPoolArgs>(USER_POOL, options);
  return { loading, error, data: data ? data.userPool : data };
}

export function useQueryOnePossiblePartnerForTask(options: QueryHookOptions<{ onePossiblePartnerForTask: Query['onePossiblePartnerForTask'] }, QueryOnePossiblePartnerForTaskArgs>) {
  const { loading, error, data } = useQuery<{ onePossiblePartnerForTask: Query['onePossiblePartnerForTask'] }, QueryOnePossiblePartnerForTaskArgs>(ONE_POSSIBLE_PARTNER_FOR_TASK, options);
  return { loading, error, data: data ? data.onePossiblePartnerForTask : data };
}

export function useQueryGetPartnerDetails(options: QueryHookOptions<{ getPartnerDetails: Query['getPartnerDetails'] }, QueryGetPartnerDetailsArgs>) {
  const { loading, error, data } = useQuery<{ getPartnerDetails: Query['getPartnerDetails'] }, QueryGetPartnerDetailsArgs>(GET_PARTNER_DETAILS, options);
  return { loading, error, data: data ? data.getPartnerDetails : data };
}

export function useQueryOpenTasks(options?: QueryHookOptions<{ openTasks: Query['openTasks'] }, null>) {
  const { loading, error, data } = useQuery<{ openTasks: Query['openTasks'] }, null>(OPEN_TASKS, options);
  return { loading, error, data: data ? data.openTasks : data };
}

export function useQueryMyTasks(options?: QueryHookOptions<{ myTasks: Query['myTasks'] }, null>) {
  const { loading, error, data } = useQuery<{ myTasks: Query['myTasks'] }, null>(MY_TASKS, options);
  return { loading, error, data: data ? data.myTasks : data };
}

export function useQueryRequestedPartnerTasks(options?: QueryHookOptions<{ requestedPartnerTasks: Query['requestedPartnerTasks'] }, null>) {
  const { loading, error, data } = useQuery<{ requestedPartnerTasks: Query['requestedPartnerTasks'] }, null>(REQUESTED_PARTNER_TASKS, options);
  return { loading, error, data: data ? data.requestedPartnerTasks : data };
}

export function useQueryMyPastTasks(options?: QueryHookOptions<{ myPastTasks: Query['myPastTasks'] }, null>) {
  const { loading, error, data } = useQuery<{ myPastTasks: Query['myPastTasks'] }, null>(MY_PAST_TASKS, options);
  return { loading, error, data: data ? data.myPastTasks : data };
}

export function useQueryUsers(options?: QueryHookOptions<{ users: Query['users'] }, null>) {
  const { loading, error, data } = useQuery<{ users: Query['users'] }, null>(USERS, options);
  return { loading, error, data: data ? data.users : data };
}

export function useQueryCurrentTasks(options?: QueryHookOptions<{ currentTasks: Query['currentTasks'] }, null>) {
  const { loading, error, data } = useQuery<{ currentTasks: Query['currentTasks'] }, null>(CURRENT_TASKS, options);
  return { loading, error, data: data ? data.currentTasks : data };
}

export function useQueryPastTasks(options?: QueryHookOptions<{ pastTasks: Query['pastTasks'] }, null>) {
  const { loading, error, data } = useQuery<{ pastTasks: Query['pastTasks'] }, null>(PAST_TASKS, options);
  return { loading, error, data: data ? data.pastTasks : data };
}

export function useQueryUpcomingTasks(options?: QueryHookOptions<{ upcomingTasks: Query['upcomingTasks'] }, null>) {
  const { loading, error, data } = useQuery<{ upcomingTasks: Query['upcomingTasks'] }, null>(UPCOMING_TASKS, options);
  return { loading, error, data: data ? data.upcomingTasks : data };
}

export function useQueryTaskTemplates(options?: QueryHookOptions<{ taskTemplates: Query['taskTemplates'] }, null>) {
  const { loading, error, data } = useQuery<{ taskTemplates: Query['taskTemplates'] }, null>(TASK_TEMPLATES, options);
  return { loading, error, data: data ? data.taskTemplates : data };
}

export function useQueryClaims(options?: QueryHookOptions<{ claims: Query['claims'] }, null>) {
  const { loading, error, data } = useQuery<{ claims: Query['claims'] }, null>(CLAIMS, options);
  return { loading, error, data: data ? data.claims : data };
}

export function useQueryUserScore(options: QueryHookOptions<{ userScore: Query['userScore'] }, QueryUserScoreArgs>) {
  const { loading, error, data } = useQuery<{ userScore: Query['userScore'] }, QueryUserScoreArgs>(USER_SCORE, options);
  return { loading, error, data: data ? data.userScore : data };
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


export function useMutationCommitToTask(options: MutationHookOptions<{ commitToTask: Mutation['commitToTask'] }, MutationCommitToTaskArgs>) {
  return useMutation<{ commitToTask: Mutation['commitToTask'] }, MutationCommitToTaskArgs>(COMMIT_TO_TASK, options);
}

export function useMutationAddTaskTemplateToSkipCommitConfirm(options: MutationHookOptions<{ addTaskTemplateToSkipCommitConfirm: Mutation['addTaskTemplateToSkipCommitConfirm'] }, MutationAddTaskTemplateToSkipCommitConfirmArgs>) {
  return useMutation<{ addTaskTemplateToSkipCommitConfirm: Mutation['addTaskTemplateToSkipCommitConfirm'] }, MutationAddTaskTemplateToSkipCommitConfirmArgs>(ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM, options);
}

export function useMutationAddTaskTemplateToSkipDoneConfirm(options: MutationHookOptions<{ addTaskTemplateToSkipDoneConfirm: Mutation['addTaskTemplateToSkipDoneConfirm'] }, MutationAddTaskTemplateToSkipDoneConfirmArgs>) {
  return useMutation<{ addTaskTemplateToSkipDoneConfirm: Mutation['addTaskTemplateToSkipDoneConfirm'] }, MutationAddTaskTemplateToSkipDoneConfirmArgs>(ADD_TASK_TEMPLATE_TO_SKIP_DONE_CONFIRM, options);
}

export function useMutationRequestPartnerForTask(options: MutationHookOptions<{ requestPartnerForTask: Mutation['requestPartnerForTask'] }, MutationRequestPartnerForTaskArgs>) {
  return useMutation<{ requestPartnerForTask: Mutation['requestPartnerForTask'] }, MutationRequestPartnerForTaskArgs>(REQUEST_PARTNER_FOR_TASK, options);
}

export function useMutationConfirmPartnerRequest(options: MutationHookOptions<{ confirmPartnerRequest: Mutation['confirmPartnerRequest'] }, MutationConfirmPartnerRequestArgs>) {
  return useMutation<{ confirmPartnerRequest: Mutation['confirmPartnerRequest'] }, MutationConfirmPartnerRequestArgs>(CONFIRM_PARTNER_REQUEST, options);
}

export function useMutationCancelPartnerRequest(options: MutationHookOptions<{ cancelPartnerRequest: Mutation['cancelPartnerRequest'] }, MutationCancelPartnerRequestArgs>) {
  return useMutation<{ cancelPartnerRequest: Mutation['cancelPartnerRequest'] }, MutationCancelPartnerRequestArgs>(CANCEL_PARTNER_REQUEST, options);
}

export function useMutationDenyPartnerRequest(options: MutationHookOptions<{ denyPartnerRequest: Mutation['denyPartnerRequest'] }, MutationDenyPartnerRequestArgs>) {
  return useMutation<{ denyPartnerRequest: Mutation['denyPartnerRequest'] }, MutationDenyPartnerRequestArgs>(DENY_PARTNER_REQUEST, options);
}

export function useMutationRemoveBrokenPartnership(options: MutationHookOptions<{ removeBrokenPartnership: Mutation['removeBrokenPartnership'] }, MutationRemoveBrokenPartnershipArgs>) {
  return useMutation<{ removeBrokenPartnership: Mutation['removeBrokenPartnership'] }, MutationRemoveBrokenPartnershipArgs>(REMOVE_BROKEN_PARTNERSHIP, options);
}

export function useMutationBreakCommitment(options: MutationHookOptions<{ breakCommitment: Mutation['breakCommitment'] }, MutationBreakCommitmentArgs>) {
  return useMutation<{ breakCommitment: Mutation['breakCommitment'] }, MutationBreakCommitmentArgs>(BREAK_COMMITMENT, options);
}

export function useMutationMarkTaskAsDone(options: MutationHookOptions<{ markTaskAsDone: Mutation['markTaskAsDone'] }, MutationMarkTaskAsDoneArgs>) {
  return useMutation<{ markTaskAsDone: Mutation['markTaskAsDone'] }, MutationMarkTaskAsDoneArgs>(MARK_TASK_AS_DONE, options);
}

export function useMutationMakeUserInactive(options: MutationHookOptions<{ makeUserInactive: Mutation['makeUserInactive'] }, MutationMakeUserInactiveArgs>) {
  return useMutation<{ makeUserInactive: Mutation['makeUserInactive'] }, MutationMakeUserInactiveArgs>(MAKE_USER_INACTIVE, options);
}

export function useMutationMakeUserActive(options: MutationHookOptions<{ makeUserActive: Mutation['makeUserActive'] }, MutationMakeUserActiveArgs>) {
  return useMutation<{ makeUserActive: Mutation['makeUserActive'] }, MutationMakeUserActiveArgs>(MAKE_USER_ACTIVE, options);
}

export function useMutationMakeUserAnAdmin(options: MutationHookOptions<{ makeUserAnAdmin: Mutation['makeUserAnAdmin'] }, MutationMakeUserAnAdminArgs>) {
  return useMutation<{ makeUserAnAdmin: Mutation['makeUserAnAdmin'] }, MutationMakeUserAnAdminArgs>(MAKE_USER_AN_ADMIN, options);
}

export function useMutationRemoveUserAsAdmin(options: MutationHookOptions<{ removeUserAsAdmin: Mutation['removeUserAsAdmin'] }, MutationRemoveUserAsAdminArgs>) {
  return useMutation<{ removeUserAsAdmin: Mutation['removeUserAsAdmin'] }, MutationRemoveUserAsAdminArgs>(REMOVE_USER_AS_ADMIN, options);
}

export function useMutationChangeTaskStatusForUser(options: MutationHookOptions<{ changeTaskStatusForUser: Mutation['changeTaskStatusForUser'] }, MutationChangeTaskStatusForUserArgs>) {
  return useMutation<{ changeTaskStatusForUser: Mutation['changeTaskStatusForUser'] }, MutationChangeTaskStatusForUserArgs>(CHANGE_TASK_STATUS_FOR_USER, options);
}

export function useMutationCreateTask(options: MutationHookOptions<{ createTask: Mutation['createTask'] }, MutationCreateTaskArgs>) {
  return useMutation<{ createTask: Mutation['createTask'] }, MutationCreateTaskArgs>(CREATE_TASK, options);
}

export function useMutationUpdateTask(options: MutationHookOptions<{ updateTask: Mutation['updateTask'] }, MutationUpdateTaskArgs>) {
  return useMutation<{ updateTask: Mutation['updateTask'] }, MutationUpdateTaskArgs>(UPDATE_TASK, options);
}

export function useMutationDeleteTask(options: MutationHookOptions<{ deleteTask: Mutation['deleteTask'] }, MutationDeleteTaskArgs>) {
  return useMutation<{ deleteTask: Mutation['deleteTask'] }, MutationDeleteTaskArgs>(DELETE_TASK, options);
}

export function useMutationCreateTaskTemplate(options: MutationHookOptions<{ createTaskTemplate: Mutation['createTaskTemplate'] }, MutationCreateTaskTemplateArgs>) {
  return useMutation<{ createTaskTemplate: Mutation['createTaskTemplate'] }, MutationCreateTaskTemplateArgs>(CREATE_TASK_TEMPLATE, options);
}

export function useMutationUpdateTaskTemplate(options: MutationHookOptions<{ updateTaskTemplate: Mutation['updateTaskTemplate'] }, MutationUpdateTaskTemplateArgs>) {
  return useMutation<{ updateTaskTemplate: Mutation['updateTaskTemplate'] }, MutationUpdateTaskTemplateArgs>(UPDATE_TASK_TEMPLATE, options);
}

export function useMutationDeleteTaskTemplate(options: MutationHookOptions<{ deleteTaskTemplate: Mutation['deleteTaskTemplate'] }, MutationDeleteTaskTemplateArgs>) {
  return useMutation<{ deleteTaskTemplate: Mutation['deleteTaskTemplate'] }, MutationDeleteTaskTemplateArgs>(DELETE_TASK_TEMPLATE, options);
}

export function useMutationConfirmAsDone(options: MutationHookOptions<{ confirmAsDone: Mutation['confirmAsDone'] }, MutationConfirmAsDoneArgs>) {
  return useMutation<{ confirmAsDone: Mutation['confirmAsDone'] }, MutationConfirmAsDoneArgs>(CONFIRM_AS_DONE, options);
}

export function useMutationDenyAsDone(options: MutationHookOptions<{ denyAsDone: Mutation['denyAsDone'] }, MutationDenyAsDoneArgs>) {
  return useMutation<{ denyAsDone: Mutation['denyAsDone'] }, MutationDenyAsDoneArgs>(DENY_AS_DONE, options);
}
