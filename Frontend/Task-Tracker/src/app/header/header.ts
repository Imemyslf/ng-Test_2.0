import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);

  get _role() {
    const savedData = localStorage.getItem('userToken');
    if (savedData) {
      const data = JSON.parse(savedData);
      return data.role;
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    window.location.href = '/';
  }
}
