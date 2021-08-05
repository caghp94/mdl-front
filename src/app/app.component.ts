import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tic Tac Toe';
  isAuthenticated = false;

  constructor(public authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = false;
  }

  async logout(): Promise<void> {
    await this.authService.logout('/');
  }
}
