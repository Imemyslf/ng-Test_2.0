import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Auth, User } from '../../module/auth.module';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButton, MatIcon, MatFormFieldModule, MatInputModule, MatCard],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  showPassword = false;

  togglePasswordVisibility(pass: string) {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const user: Auth = {
      id: Math.random().toString(),
      name: '',
      username: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.authService.onLogIn(user).subscribe({
      next: (result) => [
        console.log('Token Generated: ', result.token, 'User Role: ', result.role),
      ],
    });
    console.log(this.form.value);
  }
}
