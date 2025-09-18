import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Auth, ROLE, User, userRoles } from '../auth.model';
import { AuthService } from '../auth.service';

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

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    role: new FormControl<ROLE>('admin', {
      validators: [Validators.required],
    }),
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

    const user: Auth = {
      id: Math.random().toString(),
      username: this.form.value.email!,
      password: this.form.value.password!,
      role: this.form.value.role!,
    };

    this.authService.onSignup(user).subscribe((result) => {
      console.log(result.message);
    });
  }
}
