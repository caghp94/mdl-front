import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authClient = ''

  public isAuthenticated = false

  constructor(private router: Router) {
  }

  async checkAuthenticated(): Promise<Boolean> {
    const authenticated = false;
    return authenticated ? true : false
  }

  async login(username: string, password: string): Promise<void> {
  }

  async logout(redirect: string): Promise<void> {
  }
}
