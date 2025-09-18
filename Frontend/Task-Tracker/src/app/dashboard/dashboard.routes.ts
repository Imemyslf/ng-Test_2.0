import { Routes } from '@angular/router';
import { TaskList } from '../task/task-list/task-list';
import { TaskOverviwe } from '../task/task-overview/task-overviwe';

export const dashRoutes: Routes = [
  {
    path: '',
    component: TaskList,
  },
  {
    path: 'task/id',
    component: TaskOverviwe,
  },
];
