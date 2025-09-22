import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminService } from '../../../services/admin.service';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Task } from '../../../module/admin.module';
import { Router } from '@angular/router';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [MatExpansionModule, DatePipe, MatButton],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private adminService = inject(AdminService);
  route = inject(Router);

  tasks = this.adminService.loadedTask;

  ngOnInit(): void {
    const selectedEmployee = localStorage.getItem('selectedEmployee');
    if (selectedEmployee) {
      this.adminService.onGetTask().subscribe({
        next: (tasks) => {
          console.log(tasks);
        },
        error: (err) => console.error(err),
      });
    }
  }

  onEditTask(task: Task) {
    const selectedEmployee = this.adminService.selectedEmployee;
    this.adminService.selectedTask = task;
    this.route.navigate(['/admin', selectedEmployee?.name, 'create-task'], {
      queryParams: { edit: 'true' },
    });
  }

  onDeleteTask(taskId: string) {
    this.adminService.onDeleteTask(taskId).subscribe({
      next: (res) => {
        console.log('Task deleted successfully:', res);
        this.adminService.onGetTask().subscribe();
      },
      error: (err) => console.error('Error deleting task:', err),
    });
  }
}
