import { Routes } from '@angular/router';
import { Login } from './auth/user/login/login';
import { Signup } from './auth/user/signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { dashRoutes } from './dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: dashRoutes,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
];
