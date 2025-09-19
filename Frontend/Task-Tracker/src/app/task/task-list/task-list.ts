import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminService } from '../../services/admin.service';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [MatExpansionModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  private adminService = inject(AdminService);

  tasks = this.adminService.loadedTask;
}
