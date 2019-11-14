import React from 'react';
import { addPageData } from '../../util/add-page-data';
import { ALL_CURRENT_TASKS } from '../../apollo-client/query/admin';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface } from '../../apollo-client/types/admin';
import useQueryHelper from '../../util/use-query-helper';

const slug = '/tasks/current';
const title = 'Current Tasks';

export default addPageData(() => {
  const { loading, error, data: allCurrentTasks } = useQueryHelper<TaskForAdminInterface[]>(ALL_CURRENT_TASKS, 'allCurrentTasks');
  return (
    <>
      {allCurrentTasks && allCurrentTasks.map((task) => (
        <TaskForAdmin key={task.cid} {...task} />
      ))}
    </>
  )
}, { slug, title });
