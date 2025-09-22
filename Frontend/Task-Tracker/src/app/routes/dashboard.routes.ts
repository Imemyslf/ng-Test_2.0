import { Routes } from '@angular/router';
import { UserTaskList } from '../user/user-task-list/user-task-list';
import { UserTaskReport } from '../user/user-task-report/user-task-report';

export const dashRoutes: Routes = [
  {
    path: '',
    component: UserTaskList,
  },
  {
    path: 'task-report',
    component: UserTaskReport,
  },
];
