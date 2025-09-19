import { inject, Injectable, signal } from '@angular/core';
import { Task, Userdata } from '../module/admin.module';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../admin/users.component/user.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private employees = signal<Employee[] | undefined>([]);
  private tasks = signal([]);
  private httpClient = inject(HttpClient);

  loadedEmployee = this.employees.asReadonly();

  onGetUser(): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }

    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient
      .get<{
        message: string;
        users: Employee[];
      }>(`http://localhost:3000/api/users/admin/get-user`, {
        headers,
      })
      .pipe(
        map((result) => {
          console.log(result);
          this.employees.set(result.users);
          console.log(this.employees());
          return result.users;
        })
      );
  }

  onCreatetask(task: Task): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }
    return this.httpClient
      .post<{ message: String }>('http://localhost:3000/api/users/admin/create-post', task, {
        headers: {
          Authorization: token,
        },
      })
      .pipe(
        map((result) => {
          console.log(result.message);
        })
      );
  }
}
