import { useQuery, useMutation, QueryHookOptions, MutationHookOptions } from '@apollo/react-hooks';
import {
  Query,
  Mutation,
  QueryPartnerSearchArgs,
  QueryUserPoolArgs,
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


export function useQueryMe(options?: QueryHookOptions<Query['me'], null>) {
  return useQuery<Query['me'], null>(ME, options);
}

export function useQueryScoreDetails(options?: QueryHookOptions<Query['scoreDetails'], null>) {
  return useQuery<Query['scoreDetails'], null>(SCORE_DETAILS, options);
}

export function useQueryPartnerSearch(options: QueryHookOptions<Query['partnerSearch'], QueryPartnerSearchArgs>) {
  return useQuery<Query['partnerSearch'], QueryPartnerSearchArgs>(PARTNER_SEARCH, options);
}

export function useQueryUserPool(options: QueryHookOptions<Query['userPool'], QueryUserPoolArgs>) {
  return useQuery<Query['userPool'], QueryUserPoolArgs>(USER_POOL, options);
}

export function useQueryGetPartnerDetails(options: QueryHookOptions<Query['getPartnerDetails'], QueryGetPartnerDetailsArgs>) {
  return useQuery<Query['getPartnerDetails'], QueryGetPartnerDetailsArgs>(GET_PARTNER_DETAILS, options);
}

export function useQueryOpenTasks(options?: QueryHookOptions<Query['openTasks'], null>) {
  return useQuery<Query['openTasks'], null>(OPEN_TASKS, options);
}

export function useQueryMyTasks(options?: QueryHookOptions<Query['myTasks'], null>) {
  return useQuery<Query['myTasks'], null>(MY_TASKS, options);
}

export function useQueryRequestedPartnerTasks(options?: QueryHookOptions<Query['requestedPartnerTasks'], null>) {
  return useQuery<Query['requestedPartnerTasks'], null>(REQUESTED_PARTNER_TASKS, options);
}

export function useQueryMyPastTasks(options?: QueryHookOptions<Query['myPastTasks'], null>) {
  return useQuery<Query['myPastTasks'], null>(MY_PAST_TASKS, options);
}

export function useQueryUsers(options?: QueryHookOptions<Query['users'], null>) {
  return useQuery<Query['users'], null>(USERS, options);
}

export function useQueryCurrentTasks(options?: QueryHookOptions<Query['currentTasks'], null>) {
  return useQuery<Query['currentTasks'], null>(CURRENT_TASKS, options);
}

export function useQueryPastTasks(options?: QueryHookOptions<Query['pastTasks'], null>) {
  return useQuery<Query['pastTasks'], null>(PAST_TASKS, options);
}

export function useQueryUpcomingTasks(options?: QueryHookOptions<Query['upcomingTasks'], null>) {
  return useQuery<Query['upcomingTasks'], null>(UPCOMING_TASKS, options);
}

export function useQueryTaskTemplates(options?: QueryHookOptions<Query['taskTemplates'], null>) {
  return useQuery<Query['taskTemplates'], null>(TASK_TEMPLATES, options);
}

export function useQueryClaims(options?: QueryHookOptions<Query['claims'], null>) {
  return useQuery<Query['claims'], null>(CLAIMS, options);
}

export function useQueryUserScore(options: QueryHookOptions<Query['userScore'], QueryUserScoreArgs>) {
  return useQuery<Query['userScore'], QueryUserScoreArgs>(USER_SCORE, options);
}


export function useMutationCommitToTask(options: MutationHookOptions<Mutation['commitToTask'], MutationCommitToTaskArgs>) {
  return useMutation<Mutation['commitToTask'], MutationCommitToTaskArgs>(COMMIT_TO_TASK, options);
}

export function useMutationAddTaskTemplateToSkipCommitConfirm(options: MutationHookOptions<Mutation['addTaskTemplateToSkipCommitConfirm'], MutationAddTaskTemplateToSkipCommitConfirmArgs>) {
  return useMutation<Mutation['addTaskTemplateToSkipCommitConfirm'], MutationAddTaskTemplateToSkipCommitConfirmArgs>(ADD_TASK_TEMPLATE_TO_SKIP_COMMIT_CONFIRM, options);
}

export function useMutationAddTaskTemplateToSkipDoneConfirm(options: MutationHookOptions<Mutation['addTaskTemplateToSkipDoneConfirm'], MutationAddTaskTemplateToSkipDoneConfirmArgs>) {
  return useMutation<Mutation['addTaskTemplateToSkipDoneConfirm'], MutationAddTaskTemplateToSkipDoneConfirmArgs>(ADD_TASK_TEMPLATE_TO_SKIP_DONE_CONFIRM, options);
}

export function useMutationRequestPartnerForTask(options: MutationHookOptions<Mutation['requestPartnerForTask'], MutationRequestPartnerForTaskArgs>) {
  return useMutation<Mutation['requestPartnerForTask'], MutationRequestPartnerForTaskArgs>(REQUEST_PARTNER_FOR_TASK, options);
}

export function useMutationConfirmPartnerRequest(options: MutationHookOptions<Mutation['confirmPartnerRequest'], MutationConfirmPartnerRequestArgs>) {
  return useMutation<Mutation['confirmPartnerRequest'], MutationConfirmPartnerRequestArgs>(CONFIRM_PARTNER_REQUEST, options);
}

export function useMutationCancelPartnerRequest(options: MutationHookOptions<Mutation['cancelPartnerRequest'], MutationCancelPartnerRequestArgs>) {
  return useMutation<Mutation['cancelPartnerRequest'], MutationCancelPartnerRequestArgs>(CANCEL_PARTNER_REQUEST, options);
}

export function useMutationDenyPartnerRequest(options: MutationHookOptions<Mutation['denyPartnerRequest'], MutationDenyPartnerRequestArgs>) {
  return useMutation<Mutation['denyPartnerRequest'], MutationDenyPartnerRequestArgs>(DENY_PARTNER_REQUEST, options);
}

export function useMutationRemoveBrokenPartnership(options: MutationHookOptions<Mutation['removeBrokenPartnership'], MutationRemoveBrokenPartnershipArgs>) {
  return useMutation<Mutation['removeBrokenPartnership'], MutationRemoveBrokenPartnershipArgs>(REMOVE_BROKEN_PARTNERSHIP, options);
}

export function useMutationBreakCommitment(options: MutationHookOptions<Mutation['breakCommitment'], MutationBreakCommitmentArgs>) {
  return useMutation<Mutation['breakCommitment'], MutationBreakCommitmentArgs>(BREAK_COMMITMENT, options);
}

export function useMutationMarkTaskAsDone(options: MutationHookOptions<Mutation['markTaskAsDone'], MutationMarkTaskAsDoneArgs>) {
  return useMutation<Mutation['markTaskAsDone'], MutationMarkTaskAsDoneArgs>(MARK_TASK_AS_DONE, options);
}

export function useMutationMakeUserInactive(options: MutationHookOptions<Mutation['makeUserInactive'], MutationMakeUserInactiveArgs>) {
  return useMutation<Mutation['makeUserInactive'], MutationMakeUserInactiveArgs>(MAKE_USER_INACTIVE, options);
}

export function useMutationMakeUserActive(options: MutationHookOptions<Mutation['makeUserActive'], MutationMakeUserActiveArgs>) {
  return useMutation<Mutation['makeUserActive'], MutationMakeUserActiveArgs>(MAKE_USER_ACTIVE, options);
}

export function useMutationMakeUserAnAdmin(options: MutationHookOptions<Mutation['makeUserAnAdmin'], MutationMakeUserAnAdminArgs>) {
  return useMutation<Mutation['makeUserAnAdmin'], MutationMakeUserAnAdminArgs>(MAKE_USER_AN_ADMIN, options);
}

export function useMutationRemoveUserAsAdmin(options: MutationHookOptions<Mutation['removeUserAsAdmin'], MutationRemoveUserAsAdminArgs>) {
  return useMutation<Mutation['removeUserAsAdmin'], MutationRemoveUserAsAdminArgs>(REMOVE_USER_AS_ADMIN, options);
}

export function useMutationChangeTaskStatusForUser(options: MutationHookOptions<Mutation['changeTaskStatusForUser'], MutationChangeTaskStatusForUserArgs>) {
  return useMutation<Mutation['changeTaskStatusForUser'], MutationChangeTaskStatusForUserArgs>(CHANGE_TASK_STATUS_FOR_USER, options);
}

export function useMutationCreateTask(options: MutationHookOptions<Mutation['createTask'], MutationCreateTaskArgs>) {
  return useMutation<Mutation['createTask'], MutationCreateTaskArgs>(CREATE_TASK, options);
}

export function useMutationUpdateTask(options: MutationHookOptions<Mutation['updateTask'], MutationUpdateTaskArgs>) {
  return useMutation<Mutation['updateTask'], MutationUpdateTaskArgs>(UPDATE_TASK, options);
}

export function useMutationDeleteTask(options: MutationHookOptions<Mutation['deleteTask'], MutationDeleteTaskArgs>) {
  return useMutation<Mutation['deleteTask'], MutationDeleteTaskArgs>(DELETE_TASK, options);
}

export function useMutationCreateTaskTemplate(options: MutationHookOptions<Mutation['createTaskTemplate'], MutationCreateTaskTemplateArgs>) {
  return useMutation<Mutation['createTaskTemplate'], MutationCreateTaskTemplateArgs>(CREATE_TASK_TEMPLATE, options);
}

export function useMutationUpdateTaskTemplate(options: MutationHookOptions<Mutation['updateTaskTemplate'], MutationUpdateTaskTemplateArgs>) {
  return useMutation<Mutation['updateTaskTemplate'], MutationUpdateTaskTemplateArgs>(UPDATE_TASK_TEMPLATE, options);
}

export function useMutationDeleteTaskTemplate(options: MutationHookOptions<Mutation['deleteTaskTemplate'], MutationDeleteTaskTemplateArgs>) {
  return useMutation<Mutation['deleteTaskTemplate'], MutationDeleteTaskTemplateArgs>(DELETE_TASK_TEMPLATE, options);
}

export function useMutationConfirmAsDone(options: MutationHookOptions<Mutation['confirmAsDone'], MutationConfirmAsDoneArgs>) {
  return useMutation<Mutation['confirmAsDone'], MutationConfirmAsDoneArgs>(CONFIRM_AS_DONE, options);
}

export function useMutationDenyAsDone(options: MutationHookOptions<Mutation['denyAsDone'], MutationDenyAsDoneArgs>) {
  return useMutation<Mutation['denyAsDone'], MutationDenyAsDoneArgs>(DENY_AS_DONE, options);
}
