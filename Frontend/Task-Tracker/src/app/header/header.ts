import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatButton, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
