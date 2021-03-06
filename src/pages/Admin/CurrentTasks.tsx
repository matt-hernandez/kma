import React from 'react';
import { addPageData } from '../../util/add-page-data';
import { CURRENT_TASKS } from '../../apollo-client/query/admin';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface } from '../../apollo-client/types/admin';
import useQueryHelper from '../../util/use-query-helper';
import { TaskLoading } from '../../components/Task';
import { withRouter } from 'react-router';

const slug = '/tasks/current';
const title = 'Current Tasks';

export default addPageData(withRouter(({ history }) => {
  const { loading, error, data: currentTasks } = useQueryHelper<TaskForAdminInterface[]>(CURRENT_TASKS, 'currentTasks');
  return (
    <>
      {loading && (
        <>
          <TaskLoading />
          <TaskLoading />
          <TaskLoading />
        </>
      )}
      {currentTasks && currentTasks.map((task) => (
        <TaskForAdmin
          key={task.cid}
          onEdit={() => history.push(`/admin/tasks/edit/${task.cid}`)}
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
