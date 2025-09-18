import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-task-overviwe',
  imports: [MatButton],
  templateUrl: './task-overviwe.html',
  styleUrl: './task-overviwe.css',
})
export class TaskOverviwe {
  submitTask() {
    console.log('Submitted');
  }
}
