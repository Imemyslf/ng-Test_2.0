import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private route = inject(Router);
  protected readonly title = signal('Task-Tracker');
  currentRoutePath: string = '';

  ngOnInit() {
    console.log('Routes', this.route.url);
  }

  checkRoute() {
    console.log('Routes', this.route.url);
  }
}
