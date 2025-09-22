import { Component, inject, OnInit } from '@angular/core';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Priority, Status, Task } from '../../../module/admin.module';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
// import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminService } from '../../../services/admin.service';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

@Component({
  selector: 'app-task-create-component',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    ɵInternalFormsSharedModule,
    MatOption,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButton,
    MatInputModule,
  ],
  // providers: [provideNativeDateAdapter()],
  templateUrl: './task-create-component.html',
  styleUrl: './task-create-component.css',
})
export class TaskCreateComponent implements OnInit {
  private adminService = inject(AdminService);
  private route = inject(ActivatedRoute);

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    deadline: new FormControl('', {
      validators: [Validators.required],
    }),
    priority: new FormControl('', {
      validators: [Validators.required],
    }),
    status: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  priorities = Priority;
  status = Status;
  employeeId: string | undefined;
  isEditMode: boolean = false;
  editingTask: Task | null = null;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['edit'] && params['edit'] === 'true') {
        this.isEditMode = true;
        this.editingTask = this.adminService.selectedTask!;
        if (this.editingTask) {
          this.form.patchValue({
            title: this.editingTask.title,
            description: this.editingTask.description,
            deadline: this.editingTask.deadline,
            priority: this.editingTask.priority,
            status: this.editingTask.status,
          });
        }
      } else {
        this.isEditMode = false;
        this.editingTask = null;
      }
      console.log('Is Edit Mode:', this.isEditMode);
    });
  }

  constructor() {
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee) {
      this.adminService.selectedEmployee = JSON.parse(savedEmployee);
    }
    this.employeeId = this.adminService.selectedEmployee?.id || undefined;
    console.log('Creating task for employee:', this.employeeId);
  }

  updateDate() {
    console.log('Selected date:');
    this.form.get('deadline')?.valueChanges.subscribe((date) => {
      console.log('Selected date:', date);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const task: Task = {
      title: this.form.value.title!,
      description: this.form.value.description!,
      deadline: this.form.value.deadline!,
      priority: this.form.value.priority!,
      status: this.form.value.status!,
    };
    console.log(task);

    console.log(this.form.value.deadline);
    this.adminService.onCreatetask(task, this.isEditMode).subscribe({
      next: (result) => console.log('Inside Subscribe', result.message),
    });
    this.form.reset();
  }

  goBack() {
    window.history.back();
    // this.route.navigate()
  }
}
