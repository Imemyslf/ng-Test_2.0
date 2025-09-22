import { Routes } from '@angular/router';
import { AdminDashboard } from '../admin/dashboard/admin-dashboard';
import { TaskList } from '../admin/employee-task-component/task-list/task-list';
import { TaskCreateComponent } from '../admin/employee-task-component/task-create-component/task-create-component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboard,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: ':employeeName/tasks', component: TaskList },
      { path: ':employeeName/create-task/?edit=true', component: TaskCreateComponent },
    ],
  },
];
