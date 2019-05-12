import { EventEmitter, Injectable } from '@angular/core';
import { IUser } from '../../models';

@Injectable()
export class AuthService {
  public user: IUser;
  public isAuthenticated: Promise<boolean> | boolean;
  public isLoggedIn$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.isLoggedIn$.subscribe((state) => {
      this.isAuthenticated = state;
    });
    this.isAuthenticated = new Promise((resolve) => {
      this.isLoggedIn$.subscribe((state) => {
        resolve(state);
      });
    });
    this.user = undefined;
  }

  public emitLoggedIn(user: IUser) {
    this.user = user;
    this.isLoggedIn$.emit(true);
    console.log('User logged in as', user);
  }

  public emitLoggedOut() {
    this.user = null;
    this.isLoggedIn$.emit(false);
    console.log('User logged out');
  }
}
