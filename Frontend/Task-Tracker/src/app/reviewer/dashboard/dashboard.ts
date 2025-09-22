import { Component, inject, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from '../user-component/user-component';
import { ReviwerService } from '../../services/reviewer.service';
import { Employee } from '../../module/user.module';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, UserComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class ReviewerDashboard {
  private reviewerService = inject(ReviwerService);
  employeeSelected = input<Employee>();
  selectedEmployee: string = '';

  onEmployeeSelected(employee: Employee) {
    this.selectedEmployee = employee.name;
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee) {
      console.log('Selected Employee Inside onEmployeeSelected admin Dashboard:', employee);
      this.reviewerService.selectedEmployee = JSON.parse(savedEmployee);
    }
    // this.reviewerService.selectedEmployee = employee;
  }
}
