import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskResponse } from '../module/admin.module';
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

  selectedEmployee: Employee | null = null;
  selectedTask: Task | null = null;

  loadedEmployee = this.employees.asReadonly();
  loadedTask = this.tasks.asReadonly();

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
      }>(`http://localhost:3000/api/users/admin/get-employees`, {
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

  onGetTask(): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }

    const headers = { Authorization: `Bearer ${token}` };
    // console.log('Employee ID: ', this.selectedEmployee!.id);
    return this.httpClient
      .get<{ message: string; tasks: Task[] }>(
        `http://localhost:3000/api/users/${this.selectedEmployee!.id}/tasks`,
        {
          headers,
        }
      )
      .pipe(
        map((result) => {
          console.log('Tasks inside Map', result.tasks);
          this.tasks.set(result.tasks);
          console.log('Tasks inside Map from signal', this.tasks());
          return result.message;
        })
      );
  }

  onCreatetask(task: Task, isUpdate: boolean): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }
    console.log(this.selectedEmployee);

    const headers = { Authorization: `Bearer ${token}` };

    if (isUpdate) {
      console.log('Updating Task ID:', this.selectedTask?._id);
      return this.httpClient
        .put<{ message: String; task: TaskResponse }>(
          `http://localhost:3000/api/users/admin/update-task/${this.selectedTask?._id}`,
          task,
          {
            headers,
          }
        )
        .pipe(
          map((result) => {
            console.log(result.message);
            return result;
          })
        );
    } else {
      console.log(`http://localhost:3000/api/users/admin/${this.selectedEmployee!.id}/create-task`);
      return this.httpClient
        .post<{ message: String; task: TaskResponse }>(
          `http://localhost:3000/api/users/admin/${this.selectedEmployee!.id}/create-task`,
          task,
          {
            headers,
          }
        )
        .pipe(
          map((result) => {
            console.log(result.message);
            return result;
          })
        );
    }
  }

  onDeleteTask(taskId: string): Observable<any> {
    const savedData = localStorage.getItem('userToken');
    let token: string = '';
    if (savedData) {
      const data = JSON.parse(savedData);
      token = data.token;
      console.log(token);
    }
    const headers = { Authorization: `Bearer ${token}` };
    return this.httpClient
      .delete<{ message: String }>(`http://localhost:3000/api/users/admin/delete-task/${taskId}`, {
        headers,
      })
      .pipe(
        map((result) => {
          console.log(result.message);
          return result;
        })
      );
  }
}
