import React from 'react';
import { addPageData } from '../../util/add-page-data';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface } from '../../apollo-client/types/admin';
import useQueryHelper from '../../util/use-query-helper';
import { TaskLoading } from '../../components/Task';
import { UPCOMING_TASKS } from '../../apollo-client/query/admin';

const slug = '/tasks/upcoming';
const title = 'Upcoming Tasks';

export default addPageData(() => {
  const { loading, error, data: upcomingTasks } = useQueryHelper<TaskForAdminInterface[]>(UPCOMING_TASKS, 'upcomingTasks');
  return (
    <>
      {loading && (
        <>
          <TaskLoading />
          <TaskLoading />
          <TaskLoading />
        </>
      )}
      {upcomingTasks && upcomingTasks.map((task) => (
        <TaskForAdmin key={task.cid} {...task} />
      ))}
    </>
  );
}, { slug, title });
