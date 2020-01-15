import React from 'react';
import { withRouter } from 'react-router';
import { addPageData } from '../../util/add-page-data';
import TaskForAdmin from '../../components/TaskForAdmin';
import { TaskForAdmin as TaskForAdminInterface, TaskTemplate } from '../../apollo-client/types/admin';
import { UPCOMING_TASKS, TASK_TEMPLATES, CURRENT_TASKS } from '../../apollo-client/query/admin';
import useQueryHelper from '../../util/use-query-helper';
import { TaskLoading } from '../../components/Task';
import MarginWrapper from '../../components/MarginWrapper';
import RegularCopy from '../../components/RegularCopy';
import InlineBold from '../../components/InlineBold';
import HorizontalRule from '../../components/HorizontalRule';

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
      {taskTemplates.length && (
        <MarginWrapper marginLeft marginRight>
          <RegularCopy>
            <InlineBold>
              Orphan future tasks
            </InlineBold>
          </RegularCopy>
          <RegularCopy>
            These are future tasks set to be published, but currently there is no actual task linked
            to them. This is what happens when you set a task to repeat, but then that task
            or the most recently published task, is deleted. You may have deleted that
            task, but you didn't cancel future tasks from being created. If you want to stop all
            future tasks from happening, click on "Edit future tasks" and click on "Cancel all
            future tasks". Otherwise, these settings will eventually be used to create and publish
            a new task that will show up in your feed.
          </RegularCopy>
          <HorizontalRule />
        </MarginWrapper>
      )}
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
