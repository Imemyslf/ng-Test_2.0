import { Component } from '@angular/core';
import { UsersComponent } from '../users.component/users-component';
import { TaskList } from '../../task/task-list/task-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [UsersComponent, TaskList, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {}
