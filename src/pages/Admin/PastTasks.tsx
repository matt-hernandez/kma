import React from 'react';
import { addPageData } from '../../util/add-page-data';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface } from '../../apollo-client/types/admin';
import useQueryHelper from '../../util/use-query-helper';
import { TaskLoading } from '../../components/Task';
import { ALL_PAST_TASKS } from '../../apollo-client/query/admin';

const slug = '/tasks/past';
const title = 'Past Tasks';

export default addPageData(() => {
  const { loading, error, data: allPastTasks } = useQueryHelper<TaskForAdminInterface[]>(ALL_PAST_TASKS, 'allPastTasks');
  return (
    <>
      {loading && (
        <>
          <TaskLoading />
          <TaskLoading />
          <TaskLoading />
        </>
      )}
      {allPastTasks && allPastTasks.map((task) => (
        <TaskForAdmin key={task.cid} {...task} />
      ))}
    </>
  );
}, { slug, title });
