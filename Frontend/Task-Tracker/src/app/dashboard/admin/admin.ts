import { Component } from '@angular/core';
import { UsersComponent } from './users.component/users-component';
import { TaskList } from '../../task/task-list/task-list';

@Component({
  selector: 'app-admin',
  imports: [UsersComponent, TaskList],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {}
