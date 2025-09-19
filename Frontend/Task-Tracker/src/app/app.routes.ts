import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Dashboard } from './user/dashboard/dashboard';
import { dashRoutes } from './routes/dashboard.routes';
import { Admin } from './admin/admin';
import { AuthGuard } from './authGuard';
import { adminRoutes } from './routes/admin.routes';

export const routes: Routes = [
  {
    path: '',
    component: Signup,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'users',
    component: Dashboard,
    children: dashRoutes,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: Admin,
    children: adminRoutes,
    canActivate: [AuthGuard],
  },
];
