import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { dashRoutes } from './dashboard/dashboard.routes';
import { Admin } from './dashboard/admin/admin';
import { AuthGuard } from './authGuard';

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
    canActivate: [AuthGuard],
  },
];
