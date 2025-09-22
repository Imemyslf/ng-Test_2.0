import { Routes } from '@angular/router';
import { ReviewerDashboard } from '../reviewer/dashboard/dashboard';
import { UserTask } from '../reviewer/user-task/user-task';

export const reviewerRoutes: Routes = [
  {
    path: '',
    component: ReviewerDashboard,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' }, // default
      { path: 'users', component: UserTask }, // list of tasks for default/selected employee
      { path: ':employeeName/tasks', component: UserTask }, // dynamic route per selected employee
    ],
  },
];
