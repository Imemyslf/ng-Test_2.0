import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ReviwerService } from '../../services/reviewer.service';
@Component({
  selector: 'app-user-task',
  imports: [MatExpansionModule, DatePipe, MatButton],
  templateUrl: './user-task.html',
  styleUrl: './user-task.css',
})
export class UserTask implements OnInit {
  private reviewerService = inject(ReviwerService);
  tasks = this.reviewerService.loadedTasks;

  ngOnInit(): void {
    const selectedEmployee = this.reviewerService.selectedEmployee;
    if (selectedEmployee) {
      this.reviewerService.onGetCompletedTask().subscribe({
        next: (tasks) => (this.tasks = tasks),
        error: (err) => console.error(err),
      });
    }
  }
}
