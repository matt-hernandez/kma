import React from 'react';
import { addPageData } from '../../util/add-page-data';
import { ALL_CURRENT_TASKS } from '../../apollo-client/queries/admin';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface } from '../../apollo-client/types/admin';
import { readCachedQueryWithDefault } from '../../apollo-client/client';

const slug = '/tasks/current';
const title = 'Current Tasks';

export default addPageData(() => {
  const tasks = readCachedQueryWithDefault<TaskForAdminInterface[]>({
    query: ALL_CURRENT_TASKS
  }, 'allCurrentTasks', []);

  return (
    <>
      {tasks.map((task) => (
        <TaskForAdmin key={task.cid} {...task} />
      ))}
    </>
  )
}, { slug, title });
