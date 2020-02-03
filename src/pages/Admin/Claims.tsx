import React, { useState } from 'react';
import { addPageData } from '../../util/add-page-data';
import { CLAIMS, CURRENT_TASKS, PAST_TASKS, USERS } from '../../apollo-client/query/admin';
import { ME } from '../../apollo-client/query/user';
import { User as UserInterface } from '../../apollo-client/types/user';
import { TaskForAdmin } from '../../apollo-client/types/admin';
import { Outcome } from '../../apollo-client/types/admin';
import { UserLoading } from '../../components/User';
import useQueryHelper from '../../util/use-query-helper';
import Claim from '../../components/Claim';

const slug = '/claims';
const title = 'Claims';

export default addPageData(() => {
  const { loading: loadingUsers, error: errorUsers, data: users } = useQueryHelper<UserInterface[]>(USERS, 'users');
  const { loading: loadingCurrentTasks, error: errorCurrentTasks, data: currentTasks } = useQueryHelper<TaskForAdmin[]>(CURRENT_TASKS, 'users');
  const { loading: loadingPastTasks, error: errorPastTasks, data: pastTasks } = useQueryHelper<TaskForAdmin[]>(PAST_TASKS, 'users');
  const { loading: loadingClaims, error: errorClaims, data: claims } = useQueryHelper<Outcome[]>(CLAIMS, 'claims');
  const loading = loadingCurrentTasks || loadingPastTasks || loadingClaims || loadingUsers;
  if (loading) {
    return (
      <>
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
      </>
    );
  }
  return (
    <>
      {claims.map(({ userCid, type, taskCid, cid }) => {
        const task = [...currentTasks, ...pastTasks].find(({ cid }) => cid === taskCid);
        const user = users.find(({ cid }) => cid === taskCid);
        const name = user ? user.name : '';
        const title = task ? task.title : '';
        const due = task ? task.due : 0;
        return <Claim key={cid} name={name} taskTitle={title} taskDue={due} onConfirm={() => {}} onDeny={() => {}} />
      })}
    </>
  );
}, { slug, title });
