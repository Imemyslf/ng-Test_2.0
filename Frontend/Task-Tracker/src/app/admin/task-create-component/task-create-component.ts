import { Component, inject } from '@angular/core';
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
import { Priority, Status, Task } from '../../module/admin.module';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
// import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../services/admin.service';

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
    MatHint,
    // DatePipe,
  ],
  // providers: [provideNativeDateAdapter()],
  templateUrl: './task-create-component.html',
  styleUrl: './task-create-component.css',
})
export class TaskCreateComponent {
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
    deadline: new FormControl(null, {
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

  private adminService = inject(AdminService);

  updateDate() {
    console.log('Selected date:');
    this.form.get('deadline')?.valueChanges.subscribe((date) => {
      console.log('Selected date:', date);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
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

    this.adminService.onCreatetask(task).subscribe({
      next: (result) => console.log('Inside Subscribe', result),
    });
    this.form.reset();
  }
}
