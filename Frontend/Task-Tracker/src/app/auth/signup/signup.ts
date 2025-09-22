import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Auth, ROLE, User, userRoles } from '../../module/auth.module';
import { AuthService } from '../../services/auth.service';
import { Q } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    MatButton,
    ReactiveFormsModule,
    MatIcon,
    MatSelect,
    MatOption,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private authService = inject(AuthService);
  roles = userRoles;
  selectedFile: File | null = null;

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    role: new FormControl<ROLE>('admin', {
      validators: [Validators.required],
    }),
    profileImage: new FormControl<File | null>(null),
  });

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);

    const formData = new FormData();
    formData.append('name', this.form.value.name!);
    formData.append('username', this.form.value.email!);
    formData.append('password', this.form.value.password!);
    formData.append('role', this.form.value.role!);
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.authService.onSignup(formData).subscribe((result) => {
      console.log(result.message);
    });
  }

  onFileSelected(event: any) {
    if (event.target.files?.length > 0) {
      const input = event.target.files[0];
      this.selectedFile = input;
      console.log('Selected File: ', this.selectedFile);
    } else {
      return;
    }

    // const file = input.files[0];
    // this.form.patchValue({ profileImage: input.files[0] });
    // const file = this.form.get('profileImage')?.value;
    // console.log('Selected file:', file);
    // You can implement further logic to handle the selected file, such as uploading it to a server.
  }
}
