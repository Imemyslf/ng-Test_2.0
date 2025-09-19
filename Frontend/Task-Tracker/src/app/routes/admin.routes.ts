import { Routes } from '@angular/router';
import { TaskCreateComponent } from '../admin/task-create-component/task-create-component';
import { AdminDashboard } from '../admin/dashboard/admin-dashboard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboard,
  },
  {
    path: 'create-task',
    component: TaskCreateComponent,
  },
];
