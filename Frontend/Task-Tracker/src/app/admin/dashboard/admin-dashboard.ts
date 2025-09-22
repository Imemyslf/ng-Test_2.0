import { Component, inject, input } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Employee } from '../../module/user.module';
import { EmployeeComponent } from '../employee-component/employee-component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, EmployeeComponent, MatButton],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboard {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private adminService = inject(AdminService);
  employeeSelected = input<Employee>();
  selectedEmployee: string = '';

  onEmployeeSelected(employee: Employee) {
    this.selectedEmployee = employee.name;
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee) {
      console.log('Selected Employee Inside onEmployeeSelected admin Dashboard:', employee);
      this.adminService.selectedEmployee = JSON.parse(savedEmployee);
    }
    // this.adminService.selectedEmployee = employee;
  }

  goToCreateTask() {
    if (this.selectedEmployee) {
      this.router.navigate([this.selectedEmployee, 'create-task'], { relativeTo: this.route });
    } else {
      alert('Please select an employee first');
    }
  }
}
