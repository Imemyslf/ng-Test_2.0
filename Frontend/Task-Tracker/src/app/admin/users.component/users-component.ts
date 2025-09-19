import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users-component',
  imports: [],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
})
export class UsersComponent implements OnInit {
  private adminService = inject(AdminService);
  unumbers: number[] = [1, 2, 3, 4, 5, 6];

  employees = this.adminService.loadedEmployee;

  ngOnInit(): void {
    this.adminService.onGetUser().subscribe({
      next: (user) => console.log(user),
      error: (err) => console.log(err),
    });
  }

  onSelectedUser(employeeId: string) {
    console.log(employeeId);
    this.adminService.onGetTask(employeeId).subscribe({
      next: (result) => console.log(result),
      error: (err) => console.log(err),
    });
  }
}
