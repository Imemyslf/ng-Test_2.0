import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../module/admin.module';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../module/user.module';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private employees = signal<Employee[] | undefined>([]);
  private tasks = signal<Task[] | undefined>([]);
  private httpClient = inject(HttpClient);

  loadedEmployee = this.employees.asReadonly();
  loadedTask = this.tasks.asReadonly();

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
          console.log('Employess inside Map', this.employees());
          return result.users;
        })
      );
  }

  onGetTask(employeeId: string): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }

    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient
      .get<{ message: string; tasks: Task[] }>(
        `http://localhost:3000/api/users/${employeeId}/tasks`,
        {
          headers,
        }
      )
      .pipe(
        map((result) => {
          this.tasks.set(result.tasks);
          return result.message;
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
