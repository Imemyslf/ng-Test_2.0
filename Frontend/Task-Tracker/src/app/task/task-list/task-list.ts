import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [MatExpansionModule, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {}
