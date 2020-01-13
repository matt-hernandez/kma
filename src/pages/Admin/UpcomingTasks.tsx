import React from 'react';
import { withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface, TaskTemplate } from '../../apollo-client/types/admin';
import useQueryHelper from '../../util/use-query-helper';
import { TaskLoading } from '../../components/Task';
import { UPCOMING_TASKS, TASK_TEMPLATES, CURRENT_TASKS } from '../../apollo-client/query/admin';

const slug = '/tasks/upcoming';
const title = 'Upcoming Tasks';

export default addPageData(withRouter(({ history }) => {
  const { loading: loadingCurrentTasks, error: errorCurrentTasks, data: currentTasks } = useQueryHelper<TaskForAdminInterface[]>(CURRENT_TASKS, 'currentTasks');
  const { loading: loadingUpcomingTasks, error: errorUpcomingTasks, data: upcomingTasks } = useQueryHelper<TaskForAdminInterface[]>(UPCOMING_TASKS, 'upcomingTasks');
  const { loading: loadingTaskTemplates, error: errorTaskTemplates, data: taskTemplates } = useQueryHelper<TaskTemplate[]>(TASK_TEMPLATES, 'taskTemplates');
  const orphanTemplates = taskTemplates && upcomingTasks && currentTasks
    ? taskTemplates.filter(({ cid }) => !currentTasks.some(({ templateCid }) => templateCid === cid) && !upcomingTasks.some(({ templateCid }) => templateCid === cid))
    : [];
  const loading = loadingCurrentTasks || loadingUpcomingTasks || loadingTaskTemplates;
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
      {taskTemplates && orphanTemplates.map((taskTemplate) => (
        <TaskForAdmin
          key={taskTemplate.cid}
          isOrphanTemplate
          onCopy={() => history.push(`/admin/tasks/create/${taskTemplate.cid}`)}
          onFutureEdit={() => {
            history.push(`/admin/tasks/edit-recurring/${taskTemplate.cid}`);
          }}
          {...taskTemplate}
        />
      ))}
    </>
  );
}), { slug, title });
