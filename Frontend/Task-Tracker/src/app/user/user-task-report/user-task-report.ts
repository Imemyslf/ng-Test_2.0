import { Component, inject, OnDestroy } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatButton, MatIcon],
  templateUrl: './user-task-report.html',
  styleUrls: ['./user-task-report.css'],
})
export class UserTaskReport {
  selectedFile: File | null = null;
  private userService = inject(UserService);

  task = this.userService.selectedTask;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      alert('No file selected!');
      return;
    }

    if (!this.task || !this.task._id) {
      alert('Task is not selected!');
      return;
    }

    if (this.selectedFile) {
      console.log('Uploading:', this.selectedFile.name);
    }

    this.userService.uploadReport(this.task!._id, this.selectedFile!).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        alert('Report uploaded successfully!');
      },
      error: (error) => {
        console.error('Upload failed:', error);
        alert('Failed to upload report. Please try again.');
      },
    });
  }
}
