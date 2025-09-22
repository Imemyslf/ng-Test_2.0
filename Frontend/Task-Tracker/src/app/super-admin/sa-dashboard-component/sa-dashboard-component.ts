import { Component, inject, OnInit } from '@angular/core';
import { SuperAdminService } from '../superAdmin.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sa-dashboard-component',
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './sa-dashboard-component.html',
  styleUrl: './sa-dashboard-component.css',
})
export class SaDashboardComponent implements OnInit {
  private superAdminService = inject(SuperAdminService);
  employees = this.superAdminService.loadedEmployee;
  admins = this.superAdminService.loadedAdmin;
  reviewers = this.superAdminService.loadedReviewer;

  ngOnInit(): void {
    this.superAdminService.onGetAllUsers().subscribe({
      next: (result) => console.log('Inside Subscribe', result),
      error: (err) => console.log('Error', err),
    });
  }
}
