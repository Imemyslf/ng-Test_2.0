import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule, MatInputModule, MatCard, MatButton, ReactiveFormsModule, MatIcon],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  form = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
    confirmPassword: new FormControl('', {
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
