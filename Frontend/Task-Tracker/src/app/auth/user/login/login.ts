import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButton, MatIcon, MatFormFieldModule, MatInputModule, MatCard],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
  });

  showPassword = false;
  showConfirmPassword = false;

  togglePasswordVisibility(pass: string) {
    if (pass === 'showConfirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    } else {
      this.showPassword = !this.showPassword;
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
}
