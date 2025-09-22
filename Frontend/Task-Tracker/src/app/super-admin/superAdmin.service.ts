import { inject, Injectable, signal } from '@angular/core';
import type { Employee, Admin, Reviewer } from './superAdmin.module';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface GetAllUsers {
  message: string;
  employees: Employee[];
  admins: Admin[];
  reviewers: Reviewer[];
}
@Injectable({
  providedIn: 'root',
})
export class SuperAdminService {
  private employees = signal<Employee[] | undefined>([]);
  private admin = signal<Admin[] | undefined>([]);
  private reviewers = signal<Reviewer[] | undefined>([]);
  //   private tasks = signal([]);
  private httpClient = inject(HttpClient);

  loadedEmployee = this.employees.asReadonly();
  loadedAdmin = this.admin.asReadonly();
  loadedReviewer = this.reviewers.asReadonly();

  onGetAllUsers() {
    return this.httpClient
      .get<GetAllUsers>(`http://localhost:3000/api/users/super-admin/get-all-users`)
      .pipe(
        map((result) => {
          console.log(result);
          this.employees.set(result.employees);
          this.admin.set(result.admins);
          this.reviewers.set(result.reviewers);
          console.log('Employees inside Map', this.employees());
          console.log('Admin inside Map', this.admin());
          console.log('Reviewer inside Map', this.reviewers());
          return result;
        })
      );
  }
}
