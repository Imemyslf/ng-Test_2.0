import { Component, inject, OnInit, output } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Employee } from '../../module/user.module';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviwerService } from '../../services/reviewer.service';

@Component({
  selector: 'app-user-component',
  imports: [MatCardContent, MatCard, RouterLink],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent implements OnInit {
  private reviewerService = inject(ReviwerService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  employees = this.reviewerService.loadedEmployees;
  employeeSelected = output<Employee>();
  selectedEmployeeId = this.reviewerService.selectedEmployee?.id || '';

  ngOnInit(): void {
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee) {
      this.reviewerService.selectedEmployee = JSON.parse(savedEmployee);
      this.selectedEmployeeId = this.reviewerService.selectedEmployee!.id;
      this.employeeSelected.emit(this.reviewerService.selectedEmployee!);
    }
    this.reviewerService.onGetEmployee().subscribe({
      next: (user) => console.log(user),
      error: (err) => console.log(err),
    });
  }

  onSelectedUser(employee: Employee) {
    console.log('Selected Employee:', employee);

    const savedEmployee = localStorage.getItem('selectedEmployee');
    console.log('Saved Employee from localStorage:', savedEmployee);

    if (savedEmployee === null) {
      localStorage.setItem('selectedEmployee', JSON.stringify(employee));
    } else {
      localStorage.removeItem('selectedEmployee');
      localStorage.setItem('selectedEmployee', JSON.stringify(employee));
    }
    this.reviewerService.selectedEmployee = employee;
    this.employeeSelected.emit(employee);
    this.selectedEmployeeId = employee.id;

    this.reviewerService.onGetEmployee().subscribe({
      next: (tasks) => console.log(tasks),
      error: (err) => console.error(err),
    });

    this.router.navigate([employee.name, 'tasks'], { relativeTo: this.route });
  }
}
