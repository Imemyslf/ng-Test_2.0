import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../module/admin.module';
@Component({
  selector: 'app-user-task-list',
  imports: [MatExpansionModule, DatePipe, MatButton],
  templateUrl: './user-task-list.html',
  styleUrl: './user-task-list.css',
})
export class UserTaskList implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  tasks = this.userService.loadedTasks;

  ngOnInit(): void {
    this.userService.getEmployeeTask().subscribe({
      next: (tasks) => {
        console.log(tasks);
      },
      error: (err) => console.error(err),
    });
  }

  onStartTask(task: Task) {
    console.log('Starting task with ID:', task._id);
    this.userService.updateTaskStatus(task._id!, 'in-progress').subscribe({
      next: (res) => {
        console.log('Task status updated successfully:', res);
        this.userService.getEmployeeTask().subscribe();
      },
      error: (err) => console.error('Error updating task status:', err),
    });
  }

  onSubmitReport(task: Task) {
    console.log('Submitting task with ID:', task._id);
    this.userService.selectedTask = task;
    this.router.navigate(['/users/task-report']);
  }

  onCompleteTask(task: Task) {
    console.log('Completing task with ID:', task._id);
    this.userService.updateTaskStatus(task._id!, 'completed').subscribe({
      next: (res) => {
        console.log('Task status updated successfully:', res);
        this.userService.getEmployeeTask().subscribe();
      },
      error: (err) => console.error('Error updating task status:', err),
    });
  }
}
