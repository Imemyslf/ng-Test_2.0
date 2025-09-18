import { inject, Injectable, signal } from '@angular/core';
import { Userdata } from './admin-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private users = signal<Userdata[] | undefined>([]);
  private httpClient = inject(HttpClient);
  onGetUser() {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient
      .get<{ message: string }>(`http://localhost:3000/users/admin/get-user`, {
        headers,
      })
      .subscribe({
        next: (result) => {
          console.log(result.message);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
