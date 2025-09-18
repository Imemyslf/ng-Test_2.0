import { inject, Injectable } from '@angular/core';
import { Auth, User } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  onSignup(user: Auth) {
    console.log('Inside onSignup', user);
    return this.httpClient.post<{ message: string }>(
      `http://localhost:3000/api/auth/register`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  onLogIn(user: Auth) {
    return this.httpClient
      .post<{ token: string; role: string }>(`http://localhost:3000/api/auth/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((result) => {
          localStorage.setItem(
            'userToken',
            JSON.stringify({ token: result.token, role: result.role })
          );

          if (result.role === 'employee') {
            console.log('Going to navigate for user');
            this.router.navigate(['/users']);
          }
          if (result.role === 'admin') {
            console.log('Going to navigate for admin');
            this.router.navigate(['/admin']);
          }
          return result;
        })
      );
  }
}
