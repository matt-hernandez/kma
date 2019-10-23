import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { addPageData } from '../../util/add-page-data';
import { ALL_CURRENT_TASKS } from '../../apollo-client/queries/admin';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface } from '../../apollo-client/types/admin';

const slug = '/tasks/current';
const title = 'Current Tasks';

export default addPageData(() => {
  const { loading, error, data } = useQuery(ALL_CURRENT_TASKS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const tasks: TaskForAdminInterface[] = data.allCurrentTasks;

  return (
    <div>
      {tasks.map((task) => (
        <TaskForAdmin {...task} />
      ))}
    </div>
  )
}, { slug, title });
