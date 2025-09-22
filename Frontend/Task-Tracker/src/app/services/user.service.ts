import { inject, Injectable, signal } from '@angular/core';
import { Auth, User } from '../module/auth.module';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from '../module/admin.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  private tasks = signal<Task[] | undefined>([]);

  loadedTasks = this.tasks.asReadonly();
  selectedTask: Task | null = null;

  getEmployeeTask(): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient
      .get<{ message: string; tasks: Task[] }>(`http://localhost:3000/api/users/tasks`, { headers })
      .pipe(
        map((result) => {
          console.log('Tasks inside Map', result.tasks);
          this.tasks.set(result.tasks);
          console.log('Tasks inside Map from signal', this.tasks());
          return result.message;
        })
      );
  }

  updateTaskStatus(taskId: string, status: string): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient
      .put<{ message: string; task: Task }>(
        `http://localhost:3000/api/users/task/${taskId}`,
        { status },
        { headers }
      )
      .pipe(
        map((result) => {
          console.log('Task status updated:', result);
          return result;
        })
      );
  }

  uploadReport(taskId: string, file: File): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }
    const headers = { Authorization: `Bearer ${token}` };
    const formData = new FormData();

    formData.append('report', file);

    return this.httpClient
      .post<{ message: string; task: Task }>(
        `http://localhost:3000/api/users/task/${taskId}/upload`,
        formData,
        { headers }
      )
      .pipe(
        map((result) => {
          console.log('Report uploaded:', result);
          return result;
        })
      );
  }
}
