import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../admin-service';

@Component({
  selector: 'app-users-component',
  imports: [],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
})
export class UsersComponent implements OnInit {
  private adminService = inject(AdminService);
  unumbers: number[] = [1, 2, 3, 4, 5, 6];

  ngOnInit(): void {
    this.adminService.onGetUser();
  }
}
