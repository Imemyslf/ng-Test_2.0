import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  role: string | undefined = undefined;

  ngOnInit(): void {
    const savedData = localStorage.getItem('userToken');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.role = data.role;
    }
    console.log('Role', this.role);
  }
}
