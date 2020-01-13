import React from 'react';
import { withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface } from '../../apollo-client/types/admin';
import useQueryHelper from '../../util/use-query-helper';
import { TaskLoading } from '../../components/Task';
import { PAST_TASKS } from '../../apollo-client/query/admin';

const slug = '/tasks/past';
const title = 'Past Tasks';

export default addPageData(withRouter(({ history }) => {
  const { loading, error, data: pastTasks } = useQueryHelper<TaskForAdminInterface[]>(PAST_TASKS, 'pastTasks');
  return (
    <>
      {loading && (
        <>
          <TaskLoading />
          <TaskLoading />
          <TaskLoading />
        </>
      )}
      {pastTasks && pastTasks.map((task) => (
        <TaskForAdmin
          key={task.cid}
          onCopy={() => history.push(`/admin/tasks/create/${task.cid}`)}
          onFutureEdit={() => {
            if (task.templateCid) {
              history.push(`/admin/tasks/edit-recurring/${task.templateCid}`);
            }
          }}
          {...task}
        />
      ))}
    </>
  );
}), { slug, title });
