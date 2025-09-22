import { Routes } from '@angular/router';
import { AdminDashboard } from '../admin/dashboard/admin-dashboard';
import { TaskList } from '../admin/employee-task-component/task-list/task-list';
import { TaskCreateComponent } from '../admin/employee-task-component/task-create-component/task-create-component';
import { Signup } from '../auth/signup/signup';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboard,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: ':employeeName/tasks', component: TaskList },
      { path: ':employeeName/create-task', component: TaskCreateComponent },
    ],
  },
  {
    path: 'create-users',
    component: Signup,
  },
];
