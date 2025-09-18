import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanDeactivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from './auth/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const savedData = localStorage.getItem('userToken');
    let user: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      user = data.role;
    }
    console.log(user);
    if (user === 'employee') {
      return true;
    }
    if (user === 'admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
