import { Component, inject, OnInit, output } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Employee } from '../../module/user.module';

@Component({
  selector: 'app-employee-component',
  imports: [MatCardContent, MatCard, RouterLink],
  templateUrl: './employee-component.html',
  styleUrl: './employee-component.css',
})
export class EmployeeComponent implements OnInit {
  private adminService = inject(AdminService);
  employeeSelected = output<Employee>();

  employees = this.adminService.loadedEmployee;
  selectedEmployeeId: string = '';

  ngOnInit(): void {
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee) {
      this.adminService.selectedEmployee = JSON.parse(savedEmployee);
      this.selectedEmployeeId = this.adminService.selectedEmployee!.id;
      this.employeeSelected.emit(this.adminService.selectedEmployee!);
    }
    this.adminService.onGetEmployee().subscribe({
      next: (user) => console.log(user),
      error: (err) => console.log(err),
    });
  }

  onSelectedUser(employee: any) {
    console.log('Selected Employee:', employee);

    const savedEmployee = localStorage.getItem('selectedEmployee');
    console.log('Saved Employee from localStorage:', savedEmployee);

    if (savedEmployee === null) {
      localStorage.setItem('selectedEmployee', JSON.stringify(employee));
    } else {
      localStorage.removeItem('selectedEmployee');
      localStorage.setItem('selectedEmployee', JSON.stringify(employee));
    }

    this.adminService.selectedEmployee = employee;
    this.employeeSelected.emit(employee);
    this.selectedEmployeeId = employee.id;

    this.adminService.onGetTask().subscribe({
      next: (tasks) => console.log(tasks),
      error: (err) => console.error(err),
    });
  }
}
