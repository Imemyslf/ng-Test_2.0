import { inject, Injectable, signal } from '@angular/core';
import { Auth, User } from '../module/auth.module';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Employee } from '../module/user.module';
import { Task } from '../module/admin.module';

@Injectable({
  providedIn: 'root',
})
export class ReviwerService {
  private employees = signal<Employee[] | undefined>([]);
  private httpClient = inject(HttpClient);
  private tasks = signal<Task[] | undefined>([]);
  private router = inject(Router);

  loadedEmployees = this.employees.asReadonly();
  loadedTasks = this.tasks.asReadonly();
  selectedEmployee: Employee | null = null;

  onGetEmployee(): Observable<any> {
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
      }>(`http://localhost:3000/api/users/reviewer/get-employees`, {
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

  onGetCompletedTask(): Observable<any> {
    console.log('Selected Employee ID inside onGetCompletedTask:', this.selectedEmployee?.id);
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
        `http://localhost:3000/api/users/reviewer/completed-tasks/${this.selectedEmployee?.id}`,
        { headers }
      )
      .pipe(
        map((result) => {
          console.log(result.tasks);
          this.tasks.set(result.tasks);
          console.log('Tasks inside Map', this.tasks());
          return result.tasks;
        })
      );
  }
}
