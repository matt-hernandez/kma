import React from 'react';
import { addPageData } from '../../util/add-page-data';
import { ALL_CURRENT_TASKS } from '../../apollo-client/query/admin';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface } from '../../apollo-client/types/admin';
import { useQuery } from '@apollo/react-hooks';

const slug = '/tasks/current';
const title = 'Current Tasks';

export default addPageData(() => {
  const { loading, error, data: tasks } = useQuery<TaskForAdminInterface[]>(ALL_CURRENT_TASKS, {
    fetchPolicy: 'cache-and-network'
  });

  return (
    <>
      {tasks && tasks.map((task) => (
        <TaskForAdmin key={task.cid} {...task} />
      ))}
    </>
  )
}, { slug, title });
