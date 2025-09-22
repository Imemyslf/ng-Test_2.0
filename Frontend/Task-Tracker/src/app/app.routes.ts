import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Dashboard } from './user/dashboard/dashboard';
import { dashRoutes } from './routes/dashboard.routes';
import { ReviewerDashboard } from './reviewer/dashboard/dashboard';
import { Admin } from './admin/admin';
import { AuthGuard } from './authGuard';
import { adminRoutes } from './routes/admin.routes';
import { SaDashboardComponent } from './super-admin/sa-dashboard-component/sa-dashboard-component';
import { UserTaskList } from './user/user-task-list/user-task-list';
import { UserTaskReport } from './user/user-task-report/user-task-report';
import { reviewerRoutes } from './routes/reviewer.routes';
import { Revieer } from './reviewer/reviewer';

export const routes: Routes = [
  {
    path: '',
    component: Login,
    title: 'Login',
  },
  {
    path: 'users',
    component: Dashboard,
    children: [
      { path: '', component: UserTaskList },
      { path: 'task-report', component: UserTaskReport },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'reviewer',
    component: Revieer,
    children: reviewerRoutes,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: Admin,
    children: adminRoutes,
    canActivate: [AuthGuard],
  },
  {
    path: 'super-admin',
    component: SaDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
